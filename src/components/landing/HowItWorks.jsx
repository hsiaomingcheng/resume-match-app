const steps = [
  {
    number: '1',
    title: 'Upload your CV',
    text: "PDF or Word — it's read right in your browser.",
  },
  {
    number: '2',
    title: 'Paste the job description',
    text: "Copy the listing for the role you're eyeing.",
  },
  {
    number: '3',
    title: 'Get your match score',
    text: 'See how well you fit, and exactly where the gaps are.',
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="border-t border-sand-200 bg-white py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-xl">
          <h2 className="animate-fadeUp font-display text-3xl font-medium tracking-tight text-stone-900 sm:text-4xl">
            How it works
          </h2>
          <p className="mt-3 animate-fadeUp text-lg text-stone-600 [animation-delay:100ms]">
            Three steps. About a minute.
          </p>
        </div>

        <div className="relative mt-14 grid gap-12 sm:grid-cols-3 sm:gap-8">
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 top-6 hidden border-t border-dashed border-sand-300 sm:block"
          />

          {steps.map((step, i) => (
            <div
              key={step.number}
              className="relative animate-fadeUp"
              style={{ animationDelay: `${180 + i * 120}ms` }}
            >
              <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-sage-300 bg-white font-display text-lg italic text-sage-700">
                {step.number}
              </span>
              <h3 className="mt-5 text-lg font-medium text-stone-900">
                {step.title}
              </h3>
              <p className="mt-2 text-stone-600">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
