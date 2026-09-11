import React from 'react';
import { ChassisBolt } from './ChassisBolt';

interface ChassisInsertProps {
  id: string;
  slotNumber: string;
  modelCode: string;
  title: string;
  subTitle?: string;
  children: React.ReactNode;
  active?: boolean;
  statusText?: string;
}

export const ChassisInsert: React.FC<ChassisInsertProps> = ({
  id,
  slotNumber,
  modelCode,
  title,
  subTitle,
  children,
  active = true,
  statusText = 'OPERATIONAL',
}) => {
  return (
    <div
      id={id}
      className="relative rounded-sm p-[3px] bg-gradient-to-b from-[#ACA191] via-[#8F8474] to-[#C8BEB0] shadow-[0_2px_5px_rgba(0,0,0,0.35),0_1px_1px_rgba(255,255,255,0.6)]"
    >
      {/* Heavy inner milled frame pocket */}
      <div
        className="relative rounded-sm p-3.5 sm:p-4 text-[#D8E0EA] flex flex-col justify-between overflow-hidden"
        style={{
          backgroundColor: '#2B303A',
          boxShadow: 'inset 0px 4px 10px rgba(0, 0, 0, 0.8)',
        }}
      >
        {/* Subtle brushed steel texture lines */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(90deg, #fff, #fff 1px, transparent 1px, transparent 4px)',
          }}
        />

        {/* 4 Bolted Corner Screws securing the steel insert into the cream rack */}
        <div className="absolute top-2 left-2 z-10">
          <ChassisBolt size={14} rotation={22} label={`Mount bolt TL ${modelCode}`} />
        </div>
        <div className="absolute top-2 right-2 z-10">
          <ChassisBolt size={14} rotation={84} label={`Mount bolt TR ${modelCode}`} />
        </div>
        <div className="absolute bottom-2 left-2 z-10">
          <ChassisBolt size={14} rotation={145} label={`Mount bolt BL ${modelCode}`} />
        </div>
        <div className="absolute bottom-2 right-2 z-10">
          <ChassisBolt size={14} rotation={63} label={`Mount bolt BR ${modelCode}`} />
        </div>

        {/* Module Header Strip */}
        <div className="flex items-center justify-between border-b border-[#3D4554] pb-2.5 mb-3 px-5 sm:px-6">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono tracking-widest px-1.5 py-0.5 rounded bg-[#1B1E24] text-[#A5B0C0] font-bold border border-[#3E4654]">
              {slotNumber}
            </span>
            <div>
              <h2 className="text-xs sm:text-sm font-mono font-bold tracking-wider text-[#F0F4F8] uppercase flex items-center gap-2">
                {title}
              </h2>
              {subTitle && (
                <p className="text-[9px] font-mono tracking-wide text-[#8B98AA] uppercase">
                  {subTitle}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Stamped Model Designation */}
            <span className="text-[10px] font-mono tracking-wider font-semibold text-[#8FA0B5] bg-[#222730] px-2 py-0.5 rounded-xs border border-[#3A4250] hidden sm:inline">
              {modelCode}
            </span>

            {/* Status Pilot Jewel */}
            <div className="flex items-center gap-1.5 bg-[#1C2028] px-2 py-0.5 rounded border border-[#363D4A]">
              <div
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  active
                    ? 'bg-emerald-400 shadow-[0_0_6px_#34d399]'
                    : 'bg-[#402020]'
                }`}
              />
              <span className="text-[8px] font-mono tracking-wider uppercase text-[#8896A8]">
                {active ? statusText : 'OFFLINE'}
              </span>
            </div>
          </div>
        </div>

        {/* Main Chassis Insert Content (Instrument Controls / Indicators) */}
        <div className="relative z-1 py-1 px-1 sm:px-2 min-h-[220px] flex flex-col justify-between">
          {children}
        </div>

        {/* Bottom Hardware Ventilation & Grounding Rail */}
        <div className="mt-3 pt-2 border-t border-[#373F4D] flex items-center justify-between px-5 sm:px-6 text-[9px] font-mono text-[#6A788C]">
          {/* Faux ventilation stamping */}
          <div className="flex items-center gap-1 opacity-70">
            <div className="w-4 h-0.5 bg-[#171A20] rounded-full shadow-[inset_0_1px_1px_rgba(0,0,0,0.8)]" />
            <div className="w-4 h-0.5 bg-[#171A20] rounded-full shadow-[inset_0_1px_1px_rgba(0,0,0,0.8)]" />
            <div className="w-4 h-0.5 bg-[#171A20] rounded-full shadow-[inset_0_1px_1px_rgba(0,0,0,0.8)]" />
            <div className="w-4 h-0.5 bg-[#171A20] rounded-full shadow-[inset_0_1px_1px_rgba(0,0,0,0.8)]" />
          </div>

          <div className="flex items-center gap-3">
            <span className="tracking-widest uppercase">CONAR LAB SYSTEM</span>
            <div className="flex items-center gap-1">
              <span className="text-[8px] text-[#4E5B6E]">GND</span>
              <div className="w-2.5 h-2.5 rounded-full bg-[#15181E] border border-[#485363] flex items-center justify-center shadow-inner">
                <div className="w-1 h-1 rounded-full bg-emerald-800" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
