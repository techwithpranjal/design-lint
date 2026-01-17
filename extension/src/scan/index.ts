import type { ScanMetrics, ScanResult } from "./types";
import { collectPageData } from "./collect";
import { analyzePage } from "./analyze";

export async function runScan(
  metrics: ScanMetrics
): Promise<ScanResult> {
  const pageData = await collectPageData();
  return analyzePage(pageData, metrics);
}