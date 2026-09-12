import React, { useState } from 'react';
import { OscilloscopeScreen } from '../Shared/OscilloscopeScreen';
import { ExternalLink } from 'lucide-react';

/** Compact 2x2 grid panel blade for secondary launchpad bays. */
export const SmallModule = ({ app, slotNumber = app.slot, mainsPower = true }) => {
  const slot = app.slot || slotNumber;
  const previewSource = app.imagePlaceholder && app.imagePlaceholder !== 'RENDER_PENDING'
    ? `/assets/previews/${app.imagePlaceholder}`
    : null;
  const [failedPreviewSource, setFailedPreviewSource] = useState(null);
  const previewUnavailable = !previewSource || failedPreviewSource === previewSource;

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

      <OscilloscopeScreen
        waveType={app.waveType}
        accentColor={app.accentColor}
        power={mainsPower}
        height={130}
        isSmall
      />

      <div className={`border border-slate-800/80 flex items-center justify-center h-24 mb-4 border-dashed relative rounded-none overflow-hidden group/img ${previewUnavailable ? 'bg-[#050709]' : 'bg-slate-950/40'}`}>
        {previewUnavailable ? (
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-[#050709]" role="status">
            <div
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage: 'linear-gradient(rgba(245,158,11,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(245,158,11,0.1) 1px, transparent 1px)',
                backgroundSize: '12px 12px',
              }}
            />
            <div className="absolute left-1/2 top-2 bottom-2 w-px -translate-x-1/2 bg-amber-500/25" />
            <div className="absolute top-1/2 left-2 right-2 h-px -translate-y-1/2 bg-amber-500/25" />
            <div className="absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 border border-amber-500/30" />
            <span
              className="relative border border-amber-500/30 bg-[#050709]/90 px-3 py-2 text-center font-mono text-[10px] font-black tracking-[0.16em] text-amber-400 animate-pulse"
              style={{ textShadow: '0 0 8px rgba(245,158,11,0.45)' }}
            >
              OFFLINE // TELEMETRY LINK RENDERING...
            </span>
          </div>
        ) : (
          <>
            <img
              src={previewSource}
              alt={app.title}
              className="w-full h-full object-cover opacity-40 group-hover/img:opacity-75 transition-all duration-300 filter grayscale contrast-125 brightness-90 mix-blend-screen"
              onError={() => setFailedPreviewSource(previewSource)}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none bg-slate-950/20">
              <span className="text-[10px] text-slate-500 font-bold tracking-widest font-mono">// MODULE BLOCK: {app.slot} //</span>
            </div>
          </>
        )}
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
