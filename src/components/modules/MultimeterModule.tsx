import React, { useState, useEffect } from 'react';
import { Gauge, Zap, CheckCircle2 } from 'lucide-react';

interface MultimeterModuleProps {
  powerOn: boolean;
}

export const MultimeterModule: React.FC<MultimeterModuleProps> = ({ powerOn }) => {
  const [functionMode, setFunctionMode] = useState<'DCV' | 'ACV' | 'OHMS' | 'mA'>('DCV');
  const [range, setRange] = useState<'LOW' | 'MED' | 'HIGH'>('MED');
  const [rawReading, setRawReading] = useState(12.48);

  // Subtle natural multimeter drift when energized
  useEffect(() => {
    if (!powerOn) return;
    const interval = setInterval(() => {
      const jitter = (Math.random() - 0.5) * 0.04;
      setRawReading((prev) => +(prev + jitter).toFixed(2));
    }, 1200);
    return () => clearInterval(interval);
  }, [powerOn]);

  const displayVal = powerOn ? rawReading : 0;
  // Calculate needle angle (-45 deg to +45 deg)
  const needleDeg = powerOn
    ? Math.min(Math.max(-45 + (rawReading / 20) * 90, -50), 50)
    : -50;

  return (
    <div className="flex flex-col gap-3 font-mono">
      {/* Analog Galvanometer Meter Face with Needle */}
      <div className="relative bg-[#ECE5DA] border-2 border-[#1E232B] rounded p-2 text-[#191D24] shadow-[inset_0_2px_6px_rgba(0,0,0,0.4)] overflow-hidden">
        {/* Mirrored scale strip */}
        <div className="w-[85%] mx-auto h-1.5 bg-gradient-to-r from-[#D0C5B4] via-[#F8F5EE] to-[#D0C5B4] rounded-full my-0.5 border border-[#B0A391]" />

        {/* Arched galvanometer graduations */}
        <svg viewBox="0 0 200 65" className="w-full h-14 overflow-visible">
          {/* Outer arc */}
          <path
            d="M 25 55 A 85 85 0 0 1 175 55"
            fill="none"
            stroke="#2B303A"
            strokeWidth="1.5"
          />
          {/* Inner arc */}
          <path
            d="M 35 55 A 75 75 0 0 1 165 55"
            fill="none"
            stroke="#5A6475"
            strokeWidth="0.8"
          />
          {/* Major tick marks */}
          {[0, 10, 20, 30, 40, 50].map((tick, i) => {
            const angle = -45 + (i * 90) / 5;
            const rad = (angle * Math.PI) / 180;
            const x1 = 100 + 72 * Math.sin(rad);
            const y1 = 65 - 72 * Math.cos(rad);
            const x2 = 100 + 85 * Math.sin(rad);
            const y2 = 65 - 85 * Math.cos(rad);
            return (
              <g key={tick}>
                <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#1A1D24" strokeWidth="1.2" />
                <text
                  x={100 + 60 * Math.sin(rad)}
                  y={65 - 60 * Math.cos(rad) + 3}
                  fontSize="7"
                  textAnchor="middle"
                  fill="#2A303A"
                  fontWeight="bold"
                >
                  {tick}
                </text>
              </g>
            );
          })}

          {/* Galvanometer moving needle */}
          <g
            style={{
              transformOrigin: '100px 65px',
              transform: `rotate(${needleDeg}deg)`,
              transition: 'transform 0.4s cubic-bezier(0.2, 0.8, 0.3, 1)',
            }}
          >
            <line x1="100" y1="65" x2="100" y2="8" stroke="#DC2626" strokeWidth="1.8" />
            <circle cx="100" cy="65" r="4" fill="#1C2026" />
          </g>
        </svg>

        <div className="flex justify-between items-center px-2 text-[8px] font-bold text-[#444C5A]">
          <span>OHMS • V-A</span>
          <span className="text-red-700">CONAR MODEL 211</span>
          <span>FS = 20,000 Ω/V</span>
        </div>
      </div>

      {/* Auxiliary Digital 7-Segment Readout */}
      <div className="bg-[#181B22] border border-[#3A4350] p-2 rounded flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-[8px] text-[#78879A] uppercase tracking-wider">
            DIGITAL SAMPLER
          </span>
          <div className="text-xl font-bold tracking-widest text-emerald-400 font-mono">
            {powerOn ? displayVal.toFixed(2) : '----'}
            <span className="text-xs ml-1 text-emerald-600">{functionMode}</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-[9px]">
          <span className="text-[#8997A8]">AUTO-POLARITY</span>
          <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_4px_#10b981]" />
        </div>
      </div>

      {/* Rotary Function Selectors & Probes */}
      <div className="grid grid-cols-2 gap-2 text-[9px]">
        {/* Function Switch */}
        <div className="bg-[#222731] border border-[#3B4454] p-1.5 rounded flex flex-col gap-1">
          <span className="text-[#8FA0B5] font-bold text-[8px] text-center">
            FUNCTION SELECT
          </span>
          <div className="grid grid-cols-2 gap-1">
            {(['DCV', 'ACV', 'OHMS', 'mA'] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setFunctionMode(mode)}
                className={`py-1 text-[9px] font-bold rounded border cursor-pointer ${
                  functionMode === mode
                    ? 'bg-amber-900/60 border-amber-600 text-amber-200'
                    : 'bg-[#181C22] border-[#363E4D] text-[#8695A8]'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        {/* Banana Probe Terminal Posts */}
        <div className="bg-[#222731] border border-[#3B4454] p-1.5 rounded flex flex-col justify-between">
          <span className="text-[#8FA0B5] font-bold text-[8px] text-center">
            METER PROBE JACKS
          </span>
          <div className="flex justify-around items-center my-1">
            {/* Common / Black Terminal */}
            <div className="flex flex-col items-center gap-0.5">
              <div className="w-5 h-5 rounded-full bg-[#15171C] border-2 border-[#383E4A] flex items-center justify-center shadow-inner">
                <div className="w-2 h-2 rounded-full bg-black border border-neutral-600" />
              </div>
              <span className="text-[7px] text-[#8B98AA] font-bold">COM (-)</span>
            </div>

            {/* Red / Signal Terminal */}
            <div className="flex flex-col items-center gap-0.5">
              <div className="w-5 h-5 rounded-full bg-[#8A2121] border-2 border-[#B93838] flex items-center justify-center shadow-inner">
                <div className="w-2 h-2 rounded-full bg-[#E53E3E] border border-red-300" />
              </div>
              <span className="text-[7px] text-red-400 font-bold">V-Ω-A (+)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
