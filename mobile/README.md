# GOAT Alliance YAPP (Expo)

This folder bootstraps an Expo-based, mobile-first rebuild of the Lovable web preview. It keeps parity with the Lovable Cloud
stack while adding an internal dashboard and offline-first scaffolding.

## Getting started

```bash
cd mobile
npm install
npm run start # choose iOS, Android, or Web from the Expo CLI
```

Key integrations:

- **Lovable Cloud / Supabase** – inject your keys as `EXPO_PUBLIC_SUPABASE_URL` and `EXPO_PUBLIC_SUPABASE_ANON_KEY` to wire live
  data sources into the screens.
  - Expected table: `highlights` with columns `id` (uuid or text primary key), `title` (text), `description` (text), `impact` (text),
    and `created_at` (timestamp for ordering).
  - The hook `useCachedHighlights` reads cached content from `AsyncStorage`, then refreshes from Supabase on screen focus.
- **n8n / AI agents** – the dashboard toggles call automation endpoints defined by `EXPO_PUBLIC_AUTOMATION_URL` and
  `EXPO_PUBLIC_AUTOMATION_TOKEN` (Bearer token, optional). See `src/lib/workflows.ts` for the client.
- **Offline caching** – `useCachedHighlights` demonstrates storing critical data in `AsyncStorage`, while `useOfflineStatus` keeps
  the UI responsive during outages.

## Cross-platform

- `app.json` and `eas.json` are ready for EAS builds targeting iOS, Android, and web (for Lovable profile previews).
- The Expo gradient, glass panels, and responsive typography follow the Lovable palette and mobile-first spacing.

## Next steps

- Map real Supabase tables or REST endpoints into the hooks.
- Replace the placeholder PNG assets with branded icons and splash screens.
- Extend the dashboard with secure auth (Supabase Auth) and protected routes.
# Mobile app setup

This project expects a Supabase backend to provide highlights content for the home screen.

## Environment variables

Add the following to your local `.env` when running the Expo app:

```
EXPO_PUBLIC_SUPABASE_URL=<your-supabase-project-url>
EXPO_PUBLIC_SUPABASE_ANON_KEY=<your-supabase-anon-key>
```

## Database schema

Create a `highlights` table in Supabase with the following columns:

| column       | type        | notes                               |
| ------------ | ----------- | ----------------------------------- |
| `id`         | `uuid`      | Primary key, default `gen_random_uuid()` |
| `title`      | `text`      | Required                             |
| `description`| `text`      | Optional                             |
| `url`        | `text`      | Optional link to the highlighted item |
| `updated_at` | `timestamp` | Default `now()` for ordering         |

## Highlight caching

The app reads highlights from the live Supabase table and caches them locally. When the device is offline, the cached values are shown, and the home screen surfaces an inline banner if a refresh fails.
# Goat Alliance Mobile

This folder contains mobile-first components and screens that integrate with the Goat Alliance studio APIs.

## Configuration

The workflow client reads configuration from environment variables so that the app can point to the correct studio instance:

- `STUDIO_BASE_URL` or `EXPO_PUBLIC_STUDIO_BASE_URL` – the base URL for the studio/agent API (defaults to `https://studio.goatalliance.ai`).
- `STUDIO_API_TOKEN` or `EXPO_PUBLIC_STUDIO_API_TOKEN` – bearer token used to authenticate with the agent/n8n endpoints.

Add these variables to your native configuration (e.g., `.env`, Expo config, or native build tooling) before running the app. When no token is provided, the client attempts unauthenticated requests.

## Offline behavior

The mobile screens use `useOfflineStatus` to avoid sending requests while offline. The UI will surface a gentle message if a user tries to change workflow state without connectivity.
