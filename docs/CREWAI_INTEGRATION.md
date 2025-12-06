# CrewAI Integration Guide

## Overview

This document outlines the planned integration of CrewAI as the multi-agent backend for the Goat Alliance dashboard. **Note: This is currently a placeholder structure. Full implementation requires a separate Python service.**

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                  Goat Alliance Dashboard                │
│                    (Next.js + React)                    │
└───────────────────┬─────────────────────────────────────┘
                    │
                    │ HTTP/REST API
                    │
┌───────────────────▼─────────────────────────────────────┐
│                CrewAI Backend Service                   │
│                  (Python/FastAPI)                       │
│                                                          │
│  ┌──────────────────────────────────────────────────┐  │
│  │              Crew Definitions                    │  │
│  │  • LeadIntakeCrew                               │  │
│  │  • EstimationCrew                               │  │
│  │  • SchedulerCrew                                │  │
│  │  • FollowupCrew                                 │  │
│  │  • OpsCrew                                      │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

## Planned Crews

### 1. LeadIntakeCrew
**Purpose**: Automated lead qualification and initial response

**Agents**:
- `IntakeLLM` - Processes incoming lead information
- `DataValidator` - Validates contact information and service details
- `ComplianceChecker` - Ensures regional compliance requirements

**Tools**:
- Directory lookup
- Phone/email validators
- CRM writer
- SMS/Email sender

**Trigger**: New lead submission via website form or API

**Output**: Qualified lead with initial contact sent

### 2. EstimationCrew
**Purpose**: Generate accurate job estimates based on scope

**Agents**:
- `ScopeInterpreter` - Analyzes job requirements
- `Estimator` - Calculates materials and labor costs
- `RiskAssessor` - Identifies potential job complications

**Tools**:
- Historical pricing database
- Material cost API
- Weather service integration
- Regional pricing adjustments

**Trigger**: Lead converted to estimate request

**Output**: Detailed estimate document with breakdown

### 3. SchedulerCrew
**Purpose**: Optimize job scheduling considering crew availability and weather

**Agents**:
- `CalendarOptimizer` - Finds optimal time slots
- `WeatherPlanner` - Checks weather forecasts
- `CrewUtilization` - Balances crew workload

**Tools**:
- Calendar API
- Weather API (Northwest-specific)
- Crew availability database
- Route optimization

**Trigger**: Job booking request

**Output**: Scheduled job with crew assignment and time slot

### 4. FollowupCrew
**Purpose**: Automated customer follow-up and review requests

**Agents**:
- `OutreachWriter` - Generates personalized messages
- `SMSManager` - Handles text message campaigns
- `ReviewRequestor` - Requests reviews post-job

**Tools**:
- SMS gateway
- Email service
- Review platform APIs
- Template library

**Trigger**: Job completion or time-based triggers

**Output**: Automated follow-up messages and review requests

### 5. OpsCrew
**Purpose**: Operational insights and anomaly detection

**Agents**:
- `MetricsSummarizer` - Aggregates performance data
- `AnomalyDetector` - Identifies unusual patterns
- `InsightGenerator` - Produces actionable recommendations

**Tools**:
- Analytics database
- Statistical analysis libraries
- Reporting engine

**Trigger**: Daily/weekly schedule or on-demand

**Output**: AI Insights displayed in dashboard

## API Endpoints (Planned)

### CrewAI Service Endpoints

```typescript
// Run a specific crew
POST /api/crewai/run
{
  "crewName": "LeadIntakeCrew",
  "payload": {
    "leadId": "123",
    "name": "John Doe",
    "service": "roofing",
    "location": "Seattle, WA"
  }
}

// Get crew status
GET /api/crewai/status/:crewName/:executionId

// List all available crews
GET /api/crewai/crews

// Get crew configuration
GET /api/crewai/config/:crewName

// Update crew configuration
PUT /api/crewai/config/:crewName
{
  "maxTokens": 1000,
  "temperature": 0.7,
  "allowedActions": ["send_email", "update_crm"]
}
```

### Dashboard Integration Endpoints

```typescript
// In Next.js app/api/agents/
POST /api/agents/triage-lead
POST /api/agents/generate-estimate
POST /api/agents/schedule-job
POST /api/agents/follow-up
GET /api/agents/insights
```

## Guardrails

### Per-Crew Limits
- Max tokens per execution
- Allowed operations (read-only vs. write)
- Cost limits per job
- Rate limiting

### Example Configuration
```yaml
LeadIntakeCrew:
  maxTokensPerExecution: 5000
  allowedOperations:
    - read_lead
    - send_email
    - send_sms
    - update_crm
  deniedOperations:
    - delete_data
    - modify_pricing
  costLimit: $0.50
  rateLimit: 100/hour
```

## Data Flow

### Lead Intake Example
1. Customer submits form on website
2. Next.js API route receives submission
3. API calls CrewAI service: `POST /api/crewai/run` with LeadIntakeCrew
4. LeadIntakeCrew processes:
   - Validates contact information
   - Checks service availability in region
   - Drafts initial response email
   - Updates CRM with new lead
5. CrewAI returns result with lead ID and status
6. Dashboard updates UI showing new lead
7. Optional: AI sends first contact within 1 minute

## Implementation Checklist

- [ ] Set up Python/FastAPI service for CrewAI
- [ ] Define crew configurations in YAML/JSON
- [ ] Implement API endpoints in FastAPI
- [ ] Create Docker container for CrewAI service
- [ ] Set up authentication between Next.js and CrewAI service
- [ ] Implement guardrails and rate limiting
- [ ] Add monitoring and logging
- [ ] Create crew configuration UI in dashboard
- [ ] Wire dashboard actions to CrewAI endpoints
- [ ] Add error handling and fallback behavior
- [ ] Implement cost tracking and budgets
- [ ] Set up alerts for crew failures
- [ ] Create admin interface for crew management
- [ ] Document crew behavior and outputs
- [ ] Add integration tests

## Environment Variables

```env
# CrewAI Service
CREWAI_SERVICE_URL=http://localhost:8000
CREWAI_API_KEY=your-secret-key

# OpenAI (for CrewAI agents)
OPENAI_API_KEY=sk-...

# Regional Services
WEATHER_API_KEY=...
SMS_API_KEY=...
```

## Current Status

**Status**: Placeholder structure created. Full implementation pending.

**What's Implemented**:
- Dashboard UI for AI Agents section (navigation)
- AI Insights display panel
- Quick action for "Launch AI Triage"

**What's Needed**:
- Python CrewAI service implementation
- API endpoint development
- Agent and crew definitions
- Tool integrations (SMS, email, calendar, etc.)
- Authentication and security
- Monitoring and observability

## Resources

- [CrewAI Documentation](https://docs.crewai.com/)
- [CrewAI GitHub](https://github.com/joaomdmoura/crewAI)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)

## Development Timeline Estimate

- CrewAI Service Setup: 1-2 weeks
- Crew Implementation: 2-3 weeks per crew
- API Integration: 1-2 weeks
- Testing and Refinement: 2-3 weeks
- **Total**: 8-12 weeks for full implementation
