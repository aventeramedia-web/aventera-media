# Aventera Media

Marketing site for Aventera Media, built with Next.js 14 (App Router) and Tailwind CSS.

## Run it locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Before you launch, swap these placeholders

- **Booking link / email** — `#contact` currently mails `hello@aventeramedia.com`.
  Replace with your real inbox, or swap the two "Book a call" links
  (`components/Hero.jsx`, `components/CTA.jsx`) for a Calendly/scheduling link.
- **Work section** (`components/Work.jsx`) — the four tiles are empty slots
  labelled by content type. Swap in real thumbnails or video from your own
  client work.
- **Stats** (`components/Stats.jsx`) — currently capacity/turnaround claims
  (15+ assets, 24–48h, etc.), not performance numbers. Update if your real
  turnaround times differ, or add real results once you have client data to
  back them up.
- **Logo files** — `public/aventera-logo-white.png` is your transparent
  wordmark, used inside a red rounded chip (`components/LogoMark.jsx`) so it
  reads on any background. If you get a solid dark/black version of the
  logo later, you can drop the red chip and use that directly.

## Structure

- `app/layout.js` — fonts (Archivo for display, Inter for body) and page metadata
- `app/page.js` — assembles all sections in order
- `components/` — one file per section (Header, Hero, Marquee, Services, Process, Stats, Work, Audience, CTA, Footer)
- `tailwind.config.js` — brand tokens: `ink`, `paper`, `red`, `charcoal`, `stone`

## Deploy

Push to GitHub and import the repo at [vercel.com/new](https://vercel.com/new) — zero config needed.
