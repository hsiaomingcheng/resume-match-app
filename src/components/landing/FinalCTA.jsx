export default function FinalCTA({ onStart }) {
  return (
    <section className="bg-sage-700 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <h2 className="animate-fadeUp font-display text-3xl font-medium tracking-tight text-sand-50 sm:text-4xl">
          Ready to see your match?
        </h2>
        <p className="mt-4 animate-fadeUp text-lg text-sage-100/80 [animation-delay:100ms]">
          Upload your CV and find out in under a minute.
        </p>
        <button
          onClick={onStart}
          className="mt-8 animate-fadeUp rounded-full bg-sand-50 px-8 py-4 text-base font-medium text-sage-700 shadow-sm transition hover:bg-white hover:shadow-md [animation-delay:200ms]"
        >
          Analyse my CV free
        </button>
      </div>
    </section>
  );
}
