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
