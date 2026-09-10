import Image from 'next/image';

const logos = [
  { src: '/logos/new-economies.png', alt: 'New Economies', w: 884, h: 120 },
  { src: '/logos/reach-accelerate.png', alt: 'Reach Accelerate', w: 274, h: 120 },
  { src: '/logos/cluely.png', alt: 'Cluely', w: 458, h: 120 },
  { src: '/logos/figuring-out-media.png', alt: 'Figuring Out Media', w: 475, h: 120 },
  { src: '/logos/partner-4.png', alt: 'Partner', w: 737, h: 120 },
];

export default function Marquee() {
  const loop = [...logos, ...logos];

  return (
    <div className="-mt-1 overflow-hidden bg-gradient-to-r from-black via-charcoal to-black py-8">
      <div className="flex w-max animate-[scroll_32s_linear_infinite] items-center gap-16 motion-reduce:animate-none">
        {[...loop, ...loop].map((logo, i) => (
          <span key={i} className="flex h-7 shrink-0 items-center opacity-70 grayscale transition-opacity duration-300 hover:opacity-100 md:h-8">
            <Image
              src={logo.src}
              alt={logo.alt}
              width={logo.w}
              height={logo.h}
              className="h-full w-auto object-contain"
            />
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
