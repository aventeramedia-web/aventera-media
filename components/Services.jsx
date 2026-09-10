import Image from 'next/image';
import BlobBackground from './BlobBackground';

const services = [
  {
    eyebrow: 'Grow',
    name: 'Podcasting',
    desc: 'We handle end-to-end podcast production and turn every episode into weeks of distributable content.',
    bullets: ['Podcast editing & mixing', 'Multi-platform repurposing', 'Distribution strategy'],
    image: '/work/podcasting.jpg',
  },
  {
    eyebrow: 'Launch',
    name: 'Launch Videos',
    desc: 'We script, storyboard and produce launch films that make founders and products impossible to ignore.',
    bullets: ['Ideation & scripting', 'Storyboard & shotlist', 'Full video production'],
    image: '/work/launch-videos.jpg',
  },
  {
    eyebrow: 'Scale',
    name: 'Clipping',
    desc: 'We cut long-form recordings into sharp, scroll-stopping clips built to grow your following fast.',
    bullets: ['Hook-first editing', 'Caption & sound design', 'Daily-ready output'],
    image: '/work/clipping.jpg',
  },
];

function CardThumb({ eyebrow, image, alt }) {
  return (
    <div className="relative flex h-40 items-end overflow-hidden rounded-xl bg-black">
      <Image
        src={image}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
      <span className="relative rounded-full bg-gradient-to-br from-redBright to-wine px-3 py-1 text-xs font-semibold text-paper">
        {eyebrow}
      </span>
    </div>
  );
}

export default function Services() {
  return (
    <section id="services" className="dot-grid relative overflow-hidden bg-charcoal py-24 md:py-32">
      <BlobBackground tone="dark" />
      <div className="relative z-10 mx-auto max-w-6xl px-6 md:px-10">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="text-sm font-medium uppercase tracking-widest text-redBright">Services</span>
          <h2 className="mt-3 font-body text-5xl font-semibold tracking-[-0.05em] text-paper md:text-6xl">
            What we do
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-paper/65">
            Three ways we help founders, podcasters and experts launch, grow
            and scale their content.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {services.map((s) => (
            <div
              key={s.name}
              className="group flex flex-col rounded-2xl border border-paper/10 bg-gradient-to-b from-[#171514] to-black p-5 transition-colors hover:border-redBright/40"
            >
              <CardThumb eyebrow={s.eyebrow} image={s.image} alt={s.name} />

              <h3 className="mt-6 font-body text-2xl font-semibold tracking-[-0.05em] text-paper">
                {s.name}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-paper/60">
                {s.desc}
              </p>

              <ul className="mt-6 space-y-2.5 border-t border-paper/10 pt-5">
                {s.bullets.map((b) => (
                  <li key={b} className="flex items-center gap-2.5 text-sm text-paper/70">
                    <span className="h-1 w-1 shrink-0 rounded-full bg-redBright" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
