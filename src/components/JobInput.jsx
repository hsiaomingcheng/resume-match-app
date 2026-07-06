export default function JobInput({ value, onChange }) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-stone-700">
        Paste job description
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={8}
        placeholder="Paste the full job description, including responsibilities and requirements..."
        className="w-full rounded-lg border border-sand-300 bg-white px-4 py-3 text-sm
                   text-stone-800 placeholder:text-stone-600/60
                   focus:border-sage-500 focus:outline-none focus:ring-1 focus:ring-sage-500"
      />
    </div>
  );
}
