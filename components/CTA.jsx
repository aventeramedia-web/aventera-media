import BlobBackground from './BlobBackground';

export default function CTA() {
  return (
    <section id="contact" className="grain relative overflow-hidden bg-gradient-to-b from-charcoal to-ink py-24 text-paper md:py-32">
      <BlobBackground tone="dark" />
      <div className="relative z-10 mx-auto max-w-6xl px-6 text-center md:px-10">
        <h2 className="mx-auto max-w-2xl font-body text-5xl font-semibold leading-[1.03] tracking-[-0.05em] md:text-7xl">
          Let’s make the next recording count.
        </h2>
        <p className="mx-auto mt-6 max-w-md text-lg text-paper/60">
          Book a 30-minute call. We’ll look at what you’ve got and tell
          you exactly where we’d start.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://calendly.com/aventeramedia"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-gradient-to-br from-redBright to-wine px-8 py-4 text-[15px] font-medium text-paper transition-transform hover:scale-[1.03]"
          >
            Book a call
          </a>
        </div>
      </div>
    </section>
  );
}
