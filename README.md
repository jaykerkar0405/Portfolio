# Portfolio

A modern portfolio website built with SvelteKit 2, Svelte 5, and Tailwind CSS v4.

## Tech Stack

- [SvelteKit 2](https://kit.svelte.dev) - Application framework
- [Svelte 5](https://svelte.dev) - Component framework with runes syntax
- [Tailwind CSS v4](https://tailwindcss.com) - Utility-first CSS framework
- [shadcn/svelte](https://shadcn-svelte.com) - Re-usable component library
- [TypeScript](https://typescriptlang.org) - Type safety
- [mdsvex](https://mdsvex.com) - Markdown for Svelte
- [pnpm](https://pnpm.io) - Package manager

## Project Structure

```
src/
├── lib/
│   ├── components/     # Reusable components
│   │   └── ui/        # shadcn/svelte components
│   ├── config/        # Application configuration
│   └── projects/      # Project data and types
├── routes/
│   ├── hackathons/    # Hackathon pages
│   └── projects/      # Project pages
└── app.html           # HTML template
```

## Getting Started

### Prerequisites

- Node.js 18.x or later
- pnpm 8.x or later

### Installation

Install dependencies:

```bash
pnpm install
```

### Development

Start the development server:

```bash
pnpm dev
```

The application will be available at `http://localhost:5173`.

### Build

Create a production build:

```bash
pnpm build
```

Preview the production build:

```bash
pnpm preview
```

## Scripts

| Script         | Description                        |
| -------------- | ---------------------------------- |
| `pnpm dev`     | Start development server           |
| `pnpm build`   | Build for production               |
| `pnpm preview` | Preview production build           |
| `pnpm format`  | Format code with Prettier          |
| `pnpm lint`    | Lint code with ESLint and Prettier |
| `pnpm check`   | Type-check with svelte-check       |

## Adding Components

Add shadcn/svelte components:

```bash
pnpm dlx shadcn-svelte@latest add <component>
```

## Configuration

### Tailwind CSS

Tailwind configuration is defined in [vite.config.ts](vite.config.ts) using the Vite plugin. Global styles are imported in [src/routes/layout.css](src/routes/layout.css).

### SvelteKit

SvelteKit is configured in [svelte.config.js](svelte.config.js) with the static adapter for pre-rendering.

### TypeScript

TypeScript configuration is in [tsconfig.json](tsconfig.json). Path aliases are configured for `$lib` and other imports.

## Deployment

This project uses `@sveltejs/adapter-static` for static site generation. The built files in the `build` directory can be deployed to any static hosting service.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
