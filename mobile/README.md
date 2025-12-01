# Goat Alliance Mobile

This folder contains mobile-first components and screens that integrate with the Goat Alliance studio APIs.

## Configuration

The workflow client reads configuration from environment variables so that the app can point to the correct studio instance:

- `STUDIO_BASE_URL` or `EXPO_PUBLIC_STUDIO_BASE_URL` – the base URL for the studio/agent API (defaults to `https://studio.goatalliance.ai`).
- `STUDIO_API_TOKEN` or `EXPO_PUBLIC_STUDIO_API_TOKEN` – bearer token used to authenticate with the agent/n8n endpoints.

Add these variables to your native configuration (e.g., `.env`, Expo config, or native build tooling) before running the app. When no token is provided, the client attempts unauthenticated requests.

## Offline behavior

The mobile screens use `useOfflineStatus` to avoid sending requests while offline. The UI will surface a gentle message if a user tries to change workflow state without connectivity.
