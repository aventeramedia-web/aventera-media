import LogoMark from './LogoMark';
import BlobBackground from './BlobBackground';

const services = ['Podcasting', 'Launch Videos', 'Clipping'];

export default function Footer() {
  return (
    <footer className="grain relative overflow-hidden bg-gradient-to-b from-charcoal to-black py-16 text-paper/70">
      <BlobBackground tone="dark" />
      <div className="relative z-10 mx-auto max-w-6xl px-6 md:px-10">
        <div className="flex flex-col justify-between gap-12 md:flex-row">
          <div className="max-w-sm">
            <LogoMark size="sm" />
            <p className="mt-5 text-sm leading-relaxed text-paper/50">
              The storytelling engine for startups, founders and VCs.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <div>
              <h4 className="text-sm font-medium text-paper">Services</h4>
              <ul className="mt-4 space-y-2.5">
                {services.map((s) => (
                  <li key={s}>
                    <a href="#services" className="text-sm text-paper/50 hover:text-paper">
                      {s}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-medium text-paper">Connect</h4>
              <ul className="mt-4 space-y-2.5">
                <li>
                  <a href="https://calendly.com/aventeramedia" target="_blank" rel="noopener noreferrer" className="text-sm text-paper/50 hover:text-paper">
                    Book a call
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:contact@aventeramedia.in"
                    className="text-sm text-paper/50 hover:text-paper"
                  >
                    contact@aventeramedia.in
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-paper/10 pt-8 text-xs text-paper/40 sm:flex-row sm:items-center sm:justify-between">
          <span>&copy; {new Date().getFullYear()} Aventera Media</span>
        </div>
      </div>
    </footer>
  );
}
