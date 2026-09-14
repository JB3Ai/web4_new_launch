import React, { useState } from 'react';
import { ConsoleHeader } from './components/Chassis/ConsoleHeader';
import { LargeModule } from './components/modules/LargeModule';
import { SmallModule } from './components/modules/SmallModule';
import appsData from './data/appsData';

/**
 * Main launchpad chassis. The outer rack stays light and tactile so that each
 * dark bay reads as a physical, recessed module rather than a floating card.
 */
export default function App() {
  const [activeFilter, setActiveFilter] = useState('ALL');

  const sectors = [
    { id: 'ALL', label: 'ALL BAY CHANNELS' },
    { id: 'WEB', label: 'WEB CHASSIS' },
    { id: 'FAMILY', label: 'FAMILY INFRA' },
    { id: 'REPORTS', label: 'DD ENGINES' },
    { id: 'APPS', label: 'CORE MODULES' },
  ];

  const filteredApps = appsData.filter(
    (app) => activeFilter === 'ALL' || app.sector === activeFilter
  );

  return (
    <div
      className="min-h-screen p-6 font-mono bg-[#D2C9BD] text-slate-900 selection:bg-emerald-500/30 relative overflow-x-hidden select-none"
      style={{
        backgroundImage:
          'linear-gradient(rgba(210,201,189,0.94), rgba(210,201,189,0.94)), url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 0h60v60H0zM1 1v58h58V1z\' fill=\'%231E222A\' fill-opacity=\'0.03\'/%3E%3C/svg%3E")',
      }}
    >
      <main className="max-w-7xl mx-auto border-4 border-[#1E222A] bg-transparent p-4 relative shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)]">
        <ConsoleHeader
          sectors={sectors}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        <section aria-label="Demo launch bays" className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {filteredApps.map((app) => {
            const isLarge = ['BAY-01', 'BAY-04', 'BAY-07'].includes(app.slot);
            const isMatch = activeFilter === 'ALL' || app.sector === activeFilter;

            return (
              <div
                key={app.id}
                className={`h-full transition-all duration-300 ${isLarge ? 'md:col-span-2' : 'md:col-span-1'} ${!isMatch ? 'opacity-10 pointer-events-none blur-[1px]' : 'opacity-100'}`}
              >
                {isLarge ? <LargeModule app={app} /> : <SmallModule app={app} />}
              </div>
            );
          })}
        </section>

        <footer className="mt-8 border-t-2 border-[#1E222A] pt-4 flex justify-between text-[11px] font-black tracking-wider text-[#1E222A]/70">
          <span>// STATION: JB³-LAUNCHPAD-REVISION_4.0</span>
          <span>CONSOLE STATE: HIGH-CONTRAST SYSTEM OPERATIONAL</span>
        </footer>
      </main>
    </div>
  );
}
