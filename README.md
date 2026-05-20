cat > /home/claude/sony-landing-page/README.md << 'ENDOFFILE'
<div align="center">

<img src="https://img.shields.io/badge/Next.js-16.2.4-black?style=for-the-badge&logo=next.js" />
<img src="https://img.shields.io/badge/React-19.2.4-61DAFB?style=for-the-badge&logo=react" />
<img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript" />
<img src="https://img.shields.io/badge/Framer_Motion-12.x-FF0055?style=for-the-badge&logo=framer" />
<img src="https://img.shields.io/badge/Tailwind_CSS-4.x-06B6D4?style=for-the-badge&logo=tailwindcss" />
<img src="https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel" />

<br/><br/>

# Sony WH-1000XM6 — Scrollytelling Experience

**A cinematic, scroll-driven product landing page** inspired by Apple's product storytelling format — built with a frame-sequence canvas animation, Framer Motion overlays, and a fully typed Next.js 16 / React 19 stack.

**[→ Live Demo](https://sony-landing-page-olive.vercel.app)**

<br/>

</div>

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Architecture Deep-Dive](#architecture-deep-dive)
  - [Scroll-Driven Canvas Animation](#scroll-driven-canvas-animation)
  - [Storytelling Overlay System](#storytelling-overlay-system)
  - [Navbar Behaviour](#navbar-behaviour)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running Locally](#running-locally)
- [Frame Assets](#frame-assets)
- [Scroll Choreography](#scroll-choreography)
- [Deployment](#deployment)
- [Known Limitations & Roadmap](#known-limitations--roadmap)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

This project is a **single-page scrollytelling experience** for the Sony WH-1000XM6 wireless noise-cancelling headphones. As the user scrolls, a 240-frame JPEG sequence plays in sync — like a product film — while five distinct content sections fade in and out over the canvas, each revealing a different facet of the product.

The technique mirrors Apple's iPhone and AirPods landing pages: the product animates as if alive, and the narrative appears to grow out of it naturally.

---

## Features

- **Frame-sequence canvas playback** — 240 high-resolution 1920×1080 JPEG frames rendered at 60fps in sync with scroll position
- **Scroll-driven storytelling** — five narrative panels animated with precise `scrollYProgress` keyframes via Framer Motion
- **Cover-fit canvas rendering** — correct aspect-ratio math ensures the headphone fills the viewport on any screen size
- **Smart preloader** — all 240 frames are preloaded on mount with a live percentage indicator that fades out on completion
- **Dynamic navbar** — hidden at the top; fades in with glassmorphism blur after 50px of scroll, with smooth-scroll navigation buttons
- **Responsive layout** — mobile-aware text sizing and layout across all five overlay sections
- **Zero layout shift** — sticky canvas is mounted behind all content (`z-index: -10`), preventing any reflow during scroll
- **Type-safe** — strict TypeScript throughout, full `@types/react` 19 compatibility

---

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js (App Router) | 16.2.4 |
| UI Library | React | 19.2.4 |
| Language | TypeScript | ^5 |
| Animation | Framer Motion | ^12.38.0 |
| Styling | Tailwind CSS | ^4 |
| Icons | Lucide React | ^1.14.0 |
| CSS Utilities | clsx + tailwind-merge | latest |
| Deployment | Vercel | — |

---

## Project Structure

```
sony-landing-page/
├── public/
│   ├── frames/                        # 240× JPEG frames (1920×1080, ~11MB total)
│   │   ├── ezgif-frame-001.jpg
│   │   ├── ezgif-frame-002.jpg
│   │   └── ... (ezgif-frame-240.jpg)
│   └── images/                        # Static lifestyle/product imagery
│       ├── engineering_closeup.png
│       ├── noise_cancelling_lifestyle.png
│       └── studio_sound_product.png
│
├── scripts/
│   └── generate-svg-frames.mjs        # Dev utility: generates SVG placeholder frames
│
├── src/
│   ├── app/
│   │   ├── favicon.ico
│   │   ├── globals.css                # Tailwind v4 theme tokens + base styles
│   │   ├── layout.tsx                 # Root layout: Inter font, metadata, dark class
│   │   └── page.tsx                   # Page composition root
│   │
│   ├── components/
│   │   ├── CanvasSequence.tsx         # Sticky WebGL-like canvas frame renderer
│   │   ├── Navbar.tsx                 # Scroll-aware glassmorphism navigation bar
│   │   └── StorytellingOverlay.tsx    # 400vh scroll container + 5 motion panels
│   │
│   └── lib/
│       └── utils.ts                   # cn() helper (clsx + tailwind-merge)
│
├── eslint.config.mjs                  # ESLint 9 flat config (Next.js + TypeScript rules)
├── next.config.ts                     # Next.js config (TypeScript)
├── postcss.config.mjs                 # PostCSS for Tailwind v4
└── tsconfig.json                      # Strict TypeScript, bundler resolution, @/* alias
```

---

## Architecture Deep-Dive

### Scroll-Driven Canvas Animation

The core of the experience lives in `CanvasSequence.tsx`. The approach:

1. **Preload all frames** — On mount, 240 `HTMLImageElement` objects are created and their `src` set immediately. The browser fetches them in parallel. A `loadedCount` state tracks progress and renders a loading indicator.

2. **Map scroll to frame index** — Framer Motion's `useScroll()` provides a `scrollYProgress` motion value (0 → 1) that spans the full document height. This is transformed to a frame index with:
   ```ts
   const frameIndex = useTransform(scrollYProgress, [0, 1], [1, NUM_FRAMES]);
   ```

3. **Paint to canvas** — `useMotionValueEvent` fires on every frame index change (no `useEffect` re-renders), calling `renderFrame()` inside a `requestAnimationFrame`. Cover-fit logic ensures the image fills the canvas without distortion:
   ```ts
   if (imgRatio > canvasRatio) {
     drawWidth = canvas.height * imgRatio;
     offsetX = (canvas.width - drawWidth) / 2;
   } else {
     drawHeight = canvas.width / imgRatio;
     offsetY = (canvas.height - drawHeight) / 2;
   }
   ```

4. **Sticky positioning** — The canvas wrapper is `position: sticky; top: 0; height: 100vh`, so it stays pinned as the overlay scrolls above it. It sits at `z-index: -10`, below all content.

5. **Resize handling** — A `resize` event listener resets `canvas.width/height` to `window.innerWidth/innerHeight` and re-renders the current frame, avoiding blurry upscaling.

---

### Storytelling Overlay System

`StorytellingOverlay.tsx` creates a `400vh` container with a `useScroll` target so its internal `scrollYProgress` tracks only within that zone. Five `<motion.div>` panels are `position: fixed`, each with opacity/translate transforms keyed to specific scroll percentage ranges:

| Panel | Appears at | Disappears at | Slide Direction |
|---|---|---|---|
| Hero title | 0% | 15% | Fade + Y up |
| Engineering | 15% | 40% | Fade + X left |
| Noise Cancelling | 40% | 65% | Fade + X right |
| Sound & Upscaling | 65% | 85% | Fade + X left |
| CTA | 85% | — | Fade + Y up |

Each uses `useTransform` to build a 4-keyframe animation curve, e.g.:
```ts
const engOpacity = useTransform(
  scrollYProgress,
  [0.15, 0.2, 0.35, 0.4],
  [0,    1,   1,    0   ]
);
```

The panels are `pointer-events: none` by default — only the final CTA panel contains interactive buttons (`pointer-events: auto`).

---

### Navbar Behaviour

`Navbar.tsx` uses `useScroll()` and `useMotionValueEvent` to watch raw `scrollY`. Past 50px:
- `opacity` animates from `0 → 1`
- `backgroundColor` transitions to `rgba(5, 5, 5, 0.75)` with `backdrop-filter: blur`
- `pointer-events` switches from `none` to `auto`

Nav items call `window.scrollTo()` with calculated `innerHeight` multiples, jumping to the rough scroll position of each storytelling section.

---

## Getting Started

### Prerequisites

- **Node.js** `>=18.17.0` (Next.js 16 requirement)
- **npm** `>=9` (or `yarn`, `pnpm`, `bun`)

### Installation

```bash
# Clone the repository
git clone https://github.com/Rish-2006/sony-landing-page.git
cd sony-landing-page

# Install dependencies
npm install
```

### Running Locally

```bash
# Start development server (with Turbopack)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

Other available scripts:

```bash
npm run build      # Production build
npm run start      # Start production server
npm run lint       # Run ESLint (flat config, Next.js + TypeScript rules)
```

> **Note:** The full `public/frames/` directory (~11MB, 240 JPEGs) is required for the animation. These are committed to the repo and will be cloned automatically.

---

## Frame Assets

The animation is driven by **240 JPEG frames** located at `public/frames/ezgif-frame-001.jpg` through `ezgif-frame-240.jpg`.

| Property | Value |
|---|---|
| Resolution | 1920 × 1080px |
| Format | JPEG (progressive) |
| Average size | ~45–50 KB per frame |
| Total size | ~11 MB |
| Naming | `ezgif-frame-{001–240}.jpg` (zero-padded, 3 digits) |

**Replacing the animation:** Swap the frames in `public/frames/` following the same naming convention. Update `NUM_FRAMES` and `FRAME_DIGITS` in `CanvasSequence.tsx` if your sequence length differs.

**Generating placeholder frames** (for development/testing):
```bash
node scripts/generate-svg-frames.mjs
```
This generates 120 SVG placeholder frames showing a simulated headphone explosion and reassembly — useful for testing scroll behaviour without the real assets.

---

## Scroll Choreography

The full experience spans the total document height (roughly `500vh`):

```
0vh      ┌─────────────────────────────────────┐
         │  HERO — "Sony WH-1000XM6"            │  Frames 1–36
         │  Title + tagline, centered            │
60vh     ├─────────────────────────────────────┤
         │  ENGINEERING — Left panel             │  Frames 36–96
         │  "Precision-engineered for silence"   │
160vh    ├─────────────────────────────────────┤
         │  NOISE CANCELLING — Right panel       │  Frames 96–156
         │  "Adaptive noise cancelling"          │
260vh    ├─────────────────────────────────────┤
         │  SOUND — Left panel                   │  Frames 156–204
         │  "Immersive, lifelike sound"           │
340vh    ├─────────────────────────────────────┤
         │  CTA — Bottom center                  │  Frames 204–240
         │  "Hear everything. Feel nothing else" │
400vh    ├─────────────────────────────────────┤
         │  FOOTER                               │
500vh    └─────────────────────────────────────┘
```

---

## Deployment

This project is configured for zero-config deployment on **Vercel**:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

The `public/frames/` directory is served as static assets via Vercel's CDN. For best performance, consider enabling Vercel's **Edge Caching** and setting long `Cache-Control` headers for the `/frames/*` path in `next.config.ts`:

```ts
// next.config.ts
const nextConfig = {
  async headers() {
    return [
      {
        source: '/frames/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ];
  },
};
```

---

## Known Limitations & Roadmap

### Current Limitations

| Area | Issue |
|---|---|
| **Performance** | All 240 frames (~11MB) are fetched on initial page load. On slow connections, users see a loading screen for several seconds before the animation becomes available. |
| **Progressive rendering** | The canvas stays blank until 100% of frames are loaded. Available frames could be painted as they arrive. |
| **Mobile** | Fixed overlay panels have no layout adjustments below `md` breakpoint; text may overflow on narrow viewports. |
| **Accessibility** | The scroll experience has no keyboard alternative. Fixed `pointer-events: none` overlays lack ARIA roles or `aria-live` regions. |
| **Navbar scroll targets** | Nav buttons use `innerHeight` multipliers that are approximate, not tied to actual section positions. |

### Roadmap

- [ ] Priority-load frames 1–30 first so the hero is immediately visible
- [ ] Add `IntersectionObserver`-based lazy loading for later frames
- [ ] Keyboard navigation mode (arrow keys → scrub frames)
- [ ] `aria-live="polite"` region that announces the active section to screen readers
- [ ] Replace hardcoded scroll multipliers in Navbar with `useRef` section anchors
- [ ] Add `og:image` and Twitter card meta for social sharing previews
- [ ] Explore WebP frame format for ~30% smaller asset footprint

---

## Contributing

Contributions, bug reports, and feature suggestions are welcome.

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Commit your changes: `git commit -m 'feat: add your feature'`
4. Push to your branch: `git push origin feat/your-feature`
5. Open a Pull Request against `main`

Please run `npm run lint` before submitting a PR.

---

## License

This project is for **educational and portfolio purposes only**.

Sony, WH-1000XM6, and the Sony logo are registered trademarks of Sony Group Corporation. All product imagery and branding belong to their respective owners. This project is not affiliated with or endorsed by Sony.

---

<div align="center">

Built by [Rish-2006](https://github.com/Rish-2006)

</div>
ENDOFFILE
echo "Done"
