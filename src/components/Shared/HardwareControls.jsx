import React, { useState } from 'react';
import { playRelayClick } from '../../utils/audioRelay';

/**
 * Slotted industrial chassis mounting screw
 */
export const ChassisScrew = ({ size = 14, rotation = 45, className = '', title = 'Chassis Screw' }) => {
  return (
    <div
      className={`inline-flex items-center justify-center relative select-none shrink-0 ${className}`}
      title={title}
    >
      {/* Outer counter-sunk bevel hole */}
      <div
        className="rounded-full bg-[#181C22] p-[1.5px] shadow-[inset_0_1px_2px_rgba(0,0,0,0.95),0_1px_1px_rgba(255,255,255,0.15)] flex items-center justify-center"
        style={{ width: `${size}px`, height: `${size}px` }}
      >
        {/* Machined steel screw head */}
        <div
          className="w-full h-full rounded-full relative flex items-center justify-center shadow-[0_1px_2px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.4),inset_0_-1px_1px_rgba(0,0,0,0.6)]"
          style={{
            background: 'radial-gradient(circle at 35% 35%, #8C96A6 0%, #586170 50%, #303742 100%)',
          }}
        >
          {/* Slotted channel */}
          <div
            className="h-[2px] w-[65%] bg-[#12151B] shadow-[0_0.5px_0_rgba(255,255,255,0.3)] rounded-[0.5px]"
            style={{ transform: `rotate(${rotation}deg)` }}
          />
        </div>
      </div>
    </div>
  );
};

/**
 * Small Round LED Indicator
 * Gray when off, bright colored/red when active with radial glow
 */
export const LEDIndicator = ({
  active = false,
  color = '#EF4444', // Red default for laboratory standard
  size = 8,
  label = '',
  className = '',
}) => {
  return (
    <div className={`inline-flex items-center gap-1.5 select-none font-mono ${className}`}>
      {/* Recessed bezel ring */}
      <div
        className="rounded-full p-[1px] bg-[#14181E] border border-[#2D3542] shadow-[inset_0_1px_2px_rgba(0,0,0,0.9)] flex items-center justify-center"
        style={{ width: `${size + 4}px`, height: `${size + 4}px` }}
      >
        {/* Glass jewel dome */}
        <div
          className="rounded-full transition-all duration-200 relative"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            backgroundColor: active ? color : '#3A424E',
            boxShadow: active
              ? `0 0 8px ${color}, 0 0 2px ${color}, inset 0 1px 2px rgba(255,255,255,0.7)`
              : 'inset 0 1px 1.5px rgba(0,0,0,0.8)',
          }}
        >
          {/* Specular highlight */}
          <div className="absolute top-[15%] left-[20%] w-[30%] h-[30%] rounded-full bg-white/60 pointer-events-none" />
        </div>
      </div>
      {label && (
        <span
          className={`text-[7.5px] uppercase tracking-wider font-bold transition-colors ${
            active ? 'text-white' : 'text-[#647284]'
          }`}
        >
          {label}
        </span>
      )}
    </div>
  );
};

/**
 * 1. <RotaryKnob />
 * A round, mechanical dial that visually rotates via CSS transform when clicked or adjusted.
 */
