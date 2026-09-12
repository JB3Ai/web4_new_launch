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
  noise = 0.25,
  height = 145,
  showGraticule = true,
  className = '',
}) => {
  const canvasRef = useRef(null);
  const screenRef = useRef(null);
  // Animation values change every frame, so keep them outside React's render cycle.
  const speedMultiplierRef = useRef(1);
  const hoverTargetRef = useRef(1);
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

    const { width: w, height: h } = canvas;
    if (w === 0 || h === 0) return;

    const cx = w / 2;
    const cy = h / 2;
    const clampedAmplitude = Math.min(Math.max(amplitude, 0.2), 1.5);
    const amp = (h / 2.7) * clampedAmplitude;
    const freq = Math.min(Math.max(frequency, 0.2), 4);
    const sineStep = Math.max(2, Math.ceil(w / 180));
    const lissajousPoints = 120;
    const twoPi = Math.PI * 2;
    const radarMaxRadius = Math.min(cx, cy) * 0.88;
    const radarBlips = [
      [0.52, 1.25],
      [0.78, 3.75],
      [0.36, 5.35],
      [0.68, 2.15],
    ];

    // The tube background and reticle do not change frame-to-frame. Rasterize
    // them once, then copy the cached layer during each animation frame.
    const staticLayer = document.createElement('canvas');
    staticLayer.width = w;
    staticLayer.height = h;
    const staticCtx = staticLayer.getContext('2d');
    if (!staticCtx) return;

    staticCtx.fillStyle = power ? '#090D0B' : '#121413';
    staticCtx.fillRect(0, 0, w, h);

    if (power) {
      const radialGlow = staticCtx.createRadialGradient(cx, cy, 10, cx, cy, Math.max(w, h) * 0.75);
      radialGlow.addColorStop(0, `${accentColor}1C`);
      radialGlow.addColorStop(1, 'transparent');
      staticCtx.fillStyle = radialGlow;
      staticCtx.fillRect(0, 0, w, h);

      if (showGraticule) {
        staticCtx.lineWidth = 1;
        staticCtx.strokeStyle = 'rgba(255, 255, 255, 0.065)';
        staticCtx.beginPath();
        for (let i = 0; i <= 8; i++) {
          const x = Math.round((w / 8) * i) + 0.5;
          staticCtx.moveTo(x, 0);
          staticCtx.lineTo(x, h);
        }
        for (let i = 0; i <= 6; i++) {
          const y = Math.round((h / 6) * i) + 0.5;
          staticCtx.moveTo(0, y);
          staticCtx.lineTo(w, y);
        }
        staticCtx.stroke();

        staticCtx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        staticCtx.beginPath();
        for (let i = 0; i <= 32; i++) {
          const x = (w / 32) * i;
          staticCtx.moveTo(x, Math.round(cy) - 2.5);
          staticCtx.lineTo(x, Math.round(cy) + 2.5);
        }
        for (let i = 0; i <= 24; i++) {
          const y = (h / 24) * i;
          staticCtx.moveTo(Math.round(cx) - 2.5, y);
          staticCtx.lineTo(Math.round(cx) + 2.5, y);
        }
        staticCtx.stroke();
      }

      if (waveType === 'radar' || waveType === 'vctradar') {
        staticCtx.lineWidth = 1;
        staticCtx.strokeStyle = `${accentColor}40`;
        staticCtx.beginPath();
        for (const radiusFraction of [0.33, 0.66, 1]) {
          staticCtx.moveTo(cx + radarMaxRadius * radiusFraction, cy);
          staticCtx.arc(cx, cy, radarMaxRadius * radiusFraction, 0, twoPi);
        }
        staticCtx.stroke();
      }
    } else {
      staticCtx.fillStyle = 'rgba(255, 255, 255, 0.08)';
      staticCtx.font = '10px "Share Tech Mono", monospace';
      staticCtx.textAlign = 'center';
      staticCtx.textBaseline = 'middle';
      staticCtx.fillText('NO BEAM / STANDBY', cx, cy);
    }

    if (!power) {
      ctx.drawImage(staticLayer, 0, 0);
      return;
    }

    const radarTrailGradient =
      waveType === 'radar' || waveType === 'vctradar'
        ? ctx.createRadialGradient(cx, cy, 5, cx, cy, radarMaxRadius)
        : null;
    if (radarTrailGradient) {
      radarTrailGradient.addColorStop(0, `${accentColor}35`);
      radarTrailGradient.addColorStop(1, `${accentColor}05`);
    }

    let animId;
    let lastFrameTime = 0;
    let phase = 0;
    let sweepAngle = 0;

    // Matrix particle drops
    const matrixCols = 18;
    const drops = Array.from({ length: matrixCols }, () => Math.random() * 30);

    const render = (timestamp) => {
      const elapsedSeconds = lastFrameTime
        ? Math.min((timestamp - lastFrameTime) / 1000, 0.05)
        : 1 / 60;
      lastFrameTime = timestamp;

      // Frame-rate independent linear interpolation keeps hover acceleration smooth.
      const lerpAmount = Math.min(elapsedSeconds * 9, 1);
      speedMultiplierRef.current +=
        (hoverTargetRef.current - speedMultiplierRef.current) * lerpAmount;
      const speedMultiplier = speedMultiplierRef.current;
      const frameScale = elapsedSeconds * 60;

      ctx.drawImage(staticLayer, 0, 0);

      ctx.save();
      ctx.shadowBlur = speedMultiplier > 1.05 ? 12 : 8;
      ctx.shadowColor = accentColor;
      ctx.strokeStyle = accentColor;
      ctx.fillStyle = accentColor;
      ctx.lineWidth = speedMultiplier > 1.05 ? 2.2 : 2.0;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';

      const jitter = (Math.random() - 0.5) * (noise * 6);

      // Render Waveform Vector
      if (waveType === 'sine') {
        ctx.beginPath();
        for (let x = 0; x <= w; x += sineStep) {
          const t = (x / w) * Math.PI * 4 * freq + phase;
          const y = cy - Math.sin(t) * amp + jitter;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
        phase = (phase + 0.045 * speedMultiplier * frameScale) % twoPi;
      } else if (waveType === 'lissajous') {
        ctx.beginPath();
        for (let i = 0; i <= lissajousPoints; i++) {
          const t = (i / lissajousPoints) * twoPi;
          const x = cx + Math.sin(t * 3 + phase) * (w * 0.36) + jitter;
          const y = cy + Math.sin(t * 2) * amp + jitter;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.stroke();
        phase = (phase + 0.035 * speedMultiplier * frameScale) % twoPi;
      } else if (waveType === 'sawtooth') {
        ctx.beginPath();
        const period = Math.max(w / (3 * freq), 20);
        for (let x = 0; x <= w; x += sineStep) {
          const mod = (x + phase * 45) % period;
          const ramp = 1 - (2 * mod) / period;
          const y = cy - ramp * amp + jitter;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
        phase = (phase + 0.04 * speedMultiplier * frameScale) % twoPi;
      } else if (waveType === 'radar' || waveType === 'vctradar') {
        const trailArc = 0.55;
        ctx.fillStyle = radarTrailGradient;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, radarMaxRadius, sweepAngle - trailArc, sweepAngle, false);
        ctx.closePath();
        ctx.fill();

        ctx.lineWidth = 2.4;
        ctx.strokeStyle = accentColor;
        const armX = cx + Math.cos(sweepAngle) * radarMaxRadius;
        const armY = cy + Math.sin(sweepAngle) * radarMaxRadius;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(armX, armY);
        ctx.stroke();

        for (let i = 0; i < radarBlips.length; i++) {
          const [radiusFraction, angle] = radarBlips[i];
          const bx = cx + Math.cos(angle) * radarMaxRadius * radiusFraction;
          const by = cy + Math.sin(angle) * radarMaxRadius * radiusFraction;
          const diff = (sweepAngle - angle + Math.PI * 4) % twoPi;
          if (diff < 1.3) {
            const alpha = 1 - diff / 1.3;
            ctx.fillStyle = accentColor;
            ctx.globalAlpha = alpha;
            ctx.beginPath();
            ctx.arc(bx, by, 3.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1.0;
          }
        }

        sweepAngle = (sweepAngle + 0.035 * speedMultiplier * frameScale) % twoPi;
      } else if (waveType === 'spectra') {
        // MOD-03 SPECTRA: Spectrum Analyzer Bar Graph (Green / Amber / Red phosphor segments)
        const bars = 18;
        const barWidth = (w * 0.82) / bars;
        const startX = (w - bars * barWidth) / 2;

        for (let b = 0; b < bars; b++) {
          const val = Math.abs(Math.sin(phase * 1.8 + b * 0.35) * Math.cos(b * 0.2)) * amplitude;
          const barH = (h * 0.65) * Math.min(val, 1.2) + jitter;
          const bx = startX + b * barWidth;
          const by = h * 0.85 - barH;

          ctx.fillStyle = accentColor;
          ctx.fillRect(bx + 1, by, barWidth - 2, barH);
        }
        phase = (phase + 0.04 * speedMultiplier * frameScale) % twoPi;
      } else if (waveType === 'vuneedle') {
        // MOD-04 VU-NEEDLE: Analog Needle Meter with Curved Dial Arc
        const meterR = Math.min(w, h) * 0.75;
        const pivotX = cx;
        const pivotY = h * 0.9;

        // Dial Arc Background
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'rgba(255,255,255,0.2)';
        ctx.beginPath();
        ctx.arc(pivotX, pivotY, meterR, -Math.PI * 0.75, -Math.PI * 0.25);
        ctx.stroke();

        // Red Overload Sector
        ctx.strokeStyle = '#FF3366';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(pivotX, pivotY, meterR, -Math.PI * 0.38, -Math.PI * 0.25);
        ctx.stroke();

        // Swinging Needle
        const needleAngle = -Math.PI * 0.75 + (0.5 + 0.45 * Math.sin(phase * 2.5)) * (Math.PI * 0.5) * (amplitude / 1.0);
        const nx = pivotX + Math.cos(needleAngle) * (meterR * 0.9);
        const ny = pivotY + Math.sin(needleAngle) * (meterR * 0.9);

        ctx.strokeStyle = amplitude > 1.25 ? '#FF3366' : accentColor;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(pivotX, pivotY);
        ctx.lineTo(nx, ny);
        ctx.stroke();

        // Pivot Hub
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(pivotX, pivotY, 4, 0, Math.PI * 2);
        ctx.fill();

        phase = (phase + 0.03 * speedMultiplier * frameScale) % twoPi;
      } else if (waveType === 'cellmatrix') {
        // MOD-05 CELL MATRIX: 8x6 Grid of Pulsating Phosphor Dots
        const cols = 8;
        const rows = 6;
        const stepX = w / (cols + 1);
        const stepY = h / (rows + 1);

        for (let c = 1; c <= cols; c++) {
          for (let r = 1; r <= rows; r++) {
            const px = c * stepX;
            const py = r * stepY;
            const pulse = 0.2 + 0.8 * Math.abs(Math.sin(phase * 2 + c * 0.5 + r * 0.3));
            ctx.fillStyle = accentColor;
            ctx.globalAlpha = Math.min(pulse * amplitude, 1.0);
            ctx.beginPath();
            ctx.arc(px, py, 2.5, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        ctx.globalAlpha = 1.0;
        phase = (phase + 0.035 * speedMultiplier * frameScale) % twoPi;
      } else if (waveType === 'matrix') {
        ctx.font = '9px monospace';
        ctx.fillStyle = accentColor;
        ctx.shadowBlur = 4;
        const colWidth = w / matrixCols;

        for (let c = 0; c < matrixCols; c++) {
          const y = (drops[c] * 10) % (h + 20);
          ctx.fillStyle = '#FFFFFF';
          ctx.fillText(String.fromCharCode(0x30a0 + Math.floor(Math.random() * 30)), c * colWidth + 2, y);
          ctx.fillStyle = accentColor;
          ctx.fillRect(c * colWidth + 4, Math.max(0, y - 10), 2, 7);
          ctx.fillRect(c * colWidth + 4, Math.max(0, y - 20), 1.5, 5);
          drops[c] += (0.35 + (c % 4) * 0.12) * speedMultiplier;
        }
      } else if (waveType === 'led') {
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
        phase = (phase + 0.04 * speedMultiplier * frameScale) % twoPi;
      }

      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [power, waveType, accentColor, frequency, amplitude, noise, dimensions, showGraticule]);

  return (
    <div
      onMouseEnter={() => {
        hoverTargetRef.current = 3.2;
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        hoverTargetRef.current = 1;
        setIsHovered(false);
      }}
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
