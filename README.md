# Derrick Ndiga — Portfolio

A futuristic personal portfolio combining interactive 3D visuals with iOS-inspired glassmorphism UI.

## Tech Stack

| Layer | Technology |
|---|---|
| Bundler | Vite |
| Framework | React 18 + TypeScript |
| Styling | Tailwind CSS |
| 3D | Three.js / @react-three/fiber |
| Animation | Framer Motion |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

```bash
npm run build
```

## Project Structure

```
src/
├── App.tsx
├── main.tsx
└── components/
    ├── Navbar.tsx       # Fixed navigation bar
    ├── Hero.tsx         # Landing section with 3D scene
    ├── Scene3D.tsx      # Three.js / R3F canvas
    ├── About.tsx        # About me section
    ├── Experience.tsx   # Work experience timeline
    ├── Projects.tsx     # Featured projects grid
    ├── Skills.tsx       # Skills & technologies
    └── Contact.tsx      # Contact form / links
```

## Sections

| Section | Description |
|---|---|
| **Hero / 3D** | Full-screen landing with animated Three.js scene |
| **About** | Background, bio, and personal highlights |
| **Experience** | Work history and professional timeline |
| **Projects** | Featured projects with descriptions and links |
| **Skills** | Technology stack and proficiency overview |
| **Contact** | Get in touch — links and contact form |
