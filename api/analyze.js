export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: '不支援的請求方法' });
  }

  const { resumeText, jobDescription } = req.body;

  if (!resumeText || !jobDescription) {
    return res.status(400).json({ message: '缺少履歷或職缺內容' });
  }

  const prompt = `你是一位專業的人資招募顧問。請比對以下「求職者履歷」與「職缺內容」，評估兩者的契合程度。

# 求職者履歷
${resumeText}

# 職缺內容
${jobDescription}

# 評估要求
請根據以下面向進行評估：
1. 技能符合度：履歷中的技能與職缺要求的重疊程度
2. 經驗符合度：工作經驗年資、產業背景是否相符
3. 關鍵字缺漏：職缺中提到但履歷未展現的重要能力

請給出 0-100 的契合度分數，並列出具體理由。理由必須基於履歷和職缺的實際內容，不要憑空推測。`;

  const requestBody = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: 'OBJECT',
        properties: {
          matchScore: { type: 'INTEGER', description: '0-100 的契合度分數' },
          summary: { type: 'STRING', description: '一句話總結契合程度' },
          strengths: {
            type: 'ARRAY',
            items: { type: 'STRING' },
            description: '履歷與職缺相符的具體優勢',
          },
          gaps: {
            type: 'ARRAY',
            items: { type: 'STRING' },
            description: '職缺要求但履歷未展現的能力缺口',
          },
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
      console.error('Gemini API 錯誤:', errText);
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
      console.error('Gemini 回應格式異常:', data);
      return res.status(502).json({ message: 'AI 回應格式異常，請稍後再試' });
    }

    const result = JSON.parse(resultText);
    return res.status(200).json(result);
  } catch (err) {
    console.error('分析失敗:', err);
    return res.status(500).json({ message: '分析過程發生錯誤' });
  }
}
