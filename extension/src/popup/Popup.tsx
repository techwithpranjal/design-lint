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
    runtime.onMessage.addListener((message: any) => {
      if (message.type === "SCAN_RESULT") {
        console.log("Received scan result in popup:", message.payload);
        const storage =
          (globalThis as any).chrome?.storage?.local ||
          (globalThis as any).browser?.storage?.local;

        storage.set({ lastScanResult: message.payload }, () =>
          setView("results")
        );
      }
      if (message.type === "SCAN_ERROR") {
        console.error(message.error);
        setView("results");
      }
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
      console.log("Fetched last scan result from storage:", res);
      setHasResults(!!res?.lastScanResult);
    });

    const onStorageChange = (
      changes: Record<string, { newValue?: unknown }>,
      area: string
    ) => {
      if (area !== "local") return;

      if ("lastScanResult" in changes) {
        console.log("Fetched last scan result from storage:", changes);
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

  useEffect(() => {
    console.log("hasResults changed:", hasResults);
  }, [hasResults]);

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
    console.log("Starting scan with metrics:", metrics);

    setView("loading");

    const runtime =
      (globalThis as any).chrome?.runtime ||
      (globalThis as any).browser?.runtime;

    runtime.sendMessage({
      type: "START_SCAN",
      payload: {
        metrics,
      },
    });
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
