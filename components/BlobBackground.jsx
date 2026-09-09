const palettes = {
  light: [
    { color: '#FF4141', size: 480, top: '-10%', left: '-8%', opacity: 0.16 },
    { color: '#5C0000', size: 420, top: '30%', left: '78%', opacity: 0.12 },
    { color: '#CC0202', size: 360, top: '75%', left: '10%', opacity: 0.1 },
  ],
  dark: [
    { color: '#FF4141', size: 520, top: '-15%', left: '70%', opacity: 0.22 },
    { color: '#CC0202', size: 460, top: '55%', left: '-10%', opacity: 0.2 },
    { color: '#5C0000', size: 380, top: '85%', left: '60%', opacity: 0.25 },
  ],
  red: [
    { color: '#FFFFFF', size: 460, top: '-10%', left: '75%', opacity: 0.14 },
    { color: '#5C0000', size: 420, top: '60%', left: '-8%', opacity: 0.3 },
    { color: '#FF4141', size: 360, top: '80%', left: '55%', opacity: 0.2 },
  ],
};

export default function BlobBackground({ tone = 'light' }) {
  const blobs = palettes[tone] || palettes.light;

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {blobs.map((b, i) => (
        <div
          key={i}
          className="absolute rounded-full blur-3xl"
          style={{
            width: b.size,
            height: b.size,
            top: b.top,
            left: b.left,
            backgroundColor: b.color,
            opacity: b.opacity,
          }}
        />
      ))}
    </div>
  );
}
