'use client';

import { useState } from 'react';
import LogoMark from './LogoMark';

const links = [
  { href: '#services', label: 'Services' },
  { href: '#work', label: 'Work' },
  { href: '#contact', label: 'Contact' },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-paper/10 bg-gradient-to-b from-charcoal/95 to-charcoal/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3 md:px-10">
        <a href="#top" className="flex items-center gap-2">
          <LogoMark size="sm" />
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[15px] text-paper/80 transition-colors hover:text-redBright"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="https://calendly.com/aventeramedia"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full bg-gradient-to-br from-redBright to-wine px-5 py-2.5 text-[15px] font-medium text-paper transition-transform hover:scale-[1.03] sm:inline-block"
          >
            Book a call
          </a>
          <button
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden"
          >
            <span className={`h-[2px] w-6 bg-paper transition-transform ${open ? 'translate-y-2 rotate-45' : ''}`} />
            <span className={`h-[2px] w-6 bg-paper transition-opacity ${open ? 'opacity-0' : ''}`} />
            <span className={`h-[2px] w-6 bg-paper transition-transform ${open ? '-translate-y-2 -rotate-45' : ''}`} />
          </button>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-paper/10 bg-charcoal px-6 py-4 md:hidden">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-2 py-2.5 text-[15px] text-paper/80 hover:bg-paper/10"
            >
              {l.label}
            </a>
          ))}
          <a
            href="https://calendly.com/aventeramedia"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-full bg-gradient-to-br from-redBright to-wine px-5 py-2.5 text-center text-[15px] font-medium text-paper"
          >
            Book a call
          </a>
        </nav>
      )}
    </header>
  );
}
