# RaceAtlas — Build TODO

Detailed, ordered task list. Companion to `PROJECT_GUIDE.md` (section refs like §2.2 point there).
**Version policy:** latest stable everywhere, no betas/RCs; pin exact versions in `package.json`.
Work top to bottom — phases are dependency-ordered. Don't start a phase before the one above is green.

---

## Phase 0 — Repo reset & scaffold

### 0.1 Archive the old state (do this first, delete nothing)

- [x] Make sure your working tree is clean / everything pushed.
- [x] Tag the current main as an archive: `git tag archive/v0 main`
- [ ] (Optional, extra safety) also keep a branch: `git branch legacy/v0 main` — skipped; only the `archive/v0` tag
  exists (confirmed pushed to origin).
- [x] Push tags/branches: `git push origin archive/v0` (+ `legacy/v0` if created)
- [x] Confirm in the remote UI that `archive/v0` exists. **Only now** is it safe to overwrite `main`.
- [x] Sanity check: no secrets in history (confirmed none were committed). If that ever changes → fresh repo + rotate
  keys.

### 0.2 Fresh Next.js 16 scaffold

- [x] In a clean directory, scaffold latest stable Next.js (App Router, TypeScript): `npx create-next-app@latest`
- [x] Choose: TypeScript ✅, ESLint ✅, Tailwind (you'll replace its config with your v4 tokens), App Router ✅, `src/`
  dir (your call), import alias `@/*`.
- [x] Verify it's Next.js **16.x** and React is the matching stable version.
- [x] Replace the placeholder `main` with this scaffold (e.g. push scaffold to a `v1` branch, then fast-forward/replace
  `main` after archiving — your git workflow choice). Keep `archive/v0` untouched.

### 0.3 Guardrails before any feature code

- [x] Add `.env` and `.env*.local` to `.gitignore` **before the first commit**. Verify `git status` does not list
  `.env`.
- [x] Create `.env.example` (committed) with empty placeholders for every var you'll add. (Currently empty — no env
  vars added yet; Phase 2 will populate it.)
- [x] Enable TypeScript `strict: true` in `tsconfig.json` (plus `noUncheckedIndexedAccess` recommended).
- [x] Set up **Biome** for linting + formatting — replaced the ESLint/Prettier the scaffold initially set up in 0.2.
  Added `lint` / `lint:fix` / `format` / `typecheck` npm scripts (`biome check` / `biome check --write` / `biome
  format --write` / `tsc --noEmit`).
- [ ] (Recommended) set up a pre-commit hook (husky + lint-staged) running typecheck + lint. **Not done** — no hook,
  husky, or lint-staged config exists in the repo yet.
- [x] First real commit: "chore: scaffold v1".

### 0.4 Tooling sanity

- [x] `pnpm dev` (or npm) runs; default page renders.
- [x] `typecheck`, `lint`, `build` all pass clean.

---

## Phase 1 — Design system foundation

*(Build components before routes — your `/design`-first strategy.)*

### 1.1 Port tokens & set up Tailwind v4

- [x] Confirm Tailwind **v4** is installed; tokens live in `globals.css` via `@theme`.
- [x] Port your raw palette + font variables from the old `/design` branch's `globals.css`.
- [x] Wire `next/font/google` for Archivo Narrow, Fraunces, Inter Tight, JetBrains Mono (port the existing config).
- [ ] Wire `next-themes` (`.dark` class) + the `@variant dark` rule. ⚠️ **Not done — deferred.** v1 is light-only; tokens
  are semantic so dark is a later drop-in (one `.dark {}` block + provider). Don't mark done until actually wired.

### 1.2 Add the semantic token layer (§2.2)

- [x] Add semantic `--color-*` tokens mapping to raws: `bg`, `surface`, `surface-sunken`, `fg`, `fg-soft`, `fg-muted`,
  `border`, `primary`/`on-primary`, `warning`/`on-warning`, `link`.
- [x] **DECISION → pick hex values** for the missing ones, light + dark: `destructive`/`on-destructive` (true red),
  `success`/`on-success` (green distinct from lime), `ring`.
- [x] Establish the rule: components use **semantic** tokens only, never raw palette names.

### 1.3 Typography scale (§2.2)

