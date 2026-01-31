type MetricValue = {
  score: number;
  [key: string]: any;
};

export default function MetricDetailView({
  label,
  data,
  onBack,
}: {
  label: string;
  data: MetricValue;
  onBack: () => void;
}) {
  console.log("Rendering MetricDetailView with data:", data);

  function metricSummary(data: MetricValue) {
    if (label === "Accessibility") {
      const issueCount = data.issueCount || 0;
      if (issueCount === 0) {
        return "No accessibility issues detected. The page meets basic accessibility standards.";
      }
      if (issueCount <= 3) {
        return "Minor accessibility issues detected that may affect some users.";
      }
      return "Multiple accessibility issues detected that could impact screen reader and keyboard users.";
    } else if (label === "Readability") {
      const score = data.score || 0;
      if (score >= 70) {
        return "Text is easy to read and suitable for a broad audience.";
      }
      if (score >= 50) {
        return "Text is moderately readable but may require effort for some users.";
      }
      return "Text is difficult to read and may overwhelm users with long sentences or dense paragraphs.";
    } else if (label === "Layout Density") {
      const score = data.score || 0;

      if (score >= 75) {
        return "Layout is well spaced and structured, making content easy to scan and navigate.";
      }
      if (score >= 50) {
        return "Layout is somewhat dense with signs of crowding or deep nesting.";
      }
      return "Layout is visually dense and cluttered, which may overwhelm users and reduce clarity.";
    } else if (label === "Visual Hierarchy") {
      if (data.score >= 75) {
        return "Clear visual emphasis guides users naturally through the page.";
      }
      if (data.score >= 50) {
        return "Some visual hierarchy exists, but key elements compete for attention.";
      }
      return "Weak visual hierarchy makes it difficult to identify important content.";
    }
  }

  return (
    <div className="flex-1 px-4 py-5 flex flex-col gap-4">
      <button
        onClick={onBack}
        className="text-xs text-cyan-400 hover:text-cyan-300 w-full"
      >
        ← Back to results
      </button>

      <div className="rounded-md border border-zinc-800 bg-zinc-900/40 p-4">
        <div className="text-sm font-medium text-zinc-200">{label}</div>

        <div className="mt-2 flex items-end justify-between">
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-semibold text-cyan-400">
              {data.score}
            </span>
            <span className="text-xs text-zinc-500">/ 100</span>
            {label === "Readability" && (
              <span className="ml-2 text-xs text-zinc-400">
                Grade: {data.grade} · ~{data.readingTime} min read
              </span>
            )}
          </div>
        </div>

        <div className="mt-2 text-xs leading-relaxed text-zinc-400">
          {metricSummary(data)}
        </div>
      </div>

      {label === "Accessibility" && (
        <>
          <div className="rounded-md border border-zinc-800 bg-zinc-900/40 p-4">
            <div className="text-sm text-zinc-200 mb-2">Issue severity</div>

            <span className="text-xs text-zinc-500 mb-3 block">
              Total issues : {data.issueCount}
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex justify-between text-red-400">
                <span>Critical</span>
                <span>{data.breakdown.critical}</span>
              </div>
              <div className="flex justify-between text-amber-400">
                <span>Serious</span>
                <span>{data.breakdown.serious}</span>
              </div>
              <div className="flex justify-between text-yellow-400">
                <span>Moderate</span>
                <span>{data.breakdown.moderate}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Minor</span>
                <span>{data.breakdown.minor}</span>
              </div>
            </div>
          </div>

          <div className="rounded-md border border-zinc-800 bg-zinc-900/40 p-4">
            <div className="text-sm text-zinc-200 mb-2">Top issues</div>

            <ul className="space-y-1 text-xs text-zinc-500 list-disc list-inside">
              {data.topIssues?.map((issue: string, idx: number) => (
                <li key={idx}>{issue}</li>
              ))}
            </ul>
          </div>
        </>
      )}

      {label === "Readability" && (
        <>
          <div className="rounded-md border border-zinc-800 bg-zinc-900/40 p-4">
            <div className="text-sm text-zinc-200 mb-3">
              Text characteristics
            </div>

            <div className="space-y-2 text-xs text-zinc-400">
              <div className="flex justify-between text-zinc-400">
                <span>Average sentence length</span>
                <span
                  className={
                    data.avgSentenceLength > 25
                      ? "text-red-400"
                      : data.avgSentenceLength > 20
                      ? "text-yellow-400"
                      : "text-emerald-400"
                  }
                >
                  {data.avgSentenceLength} words
                </span>
              </div>

              <div className="flex justify-between text-zinc-400">
                <span>Average paragraph length</span>
                <span
                  className={
                    data.avgParagraphLength > 100
                      ? "text-red-400"
                      : data.avgParagraphLength > 70
                      ? "text-yellow-400"
                      : "text-emerald-400"
                  }
                >
                  {data.avgParagraphLength} words
                </span>
              </div>

              <div className="flex justify-between text-zinc-400">
                <span>Long paragraphs</span>
                <span
                  className={
                    data.longParagraphs > 3
                      ? "text-red-400"
                      : data.longParagraphs > 0
                      ? "text-yellow-400"
                      : "text-emerald-400"
                  }
                >
                  {data.longParagraphs}
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-md border border-zinc-800 bg-zinc-900/40 p-4">
            <div className="text-sm text-zinc-200 mb-2">Top findings</div>

            <ul className="space-y-1 text-xs text-zinc-500 list-disc list-inside">
              {data.findings?.map((finding: string, idx: number) => (
                <li key={idx}>{finding}</li>
              ))}
            </ul>
          </div>
        </>
      )}

      {label === "Layout Density" && (
        <>
          <div className="rounded-md border border-zinc-800 bg-zinc-900/40 p-4">
            <div className="text-sm text-zinc-200 mb-3">Layout structure</div>

            <div className="space-y-2 text-xs text-zinc-400">
              <div className="flex justify-between text-zinc-400">
                <span>Visible sections</span>
                <span
                  className={
                    data.visibleSections > 12
                      ? "text-red-400"
                      : data.visibleSections > 8
                      ? "text-yellow-400"
                      : "text-emerald-400"
                  }
                >
                  {data.visibleSections}
                </span>
              </div>

              <div className="flex justify-between text-zinc-400">
                <span>Average vertical spacing</span>
                <span
                  className={
                    data.avgSpacing < 12
                      ? "text-red-400"
                      : data.avgSpacing < 20
                      ? "text-yellow-400"
                      : "text-emerald-400"
                  }
                >
                  {data.avgSpacing}px
                </span>
              </div>

              <div className="flex justify-between text-zinc-400">
                <span>Average DOM depth</span>
                <span
                  className={
                    data.avgSpacing < 12
                      ? "text-red-400"
                      : data.avgSpacing < 20
                      ? "text-yellow-400"
                      : "text-emerald-400"
                  }
                >
                  {data.avgDepth}
                </span>
              </div>

              <div className="flex justify-between text-zinc-400">
                <span>Maximum DOM depth</span>
                <span
                  className={
                    data.maxDepth > 8
                      ? "text-red-400"
                      : data.maxDepth > 6
                      ? "text-yellow-400"
                      : "text-emerald-400"
                  }
                >
                  {data.maxDepth}
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-md border border-zinc-800 bg-zinc-900/40 p-4">
            <div className="text-sm text-zinc-200 mb-2">Layout assessment</div>

            <ul className="space-y-1 text-xs text-zinc-500 list-disc list-inside">
              {data.visibleSections > 12 && (
                <li>
                  High number of visible sections may reduce scannability on
                  first glance.
                </li>
              )}

              {data.avgSpacing < 12 && (
                <li>
                  Tight vertical spacing between elements can make content feel
                  crowded.
                </li>
              )}

              {data.maxDepth > 8 && (
                <li>
                  Deeply nested layout structure may increase cognitive load and
                  maintenance complexity.
                </li>
              )}

              {data.avgDepth > 5 && (
                <li>
                  Many elements are nested several levels deep, indicating
                  structural complexity.
                </li>
              )}

              {data.densityLabel === "Balanced" && (
                <li>
                  Layout structure appears balanced with clear separation
                  between content sections.
                </li>
              )}
            </ul>
          </div>
        </>
      )}

      {label === "Visual Hierarchy" && (
        <>
          <div className="rounded-md border border-zinc-800 bg-zinc-900/40 p-4">
            <div className="text-sm text-zinc-200 mb-3">
              Visual emphasis signals
            </div>

            <div className="space-y-2 text-xs text-zinc-400">
              <div className="flex justify-between text-zinc-400">
                <span>Primary focus elements</span>
                <span
                  className={
                    data.primaryFocusCount > 3
                      ? "text-red-400"
                      : data.primaryFocusCount > 1
                      ? "text-yellow-400"
                      : "text-emerald-400"
                  }
                >
                  {data.primaryFocusCount}
                </span>
              </div>

              <div className="flex justify-between text-zinc-400">
                <span>Heading size variance</span>
                <span
                  className={
                    data.headingScaleVariance < 6
                      ? "text-red-400"
                      : data.headingScaleVariance < 12
                      ? "text-yellow-400"
                      : "text-emerald-400"
                  }
                >
                  {data.headingScaleVariance}px
                </span>
              </div>

              <div className="flex justify-between text-zinc-400">
                <span>Emphasis contrast score</span>
                <span
                  className={
                    data.headingScaleVariance < 6
                      ? "text-red-400"
                      : data.headingScaleVariance < 12
                      ? "text-yellow-400"
                      : "text-emerald-400"
                  }
                >
                  {data.emphasisContrastScore}
                </span>
              </div>

              <div className="flex justify-between text-zinc-400">
                <span>CTA visibility score</span>
                <span
                  className={
                    data.ctaVisibilityScore < 40
                      ? "text-red-400"
                      : data.ctaVisibilityScore < 70
                      ? "text-yellow-400"
                      : "text-emerald-400"
                  }
                >
                  {data.ctaVisibilityScore}
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-md border border-zinc-800 bg-zinc-900/40 p-4">
            <div className="text-sm text-zinc-200 mb-2">
              Visual hierarchy assessment
            </div>

            <ul className="space-y-1 text-xs text-zinc-500 list-disc list-inside">
              {data.findings?.map((finding: string, idx: number) => (
                <li key={idx}>{finding}</li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
