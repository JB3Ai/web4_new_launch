import React, { useState, useEffect } from 'react';
import { ChassisScrew, RotaryKnob, ToggleSwitch } from '../Shared/HardwareControls';
import { ShieldCheck, Filter, Volume2, VolumeX, Radio } from 'lucide-react';
import { setSoundEnabled, getSoundEnabled, playRelayClick } from '../../utils/audioRelay';

/**
 * ConsoleHeader
 * Master system controller ("LAB-STATION_B01")
 * Features:
 * - Global operational status ticker
 * - Master platform filtering selector (ALL, Render, Node, Vercel, Static)
 * - AC Line voltage monitoring & pilot neon jewel lamp
 * - Audio mechanical relay click feedback toggle
 */
export const ConsoleHeader = ({
  mainsPower = true,
  onToggleMains,
  benchVoltage = 117.4,
  selectedStack = 'ALL',
  onSelectStack,
  stacks = ['ALL', 'Render', 'Node', 'Vercel', 'Static'],
  totalApps = 6,
  visibleCount = 6,
}) => {
  const [audioOn, setAudioOn] = useState(getSoundEnabled());
  const [tickerIndex, setTickerIndex] = useState(0);

  const tickerMessages = [
    'ALL CHASSIS ENERGIZED // 6/6 NODES SYNCHRONIZED',
    'AC BUS 117.4 VAC @ 60.0 HZ // GROUND INTEGRITY PASS',
    'HOST CLUSTER: RENDER • NODE • VERCEL • STATIC ONLINE',
    'NBS REFERENCE CALIBRATION LOCKED // ZERO DC DRIFT',
    'HIGH-VOLTAGE CRT VECTOR OSCILLOSCOPE BUS ACTIVE',
  ];

  // Rotate operational status messages periodically
  useEffect(() => {
    if (!mainsPower) return;
    const interval = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % tickerMessages.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [mainsPower, tickerMessages.length]);

  const stackIndex = Math.max(stacks.indexOf(selectedStack), 0);

  const handleDialTurn = (stepVal) => {
    playRelayClick('knob');
    const idx = Math.min(
      Math.floor((stepVal / 100) * stacks.length),
      stacks.length - 1
    );
    if (onSelectStack && stacks[idx]) {
      onSelectStack(stacks[idx]);
    }
  };

  const handleToggleSound = () => {
    const nextState = !audioOn;
    setAudioOn(nextState);
    setSoundEnabled(nextState);
    if (nextState) playRelayClick('toggle');
  };

  return (
    <header className="relative w-full border-b border-slate-800/80 bg-black/60 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.7)] p-3 sm:p-5 select-none z-30">
      {/* Outer Rack Rail Screws & Stamped Identification */}
      <div className="absolute top-2 left-3 flex items-center gap-1.5 opacity-85">
        <ChassisScrew size={13} rotation={32} />
        <span className="text-[9px] font-mono tracking-widest text-slate-400 uppercase font-bold hidden sm:inline">
          LAB-STATION_B01 // NEURAL.CONSOLE
        </span>
      </div>

      <div className="absolute top-2 right-3 flex items-center gap-1.5 opacity-85">
        <span className="text-[9px] font-mono tracking-widest text-slate-400 uppercase font-bold hidden sm:inline">
          CYBERPUNK LAUNCHPAD • SPEC-2084
        </span>
        <ChassisScrew size={13} rotation={105} />
      </div>

      <div className="max-w-7xl mx-auto flex flex-col gap-3 mt-3 sm:mt-1">
        {/* Main Header Cluster */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          {/* Stamped Cast Plate: LAB-STATION_B01 */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <div className="relative border border-slate-800 bg-black/50 backdrop-blur-md px-3.5 py-2 rounded-lg shadow-[inset_0_1px_2px_rgba(255,255,255,0.08),0_4px_16px_rgba(0,0,0,0.4)] flex items-center gap-3">
              {/* 4 Corner Rivets */}
              <div className="w-1.5 h-1.5 rounded-full bg-slate-700 shadow-inner absolute top-1.5 left-1.5" />
              <div className="w-1.5 h-1.5 rounded-full bg-slate-700 shadow-inner absolute top-1.5 right-1.5" />
              <div className="w-1.5 h-1.5 rounded-full bg-slate-700 shadow-inner absolute bottom-1.5 left-1.5" />
              <div className="w-1.5 h-1.5 rounded-full bg-slate-700 shadow-inner absolute bottom-1.5 right-1.5" />

              <div className="w-10 h-10 rounded bg-[#10141D] border border-cyan-500/40 flex flex-col items-center justify-center text-cyan-400 font-black tracking-tighter shadow-[0_0_12px_rgba(6,182,212,0.25)] shrink-0">
                <span className="text-sm leading-none font-mono">LAB</span>
                <span className="text-[9px] text-amber-300 font-mono">B01</span>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-base sm:text-lg font-black tracking-[0.16em] text-white font-mono uppercase drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">
                    LAB-STATION_B01
                  </h1>
                  <span className="bg-emerald-950/80 text-emerald-400 text-[8.5px] font-mono px-1.5 py-0.5 rounded font-bold tracking-wider border border-emerald-500/40 shadow-[0_0_8px_rgba(16,185,129,0.3)]">
                    ACTIVE MASTER
                  </span>
                </div>
                <p className="text-[9.5px] tracking-wider text-slate-400 font-mono uppercase">
                  Neural Cyberpunk Console & Portfolio Launchpad
                </p>
              </div>
            </div>

            {/* Hardware Calibration Tag */}
            <div className="hidden md:flex flex-col border border-slate-800/80 bg-black/40 px-3 py-1.5 rounded-md text-[9px] font-mono shadow-inner text-slate-400 backdrop-blur-sm">
              <div className="flex items-center gap-1.5 font-bold text-slate-200">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>NBS CALIBRATED / STATION B01</span>
              </div>
              <div className="flex items-center justify-between gap-4 mt-0.5 text-[8.5px]">
                <span>MATCHING BLADES: <span className="text-emerald-400 font-bold">{visibleCount}/{totalApps}</span></span>
                <span className="text-slate-500">BUS: 50Ω</span>
              </div>
            </div>
          </div>

          {/* Master Platform Filtering Switch & Global Instruments */}
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3 sm:gap-4 bg-black/40 border border-slate-800/80 p-2.5 rounded-lg shadow-inner backdrop-blur-md">
            {/* Master SIGNAL_FILTER Rotary Selector & Stack Toggle Switch */}
            <div className="flex items-center gap-2.5 bg-black/50 border border-slate-800 px-3 py-1.5 rounded shadow-inner">
              <div className="flex flex-col items-end">
                <span className="text-[8.5px] font-mono uppercase text-slate-400 font-bold tracking-wider flex items-center gap-1">
                  <Filter className="w-3 h-3 text-cyan-400" />
                  SIGNAL_FILTER
                </span>
                <span className="text-xs font-mono font-black text-cyan-300 uppercase tracking-wider">
                  {selectedStack}
                </span>
              </div>

              {/* Rotary Signal Filter Knob */}
              <RotaryKnob
                value={(stackIndex / (stacks.length - 1)) * 100}
                min={0}
                max={100}
                onChange={handleDialTurn}
                size={44}
                ticks={stacks.length}
                accentColor="#38EF7D"
                label="SELECT"
                sublabel="ROTARY"
              />

              {/* Step Toggle Switch for Filtering (flips to next stack on toggle) */}
              <ToggleSwitch
                checked={selectedStack !== 'ALL'}
                onChange={() => {
                  playRelayClick('toggle');
                  const nextIndex = (stackIndex + 1) % stacks.length;
                  if (onSelectStack && stacks[nextIndex]) {
                    onSelectStack(stacks[nextIndex]);
                  }
                }}
                label="CYCLE"
                sublabel={selectedStack === 'ALL' ? 'BYPASS' : 'ACTIVE'}
                accentColor="#38EF7D"
              />

              {/* Platform Selector Detent Buttons */}
              <div className="flex flex-col gap-1 pl-1">
                <div className="flex flex-wrap gap-1 max-w-[210px]">
                  {stacks.map((stk) => {
                    const active = selectedStack === stk;
                    return (
                      <button
                        key={stk}
                        type="button"
                        onClick={() => {
                          playRelayClick('knob');
                          if (onSelectStack) onSelectStack(stk);
                        }}
                        className={`px-1.5 py-0.5 text-[8px] font-mono font-bold rounded uppercase cursor-pointer border transition-all ${
                          active
                            ? 'bg-cyan-950/70 border-cyan-500/70 text-cyan-300 shadow-[0_0_8px_rgba(6,182,212,0.4)]'
                            : 'bg-black/50 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                        }`}
                      >
                        {stk}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Audio Feedback Toggle */}
            <button
              type="button"
              onClick={handleToggleSound}
              className={`p-1.5 rounded border transition-all cursor-pointer flex flex-col items-center gap-0.5 ${
                audioOn
                  ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.3)]'
                  : 'bg-black/50 border-slate-800 text-slate-500 hover:text-slate-300'
              }`}
              title={`Mechanical Audio Relays: ${audioOn ? 'ENABLED' : 'MUTED'}`}
            >
              {audioOn ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span className="text-[6.5px] font-mono font-bold uppercase">SFX</span>
            </button>

            {/* AC Line Voltage Display */}
            <div className="flex flex-col items-end">
              <span className="text-[8.5px] font-mono uppercase text-slate-400 font-semibold tracking-wider">
                AC BUS VOLTS
              </span>
              <div className="flex items-baseline gap-1 font-mono text-sm font-bold text-white bg-black/60 px-2 py-0.5 rounded border border-slate-800">
                <span className={mainsPower ? 'text-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.5)]' : 'text-neutral-600'}>
                  {mainsPower ? benchVoltage.toFixed(1) : '000.0'}
                </span>
                <span className="text-[9.5px] text-slate-400">VAC</span>
              </div>
            </div>

            {/* Neon Pilot Lamp */}
            <div className="flex flex-col items-center gap-0.5">
              <div
                className={`w-6 h-6 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
                  mainsPower
                    ? 'bg-red-500 border-red-700 shadow-[0_0_14px_#ef4444,inset_0_1px_3px_#ffffff]'
                    : 'bg-[#291010] border-[#371515] opacity-60 shadow-inner'
                }`}
              >
                <div
                  className={`w-2.5 h-2.5 rounded-full ${
                    mainsPower ? 'bg-amber-200 blur-[0.5px]' : 'bg-[#4A1616]'
                  }`}
                />
              </div>
              <span className="text-[7.5px] font-mono tracking-widest text-slate-400 uppercase font-bold">
                MAINS
              </span>
            </div>

            {/* Master Mains Toggle */}
            <ToggleSwitch
              checked={mainsPower}
              onChange={onToggleMains}
              label="POWER"
              sublabel={mainsPower ? 'ON' : 'OFF'}
              accentColor="#EF4444"
            />
          </div>
        </div>

        {/* Global Operational Status Ticker (Requirement 2) */}
        <div className="w-full bg-black/70 border border-slate-800/90 rounded px-3 py-1.5 flex items-center justify-between gap-3 shadow-[inset_0_2px_8px_rgba(0,0,0,0.9)] overflow-hidden font-mono text-[9.5px] backdrop-blur-md">
          <div className="flex items-center gap-2 shrink-0">
            <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span className="text-amber-400 font-bold tracking-wider uppercase">
              STATUS TICKER:
            </span>
          </div>

          <div className="flex-1 truncate text-cyan-200/90 tracking-wide font-medium">
            {mainsPower ? tickerMessages[tickerIndex] : 'SYSTEM OFFLINE // MAINS POWER DISCONNECTED'}
          </div>

          <div className="shrink-0 flex items-center gap-2 text-slate-400 text-[8.5px]">
            <span>STATION: LAB-STATION_B01</span>
            <span>•</span>
            <span className={mainsPower ? 'text-emerald-400 font-bold' : 'text-red-400 font-bold'}>
              {mainsPower ? 'BUS SYNCHRONIZED' : 'BUS COLD'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
