# Project Structure

High-level layout of the repository. The project uses a `src/` root with path aliases so imports stay consistent across
the codebase.

- `src/app/` - Next.js App Router pages and layouts
- `src/lib/` - UI components, data access, and utilities
- `src/messages/` - i18n translations
- `public/` - Static assets
- `supabase/` - Migrations and seed SQL
- `wiki/` - Repository-managed wiki docs
- `.github/` - CI/CD workflows

## Conventions

- Use `@/` imports for any code under `src/`.
- UI primitives live in `src/lib/components/primitives`.
- Page-level and feature components live in `src/lib/components/composites`.
