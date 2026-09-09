const items = [
  'One recording',
  'A month of content',
  'Every platform',
  'One point of contact',
];

export default function Marquee() {
  const loop = [...items, ...items];

  return (
    <div className="-mt-1 overflow-hidden bg-gradient-to-r from-black via-charcoal to-black py-5">
      <div className="flex w-max animate-[scroll_28s_linear_infinite] gap-10 motion-reduce:animate-none">
        {[...loop, ...loop].map((t, i) => (
          <span
            key={i}
            className="flex items-center gap-10 font-display text-2xl font-extrabold tracking-tight2 text-paper/90 md:text-3xl"
          >
            {t}
            <span className="text-red">&bull;</span>
          </span>
        ))}
      </div>
      <style>{`
        @keyframes scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
