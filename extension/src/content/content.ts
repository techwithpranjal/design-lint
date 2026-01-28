console.log("[DesignLint][Content] loaded");

const runtime =
  (globalThis as any).chrome?.runtime || (globalThis as any).browser?.runtime;

runtime.onMessage.addListener((message: any) => {
  if (message.type === "RUN_METRIC_SCAN") {
    console.log("[Content] START_SCAN received");

    const metric = message.payload.metric;
    console.log(`[Content] Running scan for metric: ${metric}`);

    if (metric === "accessibility") {
      injectOnce("axe.min.js", () => {
        injectOnce("axe-bridge.js", () => {
          window.postMessage({ source: "designlint", type: "RUN_AXE" }, "*");
        });
      });
    }

    if (metric === "readability") {
      const text = collectReadableText();
      const readability = analyzeReadability(text);

      runtime.sendMessage({
        type: "METRIC_SCAN_RESULT",
        payload: {
          metric: "Readability",
          data: readability,
        },
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
      type: "METRIC_SCAN_RESULT",
      payload: {
        metric: "Accessibility",
        data: normalized,
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

function collectReadableText(): string {
  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode(node) {
        if (!node.textContent) return NodeFilter.FILTER_REJECT;
        if (!node.parentElement) return NodeFilter.FILTER_REJECT;

        const style = window.getComputedStyle(node.parentElement);
        if (style.display === "none" || style.visibility === "hidden") {
          return NodeFilter.FILTER_REJECT;
        }

        return NodeFilter.FILTER_ACCEPT;
      },
    }
  );

  let text = "";
  let node;
  while ((node = walker.nextNode())) {
    text += " " + node.textContent;
  }

  return text.trim();
}

function countSyllables(word: string): number {
  word = word.toLowerCase();
  if (word.length <= 3) return 1;

  const vowels = word.match(/[aeiouy]{1,2}/g);
  return vowels ? vowels.length : 1;
}

function analyzeReadability(text: string) {
  const sentences = text.split(/[.!?]+/).filter(Boolean);
  const words = text.split(/\s+/).filter(Boolean);

  const paragraphs = text
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  const syllableCount = words.reduce((sum, w) => sum + countSyllables(w), 0);

  const wordsPerSentence =
    sentences.length > 0 ? words.length / sentences.length : 0;

  const fleschScore =
    206.835 -
    1.015 * wordsPerSentence -
    84.6 * (syllableCount / Math.max(words.length, 1));

  const avgParagraphLength =
    paragraphs.length > 0 ? words.length / paragraphs.length : 0;

  const longParagraphs = paragraphs.filter(
    (p) => p.split(/\s+/).length > 120
  ).length;

  let score = Math.round(Math.max(0, Math.min(100, fleschScore)));

  if (wordsPerSentence > 25) score -= 10;
  if (longParagraphs > 3) score -= 10;

  score = Math.max(0, score);

  const grade = score >= 70 ? "Easy" : score >= 50 ? "Standard" : "Hard";

  return {
    score,
    grade,
    avgSentenceLength: Math.round(wordsPerSentence),
    avgParagraphLength: Math.round(avgParagraphLength),
    longParagraphs,
  };
}
