export type MetricType =
  | "Accessibility"
  | "Readability"
  | "Layout Density"
  | "Visual Hierarchy";

export type ActiveScan = {
    url: string;
    overallScore: number;
    metrics: Record<string, any>;
    findings: string[];
  };