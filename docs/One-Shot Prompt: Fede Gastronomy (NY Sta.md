One-Shot Prompt: Fede Gastronomy (NY Standard)
Prompt: Act as a Senior Frontend Architect and Motion Specialist. Build a world-class, ultra-minimalist landing page for "Fede Gastronomy", the private chef brand of Federico Aristizabal, tailored for a New York City elite audience.

Design Language:

Visuals: Pure Midnight Black background with bone-white (#F5F5F5) and muted slate (#4A4A4A) accents. Use high-end serif typography for headings (e.g., Playfair Display) to evoke NY fine dining elegance.

Atmosphere: Industrial-Chic meets Minimalism. Utilize heavy negative space and subtle grain textures for a "printed menu" feel.

Core Architecture & Sections:

Hero Section: A full-viewport cinematic entrance. "FEDE" in massive typography with a fade-and-scale-up entrance using Framer Motion.

The Chef (Federico Aristizabal): A section with a high-contrast black-and-white portrait placeholder and a minimalist bio using staggered text animations.

The Gallery: A horizontal scroll-driven section displaying "Signature Dishes". Use whileInView with a spring transition to reveal each plate with a 3D parallax effect.

Dynamic Booking Engine (The Core): > - A custom, glassmorphism-based reservation calendar.

Interactive date selection with hover-glow states.

Fluid step-by-step form (Date -> Guests -> Requirements) using Framer Motion's AnimatePresence for seamless transitions.

Performance & Motion Engineering:

Physics: All animations must use Spring Physics (stiffness: 100, damping: 20) to avoid "robotic" movement and achieve the "Boilerplate Fluidity".

Optimization: Enforce transform-gpu and will-change on animated layers to maintain 60fps on high-refresh-rate displays.

Interactive Sidebar: A minimalist LTR (Left-to-Right) slide-out menu with a backdrop-blur effect.

Tech Stack: Next.js 15, Tailwind CSS 4, Framer Motion, Lucide React (minimalist icons).