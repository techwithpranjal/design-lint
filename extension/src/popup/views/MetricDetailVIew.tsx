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
              <div className="flex justify-between">
                <span>Average sentence length</span>
                <span>{data.avgSentenceLength} words</span>
              </div>

              <div className="flex justify-between">
                <span>Average paragraph length</span>
                <span>{data.avgParagraphLength} words</span>
              </div>

              <div className="flex justify-between">
                <span>Long paragraphs</span>
                <span>{data.longParagraphs}</span>
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
    </div>
  );
}
