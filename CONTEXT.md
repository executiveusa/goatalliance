# CONTEXT - goatalliance

## What this is
GOAT Alliance – Lovable Cloud Upgrade Track. GOAT Alliance connects clients with vetted service professionals. The legacy stack (Next.js + Encore.ts) is being modernized to a Vite + React frontend backed by Lovable Cloud’s managed Supabase services. This README captures the current state and outlines how the upgraded architecture fits together so every team can run the project locally or on Lovabl

## Top-level layout
- `AGENTS.md`
- `MEDUSA_INTEGRATION_COMPLETE.md`
- `README.md`
- `README_PNW_AI_DIRECTORY_UPGRADE.md`
- `README_old.md`
- `__tests__/` 9 files
- `app/` 64 files
- `audit.html`
- `backend/` 29 files
- `build.sh`
- `components/` 13 files
- `content/` 32 files
- `content-plan/` 1 files
- `data/` 3 files
- `docs/` 11 files
- `eslint.config.mjs`
- `frontend/` 28 files
- `jest.config.js`
- `jest.d.ts`
- `jest.setup.js`
- `lib/` 17 files
- `mcp-servers/` 6 files
- `mobile/` 33 files
- `next.config.js`
- `next.config.ts`

## Working here
1. Read the Trail block in AGENTS.md and run `trail map` for orientation before grepping.
2. Do not move or rename existing files without checking `trail callers` for what depends on them.
3. Session learnings belong in `.trail/learnings/`.

## Build / test (package.json scripts)
- `npm run dev`
- `npm run build`
- `npm run start`
- `npm run lint`
- `npm run type-check`
- `npm run test`
- `npm run test:watch`
- `npm run playwright`
- `npm run playwright:ui`
- `npm run playwright:install`
- `npm run db:generate`
- `npm run db:push`
