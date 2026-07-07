function MockResultCard() {
  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="absolute -inset-4 -z-10 rounded-[2rem] bg-sage-100/70"
      />
      <div className="rounded-2xl border border-sand-200 bg-white p-6 shadow-xl shadow-stone-900/5 sm:rotate-1">
        <div className="mb-5 flex items-center justify-between">
          <span className="inline-flex items-center gap-2 rounded-full border border-sage-300 bg-sage-100 px-4 py-1.5 text-sm font-medium text-sage-700">
            Match score: 82
          </span>
          <span className="text-xs uppercase tracking-wide text-stone-600/60">
            Example
          </span>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <h3 className="mb-2 text-sm font-medium text-sage-700">Strengths</h3>
            <ul className="space-y-1.5 text-sm text-stone-700">
              <li className="flex gap-2">
                <span className="text-sage-500">・</span>
                5 years in digital marketing
              </li>
              <li className="flex gap-2">
                <span className="text-sage-500">・</span>
                Strong stakeholder management
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-2 text-sm font-medium text-stone-700">Gaps</h3>
            <ul className="space-y-1.5 text-sm text-stone-700">
              <li className="flex gap-2">
                <span className="text-stone-600">・</span>
                No SEO tooling experience listed
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Hero({ onStart }) {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-sage-100 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-40 h-80 w-80 rounded-full bg-sand-200 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 pb-20 pt-16 sm:px-6 md:grid-cols-2 md:items-center md:pb-32 md:pt-24">
        <div>
          <h1 className="animate-fadeUp font-display text-4xl font-medium leading-[1.08] tracking-tight text-stone-900 sm:text-5xl lg:text-[3.4rem]">
            Know if your CV matches the job — before you apply
          </h1>

          <p className="mt-6 max-w-md animate-fadeUp text-lg leading-relaxed text-stone-600 [animation-delay:120ms]">
            Upload your CV, paste the job description, and get an instant
            match score with clear reasons. Built for the New Zealand job
            market.
          </p>

          <div className="mt-8 animate-fadeUp [animation-delay:220ms]">
            <button
              onClick={onStart}
              className="inline-flex items-center gap-2 rounded-full bg-sage-600 px-8 py-4 text-base font-medium text-white shadow-sm transition hover:bg-sage-700 hover:shadow-md"
            >
              Analyse my CV free
            </button>
            <p className="mt-3 text-sm text-stone-600/70">
              No sign-up. Your CV stays in your browser.
            </p>
          </div>
        </div>

        <div className="animate-fadeUp [animation-delay:160ms]">
          <MockResultCard />
        </div>
      </div>
    </section>
  );
}
