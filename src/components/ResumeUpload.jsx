import { useState } from 'react';
import { parseResumeFile } from '../utils/parseResume';

export default function ResumeUpload({ onTextExtracted }) {
  const [fileName, setFileName] = useState('');
  const [parsing, setParsing] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setError('');
    setParsing(true);

    try {
      const text = await parseResumeFile(file);
      onTextExtracted(text);
    } catch (err) {
      setError(err.message);
      onTextExtracted('');
    } finally {
      setParsing(false);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-stone-700">
        Upload resume (.pdf or .docx)
      </label>
      <label
        className="flex cursor-pointer items-center justify-center rounded-lg border border-dashed
                   border-sand-300 bg-sand-100 px-4 py-8 text-sm text-stone-600
                   transition hover:border-sage-500 hover:bg-sand-200"
      >
        <input
          type="file"
          accept=".pdf,.docx"
          className="hidden"
          onChange={handleFileChange}
        />
        {parsing ? 'Parsing...' : fileName || 'Click to choose a file, or drag it here'}
      </label>
      {error && <p className="text-sm text-red-700">{error}</p>}
    </div>
  );
}
