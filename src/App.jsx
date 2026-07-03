import { useState } from 'react';
import ResumeUpload from './components/ResumeUpload';
import JobInput from './components/JobInput';
import AnalysisResult from './components/AnalysisResult';
import { analyzeResume } from './utils/api';

export default function App() {
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const canAnalyze = resumeText.trim() && jobDescription.trim() && !loading;

  const handleAnalyze = async () => {
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const data = await analyzeResume(resumeText, jobDescription);
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-sand-50">
      <div className="mx-auto max-w-3xl px-4 py-12">
        <header className="mb-10">
          <h1 className="text-2xl font-medium text-stone-800">
            履歷與職缺契合度分析
          </h1>
          <p className="mt-1 text-sm text-stone-600">
            上傳你的履歷，貼上屬意的職缺內容，讓 AI 幫你分析契合程度
          </p>
        </header>

        <div className="space-y-6">
          <ResumeUpload onTextExtracted={setResumeText} />
          <JobInput value={jobDescription} onChange={setJobDescription} />

          <button
            onClick={handleAnalyze}
            disabled={!canAnalyze}
            className="w-full rounded-lg bg-sage-600 px-6 py-3 text-sm font-medium text-white
                       transition hover:bg-sage-700
                       disabled:cursor-not-allowed disabled:bg-sand-300 disabled:text-stone-600"
          >
            {loading ? '分析中...' : '開始分析'}
          </button>

          {error && (
            <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </p>
          )}

          <AnalysisResult data={result} />
        </div>
      </div>
    </div>
  );
}
