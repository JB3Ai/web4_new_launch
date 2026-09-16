import React, { useState } from 'react';
import { ShieldCheck, Lock, Unlock } from 'lucide-react';
import { LargeModule } from './components/modules/LargeModule';
import { SmallModule } from './components/modules/SmallModule';
import appsData from './data/appsData';
import { playKnobClick, playToggleSound } from './utils/audioEffects';

/** The rack chassis coordinates the nine channel power states and security gate. */
export default function App() {
  const [powerStates, setPowerStates] = useState(() => (
    Object.fromEntries(appsData.map((app) => [app.slot, true]))
  ));
  const [passcode, setPasscode] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [accessDenied, setAccessDenied] = useState(false);

  const totalBays = appsData.length;
  const activeCount = Object.values(powerStates).filter(Boolean).length;
  const systemTriggered = activeCount === 0;
  const isSystemLocked = systemTriggered && !isUnlocked;

  const handlePowerChange = (slot, nextState) => {
    setPowerStates((currentStates) => ({ ...currentStates, [slot]: nextState }));
  };

  const handleKeypadPress = (number) => {
    if (isUnlocked || !systemTriggered || passcode.length >= 4) return;

    playKnobClick();
    setAccessDenied(false);
    setPasscode((currentPasscode) => `${currentPasscode}${number}`);
  };

  const clearKeypad = () => {
    playToggleSound(false);
    setPasscode('');
    setAccessDenied(false);
  };

  const verifyPasscode = () => {
    if (passcode === '4020') {
      setIsUnlocked(true);
      setAccessDenied(false);
      playToggleSound(true);
      return;
    }

    setAccessDenied(true);
    setPasscode('');
    playToggleSound(false);
  };

  return (
    <div
      className="min-h-screen p-6 font-mono bg-[#D2C9BD] text-slate-900 selection:bg-emerald-500/30 relative overflow-x-hidden select-none"
      style={{
        backgroundImage: `
          linear-gradient(rgba(210, 201, 189, 0.94), rgba(210, 201, 189, 0.94)),
          url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h60v60H0zM1 1v58h58V1z' fill='%231E222A' fill-opacity='0.03'/%3E%3C/svg%3E")
        `,
      }}
    >
      <div className="max-w-7xl mx-auto border-4 border-[#1E222A] bg-transparent p-4 relative shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)]">
        <header className="border-2 border-[#1E222A] bg-[#1E222A] p-4 flex flex-col lg:flex-row items-center justify-between gap-6 relative shadow-md">
          <div className="flex items-center gap-3 w-full lg:w-auto">
            <div className="p-1.5 bg-black border border-slate-800 shrink-0">
              {isUnlocked ? (
                <Unlock className="text-emerald-500 animate-pulse" size={16} />
              ) : systemTriggered ? (
                <Lock className="text-red-500 animate-bounce" size={16} />
              ) : (
                <ShieldCheck className="text-amber-500" size={16} />
              )}
            </div>
            <div>
              <h1 className="text-xs font-black tracking-widest text-white uppercase font-mono">
                JB³ CENTRAL MATRIX // 19-INCH INDUSTRIAL SYSTEM STATION
              </h1>
              <p className="text-[9px] font-mono text-slate-400 uppercase tracking-widest mt-0.5">
                {isUnlocked
                  ? 'STATUS: ACCESS OVERRIDE DEPLOYED // MAIN ENGINE BYPASS ONLINE'
                  : systemTriggered
                    ? 'CRITICAL EXCEPTION: HARDWARE INTEGRITY ISOLATED // ENTER CODE TO RE-ENGAGE'
                    : `SYSTEM STATE: GRID BUS INITIALISATION [${activeCount}/${totalBays} ENERGIZED]`}
              </p>
            </div>
          </div>

          {isSystemLocked && (
            <div className="bg-[#0A0D10] border-2 border-slate-900 p-3 flex items-center gap-4 shadow-[inset_0_2px_10px_rgba(0,0,0,0.8)] w-full lg:w-auto justify-center lg:justify-start animate-fade-in">
              <div className="w-24 h-10 bg-[#07090C] border border-slate-800 flex flex-col justify-center px-2 relative">
                <span className="text-[7px] text-slate-500 block absolute top-0.5 left-1 tracking-tighter">SECURE CODE</span>
                <div className={`text-center font-bold tracking-widest text-xs mt-1 ${accessDenied ? 'text-red-500 animate-pulse' : 'text-emerald-400'}`}>
                  {accessDenied ? 'DENIED' : '* '.repeat(passcode.length) || 'READY'}
                </div>
              </div>

              <div className="grid grid-cols-5 gap-1">
                {['1', '2', '3', '4', '7', '0'].map((number) => (
                  <button
                    key={number}
                    type="button"
                    onClick={() => handleKeypadPress(number)}
                    className="w-7 h-7 bg-slate-900 border border-slate-700 text-white font-black text-[10px] flex items-center justify-center hover:bg-slate-800 active:bg-black rounded-none shadow-sm shadow-black/80 cursor-pointer"
                  >
                    {number}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={clearKeypad}
                  className="w-7 h-7 bg-red-950 border border-red-800 text-red-400 font-bold text-[8px] flex items-center justify-center hover:bg-red-900 rounded-none cursor-pointer"
                >
                  CLR
                </button>
                <button
                  type="button"
                  onClick={verifyPasscode}
                  className="w-14 h-7 col-span-2 bg-emerald-950 border border-emerald-800 text-emerald-400 font-bold text-[8px] flex items-center justify-center hover:bg-emerald-900 rounded-none tracking-widest cursor-pointer"
                >
                  ENTER
                </button>
              </div>

              <div className="flex flex-col gap-2 pl-1 border-l border-slate-800/80">
                <div className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${accessDenied ? 'bg-red-500 shadow-[0_0_8px_2px_rgba(239,68,68,0.8)]' : 'bg-slate-900'}`} />
                  <span className="text-[7px] text-slate-500 font-bold">ERR</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${passcode.length === 4 ? 'bg-amber-500 shadow-[0_0_8px_2px_rgba(245,158,11,0.8)]' : 'bg-slate-900'}`} />
                  <span className="text-[7px] text-slate-500 font-bold">LOCK</span>
                </div>
              </div>
            </div>
          )}

          <div className="text-[10px] font-black text-emerald-400 bg-black px-2 py-1 border border-slate-800 tracking-widest shrink-0 hidden sm:block">
            MAINS_VOLTAGE: 117.1 VAC
          </div>
        </header>

        <main className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8" aria-label="Demo launch bays">
          {appsData.map((app) => {
            const isLarge = ['BAY-01', 'BAY-04', 'BAY-07'].includes(app.slot);

            return (
              <div
                key={app.id}
                className={`h-full transition-all duration-300 ${isLarge ? 'md:col-span-2' : 'md:col-span-1'} ${
                  isSystemLocked ? 'blur-[0.5px] opacity-35 pointer-events-none' : 'opacity-100'
                }`}
              >
                {isLarge ? (
                  <LargeModule
                    app={app}
                    isPowerOn={powerStates[app.slot]}
                    onPowerChange={(state) => handlePowerChange(app.slot, state)}
                  />
                ) : (
                  <SmallModule
                    app={app}
                    isPowerOn={powerStates[app.slot]}
                    onPowerChange={(state) => handlePowerChange(app.slot, state)}
                  />
                )}
              </div>
            );
          })}
        </main>

        <footer className="mt-8 border-t-2 border-[#1E222A] pt-4 flex flex-wrap gap-2 justify-between text-[11px] font-black tracking-wider text-[#1E222A]/70">
          <span>// STATION DECK ALPHA // HARDWARE SYSTEM COHESIVE</span>
          <span>MASTER SECURITY HANDSHAKE MODULE // ACTIVE STATUS</span>
        </footer>
      </div>
    </div>
  );
}
