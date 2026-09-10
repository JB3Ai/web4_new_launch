import React, { useState } from 'react';
import { Cpu, RotateCcw } from 'lucide-react';

interface CurveTracerModuleProps {
  powerOn: boolean;
}

export const CurveTracerModule: React.FC<CurveTracerModuleProps> = ({ powerOn }) => {
  const [deviceType, setDeviceType] = useState<'NPN' | 'PNP' | 'DIODE' | 'ZENER'>('NPN');
  const [collectorSweep, setCollectorSweep] = useState(25); // Volts
  const [stepsCount, setStepsCount] = useState(5); // 5 base steps

  return (
    <div className="flex flex-col gap-3 font-mono">
      {/* Semiconductor Characteristic IV Curve Display */}
      <div className="relative bg-[#0A140F] border-2 border-[#1E2621] rounded p-2 text-[#38EF7D] shadow-[inset_0_2px_8px_rgba(0,0,0,0.9)] overflow-hidden h-[120px] flex items-center justify-center">
        {/* Reticle grid */}
        <div className="absolute inset-0 crt-grid opacity-40 pointer-events-none" />

        {powerOn ? (
          <svg viewBox="0 0 240 100" className="w-full h-full">
            {/* Horizontal & Vertical Axes */}
            <line x1="20" y1="90" x2="230" y2="90" stroke="rgba(56, 239, 125, 0.4)" strokeWidth="1" />
            <line x1="20" y1="10" x2="20" y2="90" stroke="rgba(56, 239, 125, 0.4)" strokeWidth="1" />

            {/* Characteristic Curves */}
            {deviceType === 'NPN' && (
              <>
                {Array.from({ length: stepsCount }).map((_, idx) => {
                  const yMax = 80 - idx * 14;
                  return (
                    <path
                      key={idx}
                      d={`M 20 90 Q 35 ${yMax + 4}, 55 ${yMax} L 225 ${yMax - 3}`}
                      fill="none"
                      stroke="#38EF7D"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      style={{ filter: 'drop-shadow(0 0 3px #38EF7D)' }}
                    />
                  );
                })}
              </>
            )}

            {deviceType === 'PNP' && (
              <>
                {Array.from({ length: stepsCount }).map((_, idx) => {
                  const yMax = 20 + idx * 14;
                  return (
                    <path
                      key={idx}
                      d={`M 220 10 Q 205 ${yMax - 4}, 185 ${yMax} L 25 ${yMax + 3}`}
                      fill="none"
                      stroke="#38EF7D"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      style={{ filter: 'drop-shadow(0 0 3px #38EF7D)' }}
                    />
                  );
                })}
              </>
            )}

            {deviceType === 'DIODE' && (
              <path
                d="M 20 90 L 100 90 Q 120 88, 130 65 L 140 15"
                fill="none"
                stroke="#38EF7D"
                strokeWidth="2.2"
                strokeLinecap="round"
                style={{ filter: 'drop-shadow(0 0 4px #38EF7D)' }}
              />
            )}

            {deviceType === 'ZENER' && (
              <path
                d="M 40 15 L 45 88 Q 50 90, 80 90 L 120 90 Q 135 88, 142 65 L 150 15"
                fill="none"
                stroke="#38EF7D"
                strokeWidth="2.2"
                strokeLinecap="round"
                style={{ filter: 'drop-shadow(0 0 4px #38EF7D)' }}
              />
            )}

            {/* Stamped onscreen parameters */}
            <text x="30" y="22" fill="#38EF7D" fontSize="8" opacity="0.8">
              DUT: {deviceType} • SWEEP: {collectorSweep}V PEAK
            </text>
            <text x="30" y="32" fill="#38EF7D" fontSize="8" opacity="0.8">
              STEP: 20 µA / DIV • hFE ≈ 120
            </text>
          </svg>
        ) : (
          <div className="text-[10px] text-[#425048] font-mono">TRACER SWEEP BEAM OFF</div>
        )}
      </div>

      {/* Device Under Test Socket & Polarity Controls */}
      <div className="grid grid-cols-2 gap-2 text-[9px]">
        {/* Device Type Selector */}
        <div className="bg-[#222731] border border-[#3B4454] p-1.5 rounded flex flex-col gap-1">
          <span className="text-[#8FA0B5] font-bold text-[8px] text-center">
            SEMICONDUCTOR TYPE
          </span>
          <div className="grid grid-cols-2 gap-1">
            {(['NPN', 'PNP', 'DIODE', 'ZENER'] as const).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setDeviceType(type)}
                className={`py-0.5 text-[8px] font-bold rounded border cursor-pointer ${
                  deviceType === type
                    ? 'bg-emerald-950/80 border-emerald-600 text-emerald-300'
                    : 'bg-[#181C22] border-[#363E4D] text-[#8695A8]'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Physical Component Test Socket (TO-5 / TO-92) */}
        <div className="bg-[#222731] border border-[#3B4454] p-1.5 rounded flex flex-col items-center justify-between">
          <span className="text-[#8FA0B5] font-bold text-[8px] text-center">
            DUT TEST SOCKET
          </span>
          {/* Socket pin holes */}
          <div className="w-12 h-10 rounded bg-[#16181E] border border-[#485362] p-1 flex items-center justify-around shadow-inner my-0.5">
            <div className="flex flex-col items-center">
              <div className="w-2.5 h-2.5 rounded-full bg-[#0E1014] border border-[#363E4A] flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-amber-300" />
              </div>
              <span className="text-[6px] text-[#8FA0B4]">E</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-2.5 h-2.5 rounded-full bg-[#0E1014] border border-[#363E4A] flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-amber-300" />
              </div>
              <span className="text-[6px] text-[#8FA0B4]">B</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-2.5 h-2.5 rounded-full bg-[#0E1014] border border-[#363E4A] flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-amber-300" />
              </div>
              <span className="text-[6px] text-[#8FA0B4]">C</span>
            </div>
          </div>
          <span className="text-[7px] text-[#718092]">UNIVERSAL TRANSISTOR SOCKET</span>
        </div>
      </div>

      {/* Collector Sweep Volts Slider */}
      <div className="bg-[#181C23] border border-[#363E4C] p-2 rounded flex items-center justify-between">
        <div className="flex flex-col text-[8px] text-[#8FA0B5]">
          <span className="font-bold text-[#E2E8F0]">COLLECTOR SWEEP (0 - 50V)</span>
          <span>STEP GENERATOR: {stepsCount} STEPS</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setStepsCount((prev) => (prev === 8 ? 3 : prev + 1))}
            className="px-2 py-0.5 text-[8px] font-bold rounded bg-[#272E3A] border border-[#4B5668] text-amber-300 hover:bg-[#323A48] cursor-pointer"
          >
            {stepsCount} CURVES
          </button>
        </div>
      </div>
    </div>
  );
};
