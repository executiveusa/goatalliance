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
