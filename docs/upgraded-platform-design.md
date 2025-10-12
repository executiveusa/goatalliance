# GOAT Alliance – Upgraded Platform Design

## Overview
The GOAT Alliance platform is being refreshed to deliver a modern, modular experience across web and mobile clients. This document outlines the proposed technical architecture, design system, and deployment approach for the upgraded stack.

## Tech Stack Refresh
- **Frontend**: Migrate from Next.js 15 to Vite + React 18 with TailwindCSS and shadcn/ui components for a leaner, component-driven UI layer.
- **Backend**: Consolidate services on Lovable Cloud, leveraging its managed Supabase Postgres, built-in Auth, Storage, and Edge Functions.
- **Data Access**: Standardize on Prisma for all Postgres interactions to ensure consistent transactions, migrations, and typing. If the Supabase client is required for specific Lovable Cloud features (e.g., real-time subscriptions or storage), document those boundaries clearly in the codebase and architecture notes to prevent drift and duplicated logic.
- **Payments**: Continue using Stripe for both one-time charges and recurring subscriptions.
- **Secrets Management**: Store all credentials in environment variables (e.g., `.env`, Infisical) to avoid hard-coded secrets.

### Vite Frontend Implementation Notes
- **Project Shape**: Scaffold the UI in a dedicated repository (e.g., `goatalliance-web`). This repo already hosts an implementation in `frontend/` with `src/main.tsx` mounting the app and `src/routes` mirroring the legacy Next.js pages.
- **Shared UI**: Publish shared shadcn/ui wrappers from a `@goat/ui` package to keep Tailwind tokens and branding consistent across web and mobile clients.
- **State & Data**: Use the Supabase JavaScript client via a central `services/client.ts` module for auth, profile data, and real-time membership updates. Keep Stripe checkout helpers colocated in the same module so payment flows share configuration with Lovable webhooks.
- **Styling**: Extend `tailwind.config.ts` with Lovable palette tokens (`charcoal`, `keppel`, `saffron`) and typography scale. Avoid ad-hoc CSS to maintain parity with other clients.
- **Routing**: Adopt file-based routing through `@tanstack/router` or React Router to keep parity with nested layouts currently found in Next.js. This allows smooth migration of pages like the directory, compliance, and blog.
- **Testing**: Configure Vitest + Testing Library for unit tests and Playwright for E2E parity with the legacy stack.

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
  - **Switching Between Primary and Fallback Hosting**:
    - **Criteria for Switching**: Initiate a switch to Vercel if Lovable Cloud experiences an outage, performance degradation, or during scheduled maintenance. Switch back to Lovable Cloud once service is restored and verified.
    - **Process**:
      1. **DNS Update**: Change DNS records (e.g., CNAME or A record) to point to the fallback (Vercel) or primary (Lovable Cloud) frontend as needed. Ensure TTL is set appropriately to minimize propagation delay.
      2. **Environment Parity**: Confirm that all environment variables, secrets, and configuration files (e.g., `.env`, Infisical) are up-to-date and consistent across both hosting platforms.
      3. **Cache Invalidation**: Invalidate CDN and edge caches on the target platform to ensure users receive the latest build after switching.
      4. **Build Flags**: Verify that build flags and environment-specific settings (e.g., API endpoints, feature toggles) are correctly set for the target hosting environment.
      5. **Verification**: Test critical user flows and monitor error logs to confirm successful deployment and operation on the new host.
      6. **Rollback**: If issues are detected, revert DNS and configuration changes to restore service on the previous host.
    - **Documentation**: Maintain a runbook or checklist for the switching process and update it as hosting configurations evolve.
- **Environment Configuration**: Centralize API URLs, tokens, and keys using environment variables or a secrets manager; ensure no credentials are committed to version control.
  - Commit a `.env.example` file (with no secrets) listing all required environment variables for each environment (development, staging, production).
  - Reference the secrets manager path (e.g., Infisical, Lovable Cloud secrets) for actual secrets and onboarding instructions.

### Lovable Cloud Integration Checklist
1. **Supabase Setup**
   - Enable Row Level Security (RLS) on membership tables with policies for individual and group accounts.
   - Run Prisma migrations against the Lovable-provided Postgres instance via connection strings stored in secrets.
2. **Auth Providers**
   - Configure Lovable/Supabase Auth for email, Google Workspace, and Microsoft accounts to support organizational onboarding.
   - Map Supabase roles to application roles (`member`, `premium_member`, `group_admin`).
3. **Stripe Webhooks**
   - Deploy a Lovable Edge Function to handle `checkout.session.completed`, `invoice.paid`, and `customer.subscription.updated` events.
   - Update Supabase profiles with membership tier flags and renewal dates.
4. **Observability**
   - Enable Lovable log drains and set up alerting around failed webhooks, auth errors, and RLS violations.
5. **Fallback Prep**
   - Mirror environment variables in Vercel and keep DNS records documented for rapid host switching.

## Summary of Upgrades
- Modernize architecture by separating repos and unifying backend services on Lovable Cloud.
- Deliver a cohesive UI with Lovable’s branding, streamlined layout, and shadcn/ui components.
- Expand membership capabilities with group accounts and premium tiers powered by Stripe.
- Leverage Lovable Cloud for resilient, scalable hosting while preserving Vercel as a fallback deployment target.

## References
- [GOAT Alliance README](../README.md)
- Lovable.dev Universal Upgrade Plan (internal PDF)
- Supabase/Lovable Cloud launch announcement (2025-09-29) [Internal-only, not publicly available]
