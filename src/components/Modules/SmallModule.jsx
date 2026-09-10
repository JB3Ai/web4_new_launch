import React, { useState } from 'react';
import { ChassisScrew, RotaryKnob, ToggleSwitch, PushButton } from '../Shared/HardwareControls';
import { OscilloscopeScreen } from '../Shared/OscilloscopeScreen';
import { ArrowRight, Terminal, Activity, Cpu } from 'lucide-react';
import { useGlassParallax } from '../../hooks/useGlassParallax';

/**
 * SmallModule
 * Compact blade designed for a multi-column rack grid with Neural Cyberpunk Console styling.
 * - Glass morphism: backdrop-blur-md, background black at 40% opacity, crisp border border-slate-800/60
 * - Razor-thin border accent border-white/5
 * - Asymmetric tech topology graphic bleed with subtle parallax offset
 * - Parallax internal glow following mouse coordinates with specular glass blade highlight
 * - Interactive HUD Trigger button that floods with brand color on hover and lights up the card's bottom border
 */
export const SmallModule = ({
  app,
  slotNumber = 'BAY-03',
  mainsPower = true,
}) => {
  const [localPower, setLocalPower] = useState(true);
  const [frequency, setFrequency] = useState(1);
  const [amplitude, setAmplitude] = useState(1);
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  const {
    cardRef,
    isHovered: isCardHovered,
    coords,
    tilt,
    normalized,
    handleMouseMove,
    handleMouseEnter,
    handleMouseLeave,
  } = useGlassParallax({ maxTilt: 2.5 });

  const isEnergized = mainsPower && localPower;
  const isHighlighted = isCardHovered || isButtonHovered;

  return (
    <div
      id={`module-${app.id}`}
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-xl p-[1px] select-none flex flex-col h-full transition-all duration-300 ease-out group ${
        isHighlighted ? 'scale-[1.015] z-30' : 'scale-100 z-10'
      }`}
      style={{
        perspective: '1200px',
        transform: isHighlighted
          ? `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.015, 1.015, 1.015)`
          : 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
        background: isHighlighted
          ? `radial-gradient(500px circle at ${coords.x}px ${coords.y}px, ${app.accentColor} 0%, rgba(30, 41, 59, 0.45) 42%, rgba(255,255,255,0.02) 100%)`
          : 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(30, 41, 59, 0.5) 50%, rgba(255,255,255,0.02) 100%)',
        boxShadow: isHighlighted
          ? `0 24px 52px -10px ${app.accentColor}35, 0 0 28px ${app.accentColor}25`
          : '0 8px 32px rgba(0,0,0,0.6)',
      }}
    >
      {/* Dynamic Flow Overlay: Faint circuit architecture graphic bleeding outside container boundary with subtle parallax */}
      <div
        className="absolute -bottom-4 -left-4 w-36 h-28 pointer-events-none transition-transform duration-200 ease-out overflow-visible z-0"
        style={{
          opacity: isHighlighted ? 0.38 : 0.12,
          transform: isHighlighted
            ? `scale(1.15) translate(${-3 - normalized.x * 7}px, ${3 - normalized.y * 6}px)`
            : 'scale(1) translate(0, 0)',
          color: app.accentColor,
        }}
      >
        <svg viewBox="0 0 110 80" className="w-full h-full stroke-current overflow-visible">
          <path d="M5 60 L45 60 L68 25 L105 25" fill="none" strokeWidth="1.2" strokeDasharray={isHighlighted ? "none" : "3 3"} />
          <circle cx="5" cy="60" r="3" fill="currentColor" />
          <circle cx="68" cy="25" r="2.5" fill="none" strokeWidth="1.2" />
          <circle cx="105" cy="25" r="3.5" fill="currentColor" />
          <path d="M45 60 L45 15" fill="none" strokeWidth="0.8" strokeDasharray="2 2" />
          <rect x="39" y="8" width="12" height="12" rx="2" fill="none" strokeWidth="0.8" />
          <path d="M68 25 L85 55" fill="none" strokeWidth="0.75" />
          <circle cx="85" cy="55" r="2" fill="currentColor" />
        </svg>
      </div>

      {/* Glassmorphic Chassis Insert: backdrop-blur-md, bg-black/40, border border-slate-800/60 */}
      <div
        className="relative rounded-[11px] p-3.5 sm:p-5 text-[#D8E0EA] backdrop-blur-md bg-black/40 border border-slate-800/60 flex flex-col justify-between flex-1 overflow-hidden transition-all duration-300 ease-out"
        style={{
          boxShadow: isHighlighted
            ? `inset 0 1px 0 rgba(255,255,255,0.12), inset 0 -2px 10px ${app.accentColor}25`
            : 'inset 0 1px 0 rgba(255,255,255,0.06), 0 4px 20px rgba(0,0,0,0.5)',
        }}
      >
        {/* Faint Internal Glow: Dynamic Parallax Luminescence following mouse coordinates */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 ease-out z-0 rounded-[11px] overflow-hidden"
          style={{
            opacity: isHighlighted ? 0.2 : 0,
            background: `radial-gradient(380px circle at ${coords.x}px ${coords.y}px, ${app.accentColor} 0%, rgba(255, 255, 255, 0.04) 32%, transparent 68%)`,
          }}
        />

        {/* Specular Glass Blade Refraction Sheen: subtle specular highlight moving with cursor */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 ease-out z-0 rounded-[11px] overflow-hidden mix-blend-overlay"
          style={{
            opacity: isHighlighted ? 0.28 : 0,
            background: `radial-gradient(220px circle at ${coords.x}px ${coords.y}px, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.05) 45%, transparent 75%)`,
          }}
        />

        {/* Luminous Bottom Border Illumination Strip */}
        <div
          className="absolute bottom-0 inset-x-0 h-[2px] pointer-events-none transition-all duration-500 ease-out z-20"
          style={{
            background: isHighlighted
              ? `linear-gradient(90deg, transparent 5%, ${app.accentColor} 25%, ${app.accentColor} 75%, transparent 95%)`
              : 'transparent',
            boxShadow: isHighlighted ? `0 0 16px 2px ${app.accentColor}` : 'none',
            opacity: isHighlighted ? 1 : 0,
          }}
        />
        {/* Subtle Cyber Grid mesh lines */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* 4 Corner Heavy Slotted Equipment Bay Chassis Screws */}
        <div className="absolute top-2.5 left-2.5 z-20">
          <ChassisScrew size={13} rotation={30} title={`Mount TL ${app.id}`} />
        </div>
        <div className="absolute top-2.5 right-2.5 z-20">
          <ChassisScrew size={13} rotation={105} title={`Mount TR ${app.id}`} />
        </div>
        <div className="absolute bottom-2.5 left-2.5 z-20">
          <ChassisScrew size={13} rotation={160} title={`Mount BL ${app.id}`} />
        </div>
        <div className="absolute bottom-2.5 right-2.5 z-20">
          <ChassisScrew size={13} rotation={42} title={`Mount BR ${app.id}`} />
        </div>

        {/* Module Header Strip */}
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-2 mb-2 px-3 sm:px-4 relative z-10">
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-mono tracking-widest px-1.5 py-0.5 rounded bg-black/50 text-[#9FB0C4] font-bold border border-slate-800/80 shadow-inner">
              {slotNumber}
            </span>
            <span className="text-[8.5px] font-mono px-1.5 py-0.5 rounded bg-slate-900/60 text-[#DCE5F2] border border-slate-700/60 font-bold uppercase flex items-center gap-1">
              <Cpu className="w-2.5 h-2.5 text-cyan-400" />
              {app.stack}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <div
              className="w-2 h-2 rounded-full transition-all duration-300"
              style={{
                backgroundColor: isEnergized ? app.accentColor : '#334155',
                boxShadow: isEnergized ? `0 0 8px ${app.accentColor}, 0 0 14px ${app.accentColor}60` : 'none',
              }}
            />
            <span className="text-[8px] font-mono text-[#8C9CAF] uppercase font-bold">
              {isEnergized ? 'LIVE' : 'IDLE'}
            </span>
          </div>
        </div>

        {/* ================= TOP HALF: Smaller <OscilloscopeScreen /> Module ================= */}
        <div className="px-1 mb-3 relative z-10">
          <OscilloscopeScreen
            waveType={app.waveType}
            accentColor={app.accentColor}
            power={isEnergized}
            frequency={frequency}
            amplitude={amplitude}
            height={130}
          />
        </div>

        {/* ================= LOWER PANEL: Title, Tech Tags in Micro-Terminal Syntax, Controls, LAUNCH -> ================= */}
        <div className="flex flex-col justify-between flex-1 gap-2.5 px-1 relative z-10">
          {/* App Title */}
          <div>
            <h3 className="text-sm sm:text-base font-mono font-bold tracking-wide text-[#F3F7FA] uppercase">
              {app.title}
            </h3>
            <p className="text-[10px] font-mono text-[#90A1B6] leading-relaxed mt-0.5 line-clamp-2">
              {app.description}
            </p>
          </div>

          {/* Tech Tags Arranged in an Inline Micro-Terminal Syntax */}
          <div className="font-mono text-[9px] bg-black/40 text-emerald-400/90 border border-slate-800/80 rounded px-2.5 py-1.5 shadow-[inset_0_1px_3px_rgba(0,0,0,0.9)] flex flex-wrap items-center gap-x-3 gap-y-1 backdrop-blur-sm">
            <div className="flex items-center gap-1 text-[#627286]">
              <Terminal className="w-3 h-3 text-emerald-400" />
              <span>SYS:</span>
            </div>
            <span>
              stack:<span className="text-[#F1F5F9] font-bold ml-1">{app.stack.toLowerCase()}</span>
            </span>
            <span>
              wave:<span className="text-cyan-300 font-bold ml-1">{app.waveType}</span>
            </span>
            <span>
              imp:<span className="text-amber-300 font-bold ml-1">50Ω</span>
            </span>
          </div>

          {/* Bottom Hardware Controls & Small "LAUNCH ->" Push-Button */}
          <div className="bg-black/30 border border-slate-800/80 rounded p-2 sm:p-2.5 shadow-inner flex items-center justify-between gap-2 mt-1 backdrop-blur-sm">
            {/* Compact Hardware Controls: Rotary Tuner + Power Toggle */}
            <div className="flex items-center gap-3">
              <RotaryKnob
                value={frequency * 25}
                min={10}
                max={100}
                onChange={(val) => setFrequency(val / 25)}
                label="SWEEP"
                sublabel="RATE"
                size={38}
                accentColor={app.accentColor}
              />

              <ToggleSwitch
                checked={localPower}
                onChange={setLocalPower}
                label="PWR"
                sublabel={localPower ? 'ON' : 'OFF'}
                accentColor={app.accentColor}
              />
            </div>

            {/* Interactive HUD Trigger: Center-out flood & lights up bottom border */}
            <div className="flex items-end justify-end">
              <PushButton
                label="LAUNCH ->"
                color={app.accentColor}
                href={app.demoUrl}
                icon={ArrowRight}
                active={isHighlighted}
                onHoverChange={setIsButtonHovered}
                className="text-[8.5px] px-3 py-1.5 font-black"
              />
            </div>
          </div>
        </div>

        {/* Chassis Slot Identifier Footer Strip with Asymmetric Micro-Terminal */}
        <div className="mt-2.5 pt-1.5 border-t border-slate-800/80 flex items-center justify-between px-2 text-[8px] font-mono text-slate-500 relative z-10">
          {/* Asymmetric Micro-Terminal: Deployment Host */}
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-900/90 border border-slate-700/60 text-[8px] font-mono tracking-wider shadow-inner backdrop-blur-sm transition-all duration-300 group-hover:border-slate-500/80">
            <span
              className="w-1.5 h-1.5 rounded-full transition-all duration-300"
              style={{
                backgroundColor: app.accentColor,
                boxShadow: isHighlighted ? `0 0 8px ${app.accentColor}` : `0 0 3px ${app.accentColor}60`,
              }}
            />
            <span className="text-slate-400 font-bold uppercase">HOST:</span>
            <span className="font-bold text-white uppercase">{app.stack}</span>
            <span className="text-slate-600">//</span>
            <span className="text-[7px] text-cyan-400 font-bold uppercase">
              {app.stack === 'Vercel' ? 'EDGE' : app.stack === 'Render' ? 'CONTAINER' : app.stack === 'Node' ? 'RUNTIME' : 'CDN'}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="uppercase text-slate-500">{slotNumber}</span>
            <span>•</span>
            <span className="font-bold tracking-wider" style={{ color: app.accentColor }}>{app.accentColor}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