- [x] **Fix the base:** change body from `13px` (px) → `1rem` (≈16px), express the whole scale in `rem`.
- [x] Define `--text-*` tokens for: `display`, `h1`, `h2`, `h3`, `body`, `body-sm`, `caption`, `mono` (approve/adjust
  the proposed numbers).
- [x] Map families → roles (Archivo=display/heading, Inter Tight=body/UI, JetBrains=data/mono, Fraunces=editorial
  flourish).

### 1.4 Accessibility pass on tokens

- [x] Run a contrast checker (WCAG AA: 4.5:1 body, 3:1 large/UI) on every text-on-bg pair.
- [x] Fix `fg-muted` if it fails (likely borderline); reserve it for non-essential meta.
- [x] Verify `accent`/`primary` contrast in **both** light and dark mode.
- [x] Verify `ring` is visible on `bg`, `surface`, and dark surfaces.

### 1.5 Component library on headless primitives (§2.1)

- [x] Install **Radix UI primitives** (unified `radix-ui` package, v1.6). Styled in-house, not shadcn-styled.
- [x] Build/port core components, each with **all states** (default / hover / active / focus-visible / disabled /
  loading):
    - [x] Button (primary / secondary / ghost / outline / **destructive**) — + `asChild` via Radix `Slot`, focus ring
    - [x] Input, Textarea, Select, Checkbox, Radio, Switch — + `Label`/`Field` (helper + error, form-ready)
    - [x] Card / Panel — (`Card` + header/title/eyebrow/content/footer)
    - [x] Badge / Tag (event type, difficulty, plan status) — pre-existing, optimised
    - [x] Dialog / Modal (focus trap via primitive)
    - [x] Dropdown menu (the header user/logout menu) — built; not wired into the header yet (no auth → no logout
      menu to drive it).
    - [x] Tabs / Toggle — `Tabs`; `Toggle` = existing `FilterChip`. View switching between timeline/calendar/map is
      via top-level nav links (§1.4), not yet wired to `Tabs`.
    - [x] Toast / inline alert (success / warning / destructive) — `Toast` (+ provider/`useToast`) + `Alert`
    - [x] Skeleton (loading), Empty-state, Error-state blocks
    - [x] Tooltip (bonus — authored-distance hints etc.)
    - [x] CapacityBar (bonus — race signup capacity meter; fill color steps through `primary`→`caution`→`warning`→
      `destructive` by % full)
    - [x] SnapSlider (bonus — generic snap-to-stop slider; candidate for the distance-range filter, §4.1)
- [x] Document color + type usage rules alongside the gallery. (Token table in §2.2; live swatches in `/design`.)

### 1.6 `/design` gallery

- [x] Build `/design` rendering every component × every variant × every state. (light only; dark deferred)
- [x] **Gate `/design`** so it never ships to prod — implemented as `notFound()` when `NODE_ENV === "production"`
  (`src/app/design/page.tsx`), not a dedicated env var.

---

## Phase 2 — Data layer

### 2.1 Prisma + Neon (§1.3, §2.1)

- [ ] Create a Neon project, region **Frankfurt (EU)**.
- [ ] Capture **both** connection strings: **pooled** (for the app) + **direct** (for migrations). ⚠️ Wrong one under
  serverless → connection exhaustion.
- [ ] Install **Prisma v7**; init with explicit generator `output` path (required in v7).
- [ ] Add `DATABASE_URL` (pooled) + `DIRECT_URL` (direct) to env + `.env.example` + the Zod env loader.

### 2.2 Auth tables (generated by Better Auth)

- [ ] Install Better Auth + its Prisma adapter.
- [ ] Run Better Auth's CLI to generate its schema (user/session/account/verification) into your Prisma schema.
- [ ] Add a `role` enum (`user`|`editor`|`admin`) to the user model.

### 2.3 Domain schema (§1.3)

