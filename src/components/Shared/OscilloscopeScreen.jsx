import React, { useRef, useEffect, useState } from 'react';

/**
 * OscilloscopeScreen
 * 1970s Conar-style recessed Cathode Ray Tube (CRT) vector wave generator.
 * Supports: 'sine', 'lissajous', 'sawtooth', 'radar', 'matrix', and 'led'.
 * Features:
 * - Recessed dark chassis with intense inner bevels and shadows
 * - Reticle graticule etched grid with center crosshair graduation ticks
 * - Phosphor CRT glow matching accent color
 * - Interactive hover speed boost (scales animation speed up dynamically)
 */
export const OscilloscopeScreen = ({
  waveType = 'sine',
  accentColor = '#38EF7D',
  power = true,
  frequency = 1,
  amplitude = 1,
  height = 145,
  showGraticule = true,
  className = '',
}) => {
  const canvasRef = useRef(null);
  const screenRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 300, height: height - 30 });
  const [isHovered, setIsHovered] = useState(false);

  // Measure screen inner dimensions without causing feedback loop
  useEffect(() => {
    const screenEl = screenRef.current;
    if (!screenEl) return;

    const updateSize = () => {
      const w = Math.floor(screenEl.clientWidth);
      const h = Math.floor(screenEl.clientHeight);
      if (w > 0 && h > 0) {
        setDimensions((prev) => {
          if (prev.width === w && prev.height === h) return prev;
          return { width: w, height: h };
        });
      }
    };

    updateSize();

    const observer = new ResizeObserver(() => {
      updateSize();
    });

    observer.observe(screenEl);
    return () => observer.disconnect();
  }, [height]);

  // Main CRT Vector Beam Rendering Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let phase = 0;
    let sweepAngle = 0;

    // Matrix particle drops
    const matrixCols = 18;
    const drops = Array.from({ length: matrixCols }, () => Math.random() * 30);

    const render = () => {
      const { width: w, height: h } = canvas;
      if (w === 0 || h === 0) return;

      // Speed multiplier scales up smoothly when hovered
      const speedMultiplier = isHovered ? 1.75 : 1.0;

      // Deep cathode tube background with ambient phosphor bloom
      ctx.fillStyle = power ? '#090D0B' : '#121413';
      ctx.fillRect(0, 0, w, h);

      if (!power) {
        // Cold unenergized CRT screen state
        ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
        ctx.font = '10px "Share Tech Mono", monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('NO BEAM / STANDBY', w / 2, h / 2);
        return;
      }

      // Faint ambient CRT radial phosphor glow behind the glass
      const radialGlow = ctx.createRadialGradient(
        w / 2,
        h / 2,
        10,
        w / 2,
        h / 2,
        Math.max(w, h) * 0.75
      );
      radialGlow.addColorStop(0, `${accentColor}1C`);
      radialGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = radialGlow;
      ctx.fillRect(0, 0, w, h);

      // 1. Draw Etched Glass Reticle / Graticule Grid
      if (showGraticule) {
        ctx.save();
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.065)';

        // Vertical major divisions
        const numCols = 8;
        for (let i = 0; i <= numCols; i++) {
          const x = Math.round((w / numCols) * i);
          ctx.beginPath();
          ctx.moveTo(x + 0.5, 0);
          ctx.lineTo(x + 0.5, h);
          ctx.stroke();
        }

        // Horizontal major divisions
        const numRows = 6;
        for (let j = 0; j <= numRows; j++) {
          const y = Math.round((h / numRows) * j);
          ctx.beginPath();
          ctx.moveTo(0, y + 0.5);
          ctx.lineTo(w, y + 0.5);
          ctx.stroke();
        }

        // Center crosshair precision graduation ticks
        const cx = Math.round(w / 2);
        const cy = Math.round(h / 2);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';

        // Horizontal sub-ticks along center line
        const subTickStepX = w / 32;
        for (let x = 0; x <= w; x += subTickStepX) {
          ctx.beginPath();
          ctx.moveTo(x, cy - 2.5);
          ctx.lineTo(x, cy + 2.5);
          ctx.stroke();
        }

        // Vertical sub-ticks along center line
        const subTickStepY = h / 24;
        for (let y = 0; y <= h; y += subTickStepY) {
          ctx.beginPath();
          ctx.moveTo(cx - 2.5, y);
          ctx.lineTo(cx + 2.5, y);
          ctx.stroke();
        }
        ctx.restore();
      }

      // Configure Vector Electron Beam with Phosphor Halo
      ctx.save();
      ctx.shadowBlur = isHovered ? 12 : 8;
      ctx.shadowColor = accentColor;
      ctx.strokeStyle = accentColor;
      ctx.fillStyle = accentColor;
      ctx.lineWidth = isHovered ? 2.2 : 2.0;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';

      const cx = w / 2;
      const cy = h / 2;
      const amp = (h / 2.7) * Math.min(Math.max(amplitude, 0.2), 1.5);
      const freq = Math.min(Math.max(frequency, 0.2), 4);

      // Render Waveform Vector
      if (waveType === 'sine') {
        ctx.beginPath();
        for (let x = 0; x <= w; x += 2) {
          const t = (x / w) * Math.PI * 4 * freq + phase;
          const y = cy - Math.sin(t) * amp;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
        phase += 0.045 * speedMultiplier;
      } else if (waveType === 'lissajous') {
        ctx.beginPath();
        const pts = 200;
        for (let i = 0; i <= pts; i++) {
          const t = (i / pts) * Math.PI * 2;
          const x = cx + Math.sin(t * 3 + phase) * (w * 0.36);
          const y = cy + Math.sin(t * 2) * amp;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.stroke();
        phase += 0.035 * speedMultiplier;
      } else if (waveType === 'sawtooth') {
        ctx.beginPath();
        const period = Math.max(w / (3 * freq), 20);
        for (let x = 0; x <= w; x += 2) {
          const mod = (x + phase * 45) % period;
          const ramp = 1 - (2 * mod) / period;
          const y = cy - ramp * amp;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
        phase += 0.04 * speedMultiplier;
      } else if (waveType === 'radar') {
        // Radar circular range rings
        ctx.lineWidth = 1;
        ctx.strokeStyle = `${accentColor}40`;
        const maxR = Math.min(cx, cy) * 0.88;

        for (let rFrac of [0.33, 0.66, 1.0]) {
          ctx.beginPath();
          ctx.arc(cx, cy, maxR * rFrac, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Faint rotating phosphor fade trail (sector wedge)
        const trailArc = 0.55;
        const trailGrad = ctx.createRadialGradient(cx, cy, 5, cx, cy, maxR);
        trailGrad.addColorStop(0, `${accentColor}35`);
        trailGrad.addColorStop(1, `${accentColor}05`);
        ctx.fillStyle = trailGrad;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, maxR, sweepAngle - trailArc, sweepAngle, false);
        ctx.closePath();
        ctx.fill();

        // Main rotating sweep vector arm
        ctx.lineWidth = 2.4;
        ctx.strokeStyle = accentColor;
        const armX = cx + Math.cos(sweepAngle) * maxR;
        const armY = cy + Math.sin(sweepAngle) * maxR;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(armX, armY);
        ctx.stroke();

        // Radar Target Blips
        const blips = [
          { r: maxR * 0.52, a: 1.25 },
          { r: maxR * 0.78, a: 3.75 },
          { r: maxR * 0.36, a: 5.35 },
          { r: maxR * 0.68, a: 2.15 },
        ];
        blips.forEach((b) => {
          const bx = cx + Math.cos(b.a) * b.r;
          const by = cy + Math.sin(b.a) * b.r;
          const diff = (sweepAngle - b.a + Math.PI * 4) % (Math.PI * 2);
          if (diff < 1.3) {
            const alpha = 1 - diff / 1.3;
            ctx.fillStyle = accentColor;
            ctx.globalAlpha = alpha;
            ctx.beginPath();
            ctx.arc(bx, by, 3.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1.0;
          }
        });

        sweepAngle += 0.035 * speedMultiplier;
      } else if (waveType === 'matrix') {
        // Falling matrix phosphor code rain trace
        ctx.font = '9px monospace';
        ctx.fillStyle = accentColor;
        ctx.shadowBlur = 4;
        const colWidth = w / matrixCols;

        for (let c = 0; c < matrixCols; c++) {
          const y = (drops[c] * 10) % (h + 20);
          // Lead brighter character
          ctx.fillStyle = '#FFFFFF';
          ctx.fillText(String.fromCharCode(0x30a0 + Math.floor(Math.random() * 30)), c * colWidth + 2, y);
          // Trailing phosphor stream
          ctx.fillStyle = accentColor;
          ctx.fillRect(c * colWidth + 4, Math.max(0, y - 10), 2, 7);
          ctx.fillRect(c * colWidth + 4, Math.max(0, y - 20), 1.5, 5);
          drops[c] += (0.35 + (c % 4) * 0.12) * speedMultiplier;
        }
      } else if (waveType === 'led') {
        // Multi-channel digital VU spectrum vector
        const bars = 14;
        const barWidth = (w * 0.76) / bars;
        const startX = (w - bars * barWidth) / 2;

        for (let b = 0; b < bars; b++) {
          const barPhase = phase * 2.2 + b * 0.45;
          const hFrac = 0.18 + 0.7 * (0.5 + 0.5 * Math.sin(barPhase));
          const barH = (h * 0.72) * hFrac * amplitude;
          const bx = startX + b * barWidth;
          const by = h * 0.85 - barH;

          const segs = 6;
          const segH = barH / segs;
          for (let s = 0; s < segs; s++) {
            ctx.fillStyle = s >= segs - 2 ? '#FF4444' : accentColor;
            ctx.fillRect(bx + 1.5, by + s * segH, barWidth - 3, segH - 1.5);
          }
        }
        phase += 0.04 * speedMultiplier;
      }

      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [power, waveType, accentColor, frequency, amplitude, dimensions, showGraticule, isHovered]);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative w-full rounded-md p-2 bg-[#0E1210] border-2 border-[#1B221E] shadow-[inset_0_4px_16px_rgba(0,0,0,0.95),0_1px_1px_rgba(255,255,255,0.06)] flex flex-col justify-between overflow-hidden cursor-crosshair group shrink-0 ${className}`}
      style={{ height: `${height}px` }}
      title={`CRT Vector Display • ${waveType.toUpperCase()} Mode • Hover to accelerate beam`}
    >
      {/* Heavy Recessed Inner Shadow & Convex Bezel Frame */}
      <div
        ref={screenRef}
        className="relative w-full rounded overflow-hidden flex-1 border border-[#1F2722] shadow-bevel crt-scanlines"
      >
        <canvas
          ref={canvasRef}
          width={dimensions.width}
          height={dimensions.height}
          className="absolute inset-0 w-full h-full block"
        />

        {/* Vintage Convex Glass Sheen & Reflection Highlight */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/[0.015] to-white/[0.08]" />

        {/* Phosphor CRT Scanline Raster Texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.07]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, #fff, #fff 1px, transparent 1px, transparent 3px)',
          }}
        />

        {/* Corner Vignette Shadow (Tubular Edge Falloff) */}
        <div
          className="absolute inset-0 pointer-events-none rounded"
          style={{
            boxShadow: 'inset 0 0 18px rgba(0,0,0,0.9)',
          }}
        />
      </div>

      {/* CRT Lower Telemetry Readout Strip */}
      <div className="w-full flex items-center justify-between pt-1.5 px-1 text-[8.5px] font-mono text-[#67776F] select-none">
        <span className="tracking-wider">BEAM: 10kV</span>
        <span
          className="font-bold uppercase tracking-wider transition-colors"
          style={{ color: isHovered ? '#FFFFFF' : accentColor }}
        >
          {waveType} {isHovered ? '⚡ BOOST' : 'MODE'}
        </span>
        <span className="tracking-wider">RETICLE 8×6</span>
      </div>
    </div>
  );
};
