type ActiveScan = {
  url: string;
  overallScore: number;
  metrics: Record<string, any>;
  findings: string[];
};

const runtime =
  (globalThis as any).chrome?.runtime || (globalThis as any).browser?.runtime;
const tabs =
  (globalThis as any).chrome?.tabs || (globalThis as any).browser?.tabs;

runtime?.onInstalled?.addListener(() => {
  console.log("[DesignLint] Extension installed");
});

let activeScan: ActiveScan | null = null;
let metricsRequested: string[] = [];

runtime.onMessage.addListener((message: { type: string; payload?: any }) => {
  if (message.type === "START_SCAN") {
    tabs.query({ active: true, currentWindow: true }, (tabsList: any[]) => {
      const tab = tabsList?.[0];
      if (!tab?.id) return;

      const metrics = message.payload.metrics;
      const metricsKeys = Object.keys(metrics).filter(
        (metric) => metrics[metric]
      );
      metricsRequested = metricsKeys;

      console.log(
        "[Background] Starting scan on tab:",
        tab.id,
        "with metrics:",
        metricsKeys
      );

      activeScan = {
        url: tab.url || "",
        overallScore: 0,
        metrics: {},
        findings: [],
      };

      metricsKeys.forEach((metric) => {
        if (metrics[metric]) {
          tabs.sendMessage(tab.id, {
            type: "RUN_METRIC_SCAN",
            payload: { metric },
          });
        }
      });
    });
  }

  if (message.type === "METRIC_SCAN_RESULT") {
    if (!activeScan) return;

    const metric = message.payload.metric;
    const data = message.payload.data;

    console.log(
      `[Background] Received scan result for metric: ${metric}`,
      data
    );

    activeScan.metrics[metric] = data;

    console.log("[Background] Updated activeScan:", activeScan);

    const expectedMetricsCount = metricsRequested.length;
    const receivedMetricsCount = Object.keys(activeScan.metrics).length;

    if (expectedMetricsCount === receivedMetricsCount) {
      const scores = Object.values(activeScan.metrics).map(
        (m: any) => m.score || 0
      );
      activeScan.overallScore =
        scores.reduce((acc, val) => acc + val, 0) / scores.length;

      runtime.sendMessage({
        type: "SCAN_RESULT",
        payload: activeScan,
      });
      activeScan = null;
    }
  }

  if (message.type === "SCAN_ERROR") {
    runtime.sendMessage(message);
  }
});
