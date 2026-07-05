# Resume–Job Match Analysis Website

## Tech Stack
- Frontend: React + Vite + Tailwind CSS
- AI: Gemini API (called via a Vercel Serverless Function so the key is never exposed to the frontend)
- Deployment: Vercel

## Local Development

```bash
npm install
cp .env.local.example .env.local   # fill in your GEMINI_API_KEY
npm i -g vercel                     # if not already installed
vercel dev                          # runs the frontend + /api Serverless Function together
```

Only `vercel dev` executes the Serverless Function under `/api`; plain `npm run dev` runs the frontend only, and `/api/analyze` will not be reachable.

## Environment Variables

The Gemini API key is read from an env file that is **not** tracked by Git (all `.env` variants are listed in `.gitignore`), so your real key never ends up on GitHub.

Important nuance: when you run `vercel dev`, the Serverless Function under `/api` does **not** automatically read `.env.local` the way the Vite frontend does. Use one of the two approaches below.

### Option A — quick local testing with `.env`

Create a `.env` file in the project root (note: `.env`, not `.env.local`), which `vercel dev` reads for the Serverless Function:

```
GEMINI_API_KEY=your_real_key_here
```

Then restart `vercel dev` (env changes only take effect after a restart).

### Option B — recommended: sync from Vercel with `vercel env pull`

This keeps local and production using the same configuration, so you don't have to set the key twice.

1. In the Vercel dashboard, go to Settings → Environment Variables and add `GEMINI_API_KEY` (make sure the **Development** environment is checked).
2. Pull it down locally:
   ```bash
   vercel env pull .env.local
   ```
3. Restart `vercel dev`.

Notes:
- After changing any env value, always **restart** `vercel dev` — this is the most commonly missed step.
- Never commit any `.env` file. If one was ever committed by accident, run `git rm --cached <file>` before committing again.
- With Option B, the production key is already set on Vercel, so deployment needs no extra setup. With Option A, you must still set `GEMINI_API_KEY` separately in Vercel for production (see "Deploying to Vercel" below).

## Project Structure

```
resume-match-app/
├── api/
│   └── analyze.js          # Serverless Function that calls the Gemini API
├── src/
│   ├── components/
│   │   ├── ResumeUpload.jsx    # Resume upload and parsing
│   │   ├── JobInput.jsx        # Job description input
│   │   └── AnalysisResult.jsx  # Analysis result display
│   ├── utils/
│   │   ├── parseResume.js      # PDF/Word parsing logic
│   │   └── api.js              # Calls /api/analyze
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env.local.example
└── package.json
```

## Deploying to Vercel

1. Push to GitHub
2. Import the project in Vercel
3. Add `GEMINI_API_KEY` under the project's Settings → Environment Variables
4. Deploy

## Future Features
- Analyze and suggest which skills the applicant should strengthen
- One-click cover letter generation tailored to the role
- User login / resume history storage
