function LockIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <rect
        x="4.5"
        y="10"
        width="13"
        height="9"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M7 10V7C7 4.79 8.79 3 11 3C13.21 3 15 4.79 15 7V10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="11" cy="14.2" r="1.1" fill="currentColor" />
    </svg>
  );
}

export default function Trust() {
  return (
    <section className="border-t border-sand-200 bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="animate-fadeUp rounded-2xl border border-sage-300 bg-sage-100 px-8 py-12 text-center sm:px-14">
          <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-white text-sage-700">
            <LockIcon />
          </span>

          <h2 className="mt-6 font-display text-3xl font-medium tracking-tight text-stone-900 sm:text-4xl">
            Your CV stays yours
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-stone-700">
            Your CV is read directly in your browser and sent only to the AI
            for analysis. We don't store it, and we don't keep a copy. This
            aligns with the expectations of the New Zealand Privacy Act 2020.
          </p>

          <p className="mt-4 text-sm text-stone-600/70">
            No account. No database. Nothing saved.
          </p>
        </div>
      </div>
    </section>
  );
}
