export default function Footer() {
  return (
    <footer className="bg-stone-900 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 text-center sm:flex-row sm:justify-between sm:px-6 sm:text-left">
        <span className="font-display text-lg italic tracking-tight text-sand-50">
          CV Match NZ
        </span>

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:gap-8">
          <nav className="flex items-center gap-6">
            <a
              href="#"
              className="text-sm text-sage-300/80 transition-colors hover:text-sage-300"
            >
              Privacy policy
            </a>
            <a
              href="#"
              className="text-sm text-sage-300/80 transition-colors hover:text-sage-300"
            >
              Terms
            </a>
            <a
              href="#"
              className="text-sm text-sage-300/80 transition-colors hover:text-sage-300"
            >
              Contact
            </a>
          </nav>
          <span className="text-sm text-sand-50/50">© 2026 CV Match NZ</span>
        </div>
      </div>
    </footer>
  );
}
