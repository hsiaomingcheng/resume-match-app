export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: '不支援的請求方法' });
  }

  const { resumeText, jobDescription } = req.body;

  if (!resumeText || !jobDescription) {
    return res.status(400).json({ message: '缺少履歷或職缺內容' });
  }

  const prompt = `You are a professional HR recruitment consultant. Compare the following "Candidate Resume" with the "Job Description" and evaluate how well they match.

# Candidate Resume
${resumeText}

# Job Description
${jobDescription}

# Evaluation Requirements
Perform a point-by-point comparison across the following dimensions:
1. Skill match: overlap between the candidate's skills and the job's requirements
2. Experience match: whether years of experience and industry background align
3. Keyword gaps: important capabilities mentioned in the job description but not demonstrated in the resume

After completing the above point-by-point analysis, refer to the score bands below and select the score that best matches your analysis. Do not score by gut feeling:
- 90-100: Highly matched — core skills and experience almost fully meet the job requirements
- 75-89: Well matched — most requirements are met, only a few items need improvement
- 60-74: Moderately matched — some requirements are met, but with clear capability gaps
- 40-59: Weakly matched — only a few items match
- 0-39: Poorly matched — the resume clearly does not align with the job's direction

Provide a match score from 0-100 and list specific reasons. The reasons must be based on the actual content of the resume and job description, not speculation, and the score must be consistent with the score band definitions and your point-by-point analysis.`;

  const requestBody = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: {
      temperature: 0.2,        // Explicitly set low randomness for stable, reproducible results
      responseMimeType: 'application/json',
      responseSchema: {
        type: 'OBJECT',
        properties: {
          strengths: {
            type: 'ARRAY',
            items: { type: 'STRING' },
            description: 'Specific strengths where the resume matches the job',
          },
          gaps: {
            type: 'ARRAY',
            items: { type: 'STRING' },
            description: 'Capability gaps required by the job but not shown in the resume',
          },
          matchScore: { type: 'INTEGER', description: 'Match score from 0-100' },
          summary: { type: 'STRING', description: 'One-sentence summary of the match level' },
        },
        required: ['matchScore', 'summary', 'strengths', 'gaps'],
      },
    },
  };

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error('Gemini API error:', errText);
      return res.status(502).json({ message: 'AI 分析服務暫時無法使用' });
    }

    const data = await response.json();

    if (data.candidates?.[0]?.finishReason === 'SAFETY') {
      return res
        .status(422)
        .json({ message: '內容可能包含不適當內容，請確認履歷或職缺描述' });
    }

    const resultText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!resultText) {
      console.error('Gemini response format invalid:', data);
      return res.status(502).json({ message: 'AI 回應格式異常，請稍後再試' });
    }

    const result = JSON.parse(resultText);
    return res.status(200).json(result);
  } catch (err) {
    console.error('Analysis failed:', err);
    return res.status(500).json({ message: '分析過程發生錯誤' });
  }
}
