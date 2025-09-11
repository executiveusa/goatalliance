# G.O.A.T. Alliance

Network of Vetted Professionals - Connect with the Greatest Of All Time contractors and service providers.

## Project Structure

This is a full-stack application with:

- **Frontend**: Next.js 14 with TypeScript, Tailwind CSS, deployed to Vercel
- **Backend**: Go service using Encore framework, deployed to Encore Cloud
- **E2E Testing**: Playwright for comprehensive end-to-end testing
- **CI/CD**: GitHub Actions with automated testing and deployment

## Features

### Landing Page
- Hero section with call-to-action buttons
- Featured contractor directory with ratings and contact information
- Responsive design for desktop, tablet, and mobile
- Accessibility compliance with proper ARIA labels and keyboard navigation

### Compliance Page
- Professional standards and verification process information
- Contact form for compliance inquiries

### Backend API
- Health check endpoint
- Contractor directory API
- Encore-based microservice architecture

## Development

### Prerequisites
- Node.js 18.x
- Go 1.21
- Yarn package manager

### Frontend Development
```bash
yarn install
yarn dev          # Start development server
yarn build        # Build for production
yarn test         # Run Jest tests
yarn lint         # Run ESLint
yarn type-check   # TypeScript checking
```

### Backend Development
```bash
cd backend
go test ./...     # Run Go tests
```

### E2E Testing
```bash
yarn playwright install --with-deps
yarn playwright test
```

## Deployment

### Frontend (Vercel)
Automatically deployed on push to main branch using Vercel GitHub integration.

Environment variables required:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` 
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

### Backend (Encore)
Automatically deployed on push to main branch using Encore CLI.

Environment variables required:
- `ENCORE_TOKEN`

## CI/CD Pipeline

The GitHub Actions workflow includes:
1. Frontend testing (lint, type-check, unit tests, build)
2. Backend testing (Go tests with PostgreSQL)
3. E2E testing (Playwright across multiple browsers)
4. Deployment to production (Vercel + Encore)
5. Discord notification on successful deployment

## Testing Strategy

- **Unit Tests**: Jest with React Testing Library for component testing
- **Integration Tests**: Go testing framework for backend API testing
- **E2E Tests**: Playwright covering user flows, accessibility, and performance
- **Type Safety**: TypeScript with strict configuration

## Performance & Accessibility

- Optimized Next.js build with static generation
- Responsive design with Tailwind CSS
- WCAG compliance with semantic HTML and ARIA labels
- Performance monitoring with Core Web Vitals
- Mobile-first responsive design
