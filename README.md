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
