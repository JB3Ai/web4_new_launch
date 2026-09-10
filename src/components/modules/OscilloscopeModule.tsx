import React, { useState, useEffect, useRef } from 'react';
import { Activity, Play, Pause, Sparkles } from 'lucide-react';

interface OscilloscopeModuleProps {
  powerOn: boolean;
}

export const OscilloscopeModule: React.FC<OscilloscopeModuleProps> = ({ powerOn }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [running, setRunning] = useState(true);
  const [timeDiv, setTimeDiv] = useState(2); // 0: 0.5ms, 1: 1ms, 2: 5ms, 3: 10ms
  const [voltsDiv, setVoltsDiv] = useState(1); // 1V, 2V, 5V
  const [waveShape, setWaveShape] = useState<'sine' | 'square' | 'complex'>('sine');
  const [beamIntensity, setBeamIntensity] = useState(85);

  const timeDivLabels = ['0.5 ms', '1.0 ms', '5.0 ms', '10 ms'];
  const voltsDivLabels = ['0.5 V', '1.0 V', '2.0 V', '5.0 V'];

  // Animate CRT Cathode Ray beam
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let phase = 0;

    const render = () => {
      const w = canvas.width;
      const h = canvas.height;

      // Dark phosphor background
      ctx.fillStyle = powerOn ? '#07160E' : '#0a0d0c';
      ctx.fillRect(0, 0, w, h);

      if (powerOn) {
        // Draw internal CRT graticule grid lines
        ctx.strokeStyle = 'rgba(56, 239, 125, 0.18)';
        ctx.lineWidth = 1;

        // Vertical division lines (8 divisions)
        for (let x = 0; x <= w; x += w / 8) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, h);
          ctx.stroke();
        }

        // Horizontal division lines (6 divisions)
        for (let y = 0; y <= h; y += h / 6) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(w, y);
          ctx.stroke();
        }

        // Center crosshair tick marks
        const cx = w / 2;
        const cy = h / 2;
        ctx.strokeStyle = 'rgba(56, 239, 125, 0.35)';
        for (let i = 0; i <= w; i += w / 40) {
          ctx.beginPath();
          ctx.moveTo(i, cy - 3);
          ctx.lineTo(i, cy + 3);
          ctx.stroke();
        }
        for (let i = 0; i <= h; i += h / 30) {
          ctx.beginPath();
          ctx.moveTo(cx - 3, i);
          ctx.lineTo(cx + 3, i);
          ctx.stroke();
        }

        // Phosphor Waveform Trace
        const freqMult = [1.8, 1.0, 0.5, 0.25][timeDiv];
        const ampScale = [1.6, 1.0, 0.6, 0.3][voltsDiv];

        ctx.shadowBlur = 9;
        ctx.shadowColor = '#38EF7D';
        ctx.strokeStyle = `rgba(56, 239, 125, ${beamIntensity / 100})`;
        ctx.lineWidth = 2.2;
        ctx.lineJoin = 'round';
        ctx.beginPath();

        for (let x = 0; x < w; x++) {
          const t = (x / w) * Math.PI * 4 * freqMult + phase;
          let yVal = 0;

          if (waveShape === 'sine') {
            yVal = Math.sin(t);
          } else if (waveShape === 'square') {
            yVal = Math.sin(t) >= 0 ? 0.85 : -0.85;
          } else {
            // Complex laboratory modulation
            yVal = 0.7 * Math.sin(t) + 0.3 * Math.sin(t * 3.2);
          }

          const y = cy - yVal * 42 * ampScale;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

        // Reset shadow
        ctx.shadowBlur = 0;

        if (running) {
          phase += 0.055;
        }
      } else {
        // Cold unenergized CRT screen
        ctx.fillStyle = '#121714';
        ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.font = '10px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('CRT CATHODE BEAM OFF', w / 2, h / 2);
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [powerOn, running, timeDiv, voltsDiv, waveShape, beamIntensity]);

  return (
    <div className="flex flex-col gap-3">
      {/* CRT Circular Display Bezel */}
      <div className="relative mx-auto rounded-lg p-2.5 bg-[#1B1F27] border-2 border-[#12151B] shadow-[inset_0_2px_8px_rgba(0,0,0,0.9),0_2px_4px_rgba(255,255,255,0.06)] flex flex-col items-center">
        {/* Curved CRT glass frame */}
        <div className="relative rounded-md overflow-hidden border border-[#2D3542] shadow-[inset_0_0_12px_rgba(0,0,0,0.9)]">
          <canvas
            ref={canvasRef}
            width={280}
            height={130}
            className="w-full h-[120px] sm:h-[130px] block"
          />
          {/* Glass reflection highlight */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/[0.03] to-white/[0.08]" />
        </div>

        {/* CRT Bezel labeling */}
        <div className="w-full flex items-center justify-between px-1 pt-1 text-[8px] font-mono text-[#8392A5]">
          <span>CONAR 3-INCH RETICLE</span>
          <span className="text-emerald-500 font-bold">P1 PHOSPHOR</span>
          <span>CAL: 1 KHZ 1V P-P</span>
        </div>
      </div>

      {/* Oscilloscope Hardware Controls & Rotary Dials */}
      <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-mono">
        {/* Time Base Selector */}
        <div className="bg-[#222731] border border-[#3B4454] p-1.5 rounded flex flex-col items-center justify-between">
          <span className="text-[#8FA0B5] text-[9px] font-bold">TIME / DIV</span>
          <button
            type="button"
            onClick={() => setTimeDiv((prev) => (prev + 1) % timeDivLabels.length)}
            className="my-1 px-2 py-0.5 rounded bg-[#161920] border border-[#485366] text-emerald-400 font-bold hover:bg-[#1E232D] cursor-pointer text-[10px]"
          >
            {timeDivLabels[timeDiv]}
          </button>
          <span className="text-[8px] text-[#69788C]">SWEEP RATE</span>
        </div>

        {/* Volts / Div Selector */}
        <div className="bg-[#222731] border border-[#3B4454] p-1.5 rounded flex flex-col items-center justify-between">
          <span className="text-[#8FA0B5] text-[9px] font-bold">VOLTS / DIV</span>
          <button
            type="button"
            onClick={() => setVoltsDiv((prev) => (prev + 1) % voltsDivLabels.length)}
            className="my-1 px-2 py-0.5 rounded bg-[#161920] border border-[#485366] text-amber-300 font-bold hover:bg-[#1E232D] cursor-pointer text-[10px]"
          >
            {voltsDivLabels[voltsDiv]}
          </button>
          <span className="text-[8px] text-[#69788C]">CH-A ATTEN</span>
        </div>

        {/* Waveform Source & Freeze */}
        <div className="bg-[#222731] border border-[#3B4454] p-1.5 rounded flex flex-col items-center justify-between">
          <span className="text-[#8FA0B5] text-[9px] font-bold">INPUT SELECT</span>
          <div className="flex gap-1 my-1">
            <button
              type="button"
              onClick={() =>
                setWaveShape((prev) =>
                  prev === 'sine' ? 'square' : prev === 'square' ? 'complex' : 'sine'
                )
              }
              className="px-1.5 py-0.5 rounded bg-[#161920] border border-[#485366] text-[#E2E8F0] uppercase text-[9px] hover:bg-[#1F2530] cursor-pointer"
            >
              {waveShape}
            </button>
            <button
              type="button"
              onClick={() => setRunning(!running)}
              className={`p-1 rounded border text-[9px] cursor-pointer ${
                running
                  ? 'bg-emerald-950/80 border-emerald-700 text-emerald-300'
                  : 'bg-amber-950/80 border-amber-700 text-amber-300'
              }`}
              title={running ? 'Pause Sweep' : 'Run Sweep'}
            >
              {running ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            </button>
          </div>
          <span className="text-[8px] text-[#69788C]">SYNC TRIGGER</span>
        </div>
      </div>
    </div>
  );
};
