# RaceAtlas — Project Guide

**Domain:** `raceatlas.moritzwieland.de` · **Status:** v1 planning · **Owner:** Moritz

> **How to use this doc.** This is the single source of truth so you never have to guess. It is a *living* document —
> update it as decisions change. It has two parts that age differently:
> - **Part 1 — Product Spec**: *what* the site does (domain, roles, routes, scope). Changes when the product changes.
> - **Part 2 — Build Playbook**: *how* it's built (stack, design system, ordered roadmap, legal). Changes when
    implementation changes.
>
> Anything still open is marked `> **DECISION:**`. Resolve those before they block you.

---

# Part 1 — Product Spec

## 1.1 What it is

A **tracking and discovery** site for running events. Two intertwined data concerns, kept deliberately separate:

- **Discovery (shared catalog):** a curated database of running events — location, date, race variants, routes, points
  of interest, info links. Global; the same for everyone.
- **Tracking (personal):** per-user state layered on top — *"I'm planning to run this race."*

**Users:** primarily you; a handful of others (a friend today, possibly more later). Optimize for correctness and low
maintenance, not scale.

## 1.2 Roles & permissions

Single `role` enum on the user. Keep it minimal — do not add granularity until something forces it.

| Role     | Browse catalog | Track own plans | Create/delete events | Manage users |
|----------|:--------------:|:---------------:|:--------------------:|:------------:|
| `user`   |       ✅        |        ✅        |          ❌           |      ❌       |
| `editor` |       ✅        |        ✅        |          ✅           |      ❌       |
| `admin`  |       ✅        |        ✅        |          ✅           |      ✅       |

- The **catalog is admin/editor-curated** (Model A). Regular users only browse + track. No moderation pipeline needed.
- The catalog is **public-read** (no login required to browse/discover). Login is required only for the *tracking* layer
  and the admin area.

> **DECISION:** Is there actually any user-management UI in v1, or is `admin` just "the role you set manually in the
> DB"? Recommendation: no user-management UI in v1; promote roles by hand. Revisit only when you have real users.

## 1.3 Domain model

German content only (no i18n). Plain strings. The model is relational; the nesting below shows ownership, not table
layout.

```
User
 ├─ id, email, role (user|editor|admin), createdAt
 └─ (Auth.js adapter tables: accounts, sessions, verification tokens)

Event                       ← the discovery unit (a "race weekend")
 ├─ id, slug, name, description?
 ├─ date (required, calendar date), timeZone (required, IANA)
 ├─ location { lat, lng, displayName }
 ├─ status: DRAFT | PUBLISHED
 ├─ createdBy (userId), timestamps
 ├─ links: EventLink[]      ← { id, label, url }   (registration, results, organizer, …)
 └─ races: Race[]           ← ≥ 1

Race                        ← what you actually sign up for (10K, Half, Marathon)
 ├─ id, eventId, name
 ├─ distanceMeters          ← AUTHORED, source of truth
 ├─ elevationGainMeters?    ← AUTHORED, source of truth
 ├─ difficulty?: EASY | MEDIUM | HARD | EXTREME
 ├─ surface?: ROAD | TRAIL | MIXED          ← terrain; MIXED is a first-class race surface
 ├─ startTime?              ← event-local HH:mm
 ├─ capacity? { cap, taken, waitlist }      ← signup numbers; absent → no capacity UI
 ├─ timestamps
 └─ route?: Route

Route                       ← 1:1 with a Race
 ├─ id, raceId
 ├─ start { lat, lng }, finish { lat, lng }
 ├─ timestamps
 ├─ geometry?  → RouteGeometry  (separate row/blob, lazy-loaded — see §2.2 maps)
 └─ pointsOfInterest: RoutePOI[]

RoutePOI
 ├─ id, routeId, location { lat, lng }
 ├─ type: NUTRITION | WATER | TOILET | MEDICAL | CHECKPOINT | OTHER
 └─ name?, description?

UserRacePlan                ← the personal/tracking layer (the whole reason for auth)
 ├─ id, userId, raceId      ← tracked at RACE level, not event level
 ├─ status: planned | registered | done | skipped
 ├─ plannedAt
 └─ result?                 ← null for now; finish time / stats later
```

