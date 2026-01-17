export type ScanMetrics = {
  accessibility: boolean;
  readability: boolean;
  layout_density: boolean;
  visual_hierarchy: boolean;
};

export type CollectedPageData = {
  url: string;
  timestamp: number;
  domStats: {
    headings: number;
    paragraphs: number;
    images: number;
    links: number;
  };
};

export type ScanResult = {
  overallScore: number;
  metrics: Record<
    string,
    | {
        score: number;
        [key: string]: unknown;
      }
    | undefined
  >;
  findings: string[];
};
