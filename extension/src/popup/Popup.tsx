import { useEffect, useState } from "react";
import EmptyResultsView from "./views/EmptyState";
import NewScanState from "./views/NewScanState";

export default function Popup() {
  const runtime =
    (globalThis as any).chrome?.runtime || (globalThis as any).browser?.runtime;

  const [hasResults, setHasResults] = useState<boolean | null>(null);
  const [view, setView] = useState<"results" | "new-scan">("results");

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

  return (
    <div className="w-90 h-105 bg-zinc-950 text-zinc-400 flex items-center justify-center text-sm">
      {hasResults === null ? (
        <>Loading…</>
      ) : view === "new-scan" ? (
        <NewScanState
          onStart={() => {
            console.log("Start scan clicked");
          }}
        />
      ) : view === "results" ? (
        hasResults ? (
          <>Results view coming next</>
        ) : (
          <EmptyResultsView onNewScan={onNewScanHandler} />
        )
      ) : null}
    </div>
  );
}
