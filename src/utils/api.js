/**
 * 呼叫 /api/analyze，取得履歷與職缺的契合度分析
 * @param {string} resumeText
 * @param {string} jobDescription
 * @returns {Promise<{matchScore: number, summary: string, strengths: string[], gaps: string[]}>}
 */
export async function analyzeResume(resumeText, jobDescription) {
  const response = await fetch('/api/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ resumeText, jobDescription }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || '分析失敗，請稍後再試');
  }

  return response.json();
}
