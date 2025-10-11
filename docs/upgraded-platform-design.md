# GOAT Alliance – Upgraded Platform Design

## Overview
The GOAT Alliance platform is being refreshed to deliver a modern, modular experience across web and mobile clients. This document outlines the proposed technical architecture, design system, and deployment approach for the upgraded stack.

## Tech Stack Refresh
- **Frontend**: Migrate from Next.js 15 to Vite + React 18 with TailwindCSS and shadcn/ui components for a leaner, component-driven UI layer.
- **Backend**: Consolidate services on Lovable Cloud, leveraging its managed Supabase Postgres, built-in Auth, Storage, and Edge Functions.
- **Data Access**: Standardize on Prisma for all Postgres interactions to ensure consistent transactions, migrations, and typing. If the Supabase client is required for specific Lovable Cloud features (e.g., real-time subscriptions or storage), document those boundaries clearly in the codebase and architecture notes to prevent drift and duplicated logic.
- **Payments**: Continue using Stripe for both one-time charges and recurring subscriptions.
- **Secrets Management**: Store all credentials in environment variables (e.g., `.env`, Infisical) to avoid hard-coded secrets.

## Repository Strategy
- Split the codebase into dedicated repositories for:
  - Web frontend (Vite/React).
  - Backend API and Lovable Cloud services.
  - Mobile application (React Native or mobile-specific frontend).
- Share UI primitives via a common component library, published as a private npm package using semantic versioning. The library will be managed in a dedicated repository, with release automation (CI/CD) to publish new versions to a private registry (e.g., GitHub Packages). All consuming projects will specify explicit version dependencies to ensure compatibility and avoid breaking changes.
- Maintain compatibility with the existing Vercel deployment configuration as a fallback.

## Design & Branding Guidelines
- Preserve the iconic Seattle skyline hero image and branded background while simplifying surrounding layout for clarity.
- Emphasize a single primary call-to-action in the hero section (e.g., “Join Now” or “Browse Members”).
- Arrange sponsor and member logos in a balanced grid or carousel with ample whitespace and consistent spacing.
- Adopt Lovable’s color palette and typography tokens:
  - Charcoal `#3C494E`
  - Keppel teal `#00B39F`
  - Saffron yellow `#EBC017`
- **Accessibility Note:** Validate color contrast for text, UI elements, and states using these colors to meet WCAG 2.1 AA/AAA standards. Provide guidance and test for both light and dark variants to ensure accessible implementations across the design system.
- Implement the palette through Tailwind configuration and shadcn/ui components to ensure consistent styling and brand voice.

## Feature Enhancements
- **Group / Organizational Accounts**: Support team memberships via OAuth (Google Workspace, Microsoft) or invite flows. Utilize Lovable Cloud role tables to manage group assignments and category tags (e.g., “Enterprise”, “Top Contributor”).
- **Membership Tiers**: Use Stripe Products/Prices for recurring memberships and one-time Ally Membership fees. Handle Stripe webhooks through Lovable Cloud functions to update membership statuses and send receipts.
- **Category Management**: Flag premium members in the database upon successful payment and highlight them within directory listings while keeping styling consistent with the refreshed design system.

## Deployment & Infrastructure
- **Primary Hosting**: Deploy backend services to Lovable Cloud, relying on its managed Postgres, auth, storage, and edge runtime.
- **Frontend Hosting**: Deploy the Vite-built frontend on Lovable Cloud’s hosting platform, with Vercel maintained as an optional backup/CDN distribution path.
- **Environment Configuration**: Centralize API URLs, tokens, and keys using environment variables or a secrets manager; ensure no credentials are committed to version control.

## Summary of Upgrades
- Modernize architecture by separating repos and unifying backend services on Lovable Cloud.
- Deliver a cohesive UI with Lovable’s branding, streamlined layout, and shadcn/ui components.
- Expand membership capabilities with group accounts and premium tiers powered by Stripe.
- Leverage Lovable Cloud for resilient, scalable hosting while preserving Vercel as a fallback deployment target.

## References
- [GOAT Alliance README](../README.md)
- Lovable.dev Universal Upgrade Plan (internal PDF)
- Supabase/Lovable Cloud launch announcement (2025-09-29)
