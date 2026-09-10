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

            <div className="mt-6 flex items-center gap-4">
              <a
                href="https://www.instagram.com/aventeramedia?stkn=c3Q1YWQ3Nm11dGZ6"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-paper/50 transition-colors hover:text-redBright"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.6" />
                  <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.6" />
                  <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" />
                </svg>
              </a>

              <a
                href="https://www.linkedin.com/company/aventera-media/posts/?feedView=all"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-paper/50 transition-colors hover:text-redBright"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <rect x="2" y="2" width="20" height="20" rx="4" stroke="currentColor" strokeWidth="1.6" />
                  <circle cx="7.2" cy="7.5" r="1.15" fill="currentColor" />
                  <path d="M7.2 10.8V17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  <path d="M11 17v-3.6c0-1.5 1-2.4 2.3-2.4s2.2.9 2.2 2.4V17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  <path d="M11 10.8V17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </a>
            </div>
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
