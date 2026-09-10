/**
 * Static configuration array for the 6 SaaS applications
 * in the AnalogLaunchpad 1970s Industrial Laboratory Test Bench portfolio.
 */

const appsData = [
  {
    id: 'omni-compliance',
    title: 'Omni-Compliance Engine',
    description: 'Automated regulatory policy tracking and continuous SOC2 / ISO-27001 audit verification framework.',
    stack: 'Render',
    accentColor: '#B388FF', // Retro Scope Phosphor Purple
    waveType: 'sine',
    demoUrl: 'https://render.com',
  },
  {
    id: 'spectral-crm',
    title: 'Spectral Real-time CRM',
    description: 'Sub-millisecond WebSocket telemetry stream and multi-tenant operational customer intelligence pipeline.',
    stack: 'Node',
    accentColor: '#38EF7D', // Classic Lab Cathode Emerald Green
    waveType: 'lissajous',
    demoUrl: 'https://nodejs.org',
  },
  {
    id: 'velocity-ecommerce',
    title: 'Velocity Ecommerce',
    description: 'High-concurrency global storefront engine with edge-rendered catalog caching and instantaneous checkout.',
    stack: 'Vercel',
    accentColor: '#00E5FF', // High-voltage Ion Cyan
    waveType: 'sawtooth',
    demoUrl: 'https://vercel.app',
  },
  {
    id: 'neuro-flow',
    title: 'Neuro-Flow Analytics',
    description: 'Continuous predictive latency profiler and distributed telemetry analyzer for neural compute graphs.',
    stack: 'Vercel',
    accentColor: '#FFB300', // Nixie Glow Amber
    waveType: 'radar',
    demoUrl: 'https://vercel.app',
  },
  {
    id: 'prism-design',
    title: 'Prism Design System',
    description: 'Tokenized headless component library with zero-runtime accessibility primitives and physical UI states.',
    stack: 'Static',
    accentColor: '#FF3366', // Precision Neon Ruby Red
    waveType: 'led',
    demoUrl: 'https://github.com',
  },
  {
    id: 'terraform-visualizer',
    title: 'Terraform Visualizer',
    description: 'Interactive topological graph topology inspector mapping state drift and infrastructure dependencies.',
    stack: 'Static',
    accentColor: '#39FF14', // Classic P1 Phosphor Green
    waveType: 'matrix',
    demoUrl: 'https://github.com',
  },
];

export default appsData;
