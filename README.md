# Sleek Personal Portfolio

A highly optimized, full-stack personal portfolio built with Next.js 15 (App Router).

## Tech Stack
- **Framework:** Next.js 15 (React 19)
- **Styling:** Tailwind CSS + Vanilla CSS
- **Animations:** Motion (Framer Motion)
- **WebGL Background:** THREE.js
- **Icons:** Lucide React
- **Data:** Decoupled JSON file architecture + Server Components

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Architecture Notes
- Projects are injected statically on the server side via JSON files in the `content/` directory.
- The WebGL background pauses automatically via a tab visibility listener and includes an interactive 3-state performance toggle.
- A custom Preloader handles the initial THREE.js initialization flash using `requestAnimationFrame`.
