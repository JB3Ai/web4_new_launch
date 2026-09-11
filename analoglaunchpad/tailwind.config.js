/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lab: {
          cream: '#D2C9BD',       // Vintage Conar chassis paint
          creamDark: '#BAAFA1',   // Shadow tones for stamped metal panels
          slate: '#2B303A',       // Recessed modular steel blades
          slateDark: '#1E222A',   // Inner chassis depths
          phosphor: '#00FF66',    // Classic green CRT vector line
          amber: '#FFB000',       // Retro gas-discharge display
          radar: '#00E5FF',       // Cyan sweep signal
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Share Tech Mono', 'Courier New', 'monospace'],
      },
      boxShadow: {
        // Deep inset shadow to make screens look physically sunken into the dash
        'bevel': 'inset 0 4px 12px 2px rgba(0, 0, 0, 0.9), inset 0 -1px 3px rgba(255, 255, 255, 0.1)',
        // Outset shadow for chunky, raised physical plastic buttons
        'button-raised': '0 6px 0 #15181E, 0 8px 16px rgba(0, 0, 0, 0.6), inset 0 1px 2px rgba(255,255,255,0.2)',
        // Pushed-in state for interactive buttons
        'button-depressed': '0 2px 0 #15181E, 0 2px 4px rgba(0, 0, 0, 0.8), inset 0 4px 8px rgba(0,0,0,0.6)',
        // Intense glow matrices for illuminated indicator lights
        'glow-green': '0 0 12px 3px rgba(0, 255, 102, 0.6)',
        'glow-red': '0 0 12px 3px rgba(239, 68, 68, 0.6)',
        'glow-amber': '0 0 12px 3px rgba(255, 176, 0, 0.6)',
      }
    },
  },
  plugins: [],
};
