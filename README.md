# VELORA — Beyond the Ordinary
> *Wear the Unordinary.* — An experimental luxury digital haute couture campaign combining avant-garde architectural silhouettes, editorial photography, and real-time interactive 3D digital sculptures.

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/Dishachakra/velora-3d-fashion)

![VELORA Preview](https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80)

## ✨ Overview

VELORA is a luxury fashion house demonstration website inspired by avant-garde design aesthetics, architectural draping, and interactive 3D web experiences (inspired by [kelvin.8b.com](https://kelvin.8b.com/)).

### Highlights & Features:
* **Section A — Cinematic Hero**:
  * Real-time procedural **Liquid-Chrome Torus Knot Sculpture** built with Three.js.
  * Concentric titanium orbital rings with counter-rotations and ambient cosmic/silk micro-particle dust.
  * Dynamic mouse-follow camera parallax and studio 3-point lighting (*key light, deep burgundy fill, electric cyan rim*).
  * Kelvin-inspired stretched wordmark typography with letter-reveal hover physics.
* **Section B — The Collection**:
  * **NOIR**: Monolithic silhouettes & architectural dark virgin wool.
  * **FLUX**: Kinetic drapery & Japanese mulberry silk organza.
  * **CHROME**: Specular titanium armor & hydro-formed metals.
  * Interactive concept switcher, technical specifications table, and lookbook modals.
* **Section C — 3D Interactive Atelier Lab**:
  * "THE CARAPACE" — 3D interactive couture garment with OrbitControls drag, inertia damping, and zoom.
  * **4 Live Material Finishes**: Liquid Chrome, Obsidian Noir, Grand Cru Burgundy, Cyber Holographic.
  * Wireframe vs. Solid mesh view toggle.
  * Studio Lighting presets (*Studio Minimal, Midnight Burgundy, Cyber Matrix*).
  * 3D Hotspot pin annotations with projected 2D screen coordinates.
* **Section D — Editorial Campaign**:
  * Three stories: *FORM IN MOTION*, *AFTER DARK*, and *FUTURE HERITAGE*.
  * Asymmetrical editorial magazine layouts, photographer credits, pull quotes, and full-screen lightbox modal.
* **Section E — Brand Vision**:
  * Manifesto: *“Fashion is not just what you wear. It is the space you occupy, the movement you create, and the future you imagine.”*
  * Real-time 3D undulating silk mesh background running in WebGL.
  * Atelier craftsmanship metrics counter.
* **Section F — Final Contact & Dramatic Footer**:
  * Oversized echoed VELORA wordmark reflecting into darkness.
  * VIP Dispatch newsletter subscription.
  * Global salon directory (*Paris, Milan, Tokyo, Reykjavik*) and smooth Back-to-Top interaction.
* **VIP Atelier Concierge**:
  * Bespoke fitting request drawer with instant VIP Pass generation and celebratory golden confetti (`canvas-confetti`).
* **Haute-Couture Soundscape**:
  * Ambient drone synthesizer created using the native Web Audio API (zero external audio files).

---

## 🛠️ Technology Stack

* **React 19**
* **Vite 8**
* **Three.js** (WebGL 3D engine)
* **Vanilla CSS Design System** (Fluid `clamp` typography, dark luxury tokens, glassmorphism, SVG film grain)
* **Lenis** (Buttery momentum smooth scrolling)
* **GSAP** (Cinematic easing & animation)
* **Lucide React** (Minimalist iconography)
* **Canvas Confetti** (VIP Atelier celebration particles)

---

## 📐 Responsive Breakpoints Supported

The application is responsive across all standard and mobile viewports:
* **1366px** — Standard Laptops
* **1240px** — Large Tablets / Small Laptops
* **1190px** — Medium Desktops
* **967px** — Tablet Landscape
* **768px / 767px** — iPad / Tablet Portrait
* **575px** — Phablet / Mobile Landscape
* **475px** — Standard Smartphones
* **390px** — Small Smartphones (iPhone 12–16 Pro)

---

## 🚀 Getting Started

### Prerequisites
* [Node.js](https://nodejs.org/) (v18 or higher)
* [npm](https://www.npmjs.com/)

### Installation & Local Run
```bash
# Clone the repository
git clone https://github.com/Dishachakra/velora-3d-fashion.git

# Navigate into the project folder
cd velora-3d-fashion

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production
```bash
npm run build
```

---

## 📄 License
MIT License. © 2027 VELORA Haute Couture.
