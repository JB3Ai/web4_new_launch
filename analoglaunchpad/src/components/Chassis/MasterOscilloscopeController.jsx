import React from 'react';
import { ChassisScrew } from '../Shared/HardwareControls';
import { Activity, Zap, Radio, Sliders, AlertTriangle } from 'lucide-react';
import { playRelayClick } from '../../utils/audioRelay';

/**
 * MasterOscilloscopeController
 * Master Oscilloscope & Telemetry Controller component built strictly to the user spec diagram.
 * Controls:
 * - Telemetry Readouts: SYS LOAD, SIG FREQ, AMPLITUDE
 * - CONSOLE MODE PRESET: Nominal, Overload Peak, Low Power, Custom (*)
 * - Sliders: MASTER POTENTIOMETER (GAIN), OSCILLATOR FREQUENCY STATE, WAVEFORM NOISE / HARMONICS
 */
export const MasterOscilloscopeController = ({
  masterGain = 75,
  onGainChange,
  oscillatorFreq = 0.40,
  onFreqChange,
  waveformNoise = 25,
  onNoiseChange,
  consolePreset = 'Nominal',
  onPresetSelect,
  sysLoad = 41.8,
}) => {

  const presets = ['Nominal', 'Overload Peak', 'Low Power', 'Custom (*)'];

  const handlePresetClick = (preset) => {
    playRelayClick('toggle');
    if (onPresetSelect) {
      onPresetSelect(preset);
    }
  };

  const sigFreqCalc = (oscillatorFreq * 87).toFixed(1);
  const amplitudeVppCalc = ((masterGain / 100) * 13.33).toFixed(2);

  const isOverload = consolePreset === 'Overload Peak' || masterGain > 90;

  return (
    <section className={`relative w-full rounded-2xl border-2 transition-all duration-500 bg-black/80 backdrop-blur-xl p-5 sm:p-7 mb-8 overflow-hidden select-none shadow-[0_12px_40px_rgba(0,0,0,0.85)] ${
      isOverload
        ? 'border-red-500/60 shadow-[0_0_30px_rgba(239,68,68,0.25)]'
        : 'border-slate-800 shadow-[0_0_24px_rgba(6,182,212,0.1)]'
    }`}>
      {/* Background Subtle Cyber Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Corner Chassis Mount Screws */}
      <div className="absolute top-3 left-3 z-20"><ChassisScrew size={14} rotation={24} /></div>
      <div className="absolute top-3 right-3 z-20"><ChassisScrew size={14} rotation={88} /></div>
      <div className="absolute bottom-3 left-3 z-20"><ChassisScrew size={14} rotation={140} /></div>
      <div className="absolute bottom-3 right-3 z-20"><ChassisScrew size={14} rotation={55} /></div>

      <div className="relative z-10 flex flex-col gap-6">
        {/* ================= 1. TELEMETRY READOUT HEADER ================= */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-5 border-b border-slate-800/90">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-lg border font-mono flex items-center gap-2 ${
              isOverload ? 'bg-red-950/80 border-red-500/60 text-red-400 animate-pulse' : 'bg-cyan-950/80 border-cyan-500/40 text-cyan-300'
            }`}>
              {isOverload ? <AlertTriangle className="w-5 h-5" /> : <Sliders className="w-5 h-5" />}
              <span className="font-black text-sm uppercase tracking-wider">
                MASTER OSCILLOSCOPE & TELEMETRY CONTROLLER
              </span>
            </div>
          </div>

          {/* Real-time Telemetry Metrics Readout Strip */}
          <div className="flex items-center gap-6 sm:gap-10 bg-black/60 border border-slate-800 px-5 py-2.5 rounded-xl shadow-inner font-mono">
            {/* SYS LOAD */}
            <div className="flex flex-col items-center">
              <span className="text-[9px] uppercase text-slate-400 font-bold tracking-wider flex items-center gap-1">
                <Activity className="w-3 h-3 text-cyan-400" />
                SYS LOAD
              </span>
              <span className="text-base font-black text-white">
                {sysLoad.toFixed(1)}%
              </span>
            </div>

            <div className="h-7 w-[1px] bg-slate-800" />

            {/* SIG FREQ */}
            <div className="flex flex-col items-center">
              <span className="text-[9px] uppercase text-slate-400 font-bold tracking-wider flex items-center gap-1">
                <Radio className="w-3 h-3 text-emerald-400" />
                SIG FREQ
              </span>
              <span className="text-base font-black text-emerald-300">
                {sigFreqCalc} Hz
              </span>
            </div>

            <div className="h-7 w-[1px] bg-slate-800" />

            {/* AMPLITUDE */}
            <div className="flex flex-col items-center">
              <span className="text-[9px] uppercase text-slate-400 font-bold tracking-wider flex items-center gap-1">
                <Zap className="w-3 h-3 text-amber-400" />
                AMPLITUDE
              </span>
              <span className={`text-base font-black ${isOverload ? 'text-red-400' : 'text-amber-300'}`}>
                {amplitudeVppCalc} Vpp
              </span>
            </div>
          </div>
        </div>

        {/* ================= 2. CONSOLE MODE PRESET SELECTOR ================= */}
        <div className="flex flex-col gap-2.5">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-300">
            CONSOLE MODE PRESET
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-black/50 border border-slate-800/80 p-2 rounded-xl backdrop-blur-sm">
            {presets.map((preset) => {
              const active = consolePreset === preset;
              let activeStyle = 'bg-blue-600 border-blue-400 text-white shadow-[0_0_14px_rgba(37,99,235,0.6)]';
              if (preset === 'Overload Peak') {
                activeStyle = 'bg-red-600 border-red-400 text-white shadow-[0_0_14px_rgba(239,68,68,0.7)] animate-pulse';
              } else if (preset === 'Low Power') {
                activeStyle = 'bg-slate-700 border-slate-500 text-amber-300 shadow-[0_0_10px_rgba(245,158,11,0.4)]';
              } else if (preset === 'Custom (*)') {
                activeStyle = 'bg-purple-900 border-purple-400 text-purple-200 shadow-[0_0_12px_rgba(168,85,247,0.5)]';
              }

              return (
                <button
                  key={preset}
                  type="button"
                  onClick={() => handlePresetClick(preset)}
                  className={`py-3 px-4 rounded-lg font-mono font-black text-xs uppercase tracking-wider transition-all cursor-pointer border ${
                    active
                      ? `${activeStyle} scale-[1.02]`
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700 hover:bg-slate-800/80'
                  }`}
                >
                  {preset}
                </button>
              );
            })}
          </div>
        </div>

        {/* ================= 3. MASTER POTENTIOMETERS & SLIDERS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {/* Slider 1: MASTER POTENTIOMETER (GAIN) */}
          <div className="bg-black/50 border border-slate-800 p-4 rounded-xl flex flex-col justify-between gap-3 shadow-inner">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-slate-300 uppercase tracking-wider">
                MASTER POTENTIOMETER (GAIN)
              </span>
              <span className="font-black text-cyan-300 text-sm">{masterGain} %</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={masterGain}
              onChange={(e) => {
                const val = Number(e.target.value);
                if (onGainChange) onGainChange(val);
              }}
              className="w-full accent-cyan-400 cursor-pointer h-2 bg-slate-800 rounded-lg outline-none"
            />
            <div className="flex justify-between text-[9px] font-mono text-slate-500 font-bold">
              <span>0% (MUTE)</span>
              <span>50% (NOMINAL)</span>
              <span>100% (PEAK)</span>
            </div>
          </div>

          {/* Slider 2: OSCILLATOR FREQUENCY STATE */}
          <div className="bg-black/50 border border-slate-800 p-4 rounded-xl flex flex-col justify-between gap-3 shadow-inner">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-slate-300 uppercase tracking-wider">
                OSCILLATOR FREQUENCY STATE
              </span>
              <span className="font-black text-emerald-300 text-sm">{oscillatorFreq.toFixed(2)}x</span>
            </div>
            <input
              type="range"
              min="0.10"
              max="2.00"
              step="0.05"
              value={oscillatorFreq}
              onChange={(e) => {
                const val = Number(e.target.value);
                if (onFreqChange) onFreqChange(val);
              }}
              className="w-full accent-emerald-400 cursor-pointer h-2 bg-slate-800 rounded-lg outline-none"
            />
            <div className="flex justify-between text-[9px] font-mono text-slate-500 font-bold">
              <span>0.10x (SLOW)</span>
              <span>1.00x (NORM)</span>
              <span>2.00x (HIGH)</span>
            </div>
          </div>

          {/* Slider 3: WAVEFORM NOISE / HARMONICS */}
          <div className="bg-black/50 border border-slate-800 p-4 rounded-xl flex flex-col justify-between gap-3 shadow-inner">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-slate-300 uppercase tracking-wider">
                WAVEFORM NOISE / HARMONICS
              </span>
              <span className="font-black text-amber-300 text-sm">{waveformNoise} %</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={waveformNoise}
              onChange={(e) => {
                const val = Number(e.target.value);
                if (onNoiseChange) onNoiseChange(val);
              }}
              className="w-full accent-amber-400 cursor-pointer h-2 bg-slate-800 rounded-lg outline-none"
            />
            <div className="flex justify-between text-[9px] font-mono text-slate-500 font-bold">
              <span>0% (CLEAN)</span>
              <span>50% (MODIFIED)</span>
              <span>100% (DISTORTED)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
