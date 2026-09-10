import React, { useState } from 'react';
import { ChassisScrew, RotaryKnob, ToggleSwitch, PushButton } from '../Shared/HardwareControls';
import { OscilloscopeScreen } from '../Shared/OscilloscopeScreen';
import { ExternalLink, Terminal, Activity, Cpu } from 'lucide-react';

/**
 * LargeModule
 * Full-width horizontal blade enclosure with Neural Cyberpunk Console aesthetics.
 * - Glass morphism: backdrop-blur-md, background black at 40% opacity, crisp border border-slate-800/60
 * - Razor-thin border accent border-white/5
 * - Asymmetric tech topology watermark bleeding beyond the perimeter
 * - Interactive HUD Trigger button that floods with brand color on hover and lights up the card's bottom border
 */
export const LargeModule = ({
  app,
  slotNumber = 'BAY-01',
  mainsPower = true,
}) => {
  const [localPower, setLocalPower] = useState(true);
  const [frequency, setFrequency] = useState(1);
  const [amplitude, setAmplitude] = useState(1);
  const [isCardHovered, setIsCardHovered] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  const isEnergized = mainsPower && localPower;
  const isHighlighted = isCardHovered || isButtonHovered;

  return (
    <div
      id={`module-${app.id}`}
      onMouseEnter={() => setIsCardHovered(true)}
      onMouseLeave={() => setIsCardHovered(false)}
      className={`relative rounded-xl p-[1px] select-none transition-all duration-500 ease-out transform group ${
        isCardHovered ? 'scale-[1.015] z-30' : 'scale-100 z-10'
      }`}
      style={{
        background: isHighlighted
          ? `linear-gradient(135deg, ${app.accentColor} 0%, rgba(30, 41, 59, 0.45) 40%, rgba(30, 41, 59, 0.45) 60%, ${app.accentColor} 100%)`
          : 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(30, 41, 59, 0.5) 50%, rgba(255,255,255,0.02) 100%)',
        boxShadow: isHighlighted
          ? `0 20px 48px -10px ${app.accentColor}35, 0 0 28px ${app.accentColor}25`
          : '0 8px 32px rgba(0,0,0,0.6)',
      }}
    >
      {/* Dynamic Flow Overlay: SVG neural architecture schematic bleeding past container bounds */}
      <div
        className="absolute -top-5 -right-5 w-48 h-36 pointer-events-none transition-all duration-500 ease-out overflow-visible z-0"
        style={{
          opacity: isHighlighted ? 0.38 : 0.12,
          transform: isHighlighted ? 'scale(1.15) translate(4px, -4px)' : 'scale(1) translate(0, 0)',
          color: app.accentColor,
        }}
      >
        <svg viewBox="0 0 140 100" className="w-full h-full stroke-current overflow-visible">
          <path d="M10 20 L55 20 L85 55 L130 55" fill="none" strokeWidth="1.2" strokeDasharray={isHighlighted ? "none" : "3 3"} />
          <path d="M55 20 L55 80 L105 80" fill="none" strokeWidth="0.8" strokeDasharray="2 2" />
          <circle cx="10" cy="20" r="3" fill="none" strokeWidth="1.2" />
          <circle cx="55" cy="20" r="3" fill="currentColor" />
          <circle cx="85" cy="55" r="3" fill="currentColor" />
          <circle cx="130" cy="55" r="4" fill="none" strokeWidth="1.5" />
          <rect x="95" y="74" width="30" height="12" rx="2" fill="none" strokeWidth="0.8" />
          <path d="M85 55 L115 25" fill="none" strokeWidth="0.75" strokeDasharray="2 2" />
          <circle cx="115" cy="25" r="2" fill="currentColor" />
        </svg>
      </div>

      {/* Glassmorphic Chassis Insert: backdrop-blur-md, bg-black/40, border border-slate-800/60 */}
      <div
        className="relative rounded-[11px] p-4 sm:p-6 text-[#D8E0EA] backdrop-blur-md bg-black/40 border border-slate-800/60 overflow-hidden transition-all duration-500 ease-out"
        style={{
          boxShadow: isHighlighted
            ? `inset 0 1px 0 rgba(255,255,255,0.12), inset 0 -2px 10px ${app.accentColor}25`
            : 'inset 0 1px 0 rgba(255,255,255,0.06), 0 4px 20px rgba(0,0,0,0.5)',
        }}
      >
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
            backgroundSize: '28px 28px',
          }}
        />

        {/* 4 Corner Heavy Slotted Equipment Bay Chassis Screws */}
        <div className="absolute top-2.5 left-2.5 z-20">
          <ChassisScrew size={14} rotation={22} title={`Mount TL ${app.id}`} />
        </div>
        <div className="absolute top-2.5 right-2.5 z-20">
          <ChassisScrew size={14} rotation={78} title={`Mount TR ${app.id}`} />
        </div>
        <div className="absolute bottom-2.5 left-2.5 z-20">
          <ChassisScrew size={14} rotation={135} title={`Mount BL ${app.id}`} />
        </div>
        <div className="absolute bottom-2.5 right-2.5 z-20">
          <ChassisScrew size={14} rotation={54} title={`Mount BR ${app.id}`} />
        </div>

        {/* Full-width horizontal blade split: Left control bay, Right vector scope & demo launch */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch px-2 sm:px-4 py-1 relative z-10">
          {/* ================= LEFT SIDE: Title, Monospace Block, Toggle Switch, Rotary Knob ================= */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            {/* Header & App Title */}
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <span className="text-[9.5px] font-mono tracking-widest px-2 py-0.5 rounded bg-black/50 text-[#9FB0C4] font-bold border border-slate-800/80 shadow-inner">
                  {slotNumber}
                </span>
                <span className="text-[9.5px] font-mono px-2 py-0.5 rounded bg-slate-900/60 text-[#E2E8F0] border border-slate-700/60 font-bold uppercase tracking-wider flex items-center gap-1">
                  <Cpu className="w-3 h-3 text-cyan-400" />
                  STACK: {app.stack}
                </span>
                <div
                  className="w-2.5 h-2.5 rounded-full ml-auto transition-all duration-300"
                  style={{
                    backgroundColor: isEnergized ? app.accentColor : '#334155',
                    boxShadow: isEnergized ? `0 0 10px ${app.accentColor}, 0 0 18px ${app.accentColor}60` : 'none',
                  }}
                  title={isEnergized ? 'ACTIVE BEAM' : 'STANDBY'}
                />
              </div>

              <h2 className="text-base sm:text-xl font-mono font-black tracking-wide text-[#F3F7FA] uppercase flex items-center gap-2">
                {app.title}
              </h2>
            </div>

            {/* Monospace Description Block with Terminal Accent */}
            <div className="bg-black/40 border border-slate-800/80 rounded p-3 shadow-[inset_0_2px_8px_rgba(0,0,0,0.9)] backdrop-blur-sm">
              <div className="flex items-center gap-1.5 text-[8px] font-mono text-slate-400 uppercase tracking-wider mb-1.5 pb-1 border-b border-slate-800/80">
                <Terminal className="w-3 h-3 text-emerald-400" />
                <span>TELEMETRY SPECIFICATION // SYS.IDENT</span>
              </div>
              <p className="text-[11px] font-mono leading-relaxed text-[#CBD5E1] tracking-wide">
                {app.description}
              </p>
            </div>

            {/* Hardware Controls Sub-Bay: Toggle Switch + Rotating Click-Knobs */}
            <div className="bg-black/30 border border-slate-800/80 rounded p-3 shadow-inner flex items-center justify-between gap-4 backdrop-blur-sm">
              {/* Vertical Metal Toggle Switch with LED Indicator */}
              <ToggleSwitch
                checked={localPower}
                onChange={setLocalPower}
                label="BLADE PWR"
                sublabel={localPower ? 'ARMED' : 'TRIP'}
                accentColor={app.accentColor}
              />

              <div className="h-10 w-[1px] bg-slate-800/80" />

              {/* Rotating Click-Knob: Timebase / Frequency */}
              <RotaryKnob
                value={frequency * 25}
                min={10}
                max={100}
                onChange={(val) => setFrequency(val / 25)}
                label="TIMEBASE"
                sublabel={`${(frequency * 10).toFixed(1)} µS/DIV`}
                size={48}
                accentColor={app.accentColor}
              />

              {/* Rotating Click-Knob: Gain / Attenuation */}
              <RotaryKnob
                value={amplitude * 50}
                min={20}
                max={100}
                onChange={(val) => setAmplitude(val / 50)}
                label="ATTEN"
                sublabel={`${(amplitude * 2).toFixed(1)} V/DIV`}
                size={48}
                accentColor={app.accentColor}
              />
            </div>
          </div>

          {/* ================= RIGHT SIDE: Prominent <OscilloscopeScreen /> & <PushButton /> ================= */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-3 bg-black/30 border border-slate-800/80 rounded p-3 sm:p-4 shadow-inner backdrop-blur-sm">
            {/* Top Status Bar of Right Panel */}
            <div className="flex items-center justify-between text-[9px] font-mono text-[#8292A6] px-1 pb-1 border-b border-slate-800/80">
              <span className="flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-emerald-400" />
                <span>VECTOR PATTERN:</span>
                <span className="text-white font-bold uppercase">{app.waveType}</span>
              </span>
              <span className="text-[8.5px] uppercase">
                LOAD:{' '}
                <span className={isEnergized ? 'text-emerald-400 font-bold' : 'text-red-400 font-bold'}>
                  {isEnergized ? 'ONLINE • 50Ω' : 'HIGH-Z STANDBY'}
                </span>
              </span>
            </div>

            {/* Prominent CRT Oscilloscope Screen */}
            <div className="flex-1 min-h-[160px] flex flex-col justify-center">
              <OscilloscopeScreen
                waveType={app.waveType}
                accentColor={app.accentColor}
                power={isEnergized}
                frequency={frequency}
                amplitude={amplitude}
                height={165}
              />
            </div>

            {/* Bottom Demo Action Strip: BNC Jack & Interactive HUD Trigger Push Button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-800/80">
              {/* BNC Coaxial Signal Tap */}
              <div className="flex items-center gap-2 text-[9px] font-mono text-[#8C9CAF]">
                <div className="relative w-6 h-6 rounded-full bg-[#1A222D] border-2 border-slate-600 flex items-center justify-center shadow-inner shrink-0">
                  <div className="w-2.5 h-2.5 rounded-full bg-black border border-slate-700 flex items-center justify-center">
                    <div
                      className="w-1 h-1 rounded-full"
                      style={{ backgroundColor: app.accentColor }}
                    />
                  </div>
                </div>
                <div className="leading-tight">
                  <div className="font-bold text-[#E2E8F0]">OUTPUT TAP</div>
                  <div className="text-[7.5px] text-[#69798E]">CH-A // 1.0 Vp-p</div>
                </div>
              </div>

              {/* Interactive HUD Trigger: Center-out flood & lights up bottom border */}
              <PushButton
                label="LAUNCH ACTIVE DEMO"
                color={app.accentColor}
                href={app.demoUrl}
                icon={ExternalLink}
                active={isHighlighted}
                onHoverChange={setIsButtonHovered}
                className="w-full sm:w-auto px-5 py-2.5"
              />
            </div>
          </div>
        </div>

        {/* Bottom Hardware Ventilation & Grounding Bus with Asymmetric Micro-Terminal */}
        <div className="mt-3 pt-2 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-2 px-3 sm:px-5 text-[8.5px] font-mono text-[#8292A6] relative z-10">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 opacity-60">
              <div className="w-5 h-0.5 bg-slate-800 rounded-full shadow-inner" />
              <div className="w-5 h-0.5 bg-slate-800 rounded-full shadow-inner" />
              <div className="w-5 h-0.5 bg-slate-800 rounded-full shadow-inner" />
            </div>
            <span className="text-slate-500 uppercase">SYS // {app.id}</span>
          </div>

          {/* Asymmetric Micro-Terminal: Deployment Host */}
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-700/60 text-[8.5px] font-mono tracking-wider shadow-inner backdrop-blur-sm transition-all duration-300 group-hover:border-slate-500/80">
            <span
              className="w-1.5 h-1.5 rounded-full transition-all duration-300"
              style={{
                backgroundColor: app.accentColor,
                boxShadow: isHighlighted ? `0 0 8px ${app.accentColor}` : `0 0 4px ${app.accentColor}60`,
              }}
            />
            <span className="text-slate-400 font-bold uppercase">HOST:</span>
            <span className="font-bold text-white uppercase">{app.stack}</span>
            <span className="text-slate-600">//</span>
            <span className="text-[7.5px] text-cyan-400 font-bold uppercase tracking-widest">
              {app.stack === 'Vercel' ? 'EDGE-NODE' : app.stack === 'Render' ? 'CLOUD-CONTAINER' : app.stack === 'Node' ? 'RUNTIME-CLUSTER' : 'GLOBAL-CDN'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-500">ACCENT:</span>
            <span className="font-bold tracking-wider" style={{ color: app.accentColor }}>
              {app.accentColor}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
