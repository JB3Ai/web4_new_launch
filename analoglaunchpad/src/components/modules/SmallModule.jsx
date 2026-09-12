import React from 'react';
import { OscilloscopeScreen } from '../Shared/OscilloscopeScreen';
import { ExternalLink } from 'lucide-react';

/** Compact 2x2 grid panel blade for secondary launchpad bays. */
export const SmallModule = ({ app, slotNumber = app.slot, mainsPower = true }) => {
  const slot = app.slot || slotNumber;

  return (
    <article
      id={`module-${app.id}`}
      className="bg-transparent border border-slate-800/40 p-5 flex flex-col gap-4 relative group transition-all duration-300 rounded-none h-full"
      style={{ '--accent': app.accentColor }}
    >
      <div className="absolute top-0 left-0 w-3 h-px bg-slate-700" />
      <div className="absolute top-0 left-0 w-px h-3 bg-slate-700" />
      <div className="absolute bottom-0 right-0 w-3 h-px bg-slate-700" />
      <div className="absolute bottom-0 right-0 w-px h-3 bg-slate-700" />
      <div className="absolute inset-0 border border-transparent group-hover:border-slate-700/30 group-hover:shadow-[inset_0_0_10px_rgba(15,23,42,0.12)] transition-all duration-300 pointer-events-none rounded-none" />

      <div className="flex items-center justify-between border-b border-slate-800/60 pb-2">
        <span className="text-[11px] font-mono font-black tracking-widest text-slate-500">// {slot}</span>
        <span className="text-[10px] px-2 py-0.5 border border-slate-800 text-slate-400 bg-slate-900/40 font-bold tracking-wider rounded-none">
          {app.stack}
        </span>
      </div>

      <OscilloscopeScreen waveType={app.waveType} accentColor={app.accentColor} power={mainsPower} height={130} />

      <div className="border border-dashed border-slate-800/80 bg-slate-950/30 p-2 flex items-center justify-center h-16 relative rounded-none overflow-hidden group/diagram">
        {app.imagePlaceholder ? (
          <img
            src={app.imagePlaceholder}
            alt={`${app.title} architecture preview`}
            className="relative z-10 h-full w-full object-cover rounded-none transition-transform duration-300 group-hover/diagram:scale-95"
          />
        ) : (
          <span className="text-[9px] text-slate-500 font-black tracking-widest z-10">
            [ BLOCKS DIAGRAM // RENDER PENDING ]
          </span>
        )}
        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 0)', backgroundSize: '6px 6px' }}
        />
      </div>

      <div className="flex-1 flex flex-col justify-between min-h-[100px]">
        <div>
          <h3 className="text-base font-bold text-white uppercase mb-1 tracking-tight">{app.title}</h3>
          <p className="text-[11px] text-slate-400 font-mono line-clamp-2 leading-relaxed">{app.description}</p>
        </div>

        <a
          href={app.demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full h-11 bg-slate-950/80 border border-slate-800 text-white flex items-center justify-between px-4 font-bold text-xs uppercase tracking-wider group/btn relative mt-4 transition-all duration-150 hover:bg-slate-900/80 hover:border-slate-700 active:translate-y-0.5 rounded-none"
        >
          <span className="flex items-center gap-2.5">
            <span
              className="w-2.5 h-2.5 border border-black/40 animate-pulse transition-all duration-300 rounded-none shrink-0"
              style={{ backgroundColor: app.accentColor, boxShadow: `0 0 6px 2px ${app.accentColor}CC` }}
            />
            <span className="text-slate-300 font-mono tracking-widest text-[10px]">LAUNCH CHANNEL</span>
          </span>
          <ExternalLink size={12} className="text-slate-500 group-hover/btn:text-slate-200 transition-colors" />
        </a>
      </div>
    </article>
  );
};
