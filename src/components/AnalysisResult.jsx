function ScoreBadge({ score }) {
  const level =
    score >= 75 ? 'sage' : score >= 50 ? 'sand' : 'red';

  const styles = {
    sage: 'bg-sage-100 text-sage-700 border-sage-300',
    sand: 'bg-sand-200 text-stone-700 border-sand-300',
    red: 'bg-red-50 text-red-700 border-red-200',
  };

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium ${styles[level]}`}
    >
      契合度 {score} 分
    </div>
  );
}

export default function AnalysisResult({ data }) {
  if (!data) return null;

  const { matchScore, summary, strengths = [], gaps = [] } = data;

  return (
    <div className="space-y-6 rounded-xl border border-sand-200 bg-white p-6">
      <div className="space-y-2">
        <ScoreBadge score={matchScore} />
        <p className="text-stone-800">{summary}</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <h3 className="mb-2 text-sm font-medium text-sage-700">符合的優勢</h3>
          <ul className="space-y-1.5 text-sm text-stone-700">
            {strengths.map((item, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-sage-500">・</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-2 text-sm font-medium text-stone-700">能力缺口</h3>
          <ul className="space-y-1.5 text-sm text-stone-700">
            {gaps.map((item, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-stone-600">・</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
