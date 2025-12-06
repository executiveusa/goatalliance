# GOAT Alliance – Lovable Cloud Upgrade Track

GOAT Alliance connects clients with vetted service professionals. The legacy stack (Next.js + Encore.ts) is being modernized to a Vite + React frontend backed by Lovable Cloud’s managed Supabase services. This README captures the current state and outlines how the upgraded architecture fits together so every team can run the project locally or on Lovable without surprises.

> 📘 **Need the full blueprint?** Review [docs/upgraded-platform-design.md](docs/upgraded-platform-design.md) for the end-to-end modernization strategy covering design guidelines, repository separation, and deployment runbooks.

## 🆕 Admin Dashboard for Pacific Northwest Contractors

A new contractor-focused admin dashboard has been added at `/admin`, specifically designed for roofing, painting, graffiti removal, and pressure washing contractors in the Pacific Northwest. 

**Key Features:**
- Real-time job and lead tracking
- AI-powered insights and recommendations
- Crew scheduling and utilization
- Service-specific performance metrics
- Guided onboarding tour

**Learn More:** See [docs/ADMIN_DASHBOARD.md](docs/ADMIN_DASHBOARD.md) for full documentation.

## Architecture Overview

| Area | Legacy Implementation | Lovable Upgrade Target |
| --- | --- | --- |
| Frontend | Next.js 15 App Router (monorepo) | Vite + React 18 with TailwindCSS & shadcn/ui components |
| Backend | Encore.ts service (Go) | Lovable Cloud (Supabase Postgres, Auth, Edge Functions) |
| Payments | Stripe one-time + subscriptions | Stripe (reused) with Lovable webhooks |
| Auth | NextAuth.js | Lovable/Supabase Auth with optional OAuth providers |
| Hosting | Vercel (frontend) + Encore Cloud (backend) | Lovable Cloud as primary, Vercel maintained as fallback |

The repository currently contains the legacy Next.js implementation while the Vite-based UI is being introduced incrementally. Documentation and configuration already follow the new Lovable-first conventions so the Vite app can drop in with minimal friction.

## Repository Layout

```
goatalliance/
├── app/                # Legacy Next.js app router entry (to be migrated)
├── components/         # Shared UI primitives (migrating to shadcn/ui style exports)
├── docs/               # Architecture and design references
├── frontend/           # Vite + React 18 implementation wired for Lovable Cloud
├── backend/            # Encore.ts service (to be replaced by Lovable Cloud functions)
├── prisma/             # Prisma schema & seeds (reusable with Supabase)
├── public/             # Assets including Seattle hero imagery
└── ...
```

When the Vite UI is introduced it should live in its own repository (or package) as described in the upgrade plan, but the configuration below allows local development now.

## Local Development

### 1. Lovable Cloud / Supabase Services

1. Create a Lovable Cloud project (Supabase under the hood).
2. Configure the following environment variables (see `.env.example` when added):
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_STRIPE_PUBLISHABLE_KEY`
   - `STRIPE_SECRET_KEY`
   - `STRIPE_WEBHOOK_SECRET`
3. Use Prisma against the Lovable Postgres database:
   ```bash
   npx prisma generate
   npx prisma migrate deploy
   ```

### 2. Vite + React Frontend (upgrade target)

The Lovable-ready web app now lives in [`frontend/`](frontend/):

```bash
cd frontend
npm install

# start the Vite dev server on http://localhost:5173
npm run dev

# optional quality gates
npm run lint
npm run test
```

Copy `.env.example` to `.env.local` (or `.env`) and populate the Supabase + Stripe keys shared by Lovable Cloud. API access is centralized inside `src/lib/supabase-client.ts`, keeping configuration reusable across web, edge functions, and future mobile clients.

### 3. Legacy Next.js Frontend (reference implementation)

Until the migration is complete the Next.js app can still be run:

```bash
npm install
npm run dev
```

This is useful for parity checks when porting pages/components to the new Vite UI.

## Deployment

### Lovable Cloud (Primary)

1. Connect the frontend repository in Lovable Cloud and set the environment variables described above.
2. Point the Vite build output to Lovable hosting (`npm run build && npm run preview` during CI).
3. Use Lovable Edge Functions (or Supabase Functions) to receive Stripe webhooks and update membership flags.
4. Enable row-level security policies in Supabase to protect membership and group tables.

### Vercel (Fallback)

The legacy Vercel workflow is retained. The “Deploy with Vercel” button remains valid, and the same environment variables can be reused. When switching hosts follow the runbook in [docs/upgraded-platform-design.md](docs/upgraded-platform-design.md#deployment--infrastructure).

## Stripe & Membership Tiers

Stripe integration stays unchanged but Lovable Cloud will now handle webhook processing:

1. Define Products/Prices for one-time Ally memberships and recurring tiers (Professional, Enterprise, etc.).
2. On successful checkout, Lovable functions update `membership_status`, `tier`, and `is_premium` flags inside Supabase.
3. The frontend filters categories using these flags to highlight premium members while respecting the Lovable color palette and typography.

## Design System Notes

- Retain the Seattle skyline hero imagery and branded gradient background.
- Adopt Lovable brand tokens through Tailwind configuration: Charcoal `#3C494E`, Keppel `#00B39F`, and Saffron `#EBC017`.
- Replace bespoke components with shadcn/ui primitives to keep spacing, typography, and interactions consistent.
- Keep a single primary CTA per hero section (“Join Now” or “Browse Members”) and group sponsor logos in balanced grids/carousels with generous whitespace.

## Additional Resources

- [Upgraded Platform Design](docs/upgraded-platform-design.md) – authoritative guide for the Lovable migration.
- `prisma/` – schema definitions ready for Supabase Postgres.
- `backend/` – reference Encore implementation for any functionality that still needs to be ported to Lovable Cloud.

As the Vite implementation lands, update this README with repository links and concrete component references so the documentation stays in lockstep with the code.
