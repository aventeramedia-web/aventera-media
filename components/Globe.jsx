'use client';

import { useEffect, useRef } from 'react';

// Rough continent silhouettes approximated as overlapping ellipses in
// lat/lon space. Not a precise atlas \u2014 a stylized approximation so the
// dot field reads as "world map" rather than uniform noise, in the same
// spirit as classic dotted-globe hero graphics.
const LAND_REGIONS = [
  // North America
  { lat: 50, lon: -105, rlat: 22, rlon: 30 },
  { lat: 62, lon: -155, rlat: 12, rlon: 18 }, // Alaska
  { lat: 20, lon: -92, rlat: 9, rlon: 10 },   // Central America
  { lat: 72, lon: -42, rlat: 11, rlon: 14 },  // Greenland
  // South America
  { lat: -8, lon: -62, rlat: 20, rlon: 16 },
  { lat: -32, lon: -64, rlat: 14, rlon: 12 },
  // Europe
  { lat: 54, lon: 15, rlat: 13, rlon: 20 },
  { lat: 62, lon: 20, rlat: 10, rlon: 14 }, // Scandinavia
  // Africa
  { lat: 15, lon: 18, rlat: 20, rlon: 18 },
  { lat: -12, lon: 22, rlat: 20, rlon: 16 },
  { lat: -30, lon: 24, rlat: 10, rlon: 12 },
  // Asia
  { lat: 55, lon: 90, rlat: 20, rlon: 45 },
  { lat: 30, lon: 100, rlat: 16, rlon: 22 },
  { lat: 18, lon: 78, rlat: 12, rlon: 12 }, // India
  { lat: 35, lon: 45, rlat: 12, rlon: 15 }, // Middle east
  { lat: 60, lon: 130, rlat: 14, rlon: 30 }, // Siberia east
  { lat: 8, lon: 112, rlat: 10, rlon: 18 },  // SE Asia
  // Australia
  { lat: -25, lon: 134, rlat: 11, rlon: 16 },
  // Antarctica (thin, subtle)
  { lat: -82, lon: 0, rlat: 8, rlon: 180 },
];

function lonDiff(a, b) {
  let d = a - b;
  while (d > 180) d -= 360;
  while (d < -180) d += 360;
  return d;
}

function isLand(lat, lon) {
  for (let i = 0; i < LAND_REGIONS.length; i++) {
    const r = LAND_REGIONS[i];
    const dlat = lat - r.lat;
    const dlon = lonDiff(lon, r.lon);
    if ((dlat * dlat) / (r.rlat * r.rlat) + (dlon * dlon) / (r.rlon * r.rlon) <= 1) {
      return true;
    }
  }
  return false;
}

function buildLandPoints() {
  const pts = [];
  const latStep = 3.2;
  for (let lat = -84; lat <= 84; lat += latStep) {
    // fewer samples near the poles to keep density visually even
    const lonStep = 3.4 / Math.max(0.18, Math.cos((lat * Math.PI) / 180));
    for (let lon = -180; lon < 180; lon += lonStep) {
      const jLat = lat + (Math.random() - 0.5) * latStep * 0.6;
      const jLon = lon + (Math.random() - 0.5) * lonStep * 0.6;
      if (!isLand(jLat, jLon)) continue;
      const latR = (jLat * Math.PI) / 180;
      const lonR = (jLon * Math.PI) / 180;
      pts.push([Math.cos(latR) * Math.cos(lonR), Math.sin(latR), Math.cos(latR) * Math.sin(lonR)]);
    }
  }
  return pts;
}

function latLonToVec(latDeg, lonDeg) {
  const lat = (latDeg * Math.PI) / 180;
  const lon = (lonDeg * Math.PI) / 180;
  return [Math.cos(lat) * Math.cos(lon), Math.sin(lat), Math.cos(lat) * Math.sin(lon)];
}