export const RotaryKnob = ({
  value = 0,
  min = 0,
  max = 100,
  onChange,
  label = '',
  sublabel = '',
  size = 50,
  ticks = 9,
  accentColor = '#38EF7D',
  className = '',
}) => {
  // Map value to angle (-135deg to +135deg)
  const percent = Math.min(Math.max((value - min) / (max - min), 0), 1);
  const angle = -135 + percent * 270;

  const handleStep = (direction) => {
    if (!onChange) return;
    playRelayClick('knob');
    const step = (max - min) / 10;
    const nextVal = Math.min(Math.max(value + direction * step, min), max);
    onChange(Math.round(nextVal));
  };

  const handleClick = (e) => {
    // Cycle value smoothly on click
    if (!onChange) return;
    playRelayClick('knob');
    const step = (max - min) / 6;
    const nextVal = value + step > max ? min : value + step;
    onChange(Math.round(nextVal));
  };

  return (
    <div className={`flex flex-col items-center select-none font-mono ${className}`}>
      {label && (
        <span className="text-[8.5px] uppercase tracking-wider text-[#A1B0C4] font-bold mb-1">
          {label}
        </span>
      )}

      {/* Outer Dial Assembly with Tick Graduations */}
      <div className="relative flex items-center justify-center p-1">
        {/* Calibrated graduation ticks ring */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 100 100"
        >
          {Array.from({ length: ticks }).map((_, i) => {
            const tickAngle = -135 + (i * 270) / (ticks - 1);
            const rad = (tickAngle * Math.PI) / 180;
            const x1 = 50 + 44 * Math.sin(rad);
            const y1 = 50 - 44 * Math.cos(rad);
            const x2 = 50 + 38 * Math.sin(rad);
            const y2 = 50 - 38 * Math.cos(rad);
            const isMajor = i === 0 || i === ticks - 1 || i === Math.floor(ticks / 2);
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={isMajor ? '#AAB8CA' : '#505D70'}
                strokeWidth={isMajor ? 2 : 1}
              />
            );
          })}
        </svg>

        {/* Fluted Bakelite Knob Outer Rim */}
        <div
          role="slider"
          aria-valuenow={value}
          aria-valuemin={min}
          aria-valuemax={max}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight' || e.key === 'ArrowUp') handleStep(1);
            if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') handleStep(-1);
          }}
          onClick={handleClick}
          style={{ width: `${size}px`, height: `${size}px` }}
          className="relative rounded-full bg-gradient-to-b from-[#1C212A] via-[#2A313E] to-[#141820] border-2 border-[#12161E] shadow-[0_4px_8px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.22)] flex items-center justify-center cursor-pointer active:scale-95 transition-transform"
          title={`${label || 'Dial'}: ${value} (Click to step, arrows to adjust)`}
        >
          {/* Rotating Rotor Disc via CSS Transform */}
          <div
            className="w-[82%] h-[82%] rounded-full relative flex items-center justify-center shadow-[inset_0_2px_5px_rgba(0,0,0,0.95)]"
            style={{
              background: 'radial-gradient(circle at 40% 40%, #3B4454 0%, #1E232C 80%)',
              transform: `rotate(${angle}deg)`,
              transition: 'transform 0.18s cubic-bezier(0.2, 0.9, 0.4, 1.1)',
            }}
          >
            {/* Machined Spun-Aluminum Cap */}
            <div className="w-[52%] h-[52%] rounded-full bg-gradient-to-tr from-[#637184] via-[#94A3B5] to-[#4B5667] border border-[#2B3442] shadow-sm flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-[#161A22]" />
            </div>

            {/* High-Contrast Indicator Index Line / Notch */}
            <div
              className="absolute top-1 w-1.5 h-2.5 rounded-xs"
              style={{
                backgroundColor: accentColor,
                boxShadow: `0 0 5px ${accentColor}`,
              }}
            />
          </div>
        </div>
      </div>

      {sublabel && (
        <span className="text-[7.5px] text-[#718298] mt-0.5 tracking-tight uppercase font-semibold">
          {sublabel}
        </span>
      )}
    </div>
  );
};

// Backwards compatibility alias for existing code
export const RotaryDial = RotaryKnob;

/**
 * 2. <ToggleSwitch />
 * A vertical metal toggle that flips up/down with a realistic mechanical click animation,
 * illuminating an adjacent small round LED indicator template component (gray when off, red when active).
 */
export const ToggleSwitch = ({
  checked = false,
  onChange,
  label = '',
  sublabel = '',
  ledColor = '#EF4444', // Red when active laboratory standard
  accentColor,
  className = '',
}) => {
  const activeColor = accentColor || ledColor;

  return (
    <div className={`flex flex-col items-center select-none font-mono ${className}`}>
      {label && (
        <span className="text-[8.5px] uppercase tracking-wider text-[#A1B0C4] font-bold mb-1">
          {label}
        </span>
      )}

      {/* Assembly Container with Switch and Adjacent Round LED */}
      <div className="flex items-center gap-2">
        {/* Heavy Lab Switch Plate */}
        <button
          type="button"
          role="switch"
          aria-checked={checked}
          onClick={() => {
            playRelayClick('toggle');
            onChange && onChange(!checked);
          }}
          className="group relative w-7 h-11 rounded-sm bg-[#13171F] border border-[#323B4A] shadow-[inset_0_2px_6px_rgba(0,0,0,0.95)] flex flex-col items-center justify-between p-1 cursor-pointer transition-colors active:scale-95"
          title={`${label || 'Toggle'}: ${checked ? 'ENGAGED' : 'STANDBY'}`}
        >
          {/* Position label top */}
          <span className="text-[6px] font-bold text-[#6D7D92]">ON</span>

          {/* Hex Machined Retaining Nut */}
          <div className="relative w-5 h-5 rounded-full bg-[#3B4452] border border-[#596678] flex items-center justify-center shadow-md">
            {/* Metal toggle bat handle flipping physically with 3D shadow shift */}
            <div
              className={`w-2.5 h-4 rounded-full transition-all duration-150 transform ${
                checked
                  ? '-translate-y-1.5 shadow-[0_-2px_4px_rgba(255,255,255,0.4),0_2px_4px_rgba(0,0,0,0.9)] bg-gradient-to-b from-[#E2E8F0] via-[#A2B1C2] to-[#606E80]'
                  : 'translate-y-1.5 shadow-[0_2px_4px_rgba(0,0,0,0.9)] bg-gradient-to-b from-[#8C9BAE] via-[#606E80] to-[#39424E]'
              }`}
            />
          </div>

          {/* Position label bottom */}
          <span className="text-[6px] font-bold text-[#6D7D92]">OFF</span>
        </button>

        {/* Adjacent Small Round LED Indicator (gray when off, red when active) */}
        <div className="flex flex-col items-center">
          <LEDIndicator active={checked} color={activeColor} size={7} />
          <span className="text-[6.5px] font-bold text-[#657385] mt-0.5 uppercase">
            {checked ? 'ACT' : 'STB'}
          </span>
        </div>
      </div>

      {sublabel && (
        <span
          className={`text-[8px] mt-1 font-bold uppercase transition-colors ${
            checked ? 'text-red-400' : 'text-[#647284]'
          }`}
        >
          {sublabel || (checked ? 'ACTIVE' : 'STANDBY')}
        </span>
      )}
    </div>
  );
};

