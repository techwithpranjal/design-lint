import type { CollectedPageData } from "./types";

export async function collectPageData(
//   metrics: ScanMetrics
): Promise<CollectedPageData> {
  const documentStats = {
    headings: document.querySelectorAll("h1,h2,h3,h4,h5,h6").length,
    paragraphs: document.querySelectorAll("p").length,
    images: document.querySelectorAll("img").length,
    links: document.querySelectorAll("a").length,
  };

  return {
    url: window.location.href,
    timestamp: Date.now(),
    domStats: documentStats,
  };
}