function slerp(a, b, t) {
  const dot = Math.max(-1, Math.min(1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2]));
  const omega = Math.acos(dot);
  if (omega < 1e-6) return a;
  const sinOmega = Math.sin(omega);
  const wa = Math.sin((1 - t) * omega) / sinOmega;
  const wb = Math.sin(t * omega) / sinOmega;
  return [
    a[0] * wa + b[0] * wb,
    a[1] * wa + b[1] * wb,
    a[2] * wa + b[2] * wb,
  ];
}

const ARC_DEFS = [
  { from: [25, -50], to: [55, 40], dur: 3.6 },
  { from: [-15, -110], to: [35, 90], dur: 4.4 },
  { from: [-35, -10], to: [30, 130], dur: 4.0 },
];

const SPIKE_LATLON = [
  [40, -70], [55, -20], [20, 20], [48, 60], [10, -140], [-20, 110], [60, 150],
];

function normalize(v) {
  const len = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
  return [v[0] / len, v[1] / len, v[2] / len];
}

const LIGHT = normalize([-0.5, 0.55, 0.75]);

function rotate(p, rx, ry) {
  let x = p[0] * Math.cos(ry) + p[2] * Math.sin(ry);
  let z = -p[0] * Math.sin(ry) + p[2] * Math.cos(ry);
  let y = p[1];
  const y2 = y * Math.cos(rx) - z * Math.sin(rx);
  const z2 = y * Math.sin(rx) + z * Math.cos(rx);
  return [x, y2, z2];
}

