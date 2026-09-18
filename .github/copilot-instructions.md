# Copilot instructions for `web4_new_launch`

## Project scope and source of truth

- This is a Vite + React 19 single-page launchpad for a retro/industrial instrumentation console.
- The maintained application lives in `analoglaunchpad/`. The root `vite.config.ts` points Vite at that directory and writes the production bundle to the repository-root `dist/`.
- Make application changes in `analoglaunchpad/src/`, `analoglaunchpad/public/`, and the corresponding files under `analoglaunchpad/`. The similarly named root `src/` tree is a parallel/legacy copy; do not update both trees unless the task explicitly requires keeping them synchronized.
- The app is static at runtime. The Gemini variables in `.env.example` are inherited scaffold configuration and are not consumed by the launchpad UI.

## Build, validation, and local development

Run commands from the repository root unless noted otherwise:

```bash
npm install
npm run dev       # Vite on http://localhost:3000 with network access
npm run lint      # TypeScript check: tsc --noEmit
npm run build     # Production bundle in dist/
npm run preview   # Serve the built bundle locally
```

The same scripts are present in `analoglaunchpad/package.json`, but the root scripts use the root Vite configuration and are the normal workflow.

There is currently no test runner or test suite configured in either package, so there is no single-test command. Use `npm run lint` for type-level validation and `npm run build` for an end-to-end production compilation. At present, `npm run lint` may fail in `analoglaunchpad/vite.config.ts` when root and nested `node_modules` resolve different Vite/Rollup type copies; this is an environment/dependency-layout issue, while `npm run build` remains the production compilation check. If tests are added later, document the chosen runner and its focused-test syntax here.

Before pushing to `main`, run:

```bash
npm run lint
npm run build
```

## Architecture

- `analoglaunchpad/src/main.tsx` mounts the React tree; `App.jsx` owns global mains power, simulated bench voltage, platform filtering, and the rack layout.
- `analoglaunchpad/src/data/appsData.js` is the product catalogue. Each record supplies the stable id, display metadata, host stack, accent colour, waveform type, preview path, and demo URL used by the modules.
- `analoglaunchpad/src/components/Chassis/ConsoleHeader.jsx` is the master controller. It owns the status ticker, stack filter controls, audio toggle, and voltage display, while passing selection and power state back to `App`.
- `analoglaunchpad/src/components/modules/LargeModule.jsx` renders priority bays and `SmallModule.jsx` renders compact bays. Both compose shared hardware controls, an oscilloscope, and launch/preview UI around a catalogue record.
- `analoglaunchpad/src/components/Shared/OscilloscopeScreen.jsx` renders animated CRT waveforms on canvas. It measures its host with `ResizeObserver`, keeps animation state in refs, limits rendering work, and suspends work when the canvas is not visible or the document is hidden. Preserve these performance boundaries when changing waveform rendering.
- `analoglaunchpad/src/hooks/useGlassParallax.js` supplies pointer coordinates, normalized positions, and bounded card tilt to module cards.
- `analoglaunchpad/src/utils/audioRelay.js` synthesizes relay/knob/button sounds through Web Audio; it must remain safe when audio is unavailable or blocked before a user gesture.
- `analoglaunchpad/src/index.css` defines the Tailwind v4 entrypoint plus the project-specific palette, CRT scanlines, chassis textures, bevels, and animation utilities. `tailwind.config.js` remains part of the CSS configuration even though Tailwind v4 is used.
- `vite.config.ts` contains the custom AI Studio media middleware. It safely resolves `/assets/aistudio/*` requests under `analoglaunchpad/public/assets/aistudio`, preserves SPA output, and controls HMR through `DISABLE_HMR`.

## Codebase-specific conventions

- Keep the physical-console vocabulary and visual system intact: matte/steel chassis surfaces, dark recessed bays, monospace instrument labels, amber/cyan/green phosphor accents, hard borders, screws, toggles, and CRT scanlines.
- Treat `appsData.js` as the data contract. Add or change a product there rather than hardcoding catalogue fields inside `App` or module components. Preserve stable ids because they are used for React keys and module DOM ids.
- Use the existing `LargeModule`/`SmallModule` split: priority entries occupy the full-width section and the remaining entries occupy the responsive two-column grid. Do not introduce a third card implementation for a catalogue variation.
- Keep power and filter state flowing down from `App`; module-local controls may manage local power and instrument settings, but must respect the `mainsPower` prop when deciding whether a module is energized.
- Use `lucide-react` for interface icons and the shared hardware primitives in `components/Shared/HardwareControls.jsx` for console controls. Do not replace these with unrelated icon or button treatments.
- Preview assets belong in `analoglaunchpad/public/assets/previews/` and are referenced with root-relative paths such as `/assets/previews/example.jpg`. Missing, `null`, or `RENDER_PENDING` previews should continue to use the amber offline fallback instead of rendering a broken image.
- Demo links are external destinations from the catalogue. Preserve the existing launch behavior and do not assume an internal router or deep server routes; deployment is a static SPA.
- Keep canvas work bounded and avoid putting per-frame values in React state. Changes to `OscilloscopeScreen` should preserve device-pixel-ratio limits, sample/frame budgets, visibility suspension, and elapsed-time animation behavior.
- Use the existing design files only for visual exploration. Generated `.superdesign/design_iterations` output is not the application source of truth.
- Keep machine-local MCP configuration out of source control; `.continue/mcpServers/` may contain local developer setup.

## Deployment

`wrangler.jsonc` deploys the root `dist/` directory as static assets and enables SPA fallback handling. Build before deployment; deep server routes are not required.
