# AnalogLaunchpad

AnalogLaunchpad is the JB³ multi-channel production launchpad: a responsive React interface styled as a sharp-edged 1970s instrumentation console. A light industrial chassis holds nine recessed black launch bays with live canvas waveforms, mapped preview images, sector filtering, and direct demo links.

Repository: [JB3Ai/web4_new_launch](https://github.com/JB3Ai/web4_new_launch)

## Features

- Data-driven nine-bay product matrix with large priority modules and compact secondary modules.
- Industrial matte-cream rack with hard boundaries, deep pitch-black bay inserts, and stamped hex/X fasteners.
- Sector filters for Web Engine, Family Network, DD Reports, and Core Apps.
- Canvas-rendered sine, sawtooth, radar, Lissajous, LED, matrix, spectrum, VU needle, and cell-matrix displays.
- Fluid hover acceleration from `1.0` to `3.2` using elapsed-time linear interpolation.
- Cached CRT backgrounds, device-pixel-ratio limiting, bounded vector samples, and frame budgets to reduce canvas work.
- Automatic animation suspension when a scope is offscreen or the browser tab is hidden.
- Local screenshot previews with a geometric grayscale treatment and brighter hover state.
- Amber hardware fallback panel for pending or missing preview renders.
- High-contrast red and amber raised launch bricks with clear ready-state labelling.

## Tech stack

- React 19
- Vite 6
- Tailwind CSS 4
- TypeScript type checking
- Lucide React icons

## Run locally

### Prerequisites

- Node.js 20 or newer
- npm

### Installation

```bash
npm install
npm run dev
```

The development server runs at [http://localhost:3000](http://localhost:3000).

The current launchpad UI does not require an API key. The Gemini entry in `.env.example` belongs to the original AI Studio scaffold and is not consumed by the application source.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start Vite on port 3000 with network access enabled. |
| `npm run lint` | Run TypeScript validation with `tsc --noEmit`. |
| `npm run build` | Create the production bundle in `dist/`. |
| `npm run preview` | Serve the generated production bundle locally. |

## Project structure

```text
analoglaunchpad/
├── public/
│   └── assets/
│       └── previews/          # Product preview screenshots
├── src/
│   ├── components/
│   │   ├── Chassis/           # Console header
│   │   ├── modules/           # Large and compact bay blades
│   │   └── Shared/            # CRT renderer and hardware controls
│   ├── data/
│   │   └── appsData.js        # Product catalogue and bay routing
│   ├── App.jsx                # Filtering and rack layout
│   ├── index.css              # Global console styling
│   └── main.tsx               # React entry point
├── index.html
├── package.json
└── vite.config.ts
```

## Product catalogue

Each object in `src/data/appsData.js` defines one physical bay:

| Field | Description |
| --- | --- |
| `id` | Stable React and DOM identifier. |
| `slot` | Physical bay number such as `BAY-01`. |
| `title` | Product name shown in the module. |
| `description` | Short product summary. |
| `stack` | Technology label displayed on the blade. |
| `sector` | Master-console filter group. |
| `accentColor` | Waveform and indicator colour. |
| `waveType` | Oscilloscope renderer mode. |
| `imagePlaceholder` | Root preview asset path or `RENDER_PENDING`. |
| `demoUrl` | External launch destination. |

Priority slots `BAY-01`, `BAY-04`, and `BAY-07` render with `LargeModule`; all other slots use `SmallModule`.

## Preview assets

Place preview screenshots in:

```text
public/assets/previews/
```

Store the root public asset path in `imagePlaceholder`.

```js
imagePlaceholder: '/assets/previews/BAY01isikolo.jpg'
```

Current mappings:

| Bay | Product | Preview |
| --- | --- | --- |
| BAY-01 | IsiKoloAi Launch | `/assets/previews/BAY01isikolo.jpg` |
| BAY-02 | SkyTime | `/assets/previews/BAY02skytime.jpg` |
| BAY-03 | NeuroFam Analytics | `RENDER_PENDING` |
| BAY-04 | OS³ AgentBuilder | `/assets/previews/BAY004.jpg` |
| BAY-05 | isidore Due Diligence | `/assets/previews/BAY005isidore.jpg` |
| BAY-06 | Business Redesign (NMS) | `RENDER_PENDING` |
| BAY-07 | JB³ Command Centre | `/assets/previews/BAY007jb3commandcenter.jpg` |
| BAY-08 | Founder: Jono Blackburn | `/assets/previews/BAY08jbprofile.jpg` |
| BAY-09 | OS³ Demo Area | `/assets/previews/BAY009.jpg` |

When the value is `RENDER_PENDING`, `null`, or an image request fails, the module displays the amber `OFFLINE // TELEMETRY LINK RENDERING...` matrix panel instead of a broken image.

## Oscilloscope performance

`src/components/Shared/OscilloscopeScreen.jsx` keeps per-frame values in refs so animation does not trigger React renders. It also:

- Rasterizes the CRT background and graticule once per configuration change.
- Caps canvas density at twice the CSS resolution.
- Uses bounded samples for sine and Lissajous curves.
- Runs compact modules at 30 FPS and large modules at 45 FPS.
- Uses real elapsed time for consistent waveform speed across frame rates.
- Smoothly interpolates the speed multiplier toward `3.2` on hover and back to `1.0` on exit.
- Stops the animation loop outside the viewport and while the document is hidden.

## Production build

```bash
npm run lint
npm run build
npm run preview
```

Deploy the generated `dist/` directory to any static hosting provider. Deep server routes are not required because the launchpad is a single-page client interface.

## Repository notes

- Keep machine-local MCP configuration out of source control.
- Use `public/assets/previews/` as the canonical preview directory.
- Run lint and the production build before pushing changes to `main`.
