# GOAT Alliance Backend Studio

## Purpose

The Backend Studio powers the lead-generation and conversion system for GOAT Alliance. It centralizes niches, landing pages, A/B testing, lead intake, and voice agent orchestration so the dashboard can operate as a single source of truth.

## Core Capabilities

- **Niche setup** for painting, roofing, pressure washing, and graffiti removal.
- **Landing page factory** for multi-page campaigns with variants.
- **A/B testing** with variant traffic splits and goal tracking.
- **Lead intake pipeline** with source attribution, scoring, and status workflow.
- **Voice agents** for inbound/outbound call automation and logging.
- **Smart site templates** for rapid landing page generation.

## API Overview

All endpoints live under `/api/studio` in the Next.js app.

### Bootstrap

`POST /api/studio/bootstrap`

Seeds the default niches, services, templates, and initial landing pages/variants.

### Niches & Services

- `GET /api/studio/niches`
- `POST /api/studio/niches`
- `GET /api/studio/niches/:id`
- `PATCH /api/studio/niches/:id`
- `DELETE /api/studio/niches/:id`

### Landing Pages & Variants

- `GET /api/studio/landing-pages`
- `POST /api/studio/landing-pages`
- `GET /api/studio/landing-pages/:id`
- `PATCH /api/studio/landing-pages/:id`
- `DELETE /api/studio/landing-pages/:id`
- `GET /api/studio/landing-pages/:id/variants`
- `POST /api/studio/landing-pages/:id/variants`
- `PATCH /api/studio/landing-variants/:id`
- `DELETE /api/studio/landing-variants/:id`

### A/B Tests

- `GET /api/studio/ab-tests`
- `POST /api/studio/ab-tests`
- `PATCH /api/studio/ab-tests/:id`
- `DELETE /api/studio/ab-tests/:id`

### Leads

- `GET /api/studio/leads`
- `POST /api/studio/leads`
- `PATCH /api/studio/leads/:id`

### Voice Agents & Calls

- `GET /api/studio/voice-agents`
- `POST /api/studio/voice-agents`
- `PATCH /api/studio/voice-agents/:id`
- `DELETE /api/studio/voice-agents/:id`
- `GET /api/studio/voice-calls`
- `POST /api/studio/voice-calls`
- `PATCH /api/studio/voice-calls/:id`

### Smart Site Templates

- `GET /api/studio/templates`
- `POST /api/studio/templates`
- `PATCH /api/studio/templates/:id`
- `DELETE /api/studio/templates/:id`

## Database Models

The Prisma schema now includes models for:

- `Niche`
- `Service`
- `LandingPage`
- `LandingVariant`
- `ABTest`
- `ABTestVariant`
- `Lead`
- `VoiceAgent`
- `VoiceCall`
- `SiteTemplate`

Run Prisma migrations after pulling the latest changes:

```bash
npx prisma migrate dev
npx prisma generate
```

## Next Steps

- Wire the dashboard UI to these endpoints.
- Add automation for voice agent providers (e.g., Twilio, Retell).
- Build scheduled reports for lead quality and conversion.
- Add audit logging for A/B test changes.
