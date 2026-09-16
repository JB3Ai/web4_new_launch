import React, { useState } from 'react';
import { OscilloscopeScreen } from '../Shared/OscilloscopeScreen';
import { playKnobClick, playToggleSound } from '../../utils/audioEffects';

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

/** Compact 2x2 grid panel blade for secondary launchpad bays. */
export const SmallModule = ({
  app,
  slotNumber = app.slot,
  mainsPower = true,
  isPowerOn,
  onPowerChange,
}) => {
  const slot = app.slot || slotNumber;
  const [localPowerOn, setLocalPowerOn] = useState(mainsPower);
  const isPowerControlled = typeof onPowerChange === 'function';
  const powerOn = isPowerControlled ? Boolean(isPowerOn) : localPowerOn;
  const isPending = app.imagePlaceholder === 'RENDER_PENDING';
  const previewSource = !isPending && app.imagePlaceholder
    ? (app.imagePlaceholder.startsWith('/') ? app.imagePlaceholder : `/assets/previews/${app.imagePlaceholder}`)
    : null;
  const [failedPreviewSource, setFailedPreviewSource] = useState(null);
  const previewUnavailable = !previewSource || failedPreviewSource === previewSource;

  const togglePower = () => {
    const nextPowerState = !powerOn;
    playToggleSound(nextPowerState);

    if (isPowerControlled) {
      onPowerChange(nextPowerState);
      return;
    }

    setLocalPowerOn(nextPowerState);
  };

  return (
    <article
      id={`module-${app.id}`}
      className="bg-[#0A0D10] text-slate-200 border-4 border-[#1A1F26] p-5 flex flex-col gap-4 relative group transition-colors duration-200 rounded-none h-full justify-between select-none shadow-[0_15px_30px_rgba(0,0,0,0.5),inset_0_4px_20px_rgba(0,0,0,0.9)]"
      style={{ '--accent': app.accentColor }}
    >
      <BayScrew className="top-1.5 left-1.5" rotation={18} />
      <BayScrew className="top-1.5 right-1.5" rotation={112} />
      <BayScrew className="bottom-1.5 left-1.5" rotation={72} />
      <BayScrew className="right-1.5 bottom-1.5" rotation={142} />
      <div className="absolute inset-[3px] border border-[#303946] pointer-events-none rounded-none" />
      <div className="absolute inset-0 border border-transparent group-hover:border-slate-700/30 transition-all duration-300 pointer-events-none rounded-none" />

      <div className="relative z-10">
        <div className="flex items-center justify-between border-2 border-black/80 bg-[#11161D] px-3 py-2 mb-3">
          <span className="text-[10px] font-mono font-black tracking-widest text-[#E9DED0]">LAUNCH BAY // {slot}</span>
          <span className="text-[9px] px-2 py-0.5 border border-[#46505E] text-slate-300 bg-[#272E38] font-bold tracking-wider rounded-none">
            {app.stack}
          </span>
        </div>

        <div className="px-2">
          <h3 className="text-base font-black text-[#FFF8EC] uppercase mb-2 tracking-tight">{app.title}</h3>

          <OscilloscopeScreen
            waveType={powerOn ? app.waveType : 'flat'}
            color={app.accentColor}
            power={powerOn}
            height={125}
            isSmall
          />

          <div className="border border-slate-900 bg-slate-950 p-1 h-28 my-3 relative flex items-center justify-center overflow-hidden rounded-none shadow-inner group/img">
            {!powerOn ? (
              <span className="text-[8px] text-slate-600 font-mono tracking-widest uppercase">// STANDBY MODE //</span>
            ) : isPending ? (
              <span className="text-[9px] text-amber-500/80 font-mono font-black tracking-widest animate-pulse">// BUFFERING TELEMETRY //</span>
            ) : previewUnavailable ? (
              <span className="text-[8px] text-slate-600 font-mono tracking-widest uppercase">// PREVIEW LINK UNAVAILABLE //</span>
            ) : (
              <img
                src={previewSource}
                alt={app.title}
                className="w-full h-full object-cover transition-all duration-500 transform group-hover:scale-105 opacity-25 filter grayscale contrast-125 brightness-75 group-hover:opacity-100 group-hover:filter-none group-hover:brightness-100 mix-blend-normal rounded-none"
                onError={() => setFailedPreviewSource(previewSource)}
              />
            )}
            <span className="absolute top-1 left-1 text-[7px] text-slate-600 font-mono bg-black/40 px-1 pointer-events-none">PREVIEW_02</span>
          </div>

          <p className="mt-2 px-2 text-[11px] text-slate-300 font-mono tracking-tight leading-relaxed line-clamp-2">
            {app.description}
          </p>
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-between border-t-2 border-black/80 pt-3 mt-1 px-2">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={togglePower}
            aria-pressed={powerOn}
            aria-label={`${powerOn ? 'Switch off' : 'Switch on'} ${app.title}`}
            className="w-6 h-9 bg-[#12151B] border border-slate-950 p-0.5 relative flex flex-col justify-between items-center shadow-[inset_0_2px_5px_rgba(0,0,0,0.8)] focus:outline-none focus-visible:ring-1 focus-visible:ring-red-400 rounded-none cursor-pointer"
          >
            <span
              className={`w-4 h-4 transition-all duration-100 rounded-none flex items-center justify-center text-[7px] font-black text-white/40 ${
                powerOn
                  ? 'bg-gradient-to-b from-red-600 to-red-500 border-red-400 translate-y-0 shadow-[0_2px_0_#991B1B]'
                  : 'bg-gradient-to-b from-slate-700 to-slate-600 border-slate-500 translate-y-3 shadow-[0_-2px_0_#1E293B]'
              }`}
            >
              {powerOn ? 'I' : 'O'}
            </span>
          </button>
          <span
            aria-hidden="true"
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              powerOn ? 'bg-red-500 shadow-[0_0_8px_2px_rgba(239,68,68,0.6)]' : 'bg-slate-900 shadow-none'
            }`}
          />
        </div>

        <a
          href={app.demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={playKnobClick}
          aria-disabled={!powerOn}
          aria-label={`Launch ${app.title}`}
          className={`w-12 h-12 rounded-full border-2 border-slate-950 bg-gradient-to-b from-slate-800 via-slate-700 to-slate-900 flex items-center justify-center relative shadow-md active:translate-y-0.5 transition-all duration-150 group/btn cursor-pointer ${
            !powerOn ? 'opacity-20 pointer-events-none' : ''
          }`}
        >
          <span className="absolute inset-0.5 rounded-full border border-slate-600/30 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
          <span
            className="w-8 h-8 rounded-full border border-black/40 flex items-center justify-center text-[7px] font-black text-white transition-all duration-300 animate-[pulse_1.6s_infinite_ease-in-out]"
            style={{
              backgroundColor: app.accentColor,
              boxShadow: `0 0 10px 3px ${app.accentColor}cc`,
              textShadow: '0 1px 1px rgba(0,0,0,0.6)',
            }}
          >
            RUN
          </span>
        </a>
      </div>
    </article>
  );
};

export default SmallModule;
