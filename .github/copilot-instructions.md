# Copilot Instructions for Portfolio

## Project Overview

This is a **Svelte 5 + SvelteKit** portfolio site using **static adapter** for deployment. It supports Markdown content via **mdsvex** and uses **Tailwind CSS v4** for styling.

## Tech Stack & Key Files

| Technology    | Version          | Config File             |
| ------------- | ---------------- | ----------------------- |
| Svelte        | 5.x (uses runes) | `svelte.config.js`      |
| SvelteKit     | 2.x              | `svelte.config.js`      |
| Tailwind CSS  | 4.x              | `src/routes/layout.css` |
| shadcn/svelte | latest           | `components.json`       |
| mdsvex        | 0.12.x           | `svelte.config.js`      |
| TypeScript    | 5.x              | `tsconfig.json`         |

## Architecture

- **File Extensions**: `.svelte` for components, `.svx` for Markdown content (mdsvex)
- **Alias**: `$lib` maps to `src/lib/` - use for shared components, utilities, and assets
- **Static Site**: Uses `@sveltejs/adapter-static` - all pages are pre-rendered at build time

## Svelte 5 Patterns (Runes)

This project uses **Svelte 5 runes syntax**. Key patterns from `src/routes/+layout.svelte`:

```svelte
<script lang="ts">
	let { children } = $props();
</script>

{@render children()}
```

**Important**: Do NOT use Svelte 4 syntax (`export let`, slots). Always use runes.

## Code Style

- **Minimal comments**: Only add comments for non-obvious logic. Self-explanatory code needs no comments.
- When comments are necessary, use professional dev style:
  ```ts
  // Calculate discount based on loyalty tier thresholds
  const discount = tier > 3 ? 0.2 : tier > 1 ? 0.1 : 0;
  ```
- Avoid redundant comments like `// increment counter` above `count++`

## Styling with Tailwind CSS v4

Tailwind is configured via Vite plugin in `vite.config.ts`. Global styles in `src/routes/layout.css`:

```css
@import 'tailwindcss';
@plugin '@tailwindcss/typography';
```

Use Tailwind utility classes directly in components. Typography plugin available for prose content.

## Package Manager

**ALWAYS use `pnpm` for all package management tasks.** Do NOT use `npm` or `yarn`.

### Installing Dependencies

```bash
pnpm install      # Install all dependencies
pnpm add <pkg>    # Add a new package
```

### shadcn/svelte Components

This project uses **shadcn/svelte** (NOT the regular shadcn/ui). Add components using:

```bash
pnpm dlx shadcn-svelte@latest add <component>
# Example: pnpm dlx shadcn-svelte@latest add button
```

## Developer Commands

```bash
pnpm dev          # Start dev server
pnpm lint         # Run Prettier + ESLint
pnpm check        # TypeScript + Svelte type checking
pnpm build        # Build static site
pnpm format       # Auto-format with Prettier
pnpm preview      # Preview production build
```

## File Organization

```
src/
├── lib/           # Shared code ($lib alias)
│   ├── assets/    # Static assets (favicon, images)
│   └── index.ts   # Re-exports for $lib
├── routes/        # SvelteKit file-based routing
│   ├── +layout.svelte  # Root layout (global styles, favicon)
│   ├── +page.svelte    # Homepage
│   └── layout.css      # Tailwind entry point
```

## Adding New Pages

Create `src/routes/[name]/+page.svelte` for new routes. For Markdown content, use `.svx` extension.

## MCP Server Usage

When working with Svelte code, use the Svelte MCP tools:

1. `list-sections` - Discover documentation sections first
2. `get-documentation` - Fetch relevant docs based on use_cases
3. `playground-link` - Generate playground links (ask user first)
4. `svelte-autofixer` - **Always run before finalizing Svelte code**

### svelte-task Prompt

For Svelte-related tasks, use the `svelte-task` prompt from the MCP server. This prompt provides the full documentation index and proper workflow instructions.

**Workflow when using svelte-task:**

1. **Documentation Discovery**: The prompt includes all available documentation sections with `use_cases` fields. Analyze these to find relevant sections for the task.

2. **Fetch Documentation**: Use `get-documentation` to retrieve ALL sections relevant to the user's task based on use_cases analysis.

3. **Code Validation Loop**: After writing any Svelte component or module:
   - Call `svelte-autofixer` with the code
   - If issues/suggestions are returned, fix them
   - Call `svelte-autofixer` again with updated code
   - **Repeat until no issues remain**

4. **Playground Links**: Only generate after final code is ready:
   - Ask user if they want a playground link
   - Entry point must be `App.svelte`
   - Include all files at root level
   - **Never generate if code was written to project files**

<details>
<summary><strong>Full svelte-task Prompt Reference</strong></summary>

You are a Svelte expert tasked to build components and utilities for Svelte developers. If you need documentation for anything related to Svelte you can invoke the tool `get-documentation` with one of the following paths:

**CLI Tools:**

- `cli/overview` - project setup, creating new svelte apps, scaffolding
- `cli/sv-create` - starting new sveltekit app, project templates
- `cli/sv-add` - adding features, testing, styling, auth, database, adapters
- `cli/sv-check` - code quality, ci/cd, error checking, accessibility auditing
- `cli/sv-migrate` - upgrading svelte/sveltekit versions, adopting runes
- `cli/mdsvex` - blog, markdown rendering, documentation sites
- `cli/tailwind` - styling, utility-first css, responsive design
- `cli/vitest` - unit tests, component testing
- `cli/playwright` - e2e testing, browser testing

**SvelteKit:**

- `kit/routing` - navigation, file structure, api endpoints, layouts (always relevant)
- `kit/load` - data fetching, api calls, database queries, ssr data
- `kit/form-actions` - forms, user input, authentication, validation
- `kit/page-options` - prerendering, ssr config, spa setup
- `kit/adapter-static` - static site generation, github pages, blogs
- `kit/hooks` - authentication, logging, middleware, session management
- `kit/errors` - error handling, custom error pages, 404 pages
- `kit/$app-environment` - conditional logic, client/server detection
- `kit/$app-navigation` - programmatic navigation, preloading
- `kit/$app-state` - loading states, url parameters, page metadata
- `kit/$lib` - component organization, shared components
- `kit/configuration` - adapters, build settings, routing customization

**Svelte Core (always relevant for Svelte 5):**

- `svelte/overview` - getting started, framework basics
- `svelte/svelte-files` - component creation basics
- `svelte/what-are-runes` - core syntax, learning svelte 5
- `svelte/$state` - core reactivity, state management
- `svelte/$derived` - computed values, reactive calculations
- `svelte/$effect` - side effects, dom manipulation, third-party libs
- `svelte/$props` - passing data to components
- `svelte/basic-markup` - html templating, attributes, events
- `svelte/if` - conditional rendering
- `svelte/each` - lists, arrays, iteration
- `svelte/snippet` - reusable markup, component composition
- `svelte/@render` - rendering snippets, slot alternatives
- `svelte/bind` - forms, two-way data binding
- `svelte/transition` - animations, modals, dropdowns
- `svelte/class` - conditional styling, tailwind css
- `svelte/scoped-styles` - component-specific styles
- `svelte/context` - shared state, avoiding prop drilling
- `svelte/svelte-head` - seo, page titles, meta tags

**Code Validation Rule:**
Every time you write a Svelte component or module, you MUST invoke `svelte-autofixer` with the code. If issues/suggestions are returned, fix them and call again. Repeat until no issues remain.

**Playground Link Rule:**
If not writing to a file, ask user if they want a playground link after final code. Entry point must be `App.svelte`. Include all files at root level.

</details>
