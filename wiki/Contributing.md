# Contributing

Thanks for helping improve RaceAtlas. The project is small, so keeping changes focused and well‑scoped helps a lot.

## Branching

- Work on feature branches and open PRs to `main`.
- Prefer short‑lived branches that solve one problem end‑to‑end.

## Development Workflow

1. Install dependencies with `pnpm install`.
2. Run `pnpm dev` and keep the app open while you work.
3. If you add UI strings, update both `src/messages/en.json` and `src/messages/de.json`.
4. If you change data shape, update Supabase migrations and any seed data.

## PR Checklist

- Keep the PR focused on one theme.
- Update docs when behavior or setup changes.
- Run the quality checks locally if the change is non-trivial.

## Quality Checks

```bash
pnpm lint
pnpm lint:md
pnpm test
pnpm build
```

## Code Style

- Follow existing file structure under `src/`.
- Use `@/` imports for code in `src/`.
- Update `messages/en.json` and `messages/de.json` together for UI strings.
- Keep components focused; prefer small composable components over large files.
