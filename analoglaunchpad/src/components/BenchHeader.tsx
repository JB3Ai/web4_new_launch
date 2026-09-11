import React from 'react';
import { ChassisBolt } from './ChassisBolt';
import { ShieldCheck, Zap } from 'lucide-react';

interface BenchHeaderProps {
  mainsPower: boolean;
  onToggleMains: () => void;
  benchVoltage: number;
}

export const BenchHeader: React.FC<BenchHeaderProps> = ({
  mainsPower,
  onToggleMains,
  benchVoltage,
}) => {
  return (
    <header className="relative w-full border-b-2 border-[#B3A99B] bg-[#C9BFB2] shadow-[0_4px_12px_rgba(0,0,0,0.12)] p-4 sm:p-5">
      {/* Rack mounting strip edge with screws */}
      <div className="absolute top-2 left-3 flex items-center gap-1.5 opacity-80">
        <ChassisBolt size={13} rotation={32} />
        <span className="text-[9px] font-mono tracking-widest text-[#5C5449] uppercase font-bold hidden sm:inline">
          BAY-01 / SEC-A
        </span>
      </div>

      <div className="absolute top-2 right-3 flex items-center gap-1.5 opacity-80">
        <span className="text-[9px] font-mono tracking-widest text-[#5C5449] uppercase font-bold hidden sm:inline">
          230V / 115V AC • 60HZ
        </span>
        <ChassisBolt size={13} rotation={105} />
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 mt-2 sm:mt-1">
        {/* Vintage Stamped Nameplate (Conar Style) */}
        <div className="flex items-center gap-4">
          <div className="relative border-2 border-[#695F52] bg-[#DFD7CB] px-4 py-2.5 rounded-sm shadow-[inset_0_1px_3px_rgba(255,255,255,0.7),0_2px_4px_rgba(0,0,0,0.15)] flex items-center gap-3">
            {/* Corner rivets on nameplate */}
            <div className="w-1.5 h-1.5 rounded-full bg-[#595045] shadow-inner absolute top-1 left-1" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#595045] shadow-inner absolute top-1 right-1" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#595045] shadow-inner absolute bottom-1 left-1" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#595045] shadow-inner absolute bottom-1 right-1" />

            <div className="w-8 h-8 rounded bg-[#2B303A] border border-[#524B40] flex items-center justify-center text-[#D2C9BD] font-black text-lg tracking-tighter shadow-inner">
              C
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm sm:text-base font-black tracking-[0.2em] text-[#22201D] font-mono uppercase">
                  CONAR INSTRUMENTS
                </h1>
                <span className="bg-[#2B303A] text-[#D2C9BD] text-[9px] font-mono px-1.5 py-0.5 rounded font-bold tracking-wider">
                  MODEL 255-BENCH
                </span>
              </div>
              <p className="text-[10px] tracking-wider text-[#5A5144] font-mono uppercase">
                Solid State Industrial Laboratory Test Console • Division NRI
              </p>
            </div>
          </div>

          {/* Stamped Calibration Tag */}
          <div className="hidden lg:flex flex-col border border-[#A89E90] bg-[#E2DBD1] px-2.5 py-1.5 rounded-xs text-[9px] font-mono shadow-inner text-[#4A4338]">
            <div className="flex items-center gap-1 font-bold text-[#2C2720]">
              <ShieldCheck className="w-3 h-3 text-emerald-700" />
              <span>NBS / NIST VERIFIED</span>
            </div>
            <span>CAL: 1976-OCT-14</span>
            <span className="text-[8px] text-[#6E6457]">OPERATOR ID: #882</span>
          </div>
        </div>

        {/* Master Power & Mains Telemetry Control */}
        <div className="flex items-center gap-5 bg-[#C2B8AA] border border-[#A89D8F] p-2.5 rounded shadow-[inset_0_2px_4px_rgba(0,0,0,0.12)]">
          {/* Mains Line Voltage Meter readout */}
          <div className="flex flex-col items-end">
            <span className="text-[9px] font-mono uppercase text-[#544D42] font-semibold tracking-wider">
              AC LINE VOLTAGE
            </span>
            <div className="flex items-baseline gap-1 font-mono text-sm font-bold text-[#1F1C18] bg-[#D7CFBF] px-2 py-0.5 rounded border border-[#B0A595]">
              <span className={mainsPower ? 'text-amber-900' : 'text-neutral-500'}>
                {mainsPower ? benchVoltage.toFixed(1) : '000.0'}
              </span>
              <span className="text-[10px] text-[#635A4D]">VAC</span>
            </div>
          </div>

          {/* Master Neon Pilot Jewel Lamp */}
          <div className="flex flex-col items-center gap-1">
            <div
              className={`w-6 h-6 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
                mainsPower
                  ? 'bg-red-500 border-red-700 shadow-[0_0_12px_#ef4444,inset_0_1px_3px_#ffffff]'
                  : 'bg-[#521C1C] border-[#3B1515] opacity-60 shadow-inner'
              }`}
            >
              <div
                className={`w-2.5 h-2.5 rounded-full ${
                  mainsPower ? 'bg-amber-200 blur-[0.5px]' : 'bg-[#732323]'
                }`}
              />
            </div>
            <span className="text-[8px] font-mono tracking-widest text-[#4C453B] uppercase font-bold">
              MAINS
            </span>
          </div>

          {/* Heavy Duty Laboratory Power Toggle Switch */}
          <button
            id="master-mains-power-toggle"
            type="button"
            onClick={onToggleMains}
            className={`group relative flex items-center gap-2 px-3 py-1.5 rounded border transition-all cursor-pointer ${
              mainsPower
                ? 'bg-[#2B303A] border-[#181C22] text-[#D2C9BD] shadow-[0_2px_4px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.2)]'
                : 'bg-[#DCD4C7] border-[#9E9385] text-[#3D372F] shadow-[0_1px_2px_rgba(0,0,0,0.2)]'
            }`}
          >
            <Zap className={`w-3.5 h-3.5 ${mainsPower ? 'text-amber-400 fill-amber-400' : 'text-neutral-500'}`} />
            <div className="flex flex-col items-start leading-none">
              <span className="text-[10px] font-mono font-black tracking-wider uppercase">
                {mainsPower ? 'SYS ENERGIZED' : 'POWER OFF'}
              </span>
              <span className="text-[8px] font-mono opacity-70">
                {mainsPower ? 'CLICK TO KILL' : 'CLICK TO START'}
              </span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
