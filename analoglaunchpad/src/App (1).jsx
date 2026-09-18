import React, { useState, useEffect } from 'react';
import { ConsoleHeader } from './components/Chassis/ConsoleHeader';
import { MasterOscilloscopeController } from './components/Chassis/MasterOscilloscopeController';
import { LargeModule } from './components/modules/LargeModule';
import { SmallModule } from './components/modules/SmallModule';
import { ChassisScrew } from './components/Shared/HardwareControls';
import appsData from './data/appsData';
import { ExternalLink, Mail, CheckCircle2, User, Sparkles } from 'lucide-react';

/**
 * App (Main Assembly)
 * 1970s Laboratory Test Bench & SaaS Launchpad
 * Features JB³-DEMO-STATION_B01 master controller, MasterOscilloscopeController,
 * interleaved rack layout, and high-impact founder sign-off portfolio section.
 */
export default function App() {
  const [mainsPower, setMainsPower] = useState(true);
  const [selectedStack, setSelectedStack] = useState('ALL');
  const [benchVoltage, setBenchVoltage] = useState(117.4);
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  // Master Oscilloscope & Telemetry Controller State
  const [masterGain, setMasterGain] = useState(75);
  const [oscillatorFreq, setOscillatorFreq] = useState(0.40);
  const [waveformNoise, setWaveformNoise] = useState(25);
  const [consolePreset, setConsolePreset] = useState('Nominal');
  const [sysLoad, setSysLoad] = useState(41.8);

  // Simulated live fluctuating telemetry
  useEffect(() => {
    if (!mainsPower) return;
    const interval = setInterval(() => {
      const deltaV = (Math.random() - 0.5) * 0.4;
      setBenchVoltage(() => +(117.2 + deltaV).toFixed(1));
      const deltaL = (Math.random() - 0.5) * 1.8;
      setSysLoad(() => +(41.8 + deltaL).toFixed(1));
    }, 2500);
    return () => clearInterval(interval);
  }, [mainsPower]);

  const handlePresetSelect = (preset) => {
    setConsolePreset(preset);
    if (preset === 'Nominal') {
      setMasterGain(75);
      setOscillatorFreq(0.40);
      setWaveformNoise(25);
    } else if (preset === 'Overload Peak') {
      setMasterGain(100);
      setOscillatorFreq(1.25);
      setWaveformNoise(80);
    } else if (preset === 'Low Power') {
      setMasterGain(25);
      setOscillatorFreq(0.15);
      setWaveformNoise(5);
    }
  };

  const handleCustomGain = (val) => {
    setMasterGain(val);
    setConsolePreset('Custom (*)');
  };

  const handleCustomFreq = (val) => {
    setOscillatorFreq(val);
    setConsolePreset('Custom (*)');
  };

  const handleCustomNoise = (val) => {
    setWaveformNoise(val);
    setConsolePreset('Custom (*)');
  };

  // Unified system channel sectors keep the grid focused without coupling UI
  // layout to a deployment provider.
  const sectors = [
    { id: 'ALL', label: 'ALL CHANNELS' },
    { id: 'WEB', label: 'WEB ENGINE' },
    { id: 'FAMILY', label: 'FAMILY NETWORK' },
    { id: 'REPORTS', label: 'DD REPORTS' },
    { id: 'APPS', label: 'CORE APPS' },
  ];
  const filteredApps = appsData.filter(
    (app) => selectedStack === 'ALL' || app.sector === selectedStack
  );
  const matchingCount = filteredApps.length;

  const app1 = appsData[0]; // BAY-01: IsiKoloAi Launch
  const app2 = appsData[1]; // BAY-02: SkyTime
  const app3 = appsData[2]; // BAY-03: NeuroFam Analytics
  const app4 = appsData[3]; // BAY-04: OS³ AgentBuilder
  const app5 = appsData[4]; // BAY-05: isidore Due Diligence
  const app6 = appsData[5]; // BAY-06: Business Redesign (NMS)
  const app7 = appsData[6]; // BAY-07: JB³ Command Centre
  const app8 = appsData[7]; // BAY-08: Founder : Jono Blackburn
  const app9 = appsData[8]; // BAY-09: OS³ Demo Area

  const checkMatch = (app) => {
    if (selectedStack === 'ALL') return true;
    return app.sector === selectedStack;
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 5000);
      setEmailInput('');
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#07080a] text-[#F1F5F9] flex flex-col justify-between overflow-x-hidden select-none">
      {/* Neural Cyberpunk Canvas: Triple-Source Radial Blur Mesh */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div
          className="absolute -top-[10%] -left-[10%] w-[65vw] h-[65vw] max-w-[850px] max-h-[850px] rounded-full blur-[140px] opacity-10 animate-float-1 pointer-events-none"
          style={{
            background: 'radial-gradient(circle, #A855F7 0%, rgba(168, 85, 247, 0) 70%)',
          }}
        />

        <div
          className="absolute top-[28%] -right-[12%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full blur-[140px] opacity-10 animate-float-2 pointer-events-none"
          style={{
            background: 'radial-gradient(circle, #10B981 0%, rgba(16, 185, 129, 0) 70%)',
          }}
        />

        <div
          className="absolute -bottom-[12%] left-[20%] w-[62vw] h-[62vw] max-w-[820px] max-h-[820px] rounded-full blur-[140px] opacity-10 animate-float-3 pointer-events-none"
          style={{
            background: 'radial-gradient(circle, #F97316 0%, rgba(249, 115, 22, 0) 70%)',
          }}
        />

        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.15) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        <div className="absolute inset-0 lab-noise-overlay opacity-40 pointer-events-none" />
      </div>

      {/* Main Assembly Layer */}
      <div className="relative z-10 flex flex-col flex-1">
        {/* Master Console Controller ("JB³-DEMO-STATION_B01") */}
        <ConsoleHeader
          sectors={sectors}
          activeFilter={selectedStack}
          onFilterChange={setSelectedStack}
        />

        {/* Rack Mount Assembly Enclosure Area */}
        <main className="max-w-7xl w-full mx-auto p-3 sm:p-6 lg:p-8 flex-1 flex flex-col justify-start">
          {/* Rack Console Sub-Header with EIA Rail Screws */}
          <div className="flex items-center justify-between px-4 py-2.5 mb-6 text-xs sm:text-sm font-mono font-black text-slate-200 border border-cyan-500/30 bg-black/60 backdrop-blur-md rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
            <div className="flex items-center gap-3">
              <ChassisScrew size={15} rotation={18} />
              <span className="tracking-widest uppercase text-cyan-300 drop-shadow-[0_0_8px_rgba(6,182,212,0.4)]">
                NEURAL CYBERPUNK LAUNCHPAD // JB³-DEMO-STATION_B01 19-INCH INSTRUMENTATION MATRIX
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-slate-300">
                HOST FILTER:{' '}
                <span className="text-cyan-400 font-black">{selectedStack.toUpperCase()}</span> (
                <span className="text-emerald-400 font-bold">{matchingCount}</span>/
                {appsData.length} ACTIVE)
              </span>
              <ChassisScrew size={15} rotation={92} />
            </div>
          </div>

          {/* 19-inch asymmetric instrument bay matrix */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {filteredApps.map((app) => {
              const isLarge = ['BAY-01', 'BAY-04', 'BAY-07'].includes(app.slot);
              const slotNumber = app.slot;

              return (
                <div
                  key={app.id}
                  className={`h-full transition-all duration-300 ${isLarge ? 'md:col-span-2' : 'md:col-span-1'}`}
                >
                  {isLarge ? (
                    <LargeModule
                      app={app}
                      slotNumber={slotNumber}
                      mainsPower={mainsPower}
                      masterGain={masterGain}
                      oscillatorFreq={oscillatorFreq}
                      waveformNoise={waveformNoise}
                    />
                  ) : (
                    <SmallModule
                      app={app}
                      slotNumber={slotNumber}
                      mainsPower={mainsPower}
                      masterGain={masterGain}
                      oscillatorFreq={oscillatorFreq}
                      waveformNoise={waveformNoise}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {false && (
            <>
          {/* ================= SECTION 1: BAY-01 (IsiKoloAi Launch) ================= */}
          <div className="mb-6">
            {(() => {
              const isMatch = checkMatch(app1);
              return (
                <div
                  className={`transition-opacity duration-300 ${
                    isMatch ? 'opacity-100' : 'opacity-20 pointer-events-none'
                  }`}
                >
                  <LargeModule
                    app={app1}
                    slotNumber="BAY-01"
                    mainsPower={mainsPower && isMatch}
                    masterGain={masterGain}
                    oscillatorFreq={oscillatorFreq}
                    waveformNoise={waveformNoise}
                  />
                </div>
              );
            })()}
          </div>

          {/* ================= SECTION 2: BAY-02 (SkyTime) & BAY-03 (NeuroFam Analytics) ================= */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {[
              { app: app2, slot: 'BAY-02' },
              { app: app3, slot: 'BAY-03' },
            ].map(({ app, slot }) => {
              const isMatch = checkMatch(app);
              return (
                <div
                  key={app.id}
                  className={`h-full flex flex-col transition-opacity duration-300 ${
                    isMatch ? 'opacity-100' : 'opacity-20 pointer-events-none'
                  }`}
                >
                  <SmallModule
                    app={app}
                    slotNumber={slot}
                    mainsPower={mainsPower && isMatch}
                    masterGain={masterGain}
                    oscillatorFreq={oscillatorFreq}
                    waveformNoise={waveformNoise}
                  />
                </div>
              );
            })}
          </div>

          {/* ================= SECTION 3: BAY-04 (OS³ AgentBuilder) ================= */}
          <div className="mb-6">
            {(() => {
              const isMatch = checkMatch(app4);
              return (
                <div
                  className={`transition-opacity duration-300 ${
                    isMatch ? 'opacity-100' : 'opacity-20 pointer-events-none'
                  }`}
                >
                  <LargeModule
                    app={app4}
                    slotNumber="BAY-04"
                    mainsPower={mainsPower && isMatch}
                    masterGain={masterGain}
                    oscillatorFreq={oscillatorFreq}
                    waveformNoise={waveformNoise}
                  />
                </div>
              );
            })()}
          </div>

          {/* ================= SECTION 4: BAY-05 (isidore Due Diligence) & BAY-06 (Business Redesign NMS) ================= */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {[
              { app: app5, slot: 'BAY-05' },
              { app: app6, slot: 'BAY-06' },
            ].map(({ app, slot }) => {
              const isMatch = checkMatch(app);
              return (
                <div
                  key={app.id}
                  className={`h-full flex flex-col transition-opacity duration-300 ${
                    isMatch ? 'opacity-100' : 'opacity-20 pointer-events-none'
                  }`}
                >
                  <SmallModule
                    app={app}
                    slotNumber={slot}
                    mainsPower={mainsPower && isMatch}
                    masterGain={masterGain}
                    oscillatorFreq={oscillatorFreq}
                    waveformNoise={waveformNoise}
                  />
                </div>
              );
            })}
          </div>

          {/* ================= SECTION 5: BAY-07 (JB³ Command Centre) ================= */}
          <div className="mb-6">
            {(() => {
              const isMatch = checkMatch(app7);
              return (
                <div
                  className={`transition-opacity duration-300 ${
                    isMatch ? 'opacity-100' : 'opacity-20 pointer-events-none'
                  }`}
                >
                  <LargeModule
                    app={app7}
                    slotNumber="BAY-07"
                    mainsPower={mainsPower && isMatch}
                    masterGain={masterGain}
                    oscillatorFreq={oscillatorFreq}
                    waveformNoise={waveformNoise}
                  />
                </div>
              );
            })()}
          </div>

          {/* ================= SECTION 6: BAY-08 (Founder : Jono Blackburn) & BAY-09 (OS³ Demo Area) ================= */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {[
              { app: app8, slot: 'BAY-08' },
              { app: app9, slot: 'BAY-09' },
            ].map(({ app, slot }) => {
              const isMatch = checkMatch(app);
              return (
                <div
                  key={app.id}
                  className={`h-full flex flex-col transition-opacity duration-300 ${
                    isMatch ? 'opacity-100' : 'opacity-20 pointer-events-none'
                  }`}
                >
                  <SmallModule
                    app={app}
                    slotNumber={slot}
                    mainsPower={mainsPower && isMatch}
                    masterGain={masterGain}
                    oscillatorFreq={oscillatorFreq}
                    waveformNoise={waveformNoise}
                  />
                </div>
              );
            })}
          </div>
            </>
          )}

          {/* ================= MASTER OSCILLOSCOPE & TELEMETRY CONTROLLER (NEW SPEC CONTROLLER) ================= */}
          <MasterOscilloscopeController
            masterGain={masterGain}
            onGainChange={handleCustomGain}
            oscillatorFreq={oscillatorFreq}
            onFreqChange={handleCustomFreq}
            waveformNoise={waveformNoise}
            onNoiseChange={handleCustomNoise}
            consolePreset={consolePreset}
            onPresetSelect={handlePresetSelect}
            sysLoad={sysLoad}
          />

          {/* ================= ENLARGED SIGN-OFF & PORTFOLIO BANNER CARD ================= */}
          <section className="relative w-full rounded-2xl border border-cyan-500/40 bg-black/70 backdrop-blur-xl p-6 sm:p-10 mb-8 overflow-hidden shadow-[0_12px_48px_rgba(0,0,0,0.8),0_0_30px_rgba(6,182,212,0.15)] select-text">
            {/* Faint Background Portrait of Founder */}
            <div
              className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-[0.14] mix-blend-luminosity filter contrast-125 transition-opacity duration-700 hover:opacity-20"
              style={{
                backgroundImage: 'url(/assets/BAY08jbprofile.jpg)',
              }}
            />
            {/* Linear Gradient Fade Mask over Founder Image */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/60 pointer-events-none" />
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38EF7D_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

            {/* Corner Screws */}
            <div className="absolute top-3 left-3 z-20"><ChassisScrew size={16} rotation={45} /></div>
            <div className="absolute top-3 right-3 z-20"><ChassisScrew size={16} rotation={120} /></div>
            <div className="absolute bottom-3 left-3 z-20"><ChassisScrew size={16} rotation={90} /></div>
            <div className="absolute bottom-3 right-3 z-20"><ChassisScrew size={16} rotation={15} /></div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Sign-off Message & Call to Action */}
              <div className="lg:col-span-7 flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-cyan-950/80 border border-cyan-500/50 text-cyan-300 font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-[0_0_10px_rgba(6,182,212,0.3)]">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    FOUNDER DIRECTIVE & PORTFOLIO ACCESS
                  </span>
                </div>

                <h2 className="text-2xl sm:text-4xl font-mono font-black text-white uppercase tracking-wide leading-tight drop-shadow-[0_0_12px_rgba(255,255,255,0.2)]">
                  THANK YOU FOR VISITING JB³ DEMO STATION
                </h2>

                <p className="text-sm sm:text-base font-mono text-slate-300 leading-relaxed">
                  Sign up below to receive operational telemetry, launch updates, and early access to new AI web app deployments.
                </p>

                {/* Interactive Email Sign-up Form */}
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-xl mt-1">
                  <div className="relative flex-1">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      placeholder="Enter your email for updates..."
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      className="w-full bg-black/80 border border-slate-700 focus:border-cyan-400 text-white placeholder-slate-500 text-xs sm:text-sm font-mono pl-10 pr-4 py-3 rounded-none outline-none transition-all shadow-inner focus:shadow-[0_0_12px_rgba(6,182,212,0.3)]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-mono font-black text-xs sm:text-sm uppercase tracking-wider rounded-none transition-all shadow-[0_0_16px_rgba(16,185,129,0.4)] cursor-pointer flex items-center justify-center gap-2 shrink-0 active:scale-95"
                  >
                    <span>SIGN UP HERE</span>
                  </button>
                </form>

                {subscribed && (
                  <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/80 border border-emerald-500/50 px-3 py-2 rounded-lg max-w-xl animate-fade-in">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>SUBSCRIBED SUCCESSFULLY! TELEMETRY VECTOR SYNCHRONIZED.</span>
                  </div>
                )}
              </div>

              {/* Right Column: Personal Portfolio Direct Link */}
              <div className="lg:col-span-5 flex flex-col justify-center items-start lg:items-end gap-4 bg-black/60 border border-slate-800 p-5 sm:p-6 rounded-xl shadow-inner backdrop-blur-md">
                <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">
                  <User className="w-4 h-4 text-amber-400" />
                  <span>PERSONAL PORTFOLIO LINK</span>
                </div>

                <div className="text-left lg:text-right">
                  <p className="text-xs font-mono text-slate-400 leading-relaxed mb-3">
                    Explore full projects, interactive demos, technical writing, and personal design work:
                  </p>
                  <a
                    href="http://www.jonoblackburn.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-cyan-950/90 border-2 border-cyan-400 text-cyan-200 font-mono font-black text-sm uppercase tracking-widest hover:bg-cyan-900 hover:text-white hover:border-cyan-300 transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.7)] hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <span>www.jonoblackburn.com</span>
                    <ExternalLink className="w-4 h-4 text-cyan-300" />
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Bottom Rack Rail Base Plate with Hardware Identification - ENLARGED */}
          <footer
            id="analog-launchpad-footer"
            className="p-5 sm:p-6 rounded-xl border-2 border-slate-800 bg-black/60 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.8)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-300"
          >
            <div className="flex items-center gap-3">
              <ChassisScrew size={16} rotation={45} />
              <div className="flex flex-col">
                <span className="font-black text-white tracking-widest text-sm uppercase drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">
                  JB³-DEMO-STATION_B01 • SYNAPSE MATRIX 2084
                </span>
                <span className="text-xs text-slate-400">
                  GLASSMORPHIC SUB-MILLISECOND TELEMETRY BENCH • SPEC-76 REVISION 4.2
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-slate-900 px-4 py-2 rounded-lg border border-slate-700 text-slate-200">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px_#10B981]" />
                <span className="font-bold tracking-wider uppercase text-xs">
                  OPTICAL BUS LINKED (ZERO DRIFT)
                </span>
              </div>
              <ChassisScrew size={16} rotation={120} />
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
