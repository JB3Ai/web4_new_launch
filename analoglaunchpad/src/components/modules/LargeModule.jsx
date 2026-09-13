import React, { useState } from 'react';
import { OscilloscopeScreen } from '../Shared/OscilloscopeScreen';
import { ExternalLink, Terminal } from 'lucide-react';

const BayScrew = ({ className, rotation = 45 }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 20 20"
    className={`absolute z-20 h-4 w-4 pointer-events-none ${className}`}
  >
    <polygon points="10,1.5 17.4,5.75 17.4,14.25 10,18.5 2.6,14.25 2.6,5.75" fill="#101318" stroke="#56606D" strokeWidth="1.35" />
    <circle cx="10" cy="10" r="4.7" fill="#252B34" />
    <path
      d="M6.5 6.5L13.5 13.5M13.5 6.5L6.5 13.5"
      stroke="#15191F"
      strokeWidth="1.6"
      strokeLinecap="square"
      transform={`rotate(${rotation} 10 10)`}
    />
  </svg>
);

/** Full-width heavy chassis module for priority launchpad bays. */
export const LargeModule = ({ app, slotNumber = app.slot, mainsPower = true }) => {
  const slot = app.slot || slotNumber;
  const previewSource = app.imagePlaceholder && app.imagePlaceholder !== 'RENDER_PENDING'
    ? (app.imagePlaceholder.startsWith('/') ? app.imagePlaceholder : `/assets/previews/${app.imagePlaceholder}`)
    : null;
  const [failedPreviewSource, setFailedPreviewSource] = useState(null);
  const previewUnavailable = !previewSource || failedPreviewSource === previewSource;

  return (
    <article
      id={`module-${app.id}`}
      className="bg-[#0A0D10] border-4 border-[#1A1F26] p-5 flex flex-col lg:flex-row gap-5 relative group transition-colors duration-200 rounded-none shadow-[inset_0_0_20px_rgba(0,0,0,0.9),0_5px_0_#11151B,0_12px_24px_rgba(0,0,0,0.34)]"
      style={{ '--accent': app.accentColor }}
    >
      <BayScrew className="top-1.5 left-1.5" rotation={18} />
      <BayScrew className="top-1.5 right-1.5" rotation={112} />
      <BayScrew className="bottom-1.5 left-1.5" rotation={72} />
      <BayScrew className="right-1.5 bottom-1.5" rotation={142} />
      <div className="absolute inset-[3px] border border-[#303946] pointer-events-none rounded-none" />

      <div className="flex-1 flex flex-col justify-between z-10">
        <div>
          <div className="flex items-center justify-between border-2 border-black/80 bg-[#11161D] px-3 py-2 mb-3">
            <span className="text-[11px] font-mono font-black tracking-widest text-[#E9DED0]">LAUNCH BAY // {slot}</span>
            <span className="text-[10px] px-2 py-0.5 border border-[#46505E] text-slate-300 bg-[#272E38] font-bold tracking-wider rounded-none">
              CORE_HOST // {app.stack}
            </span>
          </div>

          <h2 className="text-lg font-bold tracking-tight text-[#FFF8EC] mb-2 uppercase">
            {app.title}
          </h2>

          <div className="bg-[#151A21] border-2 border-black/70 p-3 mb-4 flex items-start gap-2 rounded-none shadow-[inset_0_0_10px_rgba(0,0,0,0.55)]">
            <Terminal size={14} className="text-amber-300/70 mt-0.5 shrink-0" />
            <p className="text-[12px] text-slate-300 font-mono leading-relaxed">
              <span className="text-amber-300/70 font-bold">&gt;_ </span>
              {app.description}
            </p>
          </div>
        </div>

        <div className={`border-2 border-black/80 flex items-center justify-center h-28 mb-4 relative rounded-none overflow-hidden group/img shadow-[inset_0_0_12px_rgba(0,0,0,0.8)] ${previewUnavailable ? 'bg-[#050709]' : 'bg-[#0E1319]'}`}>
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
                className="w-full h-full object-cover opacity-65 group-hover/img:opacity-90 transition-opacity duration-200 filter grayscale contrast-125 brightness-110"
                onError={() => setFailedPreviewSource(previewSource)}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none bg-[#0A0D11]/35">
                <span className="text-[10px] text-[#E9DED0] font-bold tracking-widest font-mono">// PREVIEW MONITOR: {app.slot} //</span>
              </div>
            </>
          )}
        </div>

        <div className="flex items-center gap-4 text-[10px] text-slate-400 border-t-2 border-black/70 pt-3 font-mono">
          <div>BEAM_OUTPUT: <span className="text-[#E9DED0]">100%</span></div>
          <div>SIGNAL_GAIN: <span className="text-[#E9DED0]">0.0 dB</span></div>
          <div className="ml-auto flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-[#62D878] shadow-[0_0_4px_rgba(98,216,120,0.65)]" />
            <span className="text-[#E9DED0] font-bold">READY</span>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-[360px] shrink-0 flex flex-col justify-between gap-4 z-10">
        <OscilloscopeScreen waveType={app.waveType} accentColor={app.accentColor} power={mainsPower} />

        <div className="border-t-2 border-black/80 pt-3">
          <p className="mb-2 text-center font-mono text-[9px] font-black tracking-[0.1em] text-[#FFE5A0]">
            &gt;&gt;&gt; SYSTEM READY // INITIATE LAUNCH &lt;&lt;&lt;
          </p>
          <a
            href={app.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full h-16 bg-[#D94132] border-2 border-[#641C17] text-[#FFF8EC] flex items-center justify-between px-5 font-black text-sm uppercase tracking-widest group/btn relative transition-colors duration-150 hover:bg-[#EF4444] active:translate-y-1 rounded-none shadow-[0_5px_0_#671E18,0_8px_12px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.28)]"
          >
            <span className="flex items-center gap-3">
              <span className="w-3 h-3 border border-black/50 bg-[#FFE09A] animate-pulse rounded-none shrink-0 shadow-[0_0_4px_rgba(255,224,154,0.7)]" />
              <span className="tracking-widest font-mono text-xs">LAUNCH ACTIVE DEMO</span>
            </span>
            <ExternalLink size={16} className="text-[#FFF8EC] transition-transform group-hover/btn:translate-x-0.5" />
          </a>
        </div>
      </div>
    </article>
  );
};