/**
 * 3. <PushButton /> (Interactive HUD Trigger)
 * Low-opacity ghost button that instantly floods with the app's brand color from the center out upon hover,
 * lighting up with high-intensity neon luminescence and triggering tactile mechanical click audio.
 */
export const PushButton = ({
  active = false,
  onClick,
  onHoverChange,
  label = 'LAUNCH ACTIVE DEMO',
  color = '#38EF7D',
  href,
  className = '',
  icon: Icon,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const isLit = active || isHovered || isPressed;

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (onHoverChange) onHoverChange(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsPressed(false);
    if (onHoverChange) onHoverChange(false);
  };

  const content = (
    <>
      {/* Center-out expanding flood disc */}
      <span
        className="absolute w-[260%] aspect-square rounded-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 transition-transform duration-300 ease-out origin-center pointer-events-none"
        style={{
          backgroundColor: color,
          transform: isLit ? 'translate(-50%, -50%) scale(1)' : 'translate(-50%, -50%) scale(0)',
          opacity: isLit ? 1 : 0,
        }}
      />

      {/* Cyber Glass Accent Borders & Lens Glow */}
      <div
        className="absolute inset-0 rounded-xs pointer-events-none transition-all duration-200"
        style={{
          boxShadow: isLit
            ? `inset 0 1px 2px rgba(255,255,255,0.8), 0 0 20px ${color}90, 0 4px 12px ${color}60`
            : 'inset 0 1px 1px rgba(255,255,255,0.15), inset 0 -1px 2px rgba(0,0,0,0.6)',
        }}
      />

      {/* Internal Jewel Core Lamp and Text */}
      <div className="flex items-center gap-2 relative z-10">
        <span
          className="w-2 h-2 rounded-xs transition-all duration-200 shrink-0"
          style={{
            backgroundColor: isLit ? '#000000' : color,
            boxShadow: isLit ? '0 0 6px #000000' : `0 0 8px ${color}`,
          }}
        />
        {Icon && (
          <Icon
            className="w-3.5 h-3.5 shrink-0 transition-transform duration-300 ease-out"
            style={{
              color: isLit ? '#07080A' : '#E2E8F0',
              transform: isLit ? 'translateX(4px)' : 'translateX(0)',
            }}
          />
        )}
        <span
          className="truncate tracking-widest transition-colors duration-200"
          style={{
            color: isLit ? '#07080A' : '#E2E8F0',
            fontWeight: isLit ? 900 : 700,
          }}
        >
          {label}
        </span>
      </div>
    </>
  );

  const commonProps = {
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onMouseDown: () => {
      setIsPressed(true);
      playRelayClick('button');
    },
    onMouseUp: () => setIsPressed(false),
    onClick: (e) => {
      if (onClick) onClick(e);
    },
    className: `group relative inline-flex items-center justify-center font-mono text-[9.5px] uppercase rounded-xs select-none transition-all duration-300 cursor-pointer overflow-hidden border ${
      isLit
        ? 'border-white text-[#07080A]'
        : 'border-slate-700/80 bg-black/40 text-slate-200'
    } backdrop-blur-sm px-4 py-2 ${
      isPressed
        ? 'translate-y-[2px] shadow-button-depressed'
        : 'translate-y-0 shadow-button-raised'
    } ${className}`,
    style: {
      borderColor: isLit ? '#FFFFFF' : 'rgba(148, 163, 184, 0.35)',
      boxShadow: isLit ? `0 0 20px ${color}90, inset 0 1px 2px rgba(255,255,255,0.8)` : undefined,
    },
    title: label,
  };

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...commonProps}>
        {content}
      </a>
    );
  }

  return (
    <button type="button" {...commonProps}>
      {content}
    </button>
  );
};
