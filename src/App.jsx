import React, { useState, useEffect } from 'react';
import { ConsoleHeader } from './components/Chassis/ConsoleHeader';
import { LargeModule } from './components/Modules/LargeModule';
import { SmallModule } from './components/Modules/SmallModule';
import { ChassisScrew } from './components/Shared/HardwareControls';
import appsData from './data/appsData';

/**
 * App (Main Assembly)
 * 1970s Laboratory Test Bench & SaaS Launchpad
 * Global layout wrapper with matte-cream industrial metal background (#D2C9BD),
 * stamped metal sheet divider ridges, ConsoleHeader ("LAB-STATION_B01") master controller,
 * full-width LargeModule cards for Apps 1 & 2, and 2x2 responsive grid of SmallModule
 * cards for Apps 3-6.
 */
export default function App() {
  const [mainsPower, setMainsPower] = useState(true);
  const [selectedStack, setSelectedStack] = useState('ALL');
  const [benchVoltage, setBenchVoltage] = useState(117.4);

  // Slight AC line voltage fluctuation simulation
  useEffect(() => {
    if (!mainsPower) return;
    const interval = setInterval(() => {
      const delta = (Math.random() - 0.5) * 0.4;
      setBenchVoltage(() => +(117.2 + delta).toFixed(1));
    }, 2800);
    return () => clearInterval(interval);
  }, [mainsPower]);

  // Master platform filtering list
  const stacksList = ['ALL', 'Render', 'Node', 'Vercel', 'Static'];

  // Filter matching count
  const matchingCount = appsData.filter((app) => {
    if (selectedStack === 'ALL') return true;
    return app.stack.toLowerCase() === selectedStack.toLowerCase();
  }).length;

  // Architectural Layout Mapping:
  // - Render App 1 & Node App 2 output sequentially as full-width <LargeModule /> cards
  const largeApps = appsData.slice(0, 2);
  // - The remaining 4 apps (Vercel & Static pages) output inside 2x2 responsive grid as <SmallModule />
  const smallApps = appsData.slice(2, 6);

  return (
    <div className="relative min-h-screen w-full bg-[#07080a] text-[#F1F5F9] flex flex-col justify-between overflow-x-hidden select-none">
      {/* Neural Cyberpunk Canvas: Triple-Source Radial Blur Mesh (Purple, Green, Orange at 10% opacity) */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Source 1: Slow organic floating Purple radial gradient */}
        <div
          className="absolute -top-[10%] -left-[10%] w-[65vw] h-[65vw] max-w-[850px] max-h-[850px] rounded-full blur-[140px] opacity-10 animate-float-1 pointer-events-none"
          style={{
            background: 'radial-gradient(circle, #A855F7 0%, rgba(168, 85, 247, 0) 70%)',
          }}
        />

        {/* Source 2: Slow organic floating Emerald Green radial gradient */}
        <div
          className="absolute top-[28%] -right-[12%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full blur-[140px] opacity-10 animate-float-2 pointer-events-none"
          style={{
            background: 'radial-gradient(circle, #10B981 0%, rgba(16, 185, 129, 0) 70%)',
          }}
        />

        {/* Source 3: Slow organic floating Electric Orange radial gradient */}
        <div
          className="absolute -bottom-[12%] left-[20%] w-[62vw] h-[62vw] max-w-[820px] max-h-[820px] rounded-full blur-[140px] opacity-10 animate-float-3 pointer-events-none"
          style={{
            background: 'radial-gradient(circle, #F97316 0%, rgba(249, 115, 22, 0) 70%)',
          }}
        />

        {/* Glassmorphic Mesh Lines: Razor-thin border accents and cyber matrix */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.15) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Subtle Cyberpunk Noise Overlay */}
        <div className="absolute inset-0 lab-noise-overlay opacity-40 pointer-events-none" />
      </div>

      {/* Main Assembly Layer */}
      <div className="relative z-10 flex flex-col flex-1">
        {/* Master Console Controller ("LAB-STATION_B01") */}
        <ConsoleHeader
          mainsPower={mainsPower}
          onToggleMains={() => setMainsPower(!mainsPower)}
          benchVoltage={benchVoltage}
          selectedStack={selectedStack}
          onSelectStack={setSelectedStack}
          stacks={stacksList}
          totalApps={appsData.length}
          visibleCount={matchingCount}
        />

        {/* Rack Mount Assembly Enclosure Area */}
        <main className="max-w-7xl w-full mx-auto p-3 sm:p-6 lg:p-8 flex-1 flex flex-col justify-start">
          {/* Rack Console Sub-Header with EIA Rail Screws */}
          <div className="flex items-center justify-between px-3.5 py-2 mb-5 text-[10px] font-mono font-bold text-slate-300 border border-slate-800/80 bg-black/40 backdrop-blur-md rounded-md shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
            <div className="flex items-center gap-2">
              <ChassisScrew size={13} rotation={18} />
              <span className="tracking-widest uppercase text-slate-200">
                NEURAL CYBERPUNK LAUNCHPAD // EIA-310 19-INCH INSTRUMENTATION MATRIX
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-slate-400">
                HOST FILTER:{' '}
                <span className="text-cyan-400 font-black">{selectedStack.toUpperCase()}</span> (
                <span className="text-emerald-400 font-bold">{matchingCount}</span>/
                {appsData.length} ACTIVE)
              </span>
              <ChassisScrew size={13} rotation={92} />
            </div>
          </div>

          {/* ================= SECTION 1: Full-Width Primary Cards (Apps 1 & 2) ================= */}
          <div className="flex flex-col gap-6 mb-6">
            {largeApps.map((app, index) => {
              const isMatch =
                selectedStack === 'ALL' ||
                app.stack.toLowerCase() === selectedStack.toLowerCase();
              return (
                <div
                  key={app.id}
                  className={`transition-opacity duration-300 ${
                    isMatch ? 'opacity-100' : 'opacity-20 pointer-events-none'
                  }`}
                >
                  <LargeModule
                    app={app}
                    slotNumber={`BAY-0${index + 1}`}
                    mainsPower={mainsPower && isMatch}
                  />
                </div>
              );
            })}
          </div>

          {/* ================= SECTION 2: 2x2 Responsive Grid (Apps 3 to 6) ================= */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {smallApps.map((app, index) => {
              const isMatch =
                selectedStack === 'ALL' ||
                app.stack.toLowerCase() === selectedStack.toLowerCase();
              return (
                <div
                  key={app.id}
                  className={`h-full flex flex-col transition-opacity duration-300 ${
                    isMatch ? 'opacity-100' : 'opacity-20 pointer-events-none'
                  }`}
                >
                  <SmallModule
                    app={app}
                    slotNumber={`BAY-0${index + 3}`}
                    mainsPower={mainsPower && isMatch}
                  />
                </div>
              );
            })}
          </div>

          {/* Bottom Rack Rail Base Plate with Hardware Identification */}
          <footer
            id="analog-launchpad-footer"
            className="p-3.5 sm:p-4 rounded-md border border-slate-800/80 bg-black/40 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.6)] flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] font-mono text-slate-400"
          >
            <div className="flex items-center gap-3">
              <ChassisScrew size={14} rotation={45} />
              <div className="flex flex-col">
                <span className="font-bold text-slate-200 tracking-wider uppercase">
                  NEURAL CYBERPUNK CONSOLE • SYNAPSE MATRIX 2084
                </span>
                <span className="text-[9px] text-slate-500">
                  GLASSMORPHIC SUB-MILLISECOND TELEMETRY BENCH • SPEC-76 REVISION 4.2
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-slate-900/80 px-3 py-1 rounded border border-slate-700/60 text-slate-300">
                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10B981]" />
                <span className="font-bold tracking-wider uppercase text-[9px]">
                  OPTICAL BUS LINKED (ZERO DRIFT)
                </span>
              </div>
              <ChassisScrew size={14} rotation={120} />
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
