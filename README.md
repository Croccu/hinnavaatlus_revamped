# Hinnavaatlus Forum Redesign

A modern redesign of the Hinnavaatlus forum, built with React and Tailwind CSS. This project was generated from a [Figma design](https://www.figma.com/design/PvNNhEvLTopYrMLBo6CtEY/Redesign-Forum-Website).

## Features

- 🏠 **Forum Home** — Browse categories and recent discussions
- 📂 **Category View** — Explore threads within specific categories
- 💬 **Thread View** — Read and participate in discussions
- 🌓 **Theme Support** — Light and dark mode via ThemeProvider
- 📱 **Responsive Design** — Works across desktop and mobile devices

## Tech Stack

- **Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS 4
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/) (Radix UI primitives)
- **Routing:** React Router 7
- **Animations:** Motion (Framer Motion)
- **Icons:** Lucide React, MUI Icons

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

### Production Build

Build for production:

```bash
npm run build
```

Output will be in the `dist/` directory.

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── ui/          # Reusable UI components (shadcn/ui)
│   │   ├── figma/       # Figma-specific utilities
│   │   ├── Layout.tsx   # Main layout wrapper
│   │   ├── ForumHome.tsx
│   │   ├── CategoryView.tsx
│   │   └── ThreadView.tsx
│   ├── App.tsx          # Root component
│   └── routes.ts        # Route definitions
├── styles/
│   ├── tailwind.css     # Tailwind configuration
│   ├── theme.css        # Theme variables
│   └── fonts.css        # Font definitions
└── main.tsx             # Entry point
```

## Attributions

See [ATTRIBUTIONS.md](./ATTRIBUTIONS.md) for third-party licenses.

## License

Private project.