export default function Globe({ size = 480 }) {
  const canvasRef = useRef(null);
  const dragRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const dragEl = dragRef.current;
    if (!canvas || !dragEl) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    const points = buildLandPoints();
    const cx = size / 2;
    const cy = size / 2;
    const R = size * 0.42;

    let rotX = -0.12;
    let rotY = 0;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    const idleSpeed = 0.00045; // very slow constant drift
    let frame;

    const onPointerDown = (e) => {
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      dragEl.setPointerCapture(e.pointerId);
    };
    const onPointerMove = (e) => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
      rotY += dx * 0.008;
      rotX = Math.max(-1.4, Math.min(1.4, rotX - dy * 0.008));
    };
    const onPointerUp = () => {
      dragging = false;
    };

    let lastScrollY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const dy = y - lastScrollY;
      lastScrollY = y;
      rotY += dy * 0.0025;
    };

    dragEl.addEventListener('pointerdown', onPointerDown);
    dragEl.addEventListener('pointermove', onPointerMove);
    dragEl.addEventListener('pointerup', onPointerUp);
    dragEl.addEventListener('pointerleave', onPointerUp);
    window.addEventListener('scroll', onScroll, { passive: true });

    const start = performance.now();

    const draw = () => {
      rotY += idleSpeed; // always spins, drag adds on top of this

      ctx.clearRect(0, 0, size, size);

      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      const base = ctx.createRadialGradient(cx - R * 0.3, cy - R * 0.3, R * 0.1, cx, cy, R);
      base.addColorStop(0, '#2c2c2c');
      base.addColorStop(0.55, '#141414');
      base.addColorStop(1, '#000000');
      ctx.fillStyle = base;
      ctx.fill();

      for (let i = 0; i < points.length; i++) {
        const p = rotate(points[i], rotX, rotY);
        if (p[2] <= 0.02) continue;
        const sx = cx + p[0] * R;
        const sy = cy - p[1] * R;
        const brightness = Math.max(0, p[0] * LIGHT[0] + p[1] * LIGHT[1] + p[2] * LIGHT[2]);
        const edgeFade = Math.min(1, p[2] * 3.2);
        const rr = Math.round(40 + brightness * 200);
        const gg = Math.round(12 + brightness * 150);
        const bb = Math.round(12 + brightness * 150);
        const alpha = (0.3 + brightness * 0.7) * edgeFade;
        const dotR = 0.85 + p[2] * 1.0;
        ctx.beginPath();
        ctx.arc(sx, sy, dotR, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rr},${gg},${bb},${alpha})`;
        ctx.fill();
      }

      SPIKE_LATLON.forEach(([lat, lon]) => {
        const base3 = latLonToVec(lat, lon);
        const outer3 = [base3[0] * 1.14, base3[1] * 1.14, base3[2] * 1.14];
        const pb = rotate(base3, rotX, rotY);
        const po = rotate(outer3, rotX, rotY);
        if (pb[2] <= 0.05) return;
        const bx = cx + pb[0] * R, by = cy - pb[1] * R;
        const ox = cx + po[0] * R, oy = cy - po[1] * R;
        const grad = ctx.createLinearGradient(bx, by, ox, oy);
        grad.addColorStop(0, 'rgba(255,65,65,0)');
        grad.addColorStop(1, 'rgba(255,220,220,0.85)');
        ctx.beginPath();
        ctx.moveTo(bx, by);
        ctx.lineTo(ox, oy);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.4;
        ctx.stroke();
      });

      const now = (performance.now() - start) / 1000;
      ARC_DEFS.forEach((arc) => {
        const v0 = latLonToVec(arc.from[0], arc.from[1]);
        const v1 = latLonToVec(arc.to[0], arc.to[1]);
        const steps = 48;
        ctx.beginPath();
        let penDown = false;
        for (let s = 0; s <= steps; s++) {
          const t = s / steps;
          const v = slerp(v0, v1, t);
          const lift = 1 + Math.sin(t * Math.PI) * 0.18;
          const vLifted = [v[0] * lift, v[1] * lift, v[2] * lift];
          const p = rotate(vLifted, rotX, rotY);
          if (p[2] <= 0.02) {
            penDown = false;
            continue;
          }
          const sx = cx + p[0] * R;
          const sy = cy - p[1] * R;
          if (!penDown) {
            ctx.moveTo(sx, sy);
            penDown = true;
          } else {
            ctx.lineTo(sx, sy);
          }
        }
        ctx.strokeStyle = 'rgba(255,120,120,0.6)';
        ctx.lineWidth = 1.1;
        ctx.stroke();

        [v0, v1].forEach((v) => {
          const p = rotate(v, rotX, rotY);
          if (p[2] <= 0.02) return;
          const sx = cx + p[0] * R;
          const sy = cy - p[1] * R;
          ctx.beginPath();
          ctx.arc(sx, sy, 2.6, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255,178,178,0.9)';
          ctx.fill();
        });

        const t = (now % arc.dur) / arc.dur;
        const vP = slerp(v0, v1, t);
        const lift = 1 + Math.sin(t * Math.PI) * 0.18;
        const pPulse = rotate([vP[0] * lift, vP[1] * lift, vP[2] * lift], rotX, rotY);
        if (pPulse[2] > 0.02) {
          const sx = cx + pPulse[0] * R;
          const sy = cy - pPulse[1] * R;
          ctx.beginPath();
          ctx.arc(sx, sy, 3.2, 0, Math.PI * 2);
          ctx.fillStyle = '#FFD6D6';
          ctx.fill();
        }
      });

      frame = requestAnimationFrame(draw);
    };

    frame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frame);
      dragEl.removeEventListener('pointerdown', onPointerDown);
      dragEl.removeEventListener('pointermove', onPointerMove);
      dragEl.removeEventListener('pointerup', onPointerUp);
      dragEl.removeEventListener('pointerleave', onPointerUp);
      window.removeEventListener('scroll', onScroll);
    };
  }, [size]);

  return (
    <div className="relative mx-auto" style={{ width: size, height: size }}>
      <div
        className="pointer-events-none absolute inset-[-8%] rounded-full blur-2xl"
        style={{
          background:
            'radial-gradient(circle at 50% 45%, rgba(255,80,80,0.4) 0%, rgba(92,0,0,0.28) 45%, transparent 72%)',
        }}
      />
      <canvas
        ref={canvasRef}
        style={{ width: size, height: size }}
        className="relative"
      />
      <div
        ref={dragRef}
        className="absolute inset-0 cursor-grab touch-none rounded-full active:cursor-grabbing"
      />
    </div>
  );
}