**Modelling rules — do not violate:**

- **Source of truth:** `distanceMeters` / `elevationGainMeters` are *authored* values (the advertised numbers runners
  care about). GPX-derived numbers, if ever computed, are a *separate* display value and must **never** overwrite the
  authored fields. A measured GPS track and an advertised distance legitimately disagree (drift, course-measurement).
- **GPX is purely the drawn route line** — not a metrics source. Parse on upload, store decoded geometry separately,
  lazy-load only on the detail/map view (§2.2). Never drag track geometry into list/calendar/map queries.
- **Dates:** `Event.date` is a plain calendar date (no timezone). `Race.startTime` is event-local time. Do **not** store
  UTC instants for human-scheduled events — it causes off-by-a-day display bugs. (You'll mostly add local events, but
  this is cheap insurance.)
- **Geo coordinates are plain `Float` columns for now (no PostGIS).** `lat`/`lng` on `Event.location`,
  `Route.start`/`finish`, and `RoutePOI.location` are stored as two `Float` columns each — fine for storage and display.
  ⚠️ **Migration planned:** the moment real spatial queries land (proximity "near me" §1.5/Phase 7, viewport-bounded
  route fetching on the map, "events within N km"), floats stop scaling — a two-column B-tree can't serve a 2D radius,
  bounding-box `WHERE` is a square not a circle and breaks at the ±180° meridian/poles, and distance sort means pulling
  every row to compute Haversine in app code. The fix is **PostGIS** (`geography(Point,4326)` + a **GiST** index +
  `ST_DWithin`/`ST_Distance`/`ST_Intersects`). Caveats when we do it: Neon must have the `postgis` extension; Prisma has
  no first-class `geography` type, so the column is declared `Unsupported(...)` and spatial reads/writes go through
  `$queryRaw`. **Recommended hybrid:** keep the `Float` columns as the app-read source of truth and add a maintained
  `geography` column + GiST index *purely for querying* — fast spatial search without forcing every read through raw SQL.
  Until then, the **client-side** geolocation in Phase 7 needs no DB change at all (it computes distance in the browser).
- **No event images in v1.** No image field, no upload pipeline.
- **Distance badge labels are derived, not authored.** `formatDistance()` (`src/lib/distance.ts`) maps `distanceMeters`
  to a label: within ±1000m of 42195 → "Marathon", within ±1000m of 21097 → "Half", above marathon distance →
  `"Ultra · {km}K"`, else whole km (`{km}K`) or, under 1000m, whole meters (`{m}m`). `Race.name` (the authored label
  like "Marathon Trail") stays separate — used for headings, not for the distance badge.
- **`Event.location`** can be derived from the first race's start to avoid double entry — or authored directly. Pick one
  and be consistent.
- **No `Event.type` field.** The old `FunRun | TrailRun | RoadRace | Ultra` category was dropped — it's derivable and
  would only drift from reality. Terrain comes from each race's `surface`; "ultra" is just a `distanceMeters` threshold
  (`formatDistance`, below). A single event-level label is inherently lossy when an event mixes surfaces/distances, so
  the per-race fields are the honest representation. Derive a display label from the races if/when one is needed.
- **`surface` and `capacity` live on `Race`, in the schema.** `surface` is `ROAD | TRAIL | MIXED` — `MIXED` is a
  first-class race surface (a single race can be mixed terrain), **not** an event-level aggregation. `capacity`
  (`cap`/`taken`/`waitlist`) is an optional embedded value object (flattened to `capacityCap`/`capacityTaken`/
  `capacityWaitlist` columns); when absent, capacity UI (`CapacityBar`, the status badge) is dropped, not shown empty.
