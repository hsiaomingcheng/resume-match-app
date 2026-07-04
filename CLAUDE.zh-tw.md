# CLAUDE.md

本檔案為 Claude Code 在此專案中工作時的規範文件。專案目前僅涉及前端開發，範圍以此為限。

## 專案簡介

**職缺與個人履歷契合度網站**：求職者上傳履歷、貼上屬意職缺內容，由 AI 分析兩者契合程度並給出原因。

- 使用者：求職者
- 核心功能（必要）：上傳履歷、AI 比對契合度
- 之後再加（現階段不做）：能力加強建議、一鍵產出 Cover Letter、會員登入與履歷儲存

## 技術棧

| 項目 | 選擇 |
|---|---|
| 前端框架 | React + Vite |
| CSS | Tailwind CSS |
| AI 模型 | Gemini（`gemini-flash-latest`），透過 Vercel Serverless Function 呼叫 |
| 履歷解析 | `pdf.js`（PDF）、`mammoth.js`（.docx） |
| 部署 | Vercel |
| 資料儲存 | 現階段無，不做登入與資料庫 |

**架構原則**：Gemini API Key 絕不可出現在前端程式碼或瀏覽器可見的請求中。所有 AI 呼叫一律經由 `/api` 底下的 Serverless Function 轉發，Key 存放於環境變數。

## 專案結構

```
resume-match-app/
├── api/
│   └── analyze.js              # Serverless Function，呼叫 Gemini API
├── src/
│   ├── components/
│   │   ├── ResumeUpload.jsx    # 履歷上傳 + 解析
│   │   ├── JobInput.jsx        # 職缺內容輸入
│   │   └── AnalysisResult.jsx  # 分析結果顯示
│   ├── utils/
│   │   ├── parseResume.js      # PDF/Word 解析邏輯
│   │   └── api.js              # 呼叫 /api/analyze
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── tailwind.config.js
├── package.json
└── README.md
```

新增功能時，依循既有的元件/utils 拆分方式：UI 邏輯放 `components/`，與外部溝通（解析檔案、呼叫 API）放 `utils/`，`App.jsx` 只負責串接資料流，不寫商業邏輯。

## 設計規範

- 視覺風格：自然、沉穩、不突出、不花俏
- 開發或調整任何 UI 畫面（新頁面、新元件、版面調整）時，**必須使用 `frontend-design` skill**，依其流程（brainstorm → 訂色票/字體/版面 → 自我檢視 → 才動手寫 code）進行，不要直接套用制式的樣板配色或版面
- 既有色票定義於 `tailwind.config.js`（`sand` 米沙、`stone` 灰褐、`sage` 灰綠），新增顏色前先確認是否能沿用既有色階，避免色調破碎

## 工作方式

1. **分區塊執行，不要一次寫完全部**
   每個任務拆成小單元進行（例如：先做元件的骨架 → 再做狀態邏輯 → 再做樣式），一次只專注一個區塊，避免大範圍變更難以檢查。

2. **每次執行前先詢問確認**
   在開始寫一個區塊的程式碼之前，先說明「接下來要做什麼、會動哪些檔案」，取得我的確認後才動手。不要未經確認就連續執行多個步驟。

3. **執行後自行驗證**
   每次修改完成後，自行跑過驗證再回報結果，包含但不限於：
   - 確認程式能正常啟動（`npm run dev` 或 `vercel dev`）
   - 確認沒有明顯的 console error / build error
   - 若有邏輯變更，實際操作一次相關流程確認行為符合預期
   驗證沒過的話，先自行排查修正，而不是直接把有問題的結果丟回來。

4. **變更範圍要小且可回溯**
   單次改動盡量限定在單一功能或單一元件內，方便追蹤與回滾。

## 雙語文件同步

本專案的 `CLAUDE.md` 與 `README.md` 維持英文與繁體中文兩個版本：

- `CLAUDE.md`（英文）↔ `CLAUDE.zh-tw.md`（中文）
- `README.md`（英文）↔ `README.zh-tw.md`（中文）

**每當更新任一語言版本時，必須同步更新另一語言的對應檔案**，確保兩個版本的內容、結構、章節順序一致。完成後需檢查兩個版本是否確實對應，不可只更新其中一種語言。

## 目前不做的事

- 不加後端資料庫、不做使用者登入
- 不需要考慮多國語系（目前僅繁體中文介面）
- 不做「能力建議」「Cover Letter 產出」等後續功能，除非明確要求
