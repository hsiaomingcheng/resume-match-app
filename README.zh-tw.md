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

## 環境變數

Gemini API Key 從環境變數檔讀取，該檔案**不會**被 Git 追蹤（所有 `.env` 變體都已列於 `.gitignore`），所以你的真實 Key 不會被推上 GitHub。

重要陷阱：執行 `vercel dev` 時，`/api` 底下的 Serverless Function **不會**像 Vite 前端那樣自動讀取 `.env.local`。請採用以下兩種做法之一。

### 做法 A — 快速本機測試，使用 `.env`

在專案根目錄建立 `.env` 檔案（注意是 `.env`，不是 `.env.local`），`vercel dev` 會讀取此檔給 Serverless Function 使用：

```
GEMINI_API_KEY=your_real_key_here
```

接著**重新啟動** `vercel dev`（環境變數變更後一定要重啟才會生效）。

### 做法 B — 推薦：用 `vercel env pull` 從 Vercel 同步

此做法讓本機與正式環境共用同一份設定，不必設定兩次 Key。

1. 到 Vercel 網站的 Settings → Environment Variables 新增 `GEMINI_API_KEY`（記得勾選 **Development** 環境）。
2. 本機拉下來：
   ```bash
   vercel env pull .env.local
   ```
3. 重新啟動 `vercel dev`。

注意事項：
- 變更任何環境變數值後，一定要**重新啟動** `vercel dev`——這是最多人忽略的步驟。
- 絕不要 commit 任何 `.env` 檔案。若曾不小心 commit 過，需先執行 `git rm --cached <檔名>` 再重新 commit。
- 使用做法 B 時，正式環境的 Key 已經設在 Vercel 上，部署時不需額外設定。使用做法 A 時，正式環境仍需另外在 Vercel 設定 `GEMINI_API_KEY`（見下方「部署到 Vercel」）。

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
