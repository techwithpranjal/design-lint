import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import MetricDetailView from "./MetricDetailVIew";

type MetricValue = {
  score: number;
  [key: string]: any;
};

type ScanResult = {
  url: string;
  overallScore: number;
  metrics: Record<string, MetricValue>;
  findings: string[];
};

export default function ResultsView({ onNewScan }: { onNewScan: () => void }) {
  const [result, setResult] = useState<ScanResult | null>(null);
  const [activeMetric, setActiveMetric] = useState<string | null>(null);

  useEffect(() => {
    const storage =
      (globalThis as any).chrome?.storage?.local ||
      (globalThis as any).browser?.storage?.local;

    if (!storage) return;

    storage.get(["lastScanResult"], (res: any) => {
      if (res?.lastScanResult) {
        setResult(res.lastScanResult);
      }
    });
  }, []);

  const metricEntries = result ? Object.entries(result.metrics) : [];

  return (
    <div className="w-90 min-h-105 bg-zinc-950 text-zinc-100 flex flex-col">
      <Header />
      {activeMetric && result ? (
        <MetricDetailView
          label={activeMetric}
          data={result.metrics[activeMetric]}
          onBack={() => setActiveMetric(null)}
        />
      ) : (
        <>
          <div className="px-4 py-3 w-full border-zinc-800 flex items-center justify-between">
            <button
              onClick={onNewScan}
              className="w-full text-xs text-cyan-400 hover:text-cyan-300 transition"
            >
              New scan
            </button>
          </div>
          <main className="flex-1 flex flex-col">
            <div className="pt-0 px-4 py-5 flex flex-col gap-5">
              {/* Overall score */}
              <div className="rounded-md border border-zinc-800 bg-zinc-900/40 p-4">
                <div className="text-xs text-zinc-500">Overall score</div>
                <div className="mt-1 text-3xl font-semibold text-cyan-400">
                  {result?.overallScore ?? "N/A"}%
                </div>
                <div className="mt-1 text-xs text-zinc-500">
                  Balanced design with room for improvement. Click on a metric to view more details.
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-3">
                {metricEntries.map(([label, data]) => (
                  <button
                    key={label}
                    onClick={() => setActiveMetric(label)}
                    className="text-left rounded-md border border-zinc-800 bg-zinc-900/40 p-3
                       hover:border-cyan-400 hover:bg-zinc-900/60 transition"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-zinc-200">{label}</span>
                      <span className="text-sm text-cyan-400 font-medium">
                        {data.score}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Key findings */}
              <div className="rounded-md border border-zinc-800 bg-zinc-900/40 p-4">
                <div className="text-sm text-zinc-200 mb-2">Key findings</div>
                <ul className="space-y-1 text-xs text-zinc-500 list-disc list-inside">
                  {result?.findings.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </main>
        </>
      )}

      <Footer />
    </div>
  );
}
