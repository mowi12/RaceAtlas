# RaceAtlas - Copilot Agent Instructions

## Project Overview

RaceAtlas is a Next.js 16 platform for aggregating, visualizing, and managing running events across calendar, timeline, and map views. It's a TypeScript-based React application using modern frameworks and tools.

**Tech Stack:**

- Next.js 16.1.5 (App Router with Turbopack)
- React 19.2.3
- TypeScript 5.9.3
- Tailwind CSS v4
- Vitest for testing
- Biome for linting/formatting
- pnpm as package manager
- next-intl for internationalization (i18n)

**Repository Size:** ~77 source files, medium-sized codebase

## Critical Setup Instructions

### 1. Initial Setup (REQUIRED)

**ALWAYS follow these steps in order:**

```bash
# 1. Install pnpm globally if not available
npm install -g pnpm

# 2. Install dependencies with frozen lockfile (REQUIRED for CI compatibility)
pnpm install --frozen-lockfile
```

**Important:** Always use `pnpm install --frozen-lockfile` to match CI behavior. Never use `npm` or `yarn`.

### 2. Build Process

**Known Issue:** The build process requires internet access to fetch Google Fonts (Poppins font in `app/layout.tsx`). In sandboxed/offline environments, the build will fail with:

```
Error: Turbopack build failed with 1 errors:
Failed to fetch `Poppins` from Google Fonts.
```

**Workaround:** If you encounter font fetch errors, this is expected in offline environments. The application works correctly in production and when internet access is available.

**Build Command:**

```bash
pnpm run build  # Production build - requires internet for fonts
```

**Development Server:**

```bash
pnpm run dev    # Starts on http://localhost:3000
```

### 3. Testing (RELIABLE)

**All test commands work reliably:**

```bash
# Run all tests with coverage (35 tests in 5 files)
pnpm test

# Tests run quickly (~1 second) and should always pass
# Test files located in: tests/*.test.ts
```

**Test Configuration:**

- Uses Vitest with v8 coverage
- Tests run in Node environment
- Coverage reports generated in `coverage/` directory

### 4. Linting (RELIABLE)

**Two linting steps are required by CI:**

```bash
# 1. Run Biome linter (checks TypeScript/JavaScript/CSS)
pnpm run lint
# Or with auto-fix:
pnpm run lint:fix

# 2. Run Markdown linter
pnpm run lint:md
```

**Biome Configuration:**

- Config: `biome.json`
- Checks 77 files
- Takes ~100ms
- Enforces Next.js and React recommended rules
- Uses space indentation (2 spaces)

**Important:** Both lint commands must pass for CI to succeed.

### 5. Formatting

```bash
pnpm format  # Auto-format with Biome
```

## GitHub Actions / CI Pipeline

**On every pull request, these workflows run:**

### Quality Checks Workflow (`.github/workflows/quality_checks.yml`)

**Sequential order:**

1. **Lint Job:**
   - Runs `npm run lint` (Biome)
   - Runs `npm run lint:md` (Markdown)
2. **Test Job:** (runs after lint passes)
   - Runs `pnpm test` with coverage
   - Uploads coverage artifacts

### Build Workflow (`.github/workflows/build.yml`)

- Runs `pnpm run build`
- Uploads build artifacts (`.next/` directory)

### Other Workflows

- **Git Conventions:** Ensures linear git history
- **Docker:** Builds and publishes Docker image to ghcr.io
- **Deploy:** (runs on tag pushes)

**Setup Action:** All workflows use `.github/workflows/setup/action.yml` which:

1. Sets up Node.js (version from `vars.NODE_VERSION` repository variable)
2. Installs pnpm globally
3. Runs `pnpm install --frozen-lockfile`

## Project Structure

### Root Configuration Files

- `package.json` - Dependencies and scripts
- `pnpm-lock.yaml` - Locked dependencies (DO NOT modify manually)
- `pnpm-workspace.yaml` - Workspace configuration
- `tsconfig.json` - TypeScript config with path aliases (`@/*` maps to root)
- `next.config.ts` - Next.js config with next-intl plugin
- `vitest.config.ts` - Test configuration
- `biome.json` - Linter/formatter configuration
- `components.json` - shadcn/ui component configuration
- `postcss.config.mjs` - PostCSS config for Tailwind
- `.env.example` - Environment variables (PORT=3042)
- `Dockerfile` - Multi-stage Docker build

### Directory Structure

**`app/`** - Next.js App Router pages

- `app/layout.tsx` - Root layout (uses Poppins font)
- `app/globals.css` - Global Tailwind styles
- `app/page.tsx` - Root redirect page
- `app/[locale]/` - Internationalized routes
  - `app/[locale]/page.tsx` - Home page (timeline view)
  - `app/[locale]/calendar/page.tsx` - Calendar view
  - `app/[locale]/timeline/page.tsx` - Timeline view
  - `app/[locale]/map/page.tsx` - Map view
  - `app/[locale]/events/[eventId]/page.tsx` - Event detail page

