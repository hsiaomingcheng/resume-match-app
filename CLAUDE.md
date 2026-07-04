# CLAUDE.md

This document defines the working conventions for Claude Code in this project. The project currently involves frontend development only; scope is limited accordingly.

## Project Overview

**Resume–Job Match Analysis Website**: Job seekers upload their resume and paste a target job description; AI analyzes how well the two match and explains why.

- Users: job seekers
- Core features (required): resume upload, AI match analysis
- Future features (out of scope for now): skill-gap suggestions, one-click cover letter generation, user login and resume storage

## Tech Stack

| Item | Choice |
|---|---|
| Frontend framework | React + Vite |
| CSS | Tailwind CSS |
| AI model | Gemini (`gemini-flash-latest`), called via a Vercel Serverless Function |
| Resume parsing | `pdf.js` (PDF), `mammoth.js` (.docx) |
| Deployment | Vercel |
| Data storage | None for now; no login and no database |

**Architecture principle**: The Gemini API key must never appear in frontend code or in any browser-visible request. All AI calls are routed through a Serverless Function under `/api`, with the key stored in an environment variable.

## Project Structure

```
resume-match-app/
├── api/
│   └── analyze.js              # Serverless Function that calls the Gemini API
├── src/
│   ├── components/
│   │   ├── ResumeUpload.jsx    # Resume upload + parsing
│   │   ├── JobInput.jsx        # Job description input
│   │   └── AnalysisResult.jsx  # Analysis result display
│   ├── utils/
│   │   ├── parseResume.js      # PDF/Word parsing logic
│   │   └── api.js              # Calls /api/analyze
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── tailwind.config.js
├── package.json
└── README.md
```

When adding features, follow the existing component/utils separation: UI logic goes in `components/`, external communication (file parsing, API calls) goes in `utils/`, and `App.jsx` only wires up the data flow — it should not contain business logic.

## Design Conventions

- Visual style: natural, calm, understated, not flashy
- When building or adjusting any UI (new page, new component, layout changes), you **must use the `frontend-design` skill** and follow its process (brainstorm → define palette/type/layout → self-critique → then write code). Do not fall back on generic templated color schemes or layouts.
- The existing palette is defined in `tailwind.config.js` (`sand`, `stone`, `sage`). Before introducing new colors, check whether an existing scale can be reused, to avoid a fragmented palette.

## Working Style

1. **Work in blocks; do not write everything at once**
   Break each task into small units (e.g., first the component skeleton → then state logic → then styling). Focus on one block at a time to keep changes reviewable.

2. **Ask for confirmation before each execution**
   Before writing a block of code, explain what you are about to do and which files will be affected, and get my confirmation first. Do not run through multiple steps without confirmation.

3. **Self-verify after execution**
   After each change, run your own verification before reporting back, including but not limited to:
   - Confirm the app starts correctly (`npm run dev` or `vercel dev`)
   - Confirm there are no obvious console errors / build errors
   - If logic changed, actually run through the relevant flow once to confirm the behavior is as expected
   If verification fails, investigate and fix it yourself rather than handing back a broken result.

4. **Keep changes small and reversible**
   Limit each change to a single feature or component where possible, to make it easy to track and roll back.

## Bilingual Documentation Sync

This project keeps `CLAUDE.md` and `README.md` in both English and Traditional Chinese:

- `CLAUDE.md` (English) ↔ `CLAUDE.zh-tw.md` (Chinese)
- `README.md` (English) ↔ `README.zh-tw.md` (Chinese)

**Whenever you update one language version, you must sync the corresponding file in the other language**, keeping content, structure, and section order consistent across both. After updating, verify that the two versions actually correspond; never update only one language.

## Out of Scope for Now

- No backend database, no user login
- No internationalization (Traditional Chinese UI only for now)
- No "skill suggestions" or "cover letter generation" features unless explicitly requested