- [ ] Model `Event` (+ `type`, `status: draft|published`, `date`, `location`, `createdBy`, timestamps).
- [ ] Model `EventLink` (label, url) as a child of Event.
- [ ] Model `Race` (`distanceMeters`, `elevationGainMeters?`, `difficulty?`, `startTime?`, FK event).
- [ ] Model `Route` (1:1 race; `start`, `finish`, POIs).
- [ ] Model `RouteGeometry` **separately** (decoded GPX), referenced from Route, **not** inlined — for lazy loading.
- [ ] Model `RoutePOI` (`type`, `location`, `name?`, `description?`).
- [ ] Model `UserRacePlan` (`userId`, `raceId`, `status`, `plannedAt`, `result?`) — race-level. Add a unique constraint
  on (`userId`,`raceId`).
- [ ] Decide `Event.location`: derived from first race start, or authored (§1.3).

### 2.4 Migrate, validate, seed

- [ ] First migration (use the **direct** URL).
- [ ] Define shared **Zod** schemas for each entity (reused client + server, §1.6).
- [ ] Write a seed script with a few real events (so views aren't empty during dev).
- [ ] Confirm data round-trips (create → read) via a quick script or Prisma Studio.

---

## Phase 3 — Auth (Better Auth)

- [ ] Configure Better Auth server (`auth.ts`): Prisma adapter, `BETTER_AUTH_SECRET` (≥32 chars), base URL.
- [ ] Enable the **`magicLink`** plugin.
- [ ] Wire the App Router catch-all handler (`/api/auth/[...all]`).
- [ ] Set up the email sender for magic links: EU SMTP (DSGVO-clean) or Resend (US, disclose).
- [ ] DNS on the sending subdomain: **SPF + DKIM + DMARC**. Send a test link; confirm it doesn't hit spam.
- [ ] Enable Better Auth's **built-in rate limiting** (per-IP + per-email) on sign-in.
- [ ] Build `/login` (email entry) + `/auth/verify` (callback) using your Phase-1 components.
- [ ] Header user dropdown: logout (+ later: nothing else — no account page). Wire the existing `DropdownMenu`
  component (§1.5) in here.
- [ ] Route protection in **`proxy.ts`** (Next 16's renamed middleware): gate `/saved` (user+) and `/admin` (editor+).
- [ ] Helper: server-side role check util; redirect unauthorized users.
- [ ] Verify: full sign-in → session → protected route → logout loop works.

---

## Phase 4 — Catalog read (public)

### 4.1 Filter shell + state (§1.4)

- [ ] Routes are **flat** — `/timeline`, `/calendar`, `/map` (no `/explore` wrapper). Shared filter state (distance
  range, type, date range, region, difficulty) encoded in **URL search params**, read by one common
  layout/hook so filter logic lives in exactly one place.
- [ ] Shared data-fetching layer that reads filters from the URL (so all views stay in sync).
- [ ] "Default browse" vs "search results" layout switch.
- [ ] Empty / loading / error states wired (§1.6).
- [ ] **Open decision:** the nav also has a 4th top-level `EVENTS` item/route (`src/components/layout/nav-items.ts`,
  currently a placeholder page). Decide its purpose — or remove it — before building this phase (see PROJECT_GUIDE
  "Open decisions").

### 4.2 Views (build in this order)

- [ ] `/timeline` — chronological list.
- [ ] `/calendar` — month grid.
- [ ] `/map` — **lazy-load** the map lib here only.

### 4.3 Map setup (§2.1)

- [ ] Choose MapLibre GL vs Leaflet; choose tiles: **MapTiler (EU free tier)** or OSM. ⚠️ **No Google Maps.**
- [ ] Render event pins; click → detail.
- [ ] Note the tile provider for the Datenschutzerklärung (IP transfer).

### 4.4 Event detail

- [ ] `/events/[id]`: races (authored distance/elevation/difficulty), links, location.
- [ ] Lazy-load `RouteGeometry`; draw the GPX track on the detail map.
- [ ] Render POIs (nutrition/water/toilet/medical/checkpoint) as map markers.
- [ ] GPX parsing util (`@tmcw/togeojson` → GeoJSON) + `@turf/turf` for any geo math. Don't hand-roll.
- [ ] Partial-failure handling: map tiles down / GPX won't parse → graceful fallback.

---

## Phase 5 — Admin CRUD (editor+)

- [ ] `/admin` dashboard listing events (incl. drafts), filterable.
- [ ] Create/edit event form: type, date, location, description, status (draft/published), links (add/remove rows).
- [ ] Nested race editor: distance, elevation, difficulty, start time.
- [ ] Route editor: start/finish, **GPX upload** → parse → store `RouteGeometry`; POI add/edit.
- [ ] All inputs validated with the shared Zod schemas; server re-validates (never trust the client).
- [ ] **Delete flows** use the `destructive` color + a confirm dialog (irreversible).
- [ ] Authorization checks on every admin action (editor+), server-side.

---

## Phase 6 — Personal tracking (user+)

- [ ] "Save / plan this race" action on race + detail views (writes `UserRacePlan`).
- [ ] Status control: planned / registered / done / skipped.
- [ ] `/saved` page: tracked races grouped by status; link back to events.
- [ ] Optimistic UI + error rollback on the save toggle.
- [ ] Enforce the (userId, raceId) uniqueness; idempotent toggle.

---

## Phase 7 — Geolocation "near me" (§1.5)

- [ ] Request browser geolocation **only on user action** (not on load). ⚠️ Note: `NavShell`/`TopBar` already
  requests geolocation + reverse-geocodes it (via `src/lib/geo/reverse-geocode.ts`, Photon/komoot) to show a live
  city badge in the header — confirm whether that should move behind an explicit user action too, or if the header
  badge is exempt from this rule.
- [ ] Compute proximity / sort-by-distance **client-side**; never send or store the user's location.
- [ ] Add "near me" as a filter/sort option shared across the timeline/calendar/map views.
- [ ] One-line disclosure in the Datenschutzerklärung (client-side only, not stored). Note: the header reverse-geocode
  call already sends coordinates to Photon (a third party) — disclose that too.
- [ ] Graceful handling when permission is denied.

---

## Phase 8 — Legal & polish (§2.4)

> Legal texts: get reviewed; eRecht24-style generator as a start; lawyer advisable for the Datenschutzerklärung. (Not
> legal advice.)

- [ ] `/impressum` (DDG §5): name, address, contact email.
- [ ] `/datenschutz` (DSGVO): data processed (email, logs/IP, client-side geolocation, map tiles), legal basis, user
  rights.
- [ ] List processors + AVV/DPA + US-transfer notes: **Vercel** (US), **Neon** (US-HQ/Frankfurt), **email provider**, *
  *map-tile provider**, **Photon/komoot** (reverse geocoding, §1.5/Phase 7).
- [ ] Confirm: **no AGB** (no contracts) and **no cookie banner** (essential session cookie only) — keep it that way.
- [ ] Global `not-found.tsx` (404) + `error.tsx` boundaries.
- [ ] Re-check every view's empty / loading / error states.
- [ ] SEO/metadata (Next metadata API) on home + event detail; Open Graph tags.
- [ ] Final a11y pass: keyboard nav, focus-visible everywhere, semantic landmarks, contrast re-check.

---

## Phase 9 — Deploy

- [ ] Connect repo to **Vercel** (Hobby). ⚠️ Non-commercial use only — keep it personal.
- [ ] Set all env vars in Vercel (pooled `DATABASE_URL`, `DIRECT_URL`, `BETTER_AUTH_SECRET`, email creds, map key,
  etc.).
- [ ] Custom domain: `raceatlas.moritzwieland.de` + verify DNS.
- [ ] Email DNS (SPF/DKIM/DMARC) live on the sending subdomain.
- [ ] Run a prod migration against Neon (direct URL).
- [ ] Smoke test in prod: sign-in deliverability, cold-start behavior, map tiles, GPX render, admin CRUD, save/track.
- [ ] Confirm `/design` is **not** reachable in prod (`NODE_ENV === "production"` → `notFound()`).
- [ ] (Recommended) schedule a periodic `pg_dump` backup; Neon free-tier restore is limited.

---

## Pre-launch gate (must all be true)

- [ ] `typecheck` + `lint` + `build` clean.
- [ ] No secrets in repo or history; `.env` gitignored.
- [ ] All forms validated server-side; admin actions authorized server-side.
- [ ] Magic-link sign-in works end-to-end and isn't flagged as spam.
- [ ] Impressum + Datenschutzerklärung published and accurate.
- [ ] Contrast AA across light + dark.
- [ ] `/design` disabled in prod.
