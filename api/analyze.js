export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Unsupported request method' });
  }

  const { resumeText, jobDescription } = req.body;

  if (!resumeText || !jobDescription) {
    return res.status(400).json({ message: 'Missing CV or job description' });
  }

  const prompt = `You are a professional HR recruitment consultant. Compare the following "Candidate CV" with the "Job Description" and evaluate how well they match.

# Candidate CV
${resumeText}

# Job Description
${jobDescription}

# Evaluation Requirements
Perform a point-by-point comparison across the following dimensions:
1. Skill match: overlap between the candidate's skills and the job's requirements
2. Experience match: whether years of experience and industry background align
3. Keyword gaps: important capabilities mentioned in the job description but not demonstrated in the CV

After completing the above point-by-point analysis, refer to the score bands below and select the score that best matches your analysis. Do not score by gut feeling:
- 90-100: Highly matched — core skills and experience almost fully meet the job requirements
- 75-89: Well matched — most requirements are met, only a few items need improvement
- 60-74: Moderately matched — some requirements are met, but with clear capability gaps
- 40-59: Weakly matched — only a few items match
- 0-39: Poorly matched — the CV clearly does not align with the job's direction

Provide a match score from 0-100 and list specific reasons. The reasons must be based on the actual content of the CV and job description, not speculation, and the score must be consistent with the score band definitions and your point-by-point analysis.`;

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
            description: 'Specific strengths where the CV matches the job',
          },
          gaps: {
            type: 'ARRAY',
            items: { type: 'STRING' },
            description: 'Capability gaps required by the job but not shown in the CV',
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
      return res.status(502).json({ message: 'The AI analysis service is temporarily unavailable' });
    }

    const data = await response.json();

    if (data.candidates?.[0]?.finishReason === 'SAFETY') {
      return res
        .status(422)
        .json({ message: 'The content may include inappropriate material — please check your CV or job description' });
    }

    const resultText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!resultText) {
      console.error('Gemini response format invalid:', data);
      return res.status(502).json({ message: 'The AI response format was invalid — please try again later' });
    }

    const result = JSON.parse(resultText);
    return res.status(200).json(result);
  } catch (err) {
    console.error('Analysis failed:', err);
    return res.status(500).json({ message: 'An error occurred during analysis' });
  }
}