- **Enum casing is `SCREAMING_SNAKE_CASE`** across the Prisma schema and the domain types (`EventStatus`,
  `RaceDifficulty`, `Surface`, `PoiType`). This is the stored DB value *and* the JSON wire value.
- **Timestamps** (`createdAt`/`updatedAt`) are on entities with an independent lifecycle — `Event`, `Race`, `Route`,
  `RouteGeometry` (the last two get re-imported from GPX). Deliberately **not** on trivial owned child rows (`EventLink`,
  `RoutePOI`). ⚠️ `@updatedAt` only bumps when *that* row is written — a child edit does not touch a parent's
  `updatedAt`, so bump the parent explicitly if you rely on it for cache invalidation.

> **NOTE — domain types vs persistence types.** The hand-written types in `src/types` are the **domain/transport**
> contract (nested value objects, list-vs-detail views, geometry excluded from `Route`). Prisma's generated types are
> **persistence-shaped** (flat columns, `Date` objects) and must not cross the data-access boundary. `src/lib/mappers.ts`
> is the only place that translates Prisma rows → domain types; nothing above it imports from `@/generated/prisma`.
> Enum *types* are re-exported from the generated client through `src/types` so the schema stays the single source of
> truth. Presentational components (e.g. `Badge`) keep their own vocabulary; `src/lib/badge.ts` adapts domain enums →
> Badge props (e.g. `Surface` → badge value, `RaceCapacity` → `open|waitlist|full`).

## 1.4 Routes / sitemap

Information architecture: routes are **flat** — there is no `/explore` wrapper. `/timeline` / `/calendar` / `/map` are
*view modes* of the same filtered result set, sharing filter state via **URL search params**, read by one common
layout/hook so filter logic still lives in exactly one place (just not behind a shared route segment).

> **IMPLEMENTED — flat routes, not the nested `/explore/*` shape originally planned here.** `nav-items.ts` links
> directly to `/timeline`, `/calendar`, `/map`. The nav also has a 4th top-level item, `EVENTS` → `/events`, that
> predates this table and currently has no defined purpose — see "Open decisions" below before building Phase 4.

| Route                     | Auth      | Notes                                                                                         |
|---------------------------|-----------|-----------------------------------------------------------------------------------------------|
| `/`                       | public    | Marketing home (kept deliberately as marketing, not a data view)                              |
| `/timeline`               | public    | Chronological list view (top-level, not nested)                                               |
| `/calendar`               | public    | Month-grid view (top-level, not nested)                                                       |
| `/map`                    | public    | Geographic view — **map lib lazy-loaded here only** (top-level, not nested)                   |
| `/events/[id]`            | public    | Event detail: races, POIs, GPX track, links, location. A copyable URL *is* the share feature. |
| `/saved`                  | `user`+   | My tracked races, grouped by status                                                           |
| `/admin`                  | `editor`+ | Event/Race/Route/POI/Link CRUD                                                                |
| `/admin/events/[id]/edit` | `editor`+ | Authoring forms; delete uses destructive confirm                                              |
| `/login`                  | public    | Magic-link request                                                                            |
| `/auth/verify`            | public    | Magic-link callback                                                                           |
| `/impressum`              | public    | Required (§2.4)                                                                               |
| `/datenschutz`            | public    | Required (§2.4)                                                                               |
| `/design`                 | dev only  | Component gallery — gated via `NODE_ENV === "production"` → `notFound()`, never ships to prod |
| 404 / error               | —         | Global not-found + error boundaries; plus per-view empty/loading/error states (§1.6)          |

Filter/sort dimensions (shared across the three views, encoded in URL params): **distance range, surface, date range,
region, difficulty**, plus **proximity** (see §1.5 geolocation). (Surface replaces the dropped `Event.type` filter — see
§1.3.)

## 1.5 Feature scope

**In scope (v1):**

