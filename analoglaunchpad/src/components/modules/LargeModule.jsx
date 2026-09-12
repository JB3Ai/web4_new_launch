import React from 'react';
import { OscilloscopeScreen } from '../Shared/OscilloscopeScreen';
import { ExternalLink, Terminal } from 'lucide-react';

/** Full-width heavy chassis module for priority launchpad bays. */
export const LargeModule = ({ app, slotNumber = app.slot, mainsPower = true }) => {
  const slot = app.slot || slotNumber;

  return (
    <article
      id={`module-${app.id}`}
      className="bg-transparent border border-slate-800/40 p-6 flex flex-col lg:flex-row gap-6 relative group transition-all duration-300 rounded-none"
      style={{ '--accent': app.accentColor }}
    >
      <div className="absolute top-0 left-0 w-3 h-px bg-slate-700" />
      <div className="absolute top-0 left-0 w-px h-3 bg-slate-700" />
      <div className="absolute bottom-0 right-0 w-3 h-px bg-slate-700" />
      <div className="absolute bottom-0 right-0 w-px h-3 bg-slate-700" />
      <div className="absolute inset-0 border border-transparent group-hover:border-slate-700/30 group-hover:shadow-[inset_0_0_12px_rgba(30,41,59,0.15)] transition-all duration-300 pointer-events-none rounded-none" />

      <div className="flex-1 flex flex-col justify-between z-10">
        <div>
          <div className="flex items-center justify-between border-b border-slate-800/60 pb-2 mb-3">
            <span className="text-[11px] font-mono font-black tracking-widest text-slate-500">// {slot}</span>
            <span className="text-[10px] px-2 py-0.5 border border-slate-800 text-slate-400 bg-slate-900/40 font-bold tracking-wider rounded-none">
              CORE_HOST // {app.stack}
            </span>
          </div>

          <h2 className="text-lg font-bold tracking-tight text-white mb-2 uppercase group-hover:text-slate-200 transition-colors">
            {app.title}
          </h2>

          <div className="bg-slate-950/40 border border-slate-900/60 p-3 mb-4 flex items-start gap-2 rounded-none">
            <Terminal size={14} className="text-slate-600 mt-0.5 shrink-0" />
            <p className="text-[12px] text-slate-400 font-mono leading-relaxed">
              <span className="text-slate-600 font-bold">&gt;_ </span>
              {app.description}
            </p>
          </div>
        </div>

        <div className="border border-dashed border-slate-800/80 bg-slate-950/30 p-2 flex items-center justify-center h-24 mb-4 relative rounded-none group/preview overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.02] pointer-events-none"
            style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 0)', backgroundSize: '8px 8px' }}
          />
          {app.imagePlaceholder ? (
            <img
              src={app.imagePlaceholder}
              alt={`${app.title} preview`}
              className="relative z-10 h-full w-full object-cover rounded-none transition-transform duration-300 group-hover/preview:scale-95"
            />
          ) : (
            <div className="text-center z-10">
              <span className="text-[10px] text-slate-500 font-bold tracking-widest block mb-0.5">[ DIAGNOSTIC PREVIEW NODE ]</span>
              <span className="text-[9px] text-slate-600 font-mono block">RENDER PENDING</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-4 text-[10px] text-slate-500 border-t border-slate-900/80 pt-3 font-mono">
          <div>BEAM_OUTPUT: <span className="text-slate-400">100%</span></div>
          <div>SIGNAL_GAIN: <span className="text-slate-400">0.0 dB</span></div>
          <div className="ml-auto flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-emerald-500 shadow-[0_0_4px_#10B981]" />
            <span className="text-slate-400 font-bold">READY</span>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-[360px] shrink-0 flex flex-col justify-between gap-4 z-10">
        <OscilloscopeScreen waveType={app.waveType} accentColor={app.accentColor} power={mainsPower} />

        <a
          href={app.demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full h-14 bg-slate-950/80 border border-slate-800 text-white flex items-center justify-between px-5 font-black text-sm uppercase tracking-widest group/btn relative transition-all duration-150 hover:bg-slate-900/80 hover:border-slate-700 active:translate-y-0.5 rounded-none"
        >
          <span className="flex items-center gap-3">
            <span
              className="w-3 h-3 border border-black/40 animate-pulse transition-all duration-300 rounded-none shrink-0"
              style={{ backgroundColor: app.accentColor, boxShadow: `0 0 8px 2px ${app.accentColor}CC` }}
            />
            <span className="text-slate-200 tracking-widest font-mono text-xs">LAUNCH ACTIVE DEMO</span>
          </span>
          <ExternalLink size={16} className="text-slate-500 group-hover/btn:text-slate-200 transition-colors" />
        </a>
      </div>
    </article>
  );
};
