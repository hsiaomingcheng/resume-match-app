const faqs = [
  {
    q: 'Is my CV stored anywhere?',
    a: "No. Your CV is processed in your browser and passed to the AI only to generate your analysis. We don't save it or keep any copy on our side.",
  },
  {
    q: 'What file formats are supported?',
    a: "PDF and Word (.docx). Older .doc files aren't supported — save as .docx or PDF first.",
  },
  {
    q: 'How accurate is the match score?',
    a: "The score is an AI-based estimate to guide you, not a guarantee. It's meant to highlight strengths and gaps so you can tailor your CV — treat it as a helpful second opinion, not a final verdict.",
  },
  {
    q: 'Is it free?',
    a: "Yes, it's free to use.",
  },
  {
    q: 'Do I need to create an account?',
    a: 'No sign-up needed. Just upload, paste, and analyse.',
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="border-t border-sand-200 bg-sand-50 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h2 className="animate-fadeUp font-display text-3xl font-medium tracking-tight text-stone-900 sm:text-4xl">
          Questions
        </h2>

        <div className="mt-10 divide-y divide-sand-300">
          {faqs.map((item, i) => (
            <details
              key={item.q}
              className="group animate-fadeUp py-5"
              style={{ animationDelay: `${100 + i * 80}ms` }}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-medium text-stone-900 marker:content-none">
                {item.q}
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  className="shrink-0 text-sage-700 transition-transform duration-200 group-open:rotate-180"
                  aria-hidden="true"
                >
                  <path
                    d="M4.5 7L9 11.5L13.5 7"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </summary>
              <p className="mt-3 max-w-xl text-stone-600">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
