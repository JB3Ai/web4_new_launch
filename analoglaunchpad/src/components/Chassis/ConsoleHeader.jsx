import React from 'react';
import { Activity } from 'lucide-react';

/** Master console readout and sector filter controller. */
export const ConsoleHeader = ({ sectors, activeFilter, onFilterChange }) => (
  <header className="border border-slate-800/50 bg-slate-950/70 p-4 flex flex-col md:flex-row items-center justify-between gap-4 relative rounded-none">
    <div className="flex items-center gap-3">
      <div className="p-2 border border-slate-800 bg-slate-900/40 rounded-none">
        <Activity className="text-emerald-500 animate-pulse" size={18} />
      </div>
      <div>
        <h1 className="text-xs font-black tracking-widest text-white uppercase font-mono">
          JB³ SYSTEM MANAGER // MULTI-CHANNEL PRODUCTION LAUNCHPAD
        </h1>
        <p className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mt-0.5">
          ENVIRONMENT: MASTER_CONSOLE_ACTIVE // CHASSIS ONLINE
        </p>
      </div>
    </div>

    <nav
      aria-label="Launchpad sector filters"
      className="flex items-center flex-wrap gap-1 border border-slate-900 bg-slate-950 p-1 rounded-none"
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
                ? 'bg-slate-900 border-slate-700 text-white font-bold shadow-md shadow-black/40'
                : 'bg-transparent border-transparent text-slate-500 hover:text-slate-300 hover:bg-slate-900/30'
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
