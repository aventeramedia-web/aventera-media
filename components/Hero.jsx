import BlobBackground from './BlobBackground';
import Globe from './Globe';

const tags = ['Podcasting', 'Launch Videos', 'Clipping'];

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-gradient-to-b from-charcoal to-black pb-20 pt-14 diagonal-cut-b md:pb-28 md:pt-20">
      <BlobBackground tone="dark" />

      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-70"
        style={{
          backgroundImage:
            'radial-gradient(1px 1px at 12% 18%, #fff 100%, transparent 100%),' +
            'radial-gradient(1px 1px at 28% 62%, #fff 100%, transparent 100%),' +
            'radial-gradient(1.5px 1.5px at 44% 24%, #fff 100%, transparent 100%),' +
            'radial-gradient(1px 1px at 66% 12%, #fff 100%, transparent 100%),' +
            'radial-gradient(1px 1px at 82% 40%, #fff 100%, transparent 100%),' +
            'radial-gradient(1.5px 1.5px at 92% 70%, #fff 100%, transparent 100%),' +
            'radial-gradient(1px 1px at 8% 80%, #fff 100%, transparent 100%),' +
            'radial-gradient(1px 1px at 55% 88%, #fff 100%, transparent 100%)',
          backgroundRepeat: 'no-repeat',
        }}
      />

      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 px-6 md:grid-cols-[1.1fr_1fr] md:gap-8 md:px-10">
        <div className="text-center md:text-left">
          <h1 className="font-body text-3xl font-semibold leading-[0.95] tracking-[-0.05em] text-paper sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl">
            <span className="block whitespace-nowrap">Content is your</span>
            <span className="block">front door<span className="text-redBright">.</span></span>
          </h1>

          <p className="mx-auto mt-8 max-w-md text-lg leading-relaxed text-paper/70 md:mx-0">
            From launch to growth and beyond, we turn your story into
            momentum that lasts.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 md:justify-start">
            <a
              href="https://calendly.com/aventeramedia"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-gradient-to-br from-redBright to-wine px-7 py-3.5 text-[15px] font-medium text-paper transition-transform hover:scale-[1.03]"
            >
              Book a call
            </a>
            <a
              href="mailto:hello@aventeramedia.com"
              className="rounded-full border border-paper/20 px-7 py-3.5 text-[15px] font-medium text-paper transition-colors hover:border-paper/60"
            >
              Email Us
            </a>
          </div>

          <ul className="mt-12 flex flex-wrap justify-center gap-3 md:justify-start">
            {tags.map((t) => (
              <li
                key={t}
                className="rounded-full border border-paper/15 px-4 py-2 text-sm text-paper/70"
              >
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex justify-center md:justify-end">
          <Globe size={480} />
        </div>
      </div>
    </section>
  );
}
