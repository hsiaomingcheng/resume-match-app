export default function Navbar({ onStart }) {
  return (
    <header className="sticky top-0 z-50 border-b border-sand-200 bg-sand-50/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-sage-600 text-sand-50">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M3 8.5L6.2 11.5L13 4.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className="font-display text-lg italic tracking-tight text-stone-900">
            CV Match NZ
          </span>
        </div>

        <nav className="hidden items-center gap-8 sm:flex">
          <a
            href="#how-it-works"
            className="text-sm text-stone-600 underline-offset-4 transition-colors hover:text-sage-700 hover:underline"
          >
            How it works
          </a>
          <a
            href="#faq"
            className="text-sm text-stone-600 underline-offset-4 transition-colors hover:text-sage-700 hover:underline"
          >
            FAQ
          </a>
        </nav>

        <button
          onClick={onStart}
          className="rounded-full bg-sage-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-sage-700 sm:px-5"
        >
          Try it free
        </button>
      </div>
    </header>
  );
}
