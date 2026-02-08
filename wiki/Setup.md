# Setup

## Prerequisites

- Node.js
- pnpm

## Install

```bash
pnpm install
```

## Environment

Copy `.env.example` to `.env` and fill in the required values. Without the Supabase variables, the app will render but
no events will be visible. The admin panel also depends on the admin secrets.

Key variables:

| Variable                                       |      Required      | Default | Description                                                 |
|------------------------------------------------|:------------------:|:-------:|-------------------------------------------------------------|
| `PORT`                                         |        :x:         | `3042`  | Port where the Next.js app listens.                         |
| `NEXT_PUBLIC_SUPABASE_URL`                     | :white_check_mark: |    -    | Supabase project URL (public).                              |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY` | :white_check_mark: |    -    | Supabase publishable key for public reads.                  |
| `SUPABASE_SECRET_KEY`                          | :white_check_mark: |    -    | Supabase secret service key for admin writes.               |
| `ADMIN_PASSWORD`                               | :white_check_mark: |    -    | Password required to access the admin panel.                |
| `ADMIN_COOKIE_SECRET`                          | :white_check_mark: |    -    | Secret used to sign admin session cookies.                  |
| `ADMIN_SESSION_MAX_AGE_SECONDS`                |        :x:         |  `600`  | Admin session duration (seconds) after last admin activity. |

## Run

```bash
pnpm dev
```

Default URL: `http://localhost:3042`

If you want to change the port, update `PORT` in your `.env`.

## Build

```bash
pnpm build
pnpm start
```

For Docker-based local runs, see the [Deployment](https://github.com/mowi12/RaceAtlas/wiki/Deployment) page.
