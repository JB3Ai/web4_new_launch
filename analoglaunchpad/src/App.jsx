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

        <footer className="mt-10 border-2 border-[#1E222A] bg-[#12161C] text-slate-300 shadow-[inset_0_3px_14px_rgba(0,0,0,0.7)]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 p-6 sm:p-8">
            <section className="lg:col-span-2 px-2">
              <p className="text-xs font-black tracking-[0.2em] text-[#E9DED0]">JB³</p>
              <h2 className="mt-2 text-sm font-black tracking-widest text-white uppercase">Jonathan Blackburn</h2>
              <p className="mt-3 max-w-md text-[11px] leading-relaxed text-slate-400">
                South African entrepreneur and systems builder. Turning operational complexity into structure, clarity, and practical AI for good.
              </p>
              <p className="mt-4 text-[10px] font-black tracking-widest text-emerald-400">SOUTH AFRICA · GLOBAL</p>
              <span className="mt-4 inline-flex border border-[#46505E] bg-[#1E252F] px-3 py-2 text-[10px] font-black tracking-widest text-[#E9DED0]">
                VISIT JB³AI COMPANY
              </span>
            </section>

            <section aria-labelledby="products-heading" className="px-2">
              <h2 id="products-heading" className="text-[10px] font-black tracking-widest text-[#E9DED0] uppercase">Products</h2>
              <ul className="mt-4 space-y-2 text-[11px] leading-relaxed text-slate-400">
                <li>DukeBox of London</li>
                <li>Isikulo AI</li>
                <li>ClipboardAI</li>
                <li>VoiceGrid AI</li>
                <li>SuperAgents</li>
                <li>InvestigatorAi</li>
                <li>NewsroomAi</li>
                <li>ViewGrid</li>
              </ul>
            </section>

            <section aria-labelledby="content-heading" className="px-2">
              <h2 id="content-heading" className="text-[10px] font-black tracking-widest text-[#E9DED0] uppercase">Content</h2>
              <ul className="mt-4 space-y-2 text-[11px] leading-relaxed text-slate-400">
                <li>Founder Story</li>
                <li>GTR³ Book</li>
                <li>Evidence</li>
                <li>Timeline</li>
                <li>Insights</li>
              </ul>
            </section>

            <section aria-labelledby="support-heading" className="px-2">
              <h2 id="support-heading" className="text-[10px] font-black tracking-widest text-[#E9DED0] uppercase">Support</h2>
              <ul className="mt-4 space-y-2 text-[11px] leading-relaxed text-slate-400">
                <li>Buy Me a Coffee</li>
                <li>PayBru (SA)</li>
                <li>PayPal</li>
                <li>Ko-fi</li>
                <li>OS³ Portal</li>
                <li>JB³Ai Company</li>
              </ul>
            </section>

            <section aria-labelledby="connect-heading" className="px-2">
              <h2 id="connect-heading" className="text-[10px] font-black tracking-widest text-[#E9DED0] uppercase">Connect</h2>
              <ul className="mt-4 space-y-2 text-[11px] leading-relaxed text-slate-400 break-all">
                <li><a className="hover:text-emerald-300 transition-colors" href="mailto:hi@jb3ai.com">hi@jb3ai.com</a></li>
                <li><a className="hover:text-emerald-300 transition-colors" href="mailto:jono@jb3ai.com">jono@jb3ai.com</a></li>
                <li><a className="hover:text-emerald-300 transition-colors" href="mailto:jono@jonoblackburn.com">jono@jonoblackburn.com</a></li>
              </ul>
            </section>
          </div>

          <div className="border-t border-slate-800 px-6 sm:px-8 py-3 flex flex-wrap gap-2 justify-between text-[9px] font-black tracking-widest text-slate-500">
            <span>// JB³AI COMPANY // SYSTEMS FOR PRACTICAL AI</span>
            <span>MASTER CONSOLE // SOUTH AFRICA · GLOBAL</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
