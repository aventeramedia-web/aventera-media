import BlobBackground from './BlobBackground';

const slots = [
  { label: 'Podcast trailer', duration: '0:32' },
  { label: 'Launch teaser', duration: '0:58' },
  { label: 'Founder short-form', duration: '0:47' },
];

function PlayTile({ label, duration }) {
  return (
    <div className="group relative flex aspect-video w-[300px] shrink-0 snap-start items-end overflow-hidden rounded-2xl bg-gradient-to-br from-charcoal to-black md:w-[400px]">
      <div
        className="absolute inset-0 opacity-40 transition-opacity duration-300 group-hover:opacity-60"
        style={{
          backgroundImage:
            'repeating-linear-gradient(135deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 2px, transparent 2px, transparent 14px)',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

      <span className="absolute right-3 top-3 rounded-full bg-black/50 px-2 py-1 font-body text-[11px] font-bold text-paper/80">
        {duration}
      </span>

      <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-paper/15 backdrop-blur transition-transform duration-300 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-redBright group-hover:to-wine">
        <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
          <path d="M4 2.5v11l10-5.5-10-5.5Z" fill="#FBFAF7" />
        </svg>
      </span>

      <span className="relative z-10 px-4 pb-4 font-body text-sm font-bold text-paper/90">
        {label}
      </span>
    </div>
  );
}

export default function Work() {
  return (
    <section id="work" className="relative overflow-hidden bg-gradient-to-b from-charcoal to-black py-24 md:py-32">
      <BlobBackground tone="dark" />
      <div className="relative z-10 mx-auto max-w-6xl px-6 md:px-10">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2 className="font-body text-5xl font-semibold tracking-[-0.05em] text-paper md:text-6xl">
            Works
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-paper/65">
            A glimpse of what we created. Your content could be next.
          </p>
        </div>
      </div>

      <div className="relative z-10 mt-2 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 md:mx-auto md:max-w-[1320px] md:flex-wrap md:justify-center md:overflow-visible md:px-10 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {slots.map((s) => (
          <PlayTile key={s.label} label={s.label} duration={s.duration} />
        ))}
        <div className="w-2 shrink-0 md:hidden" />
      </div>
    </section>
  );
}
