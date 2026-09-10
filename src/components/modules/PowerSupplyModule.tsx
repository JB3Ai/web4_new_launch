import React, { useState } from 'react';
import { BatteryCharging, AlertTriangle } from 'lucide-react';

interface PowerSupplyModuleProps {
  powerOn: boolean;
}

export const PowerSupplyModule: React.FC<PowerSupplyModuleProps> = ({ powerOn }) => {
  const [targetVoltage, setTargetVoltage] = useState(13.8); // e.g. 13.8V standard lab rail
  const [currentLimit, setCurrentLimit] = useState(2.0); // 2.0A limit
  const [outputActive, setOutputActive] = useState(true);

  const activeVolts = powerOn && outputActive ? targetVoltage : 0;
  // Realistic load simulation: current drawn proportional to voltage into simulated bench circuit
  const activeAmps = powerOn && outputActive ? Math.min(activeVolts / 18, currentLimit) : 0;
  const isCurrentLimited = activeAmps >= currentLimit && powerOn && outputActive;

  return (
    <div className="flex flex-col gap-3 font-mono">
      {/* Twin Needle Meter Cluster (Volts & Amperes) */}
      <div className="grid grid-cols-2 gap-2">
        {/* DC Volts Meter */}
        <div className="bg-[#EFE8DC] border-2 border-[#1E232B] rounded p-1.5 text-[#191D24] shadow-inner text-center">
          <div className="text-[8px] font-bold text-[#475160] uppercase">DC VOLTS (0-30V)</div>
          <div className="text-base font-black text-[#15181F] my-0.5">
            {activeVolts.toFixed(1)} <span className="text-[10px] font-normal">V</span>
          </div>
          <div className="w-full bg-[#BDB3A1] h-1 rounded-full overflow-hidden">
            <div
              className="bg-red-700 h-full transition-all duration-200"
              style={{ width: `${(activeVolts / 30) * 100}%` }}
            />
          </div>
        </div>

        {/* DC Amperes Meter */}
        <div className="bg-[#EFE8DC] border-2 border-[#1E232B] rounded p-1.5 text-[#191D24] shadow-inner text-center">
          <div className="text-[8px] font-bold text-[#475160] uppercase">DC AMPERES (0-3A)</div>
          <div className="text-base font-black text-[#15181F] my-0.5">
            {activeAmps.toFixed(2)} <span className="text-[10px] font-normal">A</span>
          </div>
          <div className="w-full bg-[#BDB3A1] h-1 rounded-full overflow-hidden">
            <div
              className="bg-emerald-700 h-full transition-all duration-200"
              style={{ width: `${(activeAmps / 3) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Voltage Coarse Control Slider */}
      <div className="bg-[#222731] border border-[#3B4454] p-2 rounded flex flex-col gap-1">
        <div className="flex justify-between items-center text-[9px] text-[#8EA0B5]">
          <span className="font-bold">VOLTAGE COARSE ADJUST (0 - 30V)</span>
          <span className="text-amber-300 font-bold">{targetVoltage.toFixed(1)} V</span>
        </div>
        <input
          type="range"
          min="0"
          max="30"
          step="0.1"
          value={targetVoltage}
          onChange={(e) => setTargetVoltage(Number(e.target.value))}
          disabled={!powerOn}
          className="w-full accent-amber-500 bg-[#161920] h-2 rounded cursor-pointer disabled:opacity-40"
        />
      </div>

      {/* Current Limit & Sub-controls */}
      <div className="grid grid-cols-2 gap-2 text-[9px]">
        {/* Current Limit */}
        <div className="bg-[#222731] border border-[#3B4454] p-1.5 rounded flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#8FA0B5] font-bold text-[8px]">
            <span>CURRENT LIMIT</span>
            <span className="text-emerald-400">{currentLimit.toFixed(1)} A</span>
          </div>
          <input
            type="range"
            min="0.2"
            max="3.0"
            step="0.1"
            value={currentLimit}
            onChange={(e) => setCurrentLimit(Number(e.target.value))}
            disabled={!powerOn}
            className="w-full accent-emerald-500 bg-[#161920] h-1.5 rounded cursor-pointer disabled:opacity-40 my-1"
          />
          <div className="flex items-center gap-1 text-[8px]">
            <div
              className={`w-2 h-2 rounded-full ${
                isCurrentLimited ? 'bg-red-500 shadow-[0_0_6px_#ef4444]' : 'bg-[#3A2222]'
              }`}
            />
            <span className={isCurrentLimited ? 'text-red-400 font-bold' : 'text-[#647285]'}>
              CC LIMIT TRIP
            </span>
          </div>
        </div>

        {/* Output Enable Switch */}
        <div className="bg-[#222731] border border-[#3B4454] p-1.5 rounded flex flex-col justify-between items-center text-center">
          <span className="text-[#8FA0B5] font-bold text-[8px]">OUTPUT COUPLING</span>
          <button
            type="button"
            onClick={() => setOutputActive(!outputActive)}
            disabled={!powerOn}
            className={`w-full py-1 text-[9px] font-bold rounded border cursor-pointer ${
              outputActive && powerOn
                ? 'bg-emerald-950/80 border-emerald-600 text-emerald-300 shadow-[0_0_4px_rgba(16,185,129,0.3)]'
                : 'bg-[#181C22] border-[#363E4D] text-[#8695A8]'
            }`}
          >
            {outputActive && powerOn ? 'OUTPUT ON' : 'STANDBY'}
          </button>
          <span className="text-[7px] text-[#69798E]">ISOLATED FLOATING RAIL</span>
        </div>
      </div>

      {/* 5-Way Laboratory Binding Posts */}
      <div className="bg-[#181C23] border border-[#363E4C] p-2 rounded flex items-center justify-around">
        {/* Negative Post */}
        <div className="flex flex-col items-center gap-1">
          <div className="w-5 h-5 rounded-full bg-[#181A1F] border-2 border-[#424854] flex items-center justify-center shadow-inner">
            <div className="w-2 h-2 rounded-full bg-neutral-900 border border-neutral-700" />
          </div>
          <span className="text-[8px] text-[#8895A6] font-bold font-mono">(-) BLACK</span>
        </div>

        {/* Earth Ground Post */}
        <div className="flex flex-col items-center gap-1">
          <div className="w-5 h-5 rounded-full bg-[#1C532E] border-2 border-[#2E854B] flex items-center justify-center shadow-inner">
            <div className="w-2 h-2 rounded-full bg-emerald-700 border border-emerald-400" />
          </div>
          <span className="text-[8px] text-emerald-400 font-bold font-mono">(GND) GREEN</span>
        </div>

        {/* Positive Post */}
        <div className="flex flex-col items-center gap-1">
          <div className="w-5 h-5 rounded-full bg-[#781B1B] border-2 border-[#B03131] flex items-center justify-center shadow-inner">
            <div className="w-2 h-2 rounded-full bg-red-600 border border-red-400" />
          </div>
          <span className="text-[8px] text-red-400 font-bold font-mono">(+) RED</span>
        </div>
      </div>
    </div>
  );
};
