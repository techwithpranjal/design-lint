import type { CollectedPageData, ScanMetrics, ScanResult } from "./types";

export async function analyzePage(
  data: CollectedPageData,
  metrics: ScanMetrics
): Promise<ScanResult> {
//   const enabledMetrics = Object.values(metrics).filter(Boolean).length;

  return {
    overallScore: Math.round(70 + Math.random() * 15),

    metrics: {
      Accessibility: metrics.accessibility
        ? { score: 82, issues: 4 }
        : undefined,

      Readability: metrics.readability
        ? { score: 74, level: "Intermediate" }
        : undefined,

      "Layout Density": metrics.layout_density
        ? { score: 88, sections: data.domStats.headings }
        : undefined,

      "Visual Hierarchy": metrics.visual_hierarchy
        ? { score: 69, density: "High" }
        : undefined,
    },

    findings: [
      metrics.accessibility
        ? "Low contrast text detected in header."
        : null,
      metrics.readability
        ? "Long paragraphs found, consider breaking them up."
        : null,
      metrics.layout_density
        ? "Dense layout detected in main content area."
        : null,
      metrics.visual_hierarchy
        ? "Inconsistent heading hierarchy across sections."
        : null,
    ].filter(Boolean) as string[],
  };
}