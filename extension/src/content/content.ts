console.log("[DesignLint][Content] loaded");

const runtime =
  (globalThis as any).chrome?.runtime || (globalThis as any).browser?.runtime;

runtime.onMessage.addListener((message: any) => {
  if (message.type === "START_SCAN") {
    console.log("[Content] START_SCAN received");

    if (message.payload.metrics.accessibility) {
      injectOnce("axe.min.js", () => {
        injectOnce("axe-bridge.js", () => {
          window.postMessage({ source: "designlint", type: "RUN_AXE" }, "*");
        });
      });
    }
  }
});

window.addEventListener("message", (event) => {
  if (event.source !== window) return;
  if (event.data?.source !== "designlint") return;

  if (event.data.type === "AXE_RESULT") {
    console.log("[Content] AXE_RESULT received", event.data.payload);

    const normalized = normalizeAccessibility(event.data.payload);

    runtime.sendMessage({
      type: "SCAN_RESULT",
      payload: {
        url: window.location.href,
        scannedAt: Date.now(),
        overallScore: normalized.score,
        metrics: {
          Accessibility: {
            score: normalized.score,
            issueCount: normalized.issueCount,
            breakdown: normalized.breakdown,
            topIssues: normalized.topIssues,
          },
        },
        findings: normalized.topIssues,
      },
    });
  }

  if (event.data.type === "AXE_ERROR") {
    runtime.sendMessage({
      type: "SCAN_ERROR",
      error: "Accessibility scan failed",
    });
  }
});

function injectOnce(file: string, onLoad?: () => void) {
  if (document.querySelector(`script[data-designlint="${file}"]`)) {
    onLoad?.();
    return;
  }

  const script = document.createElement("script");
  script.src = runtime.getURL(file);
  script.async = false;
  script.dataset.designlint = file;

  if (onLoad) {
    script.onload = onLoad;
  }

  document.documentElement.appendChild(script);
}

function normalizeAccessibility(results: any) {
  return {
    score: Math.max(0, 100 - results.violations.length * 5),
    issueCount: results.violations.length,
    breakdown: {
      critical: results.violations.filter((v: any) => v.impact === "critical")
        .length,
      serious: results.violations.filter((v: any) => v.impact === "serious")
        .length,
      moderate: results.violations.filter((v: any) => v.impact === "moderate")
        .length,
      minor: results.violations.filter((v: any) => v.impact === "minor").length,
    },
    topIssues: results.violations.slice(0, 3).map((v: any) => v.help),
  };
}
