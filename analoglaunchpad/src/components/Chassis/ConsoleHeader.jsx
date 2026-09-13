import React from 'react';
import { Activity } from 'lucide-react';

/** Master console readout and sector filter controller. */
export const ConsoleHeader = ({ sectors, activeFilter, onFilterChange }) => (
  <header className="border-2 border-[#1E222A] bg-[#1E222A] p-4 flex flex-col md:flex-row items-center justify-between gap-4 relative rounded-none shadow-[inset_0_0_12px_rgba(0,0,0,0.72),0_3px_0_rgba(20,24,29,0.5)]">
    <div className="flex items-center gap-3">
      <div className="p-2 border-2 border-[#2A303C] bg-[#1E222A] rounded-none shadow-[inset_0_0_8px_rgba(0,0,0,0.7)]">
        <Activity className="text-[#7BE28C] animate-pulse" size={18} />
      </div>
      <div>
        <h1 className="text-xs font-black tracking-widest text-white uppercase font-mono">
          JB³ SYSTEM MANAGER // 19-INCH INSTRUMENTATION MATRIX
        </h1>
        <p className="text-[9px] font-mono text-slate-400 uppercase tracking-widest mt-0.5">
          CHASSIS STATE: HIGH-CONTRAST LINK INTEGRATION DEPLOYED
        </p>
      </div>
    </div>

    <nav
      aria-label="Launchpad sector filters"
      className="flex items-center flex-wrap gap-1 border-2 border-[#2A303C] bg-[#1E222A] p-1 rounded-none shadow-[inset_0_0_9px_rgba(0,0,0,0.72)]"
    >
      {sectors.map((sector) => {
        const isActive = activeFilter === sector.id;
        return (
          <button
            key={sector.id}
            type="button"
            aria-pressed={isActive}
            onClick={() => onFilterChange(sector.id)}
            className={`px-3 py-1.5 text-[10px] font-mono tracking-widest uppercase transition-all border rounded-none ${
              isActive
                ? 'bg-[#E09A22] border-[#7A4B08] text-[#19140B] font-black shadow-[0_2px_0_#7A4B08,inset_0_1px_0_rgba(255,255,255,0.35)]'
                : 'bg-[#282E37] border-[#47505B] text-slate-300 hover:text-[#FFF8EC] hover:bg-[#343C47]'
            }`}
          >
            {sector.label}
          </button>
        );
      })}
    </nav>
  </header>
);

export default ConsoleHeader;