**`lib/`** - Reusable code (path alias: `@/lib`)

- `lib/components/` - React components
  - `lib/components/primitives/` - Base UI components (shadcn/ui)
  - `lib/components/composites/` - Composed components
    - `lib/components/composites/navigation/` - Navigation components
    - `lib/components/composites/timeline/` - Timeline components
    - `lib/components/composites/theme/` - Theme switcher
    - `lib/components/composites/language-select/` - Language selector
- `lib/types/` - TypeScript type definitions
  - `event.ts`, `race.ts`, `geo.ts`, `route.ts`, `i18n.ts`
- `lib/data/` - Data and constants
  - `lib/data/example-events.ts` - Example event data
- `lib/filter/` - Event filtering logic
  - `lib/filter/filter-events.ts` - Filter implementation
  - `lib/filter/event-filters.ts` - Filter definitions
- `lib/search/` - Event search logic
  - `lib/search/event-search.ts` - Fuse.js fuzzy search
- `lib/sort/` - Event sorting logic
  - `lib/sort/sort-events.ts` - Sort implementations
- `lib/geo/` - Geographic utilities
  - `lib/geo/distance.ts` - Distance calculations
- `lib/i18n/` - Internationalization
  - `lib/i18n/request.ts` - i18n request handler
  - `lib/i18n/navigation.ts` - Localized navigation
  - `lib/i18n/routing.ts` - Route configuration
  - `lib/i18n/localized-text.ts` - Text localization utilities
- `lib/store/` - State management (Zustand)
  - `lib/store/event-store.ts` - Event store
- `lib/navigation/` - Navigation configuration
- `lib/utils/` - Utility functions
  - `lib/utils/shadcn-helper.ts` - shadcn/ui utilities

**`messages/`** - i18n translation files

- `messages/en.json` - English translations
- `messages/de.json` - German translations

**`tests/`** - Test files

- `tests/distance.test.ts` - Distance calculation tests
- `tests/event-search.test.ts` - Search tests
- `tests/filter-events.test.ts` - Filter tests
- `tests/localized-text.test.ts` - i18n tests
- `tests/sort-events.test.ts` - Sort tests

**`public/`** - Static assets

- `public/images/` - Image files

**`assets/`** - Additional assets

## Making Code Changes

### Validation Checklist

**After making any code change, ALWAYS run in this order:**

1. **Lint your code:**

   ```bash
   pnpm run lint
   pnpm run lint:md  # If you modified markdown files
   ```

2. **Run tests:**

   ```bash
   pnpm test
   ```

3. **Test build (if applicable):**
   ```bash
   pnpm run build  # May fail in offline environments due to fonts
   ```

### Common Patterns

**Adding a new page:**

- Create in `app/[locale]/your-page/page.tsx`
- Follow Next.js App Router conventions
- Use server components by default
- Add translations to `messages/en.json` and `messages/de.json`

**Adding a component:**

- Place in `lib/components/composites/` for app-specific components
- Place in `lib/components/primitives/` for base UI components
- Follow existing naming conventions
- Use TypeScript with proper types

**Adding a test:**

- Create `tests/your-feature.test.ts`
- Use Vitest syntax
- Match existing test patterns
- Import from `@/lib` using path alias

**Internationalization:**

- All user-facing text must be translated
- Add keys to both `messages/en.json` and `messages/de.json`
- Use `next-intl` hooks and utilities

## Important Notes

### DO's

- ✅ Always use `pnpm install --frozen-lockfile`
- ✅ Run lint and tests before committing
- ✅ Use path alias `@/` for imports
- ✅ Follow existing code style (Biome enforces this)
- ✅ Add translations for both English and German
- ✅ Write tests for new features
- ✅ Use TypeScript strictly

### DON'Ts

- ❌ Don't use `npm` or `yarn` - use `pnpm` only
- ❌ Don't modify `pnpm-lock.yaml` manually
- ❌ Don't skip frozen lockfile flag
- ❌ Don't ignore lint errors
- ❌ Don't commit without running tests
- ❌ Don't modify files excluded in `biome.json`:
  - `lib/components/primitives/item.tsx`
  - `lib/components/primitives/slider.tsx`

### File Exclusions

**Biome ignores:**

- `node_modules/`
- `.next/`
- `dist/`
- `build/`

**Git ignores:** See `.gitignore` for full list

## Trust These Instructions

These instructions are validated and tested. Only perform additional exploration if:

- You encounter an error not documented here
- The instructions appear outdated or incorrect
- You need specific implementation details not covered

When in doubt, refer to the existing code patterns and tests for guidance.
