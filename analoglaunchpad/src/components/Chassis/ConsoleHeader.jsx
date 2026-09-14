import React from 'react';
import { Activity } from 'lucide-react';

/** Master console readout and sector filter controller. */
export const ConsoleHeader = ({ sectors, activeFilter, onFilterChange }) => (
  <header className="border-2 border-[#1E222A] bg-[#1E222A] p-4 flex flex-col md:flex-row items-center justify-between gap-4 relative rounded-none shadow-md">
    <div className="flex items-center gap-3">
      <div className="p-1.5 bg-black border border-slate-800 rounded-none">
        <Activity className="text-emerald-500 animate-pulse" size={16} />
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
      className="flex items-center flex-wrap gap-1 border border-black bg-slate-950 p-1 rounded-none"
    >
      {sectors.map((sector) => {
        const isActive = activeFilter === sector.id;
        return (
          <button
            key={sector.id}
            type="button"
            aria-pressed={isActive}
            onClick={() => onFilterChange(sector.id)}
            className={`px-3 py-1.5 text-[10px] font-mono tracking-widest uppercase transition-all border font-black rounded-none ${
              isActive
                ? 'bg-slate-800 border-slate-700 text-white shadow-inner'
                : 'bg-transparent border-transparent text-slate-500 hover:text-slate-300'
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
