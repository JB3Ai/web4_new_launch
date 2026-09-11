import React, { useState, useEffect } from 'react';
import { Timer, Radio, ToggleLeft } from 'lucide-react';

interface FrequencyCounterModuleProps {
  powerOn: boolean;
}

export const FrequencyCounterModule: React.FC<FrequencyCounterModuleProps> = ({ powerOn }) => {
  const [gateTime, setGateTime] = useState<'0.1s' | '1.0s' | '10s'>('1.0s');
  const [functionType, setFunctionType] = useState<'FREQ' | 'PERIOD' | 'TOTAL'>('FREQ');
  const [reading, setReading] = useState(14285714); // 14.285 MHz
  const [gateBlinking, setGateBlinking] = useState(false);

  // Gate trigger cycle
  useEffect(() => {
    if (!powerOn) return;
    const interval = setInterval(() => {
      setGateBlinking((prev) => !prev);
      // Small crystal oscillator jitter
      setReading((prev) => prev + (Math.floor(Math.random() * 7) - 3));
    }, 1000);
    return () => clearInterval(interval);
  }, [powerOn]);

  const formattedDisplay = () => {
    if (!powerOn) return '---.---.---';
    if (functionType === 'FREQ') {
      const mhz = (reading / 1000000).toFixed(6);
      return `${mhz} MHz`;
    } else if (functionType === 'PERIOD') {
      return '70.002 nS';
    } else {
      return reading.toLocaleString();
    }
  };

  return (
    <div className="flex flex-col gap-3 font-mono">
      {/* Precision Digital Counter Display (Amber Gas-discharge / LED style) */}
      <div className="bg-[#14171D] border-2 border-[#384252] rounded p-3 flex flex-col items-center justify-center shadow-inner relative overflow-hidden">
        {/* Faux bezel reflection */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.04] to-transparent pointer-events-none" />

        <div className="w-full flex items-center justify-between text-[8px] text-[#78889C] mb-1">
          <span className="font-bold">OVEN CONTROLLED TIMEBASE (OCXO)</span>
          <div className="flex items-center gap-1">
            <div
              className={`w-2 h-2 rounded-full ${
                powerOn && gateBlinking ? 'bg-amber-400 shadow-[0_0_6px_#f59e0b]' : 'bg-[#473010]'
              }`}
            />
            <span className="text-[8px] text-amber-500 font-bold">GATE ACTIVE</span>
          </div>
        </div>

        {/* Big Amber Digits */}
        <div className="text-xl sm:text-2xl font-black tracking-wider text-amber-400 font-mono py-1 drop-shadow-[0_0_8px_rgba(245,158,11,0.4)]">
          {formattedDisplay()}
        </div>

        <div className="w-full flex justify-between text-[8px] text-[#606F82] border-t border-[#262D38] pt-1 mt-1">
          <span>GATE: {gateTime}</span>
          <span>SENSITIVITY: 15mV RMS</span>
          <span>EXT REF: LOCK</span>
        </div>
      </div>

      {/* Function and Gate Time Rotaries */}
      <div className="grid grid-cols-2 gap-2 text-[9px]">
        {/* Function Switch */}
        <div className="bg-[#222731] border border-[#3B4454] p-1.5 rounded flex flex-col gap-1">
          <span className="text-[#8FA0B5] font-bold text-[8px] text-center">
            OPERATING MODE
          </span>
          <div className="flex flex-col gap-1">
            {(['FREQ', 'PERIOD', 'TOTAL'] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setFunctionType(mode)}
                className={`py-0.5 text-[8px] font-bold rounded border cursor-pointer ${
                  functionType === mode
                    ? 'bg-amber-900/70 border-amber-600 text-amber-200'
                    : 'bg-[#181C22] border-[#363E4D] text-[#8695A8]'
                }`}
              >
                {mode === 'FREQ' ? 'FREQUENCY A' : mode === 'PERIOD' ? 'PERIOD A' : 'EVENT TOTAL'}
              </button>
            ))}
          </div>
        </div>

        {/* Gate Interval Selection */}
        <div className="bg-[#222731] border border-[#3B4454] p-1.5 rounded flex flex-col gap-1">
          <span className="text-[#8FA0B5] font-bold text-[8px] text-center">
            GATE TIME SELECT
          </span>
          <div className="flex flex-col gap-1">
            {(['0.1s', '1.0s', '10s'] as const).map((gt) => (
              <button
                key={gt}
                type="button"
                onClick={() => setGateTime(gt)}
                className={`py-0.5 text-[8px] font-bold rounded border cursor-pointer ${
                  gateTime === gt
                    ? 'bg-emerald-950/70 border-emerald-600 text-emerald-300'
                    : 'bg-[#181C22] border-[#363E4D] text-[#8695A8]'
                }`}
              >
                {gt} GATE
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Dual Channel Inputs (Channel A & B BNC Ports) */}
      <div className="flex items-center justify-around bg-[#181C23] border border-[#363E4C] p-2 rounded">
        {/* Channel A (High Speed 100MHz) */}
        <div className="flex items-center gap-2">
          <div className="relative w-6 h-6 rounded-full bg-[#363E4C] border-2 border-[#606E82] flex items-center justify-center shadow-inner">
            <div className="w-2.5 h-2.5 rounded-full bg-[#171A20] border border-[#485465] flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-amber-400" />
            </div>
          </div>
          <div className="text-[8px] text-[#8FA0B4]">
            <div className="font-bold text-[#E2E8F0]">CHANNEL A</div>
            <div>DC - 120 MHz</div>
          </div>
        </div>

        {/* Channel B (Audio / Prescaler 500MHz) */}
        <div className="flex items-center gap-2">
          <div className="relative w-6 h-6 rounded-full bg-[#363E4C] border-2 border-[#606E82] flex items-center justify-center shadow-inner">
            <div className="w-2.5 h-2.5 rounded-full bg-[#171A20] border border-[#485465] flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-amber-400" />
            </div>
          </div>
          <div className="text-[8px] text-[#8FA0B4]">
            <div className="font-bold text-[#E2E8F0]">CHANNEL B</div>
            <div>PRESCALER 500MHz</div>
          </div>
        </div>
      </div>
    </div>
  );
};
