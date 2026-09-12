import React, { useState } from 'react';
import { OscilloscopeScreen } from '../Shared/OscilloscopeScreen';
import { ExternalLink, Terminal } from 'lucide-react';

/** Full-width heavy chassis module for priority launchpad bays. */
export const LargeModule = ({ app, slotNumber = app.slot, mainsPower = true }) => {
  const slot = app.slot || slotNumber;
  const previewSource = app.imagePlaceholder && app.imagePlaceholder !== 'RENDER_PENDING'
    ? `/assets/previews/${app.imagePlaceholder}`
    : null;
  const [failedPreviewSource, setFailedPreviewSource] = useState(null);
  const previewUnavailable = !previewSource || failedPreviewSource === previewSource;

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
