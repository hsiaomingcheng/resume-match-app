function TargetIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="10" cy="10" r="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="10" cy="10" r="1" fill="currentColor" />
    </svg>
  );
}

function ListCheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M3.5 5.5L5 7L8 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.5 12.5L5 14L8 11"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.5 5.5H16.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M10.5 12.5H16.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function GapAlertIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M10 3L17.5 16H2.5L10 3Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M10 8.5V11.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="10" cy="13.8" r="0.9" fill="currentColor" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M10 17.5C10 17.5 15.5 12.6 15.5 8.25C15.5 5.21 13.04 2.5 10 2.5C6.96 2.5 4.5 5.21 4.5 8.25C4.5 12.6 10 17.5 10 17.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="8.25" r="2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

const features = [
  {
    icon: TargetIcon,
    title: 'A clear match score',
    text: "One number, 0–100, so you know at a glance whether it's worth applying.",
  },
  {
    icon: ListCheckIcon,
    title: 'Your strengths, spelt out',
    text: 'See which of your skills and experience line up with what the role wants.',
  },
  {
    icon: GapAlertIcon,
    title: 'The gaps to close',
    text: "Find out what the job asks for that your CV doesn't yet show — so you can fix it before applying.",
  },
  {
    icon: MapPinIcon,
    title: 'Made for NZ job seekers',
    text: 'Designed around the New Zealand market, not a generic overseas template.',
  },
];

export default function Features() {
  return (
    <section className="border-t border-sand-200 bg-sand-100 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="animate-fadeUp font-display text-3xl font-medium tracking-tight text-stone-900 sm:text-4xl">
          What you'll get
        </h2>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {features.map(({ icon: Icon, title, text }, i) => (
            <div
              key={title}
              className="animate-fadeUp rounded-xl border border-sand-300 bg-white p-6"
              style={{ animationDelay: `${120 + i * 100}ms` }}
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-md bg-sage-100 text-sage-700">
                <Icon />
              </span>
              <h3 className="mt-5 text-lg font-medium text-stone-900">
                {title}
              </h3>
              <p className="mt-2 text-stone-600">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
