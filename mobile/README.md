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
