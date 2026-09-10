import React, { useState } from 'react';
import { Waves, Radio, Sliders } from 'lucide-react';

interface SignalGeneratorModuleProps {
  powerOn: boolean;
}

export const SignalGeneratorModule: React.FC<SignalGeneratorModuleProps> = ({ powerOn }) => {
  const [frequency, setFrequency] = useState(1000);
  const [multiplier, setMultiplier] = useState(100);
  const [waveType, setWaveType] = useState<'SINE' | 'SQUARE' | 'TRIANGLE'>('SINE');
  const [attenuation, setAttenuation] = useState(0); // 0dB, -20dB, -40dB
  const [amplitude, setAmplitude] = useState(75); // 0 - 100%

  const activeFreq = powerOn ? frequency * (multiplier / 100) : 0;

  return (
    <div className="flex flex-col gap-3 font-mono">
      {/* Frequency Readout Dial Header */}
      <div className="bg-[#1C2028] border border-[#3A4352] p-2.5 rounded-sm flex items-center justify-between shadow-inner">
        <div>
          <div className="text-[9px] text-[#7F8D9F] tracking-widest uppercase font-semibold">
            RF / AUDIO FREQUENCY
          </div>
          <div className="text-xl font-bold tracking-tight text-amber-400 flex items-baseline gap-1">
            <span>{powerOn ? activeFreq.toLocaleString() : '0000'}</span>
            <span className="text-xs text-[#95A5B8]">HZ</span>
          </div>
        </div>

        <div className="flex flex-col items-end gap-1">
          <span className="text-[8px] text-[#718092] uppercase">ATTENUATION</span>
          <span className="px-1.5 py-0.5 rounded bg-[#2B303A] border border-[#485366] text-xs font-bold text-[#E2E8F0]">
            {attenuation === 0 ? '0 dB' : `${attenuation} dB`}
          </span>
        </div>
      </div>

      {/* Main Vernier Frequency Tuning Slider / Dial */}
      <div className="bg-[#222731] border border-[#3B4454] p-2 rounded flex flex-col gap-1.5">
        <div className="flex items-center justify-between text-[9px] text-[#8EA0B5]">
          <span className="font-bold flex items-center gap-1">
            <Radio className="w-3 h-3 text-amber-400" />
            VERNIER TUNING (10 - 1000)
          </span>
          <span className="text-amber-300 font-bold">{frequency}</span>
        </div>
        <input
          type="range"
          min="10"
          max="1000"
          step="5"
          value={frequency}
          onChange={(e) => setFrequency(Number(e.target.value))}
          disabled={!powerOn}
          className="w-full accent-amber-500 bg-[#161920] h-2 rounded cursor-pointer disabled:opacity-40"
        />
        <div className="flex justify-between text-[8px] text-[#637285] px-1">
          <span>10</span>
          <span>250</span>
          <span>500</span>
          <span>750</span>
          <span>1000</span>
        </div>
      </div>

      {/* Function Selectors & Multipliers */}
      <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
        {/* Waveform Selector */}
        <div className="bg-[#222731] border border-[#3B4454] p-1.5 rounded flex flex-col items-center justify-between">
          <span className="text-[#8FA0B5] text-[9px] font-bold">WAVEFORM</span>
          <div className="flex flex-col gap-1 my-1 w-full">
            {(['SINE', 'SQUARE', 'TRIANGLE'] as const).map((w) => (
              <button
                key={w}
                type="button"
                onClick={() => setWaveType(w)}
                className={`w-full py-0.5 text-[8px] font-bold rounded border cursor-pointer ${
                  waveType === w
                    ? 'bg-amber-900/60 border-amber-600 text-amber-200'
                    : 'bg-[#181C22] border-[#363E4D] text-[#8695A8]'
                }`}
              >
                {w}
              </button>
            ))}
          </div>
        </div>

        {/* Range Multiplier */}
        <div className="bg-[#222731] border border-[#3B4454] p-1.5 rounded flex flex-col items-center justify-between">
          <span className="text-[#8FA0B5] text-[9px] font-bold">RANGE MULT</span>
          <div className="flex flex-col gap-1 my-1 w-full">
            {[1, 10, 100].map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMultiplier(m * 10)}
                className={`w-full py-0.5 text-[8px] font-bold rounded border cursor-pointer ${
                  multiplier === m * 10
                    ? 'bg-emerald-950/70 border-emerald-600 text-emerald-300'
                    : 'bg-[#181C22] border-[#363E4D] text-[#8695A8]'
                }`}
              >
                x{m * 10}
              </button>
            ))}
          </div>
        </div>

        {/* Output Level & Attenuation */}
        <div className="bg-[#222731] border border-[#3B4454] p-1.5 rounded flex flex-col items-center justify-between">
          <span className="text-[#8FA0B5] text-[9px] font-bold">OUTPUT ATTEN</span>
          <div className="flex flex-col gap-1 my-1 w-full">
            {[0, -20, -40].map((att) => (
              <button
                key={att}
                type="button"
                onClick={() => setAttenuation(att)}
                className={`w-full py-0.5 text-[8px] font-bold rounded border cursor-pointer ${
                  attenuation === att
                    ? 'bg-cyan-950/70 border-cyan-600 text-cyan-300'
                    : 'bg-[#181C22] border-[#363E4D] text-[#8695A8]'
                }`}
              >
                {att === 0 ? '0 dB' : `${att} dB`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Authentic BNC Connector Outputs */}
      <div className="flex items-center justify-around bg-[#191D24] p-2 rounded border border-[#323945]">
        {/* Main 50-Ohm BNC Jack */}
        <div className="flex items-center gap-2">
          <div className="relative w-6 h-6 rounded-full bg-[#3B4350] border-2 border-[#697486] flex items-center justify-center shadow-[inset_0_1px_3px_rgba(0,0,0,0.9)]">
            <div className="w-2.5 h-2.5 rounded-full bg-[#171A20] border border-[#525E70] flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-amber-400" />
            </div>
            {/* Bayonet locking lugs */}
            <div className="absolute top-0 w-1 h-0.5 bg-[#8C98AA]" />
            <div className="absolute bottom-0 w-1 h-0.5 bg-[#8C98AA]" />
          </div>
          <div className="text-[8px] text-[#93A2B5]">
            <div className="font-bold text-[#D8E1EC]">MAIN OUT</div>
            <div>50 OHM / 10V P-P</div>
          </div>
        </div>

        {/* Sync Pulse BNC Jack */}
        <div className="flex items-center gap-2">
          <div className="relative w-6 h-6 rounded-full bg-[#3B4350] border-2 border-[#697486] flex items-center justify-center shadow-[inset_0_1px_3px_rgba(0,0,0,0.9)]">
            <div className="w-2.5 h-2.5 rounded-full bg-[#171A20] border border-[#525E70] flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-amber-400" />
            </div>
          </div>
          <div className="text-[8px] text-[#93A2B5]">
            <div className="font-bold text-[#D8E1EC]">SYNC PULSE</div>
            <div>TTL 5V LEVEL</div>
          </div>
        </div>
      </div>
    </div>
  );
};
