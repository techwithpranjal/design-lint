export type ScanMetrics = {
  accessibility: boolean;
  readability: boolean;
  layout_density: boolean;
  visual_hierarchy: boolean;
};

export type StartScanMessage = {
  type: "START_SCAN";
  payload: {
    metrics: ScanMetrics;
  };
};

export type AccessibilityResult = {
  score: number;
  issueCount: number;
  breakdown: {
    critical: number;
    serious: number;
    moderate: number;
    minor: number;
  };
  topIssues: string[];
};

export type ScanResultMessage = {
  type: "SCAN_RESULT";
  payload: {
    accessibility?: AccessibilityResult;
  };
};

export type ScanErrorMessage = {
  type: "SCAN_ERROR";
  error: string;
};

export type ExtensionMessage =
  | StartScanMessage
  | ScanResultMessage
  | ScanErrorMessage;
