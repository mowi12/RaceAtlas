# Supabase Workflow

This project keeps the database schema in Git using Supabase migrations.
The app reads events through a public client and writes through an admin client
that uses the service role key.

## Data Model

- `events` - one row per event (name, date, location, type, external link)
- `races` - race variants linked to an event (distance, elevation, start time)

## Environment Variables

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY`
- `SUPABASE_SECRET_KEY`

## One-Time Setup

1. Install the Supabase CLI:

    ```bash
    brew install supabase/tap/supabase
    ```

2. Login to Supabase:

    ```bash
    supabase login
    ```

3. Link the local repo to your Supabase project:

    ```bash
    supabase link
    ```

## Apply Migrations

To apply migrations to the linked Supabase project:

```bash
supabase db push
```

## Seed Cloud Database (No Local DB)

If you only use Supabase in the cloud (no local Docker stack), you can seed data by running the seed SQL directly in the
Supabase SQL Editor:

1. Open Supabase → SQL Editor.
2. Paste the contents of `supabase/seed.sql`.
3. Run the query.

This seed file uses upserts, so re-running it won't create duplicates. If you want a full reset before seeding,
uncomment the `truncate` line at the top of `supabase/seed.sql`.

## Add a New Migration

Create a new migration file:

```bash
supabase migration new <name>
```

Edit the generated SQL file in `supabase/migrations/`.

Then apply it:

```bash
supabase db push
```

## Manual Fallback

If you do not want to use the CLI, you can copy the SQL from the latest migration file in `supabase/migrations/` and run
it in the Supabase SQL Editor.
