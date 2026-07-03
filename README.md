# 履歷與職缺契合度分析網站

## 技術棧
- 前端：React + Vite + Tailwind CSS
- AI：Gemini API（透過 Vercel Serverless Function 呼叫，Key 不外洩於前端）
- 部署：Vercel

## 本機開發

```bash
npm install
cp .env.local.example .env.local   # 填入你的 GEMINI_API_KEY
npm i -g vercel                     # 若尚未安裝
vercel dev                          # 同時跑前端 + /api Serverless Function
```

`vercel dev` 才會執行 `/api` 底下的 Serverless Function；純 `npm run dev` 只會跑前端，`/api/analyze` 呼叫不到。

## 專案結構

```
resume-match-app/
├── api/
│   └── analyze.js          # Serverless Function，呼叫 Gemini API
├── src/
│   ├── components/
│   │   ├── ResumeUpload.jsx    # 履歷上傳與解析
│   │   ├── JobInput.jsx        # 職缺內容輸入
│   │   └── AnalysisResult.jsx  # 分析結果顯示
│   ├── utils/
│   │   ├── parseResume.js      # PDF/Word 解析邏輯
│   │   └── api.js              # 呼叫 /api/analyze
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env.local.example
└── package.json
```

## 部署到 Vercel

1. 推上 GitHub
2. Vercel 匯入專案
3. 在 Vercel 專案設定 → Environment Variables 加入 `GEMINI_API_KEY`
4. 部署

## 之後可以加的功能
- 分析並建議求職者該加強哪方面能力
- 一鍵產出專屬該職位的 Cover Letter
- 使用者登入 / 履歷紀錄儲存