- Admin/editor catalog CRUD (events → races → routes → POIs → links; draft/published).
- GPX upload + parse + render on the detail map.
- Public discovery: filter/search shell (flat routes, shared filter state via URL params); timeline / calendar / map
  views; event detail.
- Magic-link auth + role-based UI; logout via header dropdown.
- Personal tracking: save/plan a race with status; `/saved` grouped by status.
- **"Near me" proximity discovery** — browser geolocation → distance sort/filter, **computed client-side only**, never
  sent to or stored on the server (DSGVO-clean; one-line disclosure).
- Marketing home, legal pages, system states.

**Explicitly out (v1):**

- Event cover images.
- Reminders / notifications.
- `.ics` export and explicit "share" UI (public URLs already cover sharing).
- User-management UI / per-user stats / results analytics.
- User-generated catalog entries (Model B) — catalog stays curated.

**Future (noted so it isn't lost):**

- `.ics` export; statistics/results on `UserRacePlan.result`; opening the catalog to user contributions (would add a
  `status`/moderation flow — schema already has `status`, `createdBy`).

## 1.6 Cross-cutting requirements

Bake these in from the start — retrofitting them is the expensive path.

- **Per-view states:** every data view needs an **empty** state ("no events match your filters"), a **loading** state (
  skeletons), and **partial-failure** handling (map tiles down, GPX won't parse). The `/design` gallery must show these,
  not just the happy path.
- **Validation:** [Zod](https://zod.dev) schemas, **shared client + server**, for every form and API input.
- **Env validation at boot:** validate required env vars at startup (e.g. a Zod-checked `env.ts`) so you can't deploy
  with missing config.
- **Rate-limit the magic-link endpoint:** the sign-in request is abusable for email-bombing/enumeration. Must be
  rate-limited (per-IP + per-email).
- **Accessibility:** semantic HTML, visible focus on every interactive element, WCAG AA contrast (§2.2), keyboard nav.
  Use headless primitives (§2.1) so you don't hand-roll accessible widgets.
- **SEO/metadata:** Next.js metadata API on public pages (home + event detail) — cheap, helps organic discovery.
- **Backups:** Neon free tier has limited restore. If the catalog data matters, schedule a periodic `pg_dump` export.

---

# Part 2 — Build Playbook

## 2.1 Tech stack

**Version policy: latest stable everywhere, no betas/RCs.** Pin exact versions in `package.json` (avoid silent `^`
drift). One exception: if a key dependency isn't yet compatible with the latest Next.js major, hold *that single piece*
back rather than downgrading the whole stack.

| Layer                 | Choice                                                                                 | Notes & gotchas                                                                                                                                                                                                                                                        |
|-----------------------|----------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Framework             | **Next.js 16** (App Router)                                                            | ⚠️ In Next 16, `middleware.ts` is renamed **`proxy.ts`** — use the new name for route protection.                                                                                                                                                                      |
| Language              | TypeScript, `strict`                                                                   |                                                                                                                                                                                                                                                                        |
| Linting/formatting    | **Biome**                                                                              | Replaced the ESLint/Prettier set up by the initial `create-next-app` scaffold. `lint` / `lint:fix` / `format` / `typecheck` npm scripts. No pre-commit hook wired yet (husky/lint-staged still open).                                                                |
| Styling               | **Tailwind CSS v4** (CSS-first `@theme`)                                               | Already in use. Tokens live in `globals.css`.                                                                                                                                                                                                                          |
| Dark mode             | `next-themes` + `.dark` class                                                          | ⚠️ **Not yet wired** — deferred to its own task; v1 ships light-only. Tokens are semantic, so dark = one `.dark {}` block + a `next-themes` provider later, no component rework.                                                                                          |
| Fonts                 | `next/font/google`                                                                     | Archivo Narrow, Fraunces, Inter Tight, JetBrains Mono — already configured.                                                                                                                                                                                            |
| Accessible primitives | **Radix UI primitives** (or React Aria / Headless UI)                                  | Build *your* visuals on top; get focus/ARIA/keyboard for free. shadcn is just styled Radix — take the base, skip their styling, avoid the generic look.                                                                                                                |
| ORM                   | **Prisma**                                                                             | ⚠️ On serverless (Vercel), use Neon's **pooled** connection string for the app + the **direct** string for migrations, or you exhaust DB connections under concurrent lambdas.                                                                                         |
| Database              | **Neon Postgres**, region **Frankfurt (EU)**, free tier                                | Free: 0.5 GB, scale-to-zero (cold starts ~300–500 ms). ⚠️ Neon is **US-HQ (Databricks)** → CLOUD Act applies even in Frankfurt; disclose in Datenschutzerklärung. EU-HQ alternatives (Hetzner-based managed Postgres, etc.) exist if you ever want a stricter posture. |
| Auth                  | **Better Auth** (latest stable) — `magicLink` plugin + Prisma adapter                  | TS-native, App-Router-native, stable (Auth.js v5 is still beta → excluded by the version policy). Generates its **own** auth tables (user/session/account/verification); has **built-in rate limiting**. Magic link still needs the DB (Prisma covers it).             |
| Email (magic links)   | EU SMTP (DSGVO-clean) — or Resend (US, disclose)                                       | Set **SPF + DKIM + DMARC** on the sending (sub)domain or links land in spam.                                                                                                                                                                                           |
| Maps                  | **MapLibre GL JS** (or Leaflet) + **non-Google tiles** (MapTiler EU free tier, or OSM) | ⚠️ **No Google Maps** (classic German Abmahnung risk). Tile requests send the user's IP to the tile host → disclose the provider.                                                                                                                                      |
| GPX                   | A GPX→GeoJSON parser (e.g. `@tmcw/togeojson`) + `@turf/turf` for geo math              | Don't hand-roll haversine/parsing. Store decoded geometry separately, lazy-load.                                                                                                                                                                                       |
| Validation            | **Zod**                                                                                | Shared client + server.                                                                                                                                                                                                                                                |
| Hosting               | **Vercel Hobby** (free)                                                                | ⚠️ **Non-commercial use only** per ToS — fine for a personal project; breach if monetized. Custom subdomain supported. Cold starts on free tier.                                                                                                                       |

> **RESOLVED — Better Auth.** Under the "latest stable, no betas" rule, Auth.js v5 (beta) and v4 (legacy, Pages-router
> era) are both out. Better Auth is stable, TS-native, App-Router-native, integrates cleanly with Prisma, and ships a
`magicLink` plugin plus built-in rate limiting — which folds two Phase-3 tasks into the library.

## 2.2 Design system

### Token architecture: raw → semantic (two tiers)

Keep your existing named palette as the **raw layer**. Add a thin **semantic layer** on top that maps *roles* to raws. *
*Rule: component code references semantic tokens only — never raw palette names.** Re-theming then becomes a one-line
edit.

Your current raw palette (from `globals.css`): `paper`, `paper-2`, `paper-3` (surfaces) · `ink`, `ink-soft` (text) ·
`muted` (tertiary text) · `rule` (borders) · `accent` + `accent-ink` (lime) · `warm` (orange).

> **IMPLEMENTED — shadcn-style names, not the `bg`/`surface`/`fg` vocabulary below.** The code shipped with shadcn's
> semantic names and they're kept (renaming ~140 usages buys nothing). The table's *roles* still hold; the **Token**
> column gives the actual name in `globals.css`. The one substantive divergence: **`primary` is ink (black), not lime** —
> a black CTA with lime as a sparse highlight is the editorial choice (see §"Color usage"). The lime brand pop lives in
> **`accent`**.

| Semantic role        | Token (in `globals.css`)            | Maps to (light)          | Use for                                                       |
|----------------------|-------------------------------------|--------------------------|---------------------------------------------------------------|
| page background      | `background`                        | `paper`                  | Page background                                               |
| surface              | `card` (`secondary`/`muted` sunken) | `paper-2` / `paper-3`    | Cards / raised panels; `secondary`,`muted` = hover/sunken     |
| primary text         | `foreground`                        | `ink`                    | Primary text, headings                                        |
| muted text           | `muted-foreground`                  | `dim`                    | Captions/meta — verified ≥ 4.5:1                              |
| divider              | `border`                            | `rule`                   | Borders, dividers (decorative; **not** control outlines)      |
| control outline      | `input`                             | `#7d7666`                | Form-control boundaries — darker than `border` for 3:1 (1.4.11)|
| primary action       | `primary` / `primary-foreground`    | `ink` / `paper`          | Default buttons, active fills (**ink, not lime**)             |
| brand highlight      | `accent` / `accent-foreground`      | `lime` / `lime-ink`      | Sparse lime pop: active nav underline, selected, key stat     |
| caution              | `caution` / `caution-foreground`    | `gold` #d6a51f / `ink`   | Mid-severity "heads up" between success and warning (e.g. filling up). Yellow fails as small text → fill+ink, or use bar/icon |
| warning              | `warning` / `warning-foreground`    | `warm` / `ink`           | Warnings only — **not** delete. Orange fails as small text → fill+ink, or use bar/icon |
| destructive          | `destructive` / `destructive-foreground` | `#b3261e` / `#f7eeec` | Delete / irreversible, always with confirm                   |
| success              | `success` / `success-foreground`    | `#186a3c` / `paper`      | Confirmations ("saved") — green distinct from lime           |
| focus ring           | `ring`                              | `ink`                    | Keyboard focus on every interactive element (light only)     |
| link                 | *(unresolved — see open decisions)* | —                        | Inline links                                                  |

> **RESOLVED:** `destructive` #b3261e, `success` #186a3c (passes AA as text *and* as a fill with paper text), `caution`
> = `gold` #d6a51f (the yellow mid-point of the status spectrum success → caution → warning → destructive; AA only as a
> fill with **ink** text — 8.1:1 — never small yellow text), `warning` = `warm` #d96a3f (AA only as a fill with **ink**
> text — never small orange text), `ring` = `ink`, `input` #7d7666 (a dedicated control-outline token, since decorative
> `border` is 1.43:1 and can't bound a real input). Dark-mode values for all of these are **deferred** with dark mode
> itself.

### Color usage rules ("when to use which color")

- **Backgrounds:** `bg` = page · `surface` = cards · `surface-sunken` = hover/sunken.
- **Text:** `fg` = headings/primary · `fg-soft` = body · `fg-muted` = captions/meta (verify contrast).
- **`primary` is ink (black)** — default buttons and active fills. **`accent` (lime) is the loud one — use it
  sparingly:** active nav underline, selected chip, one key stat. Don't paint half the UI lime.
- **Status spectrum (green → yellow → orange → red):** `success` (green) = confirmations · `caution` (gold/yellow) =
  mid-severity heads-up (filling up, soft limit) · `warning` (orange) = warnings only · `destructive` (red) =
  delete/irreversible only, always behind a confirm.
- **`border` for all dividers; `ring` for all keyboard focus.**

### Accessibility — contrast (do before shipping)

WCAG AA: **4.5:1** for body text, **3:1** for large text / UI components.

- ⚠️ `muted` (#7d8479 on `paper` #f1ede4) looks **borderline / likely failing** for body text — verify and darken if it
  fails; reserve it for non-essential meta only.
- ⚠️ `accent` is identical in light **and** dark mode — verify it has adequate contrast against backgrounds in *both*.
- Don't ship a color you haven't run through a contrast checker.

### Typography

**Family → role (settled):**

| Role        | Family                            | Used for                                                   |
|-------------|-----------------------------------|------------------------------------------------------------|
| display     | Archivo Narrow                    | Hero / marketing headlines                                 |
| heading     | Archivo Narrow                    | h1–h3                                                      |
| body        | Inter Tight                       | Body, UI, forms                                            |
| data / mono | JetBrains Mono                    | Distances, times, dates, numeric data ("42.2 km", "08:30") |
| editorial   | Fraunces (italic, SOFT/WONK axes) | Sparse marketing flourishes only                           |

**Type scale (settled).** Base fixed: `1rem` (≈16px), whole scale expressed in `rem`. Defined as `--text-*` in
`@theme` (`globals.css`), generating `text-display`, `text-h1`, etc.

| Token     | Size (rem / px) | Weight | Line-height |
|-----------|-----------------|--------|-------------|
| `display` | 3 / 48          | 700    | 1.05        |
| `h1`      | 2 / 32          | 700    | 1.15        |
| `h2`      | 1.5 / 24        | 600    | 1.2         |
| `h3`      | 1.25 / 20       | 600    | 1.3         |
| `body`    | 1 / 16          | 400    | 1.6         |
| `body-sm` | 0.875 / 14      | 400    | 1.5         |
| `caption` | 0.8125 / 13     | 400    | 1.4         |
| `mono`    | 0.875 / 14      | 500    | 1.4         |

> **DECISION:** Decide `link` color.

> **RESOLVED — `/design` content stays English.** The `/design` gallery and its mock data (
> `src/data/mock-events.ts`, `src/types/event.ts`) are intentionally English — they're a component showcase, not real
> content. The German-only rule (§1.3) applies to actual app content (routes built from these components), which gets
> localized in a separate pass.

### Other tokens

Tailwind's default **spacing** scale is fine — use it. Consider authoring custom **radius**, **shadow** (subtle, fits
the editorial look), and a small **z-index** scale (overlays/dialogs/toasts) as tokens so they stay consistent. Optional
for v1 but cheap.

### Component gallery (`/design`)

`/design` is the **living source of truth** for components — render every variant **and every state** (default / hover /
active / disabled / loading / empty / error). Build components here first, then assemble routes from them (your stated
strategy — it's the right one). Gate the route via `NODE_ENV === "production"` (no dedicated env var).

## 2.3 Roadmap — what to do, in what order

Ordering rationale: design system before routes (your strategy) → data before features → auth before personal/admin → *
*read before write** → map last (heaviest, lazy-loaded) → legal before launch.

**Phase 0 — Repo reset & scaffold**

1. Archive the old state: `git tag archive/v0 main` (and/or `git branch legacy/v0 main`). **Delete nothing** — no
   secrets were committed, so keep history.
2. Scaffold a **fresh Next.js 16** app (don't build on the half-finished design branch).
3. Ensure `.env` is in `.gitignore` **before the first commit**.
4. Set up Tailwind v4 + fonts + tokens (port `globals.css` from the design branch), TS `strict`, **Biome** (lint +
   format), and a Zod-validated `env.ts`.
5. Make this the new `main`.

**Phase 1 — Design system foundation**

1. Refactor tokens to the raw→semantic split (§2.2); add `destructive` / `success` / `ring`.
2. Define the `rem` type scale; fix the `13px`→`1rem` base.
3. Build the `/design` gallery; port + polish core components on **Radix primitives** (Button, Input/Select, Card,
   Badge, Dialog, Dropdown, Tabs, Toast…), with **all states**.
4. Lock the color + type usage rules (§2.2) and run a contrast pass.

**Phase 2 — Data layer**

1. Prisma schema for all entities + relations (§1.3). Better Auth generates its **own** auth tables (
   user/session/account/verification) via its CLI — run that first, then add your domain models.
2. Neon EU project; wire **pooled** (app) + **direct** (migrations) connection strings.
3. First migration + a seed script with a few real events (so views aren't empty during dev).
4. Shared Zod schemas for entities.

**Phase 3 — Auth (Better Auth)**

1. Magic-link auth + Prisma adapter; EU email provider with SPF/DKIM/DMARC on the subdomain.
2. Enable Better Auth's **built-in rate limiting** on the sign-in endpoint.
3. Roles; `/login` + `/auth/verify`; header logout dropdown; route protection in `proxy.ts`.

**Phase 4 — Catalog read (public)**

1. Shared filter state (URL params): distance, surface, date, region, difficulty — flat routes (`/timeline`,
   `/calendar`, `/map`), no `/explore` wrapper.
2. Views in order of effort: **timeline → calendar → map** (map last; lazy-load the map lib + GPX geometry).
3. `/events/[id]` detail: races, POIs on map, GPX track, links. Non-Google tiles.

**Phase 5 — Admin CRUD**

1. `/admin` event/race/route/POI/link forms; draft/published.
2. Delete flows use the **destructive** color + confirm.

**Phase 6 — Personal tracking**

1. `UserRacePlan` + save/plan actions.
2. `/saved` grouped by status.

**Phase 7 — Geolocation "near me"**

1. Browser geolocation → client-side proximity sort/filter (never stored/sent).

**Phase 8 — Legal & polish**

1. Impressum + Datenschutzerklärung (§2.4).
2. System states (404/error) + per-view empty/loading/error states.
3. SEO/metadata on public pages; final a11y + contrast pass.

**Phase 9 — Deploy**

1. Vercel + env vars + domain `raceatlas.moritzwieland.de` + email DNS.
2. Smoke test; verify cold-start behavior and magic-link deliverability.

## 2.4 Legal / DSGVO checklist

> **Not legal advice** — I'm not a lawyer. Get the texts reviewed; a generator (e.g. eRecht24) is a reasonable starting
> point, and a lawyer is wise for the Datenschutzerklärung.

- **Impressum** (`/impressum`, per DDG §5): required for a public German site — name, address, contact email.
- **Datenschutzerklärung** (`/datenschutz`, DSGVO): required. Cover at minimum:
    - Data processed: email (auth), server logs / IP, geolocation (client-side, not stored), map-tile requests (IP →
      tile host).
    - Legal basis + your rights boilerplate.
    - **Processors needing an AVV/DPA** + US-transfer disclosures (SCCs/DPF where relevant): **Vercel** (US), **Neon** (
      US-HQ, Frankfurt region), the **email provider**, the **map-tile provider**.
- **AGB:** **not needed** — no contracts, no sales, no transactions.
- **Cookie banner:** **not needed** — only an essential session cookie; no non-essential trackers. *Keep it that way* (
  if you ever add analytics, use a cookieless EU-hosted option to preserve this).

---

## Open decisions (collected)

- [ ] User-management UI in v1? (rec: no)
- [ ] **Geo storage: `Float` now → PostGIS later.** Migrate to PostGIS (`geography` + GiST) when server-side spatial
  queries land (proximity, viewport, "within N km"); recommended hybrid keeps `Float` as read source + adds a
  query-only `geography` column. See §1.3 modelling rules. Client-side Phase 7 geolocation needs no change.
- [x] Hex values for `destructive` / `ring` — `destructive` #b3261e/#f7eeec, `ring` = `ink` (light only; dark deferred)
- [x] Hex value for `success` — #186a3c/#f1ede4 (light; dark deferred). `caution` = `gold` #d6a51f/`ink`. `warning` = `warm` #d96a3f/`ink`. `input` outline #7d7666.
- [x] Primary CTA colour — **ink (black)**, not lime; lime lives in `accent` (sparse highlight). [light only; dark deferred]
- [ ] `link` color
- [x] **Auth: Better Auth** — resolved by the latest-stable rule
- [ ] `Event.location` — derived from first race, or authored?
- [ ] Email provider: EU SMTP (DSGVO-clean) vs Resend (US, disclose)
- [ ] Map: MapLibre GL vs Leaflet; MapTiler vs OSM tiles
- [ ] `/events` nav target (`nav-items.ts` → `/events` placeholder page) — not a defined 4th view mode, not just
  `/events/[id]`'s parent. Decide what it is, or remove the nav entry, before Phase 4.
