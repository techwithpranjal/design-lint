import { useEffect, useState } from "react";
import EmptyResultsView from "./views/EmptyState";
import NewScanState from "./views/NewScanState";
import LoaderState from "./views/LoaderState";
import ResultsView from "./views/ResultsState";

export default function Popup() {
  const runtime =
    (globalThis as any).chrome?.runtime || (globalThis as any).browser?.runtime;

  const [hasResults, setHasResults] = useState<boolean | null>(null);
  type View = "results" | "new-scan" | "loading";

  const [view, setView] = useState<View>("results");

  useEffect(() => {
    runtime.sendMessage({ type: "PING" }, (response: any) => {
      console.log("[Popup] response from background:", response);

      runtime.sendMessage(
        { type: "HELLO_FROM_POPUP" },
        (contentResponse: any) => {
          console.log("[Popup] response from content:", contentResponse);
        }
      );
    });
  }, []);

  useEffect(() => {
    const storage =
      (globalThis as any).chrome?.storage?.local ||
      (globalThis as any).browser?.storage?.local;

    if (!storage) {
      setHasResults(false);
      return;
    }

    storage.get(["lastScanResult"], (res: { lastScanResult?: unknown }) => {
      setHasResults(!!res?.lastScanResult);
    });

    const onStorageChange = (
      changes: Record<string, { newValue?: unknown }>,
      area: string
    ) => {
      if (area !== "local") return;

      if ("lastScanResult" in changes) {
        setHasResults(!!changes.lastScanResult?.newValue);
      }
    };

    const storageApi =
      (globalThis as any).chrome?.storage ||
      (globalThis as any).browser?.storage;

    storageApi?.onChanged?.addListener(onStorageChange);

    return () => {
      storageApi?.onChanged?.removeListener(onStorageChange);
    };
  }, []);

  const onNewScanHandler = () => {
    console.log("New scan clicked");
    const storage =
      (globalThis as any).chrome?.storage?.local ||
      (globalThis as any).browser?.storage?.local;

    storage?.remove(["lastScanResult"], () => {
      console.log("Cleared last scan result");
      setHasResults(false);
      setView("new-scan");
    });
    setView("new-scan");
    setHasResults(false);
  };

  const onStartScanHandler = (metrics: {
    accessibility: boolean;
    readability: boolean;
    layout_density: boolean;
    visual_hierarchy: boolean;
  }) => {
    const payload = {
      url: window.location.href,
      timestamp: Date.now(),
      metrics,
    };

    console.log("Starting scan with payload:", payload);

    setView("loading");

    const storage =
      (globalThis as any).chrome?.storage?.local ||
      (globalThis as any).browser?.storage?.local;

    console.log("Simulating scan...", storage);

    setTimeout(() => {
      const mockResult = {
        overallScore: 78,
        metrics: {
          Accessibility: metrics.accessibility
            ? { score: 82, issues: 4 }
            : undefined,
          Readability: metrics.readability
            ? { score: 74, level: "Intermediate" }
            : undefined,
          "Layout Density": metrics.layout_density
            ? { score: 88, sections: 6 }
            : undefined,
          "Visual Hierarchy": metrics.visual_hierarchy
            ? { score: 69, density: "High" }
            : undefined,
        },
        findings: [
          "Low contrast text detected in header.",
          "Long paragraphs found, consider breaking them up.",
          "Dense layout in the main content area.",
          "Inconsistent heading sizes across sections.",
        ],
      };

      storage?.set({ lastScanResult: mockResult }, () => {
        console.log("Scan completed:", mockResult);
        setView("results");
      });
    }, 2000);
  };

  return (
    <div className="w-90 h-full bg-zinc-950 text-zinc-400 flex items-center justify-center text-sm">
      {hasResults === null ? (
        <>Loading…</>
      ) : view === "loading" ? (
        <LoaderState />
      ) : view === "new-scan" ? (
        <NewScanState onStart={onStartScanHandler} />
      ) : view === "results" ? (
        hasResults ? (
          <ResultsView onNewScan={onNewScanHandler} />
        ) : (
          <EmptyResultsView onNewScan={onNewScanHandler} />
        )
      ) : null}
    </div>
  );
}
