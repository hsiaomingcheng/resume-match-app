/**
 * Call /api/analyze to get the resume-job match analysis
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
    throw new Error(errorData.message || 'Analysis failed — please try again later');
  }

  return response.json();
}
