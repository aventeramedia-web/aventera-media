import Image from 'next/image';

export default function LogoMark({ size = 'md' }) {
  const dims = size === 'sm' ? 'h-9' : 'h-12';
  const imgW = size === 'sm' ? 132 : 168;

  return (
    <span className={`inline-flex items-center ${dims}`}>
      <Image
        src="/aventera-logo-white.png"
        alt="Aventera Media"
        width={imgW}
        height={Math.round(imgW * 0.26)}
        className="h-full w-auto"
        priority
      />
    </span>
  );
}
