# Goat Alliance Admin Dashboard

## Overview

The Goat Alliance Admin Dashboard is a contractor-focused management interface designed specifically for Pacific Northwest service providers in roofing, painting, graffiti removal, and pressure washing.

## Features

### Dashboard Overview
- **Welcome, Earl**: Personalized greeting for the dashboard user
- **Real-time Stats**: 
  - Today's Jobs
  - New Leads (24h)
  - Open Estimates
  - Emergency Requests

### Navigation Sections

1. **Dashboard** - Overview and key metrics
2. **Jobs** - Manage roofing, painting, pressure washing, and graffiti removal jobs
3. **Leads** - Track and respond to new customer inquiries
4. **Network** - Directory of vetted contractors and partners
5. **AI Agents** - Control panel for AI-powered automation (placeholder for CrewAI integration)
6. **Communications** - Message and follow-up management
7. **Settings** - Dashboard configuration

### Quick Actions Sidebar
- Add Lead
- Book Job
- Launch AI Triage

### Today's Schedule
Shows all jobs scheduled for today with:
- Job type (Roofing, Painting, Graffiti Removal, Pressure Washing)
- Client name and address
- Crew assignment
- Status tracking
- Time slots

### Recent Leads
Real-time lead tracking with:
- Lead name and service requested
- Location (Pacific Northwest cities)
- Lead source (Website, Referral, LSA, etc.)
- Lead age (minutes/hours)
- Status (New, Contacted, Qualified)
- Urgency indicators

### AI Insights & Recommendations
AI-powered insights including:
- Hot ZIP codes with increased service demand
- Weather alerts affecting outdoor jobs
- Response time optimization metrics
- Crew utilization recommendations

### Service Type Quick Stats
Monthly performance tracking for:
- Roofing Jobs
- Painting Jobs
- Pressure Washing
- Graffiti Removal

### Guided Tour
Interactive walkthrough for first-time users explaining:
- Dashboard navigation
- Key features
- How to manage jobs and leads
- AI agent capabilities

## Access

Navigate to `/admin` to access the dashboard.

## Technology Stack

- **Framework**: Next.js 15 with React 19
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Deployment**: Railway (Project ID: 5cb1b605-4ea7-468c-861a-481d4b77d63d)

## Future Enhancements

### Planned Features (Out of Current Scope)
- Full CrewAI backend integration with Python service
- Real-time job tracking and GPS crew location
- Automated SMS/Email communications
- Weather API integration for automatic job rescheduling
- Live directory integration with partner network
- Complete agent orchestration system
- Mobile app integration
- Customer portal
- Advanced analytics and reporting
- Invoice and payment processing

## Development

### Local Setup
```bash
npm install
npm run dev
```

Navigate to `http://localhost:3000/admin`

### Build
```bash
npm run build
```

### Deploy to Railway
The project is configured for Railway deployment with the provided project ID. Ensure environment variables are set in Railway dashboard.

## Design Principles

The dashboard follows Steve Krug's "Don't Make Me Think" UX principles:
- Self-explanatory labels
- Scannable content with cards and clear headings
- Single dominant CTA per section
- Strong visual hierarchy
- Consistent spacing and typography
- Minimal cognitive load
- Clear status indicators with color coding

## Northwest Focus

The dashboard is optimized for Pacific Northwest contractors with:
- Regional location data (Seattle, Portland, Tacoma, Bellevue)
- Weather-aware scheduling considerations
- Service types common to the region (moss removal, rain damage, etc.)
- Emergency response tracking for urgent requests
- Seasonal service patterns
