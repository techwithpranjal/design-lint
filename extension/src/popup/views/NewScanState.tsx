import { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function NewScanState({ onStart }: { onStart: (metrics: any) => void }) {
  const SCAN_METRICS: {
    key: string;
    label: string;
    description: string;
  }[] = [
    {
      key: "accessibility",
      label: "Accessibility",
      description:
        "Test WCAG signals like contrast & semantics, how accessible the content is to all users.",
    },
    {
      key: "readability",
      label: "Readability",
      description:
        "Analyzes text density and clarity, how comprehensible the content is.",
    },
    {
      key: "layout-density",
      label: "Layout Density",
      description:
        "Evaluates structure and spacing, how well is the content organized.",
    },
    {
      key: "visual-hierarchy",
      label: "Visual Hierarchy",
      description:
        "Measures clutter and element distribution, how the page feels at a glance.",
    },
  ];

  const [metrics, setMetrics] = useState({
    accessibility: true,
    readability: true,
    layout_density: true,
    visual_hierarchy: true,
  });

  return (
    <div className="w-90 min-h-105 bg-zinc-950 text-zinc-100 flex flex-col">
      <Header />

      <main className="flex-1 px-4 py-6 flex flex-col gap-5">
        <div>
          <h2 className="text-sm font-medium text-zinc-200">
            Scan current page
          </h2>
          <p className="mt-1 text-xs text-zinc-500 leading-relaxed">
            Select what aspects of the page you want DesignLint to analyze.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {SCAN_METRICS.map((metric) => (
            <label
              key={metric.key}
              className="p-3 rounded-md border border-zinc-800 bg-zinc-900/40
                         hover:border-zinc-700 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="accent-cyan-400"
                  checked={metrics.accessibility}
                  onChange={(e) =>
                    setMetrics({ ...metrics, accessibility: e.target.checked })
                  }
                />
                <span className="text-sm text-zinc-200">{metric.label}</span>
              </div>

              <div className="mt-1 text-xs text-zinc-500 leading-snug">
                {metric.description}
              </div>
            </label>
          ))}
        </div>

        <button
          onClick={() => onStart(metrics)}
          className="rounded-md bg-cyan-500/10 border border-cyan-500/30
                     text-cyan-400 text-sm py-2 hover:bg-cyan-500/20 transition"
        >
          Start scan
        </button>
      </main>

      <Footer />
    </div>
  );
}
