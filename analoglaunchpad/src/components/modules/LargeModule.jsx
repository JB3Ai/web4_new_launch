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

/** Full-width heavy chassis module for priority launchpad bays. */
export const LargeModule = ({
  app,
  slotNumber = app.slot,
  mainsPower = true,
  isPowerOn,
  onPowerChange,
}) => {
  const slot = app.slot || slotNumber;
  const [localPowerOn, setLocalPowerOn] = useState(mainsPower);
  const [knobValue, setKnobValue] = useState(1);
  const isPowerControlled = typeof onPowerChange === 'function';
  const powerOn = isPowerControlled ? Boolean(isPowerOn) : localPowerOn;
  const isPending = app.imagePlaceholder === 'RENDER_PENDING';
  const previewSource = !isPending && app.imagePlaceholder
    ? (app.imagePlaceholder.startsWith('/') ? app.imagePlaceholder : `/assets/previews/${app.imagePlaceholder}`)
    : null;
  const [failedPreviewSource, setFailedPreviewSource] = useState(null);
  const previewUnavailable = !previewSource || failedPreviewSource === previewSource;
  const previewObjectPosition = slot === 'BAY-01'
    ? 'center top'
    : slot === 'BAY-04'
      ? 'center 20%'
      : 'center';

  const togglePower = () => {
    const nextPowerState = !powerOn;
    playToggleSound(nextPowerState);

    if (isPowerControlled) {
      onPowerChange(nextPowerState);
      return;
    }

    setLocalPowerOn(nextPowerState);
  };

  const adjustSignalGain = () => {
    playKnobClick();
    setKnobValue((value) => (value >= 3 ? 1 : value + 1));
  };

  return (
    <article
      id={`module-${app.id}`}
      className="bg-[#0A0D10] text-slate-200 border-4 border-[#1A1F26] p-6 flex flex-col lg:flex-row gap-6 relative group transition-colors duration-200 rounded-none shadow-[0_15px_30px_rgba(0,0,0,0.5),inset_0_4px_20px_rgba(0,0,0,0.9)] select-none"
      style={{ '--accent': app.accentColor }}
    >
      <BayScrew className="top-1.5 left-1.5" rotation={18} />
      <BayScrew className="top-1.5 right-1.5" rotation={112} />
      <BayScrew className="bottom-1.5 left-1.5" rotation={72} />
      <BayScrew className="right-1.5 bottom-1.5" rotation={142} />
      <div className="absolute inset-[3px] border border-[#303946] pointer-events-none rounded-none" />

      <div className="relative z-10 min-w-0 flex-1 flex flex-col justify-between pt-2 px-2">
        <div>
          <div className="flex items-center justify-between border-2 border-black/80 bg-[#11161D] px-3 py-2 mb-3">
            <span className="text-[11px] font-mono font-black tracking-widest text-[#E9DED0]">LAUNCH BAY // {slot}</span>
            <span className="text-[10px] px-2 py-0.5 border border-[#46505E] text-slate-300 bg-[#272E38] font-bold tracking-wider rounded-none">
              CORE_HOST // {app.stack}
            </span>
          </div>

          <div className="px-2">
            <h2 className="text-xl font-black tracking-tight text-[#FFF8EC] mb-2 uppercase">
              {app.title}
            </h2>

            <div className="overflow-hidden whitespace-nowrap bg-slate-950/60 border border-slate-900/60 p-2.5 mb-4 relative rounded-none shadow-inner">
              <span className="inline-block animate-[marquee_25s_linear_infinite] text-[12px] text-emerald-400/90 font-mono tracking-wide">
                &gt;&gt;&gt; CHANNEL ACTIVE // DIAGNOSTIC LOG: {app.description} // LINK STABLE // INITIATE READY STATE...
              </span>
              <span className="absolute top-0 bottom-0 left-0 w-3 bg-gradient-to-r from-slate-950 to-transparent pointer-events-none" />
            </div>
          </div>
        </div>

        <div className={`border-2 border-black/80 flex items-center justify-center h-24 my-3 relative rounded-none overflow-hidden group/img shadow-[inset_0_0_12px_rgba(0,0,0,0.8)] ${previewUnavailable ? 'bg-[#050709]' : 'bg-[#0E1319]'}`}>
          {!powerOn ? (
            <span className="text-[9px] text-slate-600 font-mono tracking-widest uppercase">// SLOT SYSTEM BUS SHUTDOWN //</span>
          ) : isPending || previewUnavailable ? (
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
                className="w-full h-full object-cover opacity-30 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-500 filter grayscale contrast-125 group-hover:filter-none mix-blend-normal"
                style={{ objectPosition: previewObjectPosition }}
                onError={() => setFailedPreviewSource(previewSource)}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none bg-[#0A0D11]/35 group-hover:bg-[#0A0D11]/10 transition-colors duration-500">
                <span className="text-[10px] text-[#E9DED0] font-bold tracking-widest font-mono">// PREVIEW MONITOR: {slot} //</span>
              </div>
            </>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-4 px-2 text-[10px] text-slate-400 border-t-2 border-black/70 pt-3 font-mono">
          <div>BEAM_OUTPUT: <span className="text-[#E9DED0]">{powerOn ? '100%' : '0%'}</span></div>
          <div>SIGNAL_GAIN: <span className="text-[#E9DED0]">{knobValue}.0 dB</span></div>
          <div className="ml-auto flex items-center gap-1.5">
            <span className={`w-1.5 h-1.5 ${powerOn ? 'bg-[#62D878] shadow-[0_0_4px_rgba(98,216,120,0.65)]' : 'bg-slate-700'}`} />
            <span className="text-[#E9DED0] font-bold">{powerOn ? 'READY' : 'STANDBY'}</span>
          </div>
        </div>
      </div>

      <div className="relative z-10 w-full lg:w-[330px] shrink-0 flex flex-col justify-between gap-4 pt-2 px-2">
        <OscilloscopeScreen
          waveType={powerOn ? app.waveType : 'flat'}
          color={app.accentColor}
          power={powerOn}
          amplitude={(knobValue * 0.45) + 0.55}
          height={160}
        />

        <div className="border border-slate-900 bg-slate-950/60 p-3 flex items-center justify-between gap-3 shadow-inner">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={togglePower}
              aria-pressed={powerOn}
              aria-label={`${powerOn ? 'Switch off' : 'Switch on'} ${app.title}`}
              className="w-7 h-10 bg-[#12151B] border border-slate-950 p-0.5 relative flex flex-col justify-between items-center shadow-[inset_0_2px_5px_rgba(0,0,0,0.8)] focus:outline-none focus-visible:ring-1 focus-visible:ring-red-400 rounded-none cursor-pointer"
            >
              <span
                className={`w-5 h-4 transition-all duration-100 rounded-none flex items-center justify-center text-[8px] font-black text-white/50 ${
                  powerOn
                    ? 'bg-gradient-to-b from-red-600 to-red-500 border-red-400 translate-y-0 shadow-[0_2px_0_#991B1B]'
                    : 'bg-gradient-to-b from-slate-700 to-slate-600 border-slate-500 translate-y-4 shadow-[0_-2px_0_#1E293B]'
                }`}
              >
                {powerOn ? 'I' : 'O'}
              </span>
            </button>
            <div>
              <p className="text-[9px] font-mono font-black tracking-widest text-slate-300">POWER BUS</p>
              <p className={`text-[8px] font-mono tracking-wider ${powerOn ? 'text-red-400' : 'text-slate-600'}`}>{powerOn ? 'CHANNEL ENERGISED' : 'CHANNEL OFFLINE'}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={adjustSignalGain}
            aria-label={`Set ${app.title} signal gain`}
            className="flex items-center gap-2 text-right focus:outline-none focus-visible:ring-1 focus-visible:ring-emerald-400 rounded-none cursor-pointer"
          >
            <div>
              <p className="text-[8px] text-slate-500 font-mono font-black tracking-widest">VECTOR GAIN</p>
              <p className="text-[10px] text-emerald-300 font-mono font-black">x{knobValue}.0</p>
            </div>
            <span
              className="w-9 h-9 rounded-full border-2 border-slate-950 bg-gradient-to-br from-slate-500 via-slate-700 to-slate-950 shadow-[inset_0_2px_3px_rgba(255,255,255,0.16),0_2px_4px_rgba(0,0,0,0.85)] relative transition-transform duration-150"
              style={{ transform: `rotate(${knobValue * 45}deg)` }}
            >
              <span className="absolute top-1 left-1/2 h-2.5 w-px -translate-x-1/2 bg-emerald-200 shadow-[0_0_3px_rgba(110,231,183,0.9)]" />
            </span>
          </button>
        </div>

        <p className="text-center font-mono text-[9px] font-black tracking-[0.1em] text-[#FFE5A0]">
          &gt;&gt;&gt; SYSTEM READY // INITIATE LAUNCH &lt;&lt;&lt;
        </p>
        <div className="w-full flex items-center justify-center p-4 bg-slate-950/20 border border-slate-900 border-dashed">
          <a
            href={app.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={playKnobClick}
            aria-disabled={!powerOn}
            aria-label={`Launch ${app.title}`}
            className={`w-24 h-24 rounded-full border-4 border-slate-950 bg-gradient-to-b from-slate-800 via-slate-700 to-slate-900 flex flex-col items-center justify-center relative shadow-[0_8px_16px_rgba(0,0,0,0.6),inset_0_2px_4px_rgba(255,255,255,0.2)] active:translate-y-0.5 active:shadow-md transition-all duration-150 group/btn cursor-pointer ${
              !powerOn ? 'opacity-20 pointer-events-none' : ''
            }`}
          >
            <span className="absolute inset-0.5 rounded-full border border-slate-600/40 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
            <span
              className="w-16 h-16 rounded-full border border-black/40 flex flex-col items-center justify-center text-[10px] font-black tracking-widest text-white transition-all duration-300 animate-[pulse_1.8s_infinite_ease-in-out]"
              style={{
                backgroundColor: app.accentColor,
                boxShadow: `0 0 20px 6px ${app.accentColor}ee`,
                textShadow: '0 1px 2px rgba(0,0,0,0.6)',
              }}
            >
              <span>START</span>
              <span>DEMO</span>
            </span>
          </a>
        </div>
      </div>
    </article>
  );
};

export default LargeModule;
