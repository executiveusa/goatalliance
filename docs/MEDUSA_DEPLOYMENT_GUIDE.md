# Medusa Store Deployment Guide

This guide walks you through deploying the GOAT Alliance Medusa e-commerce backend with autonomous sales avatar.

## Prerequisites

Before deployment, ensure you have:

- [ ] PostgreSQL database (managed service recommended)
- [ ] Redis server (managed service recommended)
- [ ] Node.js 18+ compatible hosting
- [ ] (Optional) External AI service for intelligent avatar responses

## Quick Start Options

### Option 1: Railway (Recommended)

Railway provides the easiest path with built-in PostgreSQL and Redis.

#### Step 1: Create Railway Project

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Initialize in backend/medusa directory
cd backend/medusa
railway init
```

#### Step 2: Add Services

In Railway dashboard:
1. Click "New Service" → PostgreSQL
2. Click "New Service" → Redis
3. Both will auto-configure connection strings

#### Step 3: Configure Environment

Railway will auto-inject `DATABASE_URL` and `REDIS_URL`. Add these:

```env
JWT_SECRET=<generate-random-32-chars>
COOKIE_SECRET=<generate-random-32-chars>
STORE_CORS=https://yourfrontend.com
ADMIN_CORS=https://admin.yourfrontend.com
NODE_ENV=production
```

Generate secrets:
```bash
openssl rand -base64 32
```

#### Step 4: Deploy

```bash
# From backend/medusa
railway up

# Run migrations (one-time)
railway run npm run migrate
```

Your Medusa backend will be live at `https://your-app.up.railway.app`

### Option 2: Heroku

#### Step 1: Create Heroku App

```bash
# Install Heroku CLI
brew install heroku/brew/heroku  # macOS
# or download from heroku.com/downloads

# Login
heroku login

# Create app
cd backend/medusa
heroku create goat-alliance-store
```

#### Step 2: Add Add-ons

```bash
# PostgreSQL
heroku addons:create heroku-postgresql:mini

# Redis
heroku addons:create heroku-redis:mini
```

#### Step 3: Configure Environment

```bash
heroku config:set JWT_SECRET=$(openssl rand -base64 32)
heroku config:set COOKIE_SECRET=$(openssl rand -base64 32)
heroku config:set STORE_CORS=https://yourfrontend.com
heroku config:set ADMIN_CORS=https://admin.yourfrontend.com
heroku config:set NODE_ENV=production
```

#### Step 4: Deploy

```bash
# Deploy
git subtree push --prefix backend/medusa heroku main

# Or if you're in backend/medusa:
git push heroku main

# Run migrations
heroku run npm run migrate
```

### Option 3: DigitalOcean App Platform

#### Step 1: Create Databases

1. Create PostgreSQL database in DigitalOcean
2. Create Redis database in DigitalOcean
3. Note connection strings

#### Step 2: Create App

1. Go to Apps → Create App
2. Connect GitHub repository
3. Select `backend/medusa` as source directory
4. Choose Node.js environment

#### Step 3: Configure

Add environment variables:
- `DATABASE_URL`: PostgreSQL connection string
- `REDIS_URL`: Redis connection string
- `JWT_SECRET`: Random 32-char string
- `COOKIE_SECRET`: Random 32-char string
- `STORE_CORS`: Frontend URL
- `ADMIN_CORS`: Admin frontend URL
- `NODE_ENV`: production

Build command: `npm install && npm run build`
Run command: `npm run migrate && npm run start`

#### Step 4: Deploy

Click "Deploy" and wait for build to complete.

## Environment Variable Reference

### Required

```env
# Database
DATABASE_URL=postgresql://user:password@host:port/database

# Redis
REDIS_URL=redis://host:port

# Security (generate random 32-character strings)
JWT_SECRET=your-random-jwt-secret
COOKIE_SECRET=your-random-cookie-secret

# CORS (comma-separated allowed origins)
STORE_CORS=https://yoursite.com,https://www.yoursite.com
ADMIN_CORS=https://admin.yoursite.com

# Environment
NODE_ENV=production
```

### Optional

```env
# External AI Service
AVATAR_SERVICE_URL=https://your-ai-service.com
AVATAR_API_KEY=your-secret-api-key

# OpenAI (if using OpenAI directly)
OPENAI_API_KEY=sk-...

# Stripe
STRIPE_API_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Email (for transactional emails)
SENDGRID_API_KEY=SG...
```

## Post-Deployment Steps

### 1. Run Database Migrations

**Railway:**
```bash
railway run npm run migrate
```

**Heroku:**
```bash
heroku run npm run migrate
```

**DigitalOcean:**
Use Console or SSH access

### 2. Access Medusa Admin

Navigate to `https://your-domain.com/app`

Default admin credentials are created during first access. Follow Medusa docs to set up admin user.

### 3. Verify API Endpoints

Test that the API is working:

```bash
# Health check
curl https://your-domain.com/health

# Blog posts
curl https://your-domain.com/store/blog/posts

# Avatar chat
curl -X POST https://your-domain.com/store/ai/chat \
  -H "Content-Type: application/json" \
  -d '{
    "conversation_id": null,
    "message": "Hello",
    "avatar_id": "goat-alliance"
  }'
```

### 4. Configure Frontend

Update frontend environment variables:

```env
VITE_MEDUSA_URL=https://your-medusa-domain.com
```

Redeploy frontend.

### 5. Set Up Stripe (Optional)

If using Stripe:
1. Add Stripe API keys to environment
2. Configure Stripe webhook endpoint: `https://your-domain.com/hooks/stripe`
3. Test with Stripe CLI:
   ```bash
   stripe listen --forward-to https://your-domain.com/hooks/stripe
   ```

### 6. Connect External AI Service (Optional)

If using CrewAI or similar:
1. Deploy AI service (see AI Service Deployment below)
2. Add `AVATAR_SERVICE_URL` and `AVATAR_API_KEY` to Medusa environment
3. Restart Medusa backend
4. Test avatar chat

## External AI Service Deployment

The avatar gateway can connect to any AI service that implements the contract.

### Expected API Contract

Your AI service should expose:

**POST /storefront_chat**

Request:
```json
{
  "conversation_id": "string | null",
  "message": "string",
  "customer": {
    "id": "string?",
    "email": "string?",
    "region_id": "string?"
  },
  "cart_id": "string?",
  "avatar_id": "string",
  "client_view": {
    "page": "string",
    "url": "string",
    "device": "desktop | mobile | tablet"
  }
}
```

Response:
```json
{
  "conversation_id": "string",
  "avatar_reply": {
    "reply_text": "string",
    "emotion": "neutral | happy | excited | curious | thinking | reassuring | apologetic",
    "animation_key": "string | null",
    "speech_hint": "short | normal | detailed"
  },
  "cart_delta": {
    "action": "none | created | updated",
    "cart_id": "string | null",
    "summary": {
      "line_items": [...],
      "total": number
    } | null
  },
  "suggested_actions": [...]
}
```

### Deploying CrewAI Service

If using CrewAI for intelligent responses:

1. Create Python FastAPI service
2. Implement `/storefront_chat` endpoint
3. Deploy to:
   - Railway (Python template)
   - Heroku (with Python buildpack)
   - Google Cloud Run
   - AWS Lambda + API Gateway

Example FastAPI structure:
```python
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class ChatRequest(BaseModel):
    conversation_id: str | None
    message: str
    avatar_id: str
    # ... other fields

@app.post("/storefront_chat")
async def handle_chat(request: ChatRequest):
    # Your CrewAI logic here
    return {
        "conversation_id": request.conversation_id or generate_id(),
        "avatar_reply": {
            "reply_text": "Response from AI",
            "emotion": "happy",
            "animation_key": None,
            "speech_hint": "normal"
        },
        # ... rest of response
    }
```

Deploy command (Railway):
```bash
railway up
```

Once deployed, update Medusa environment:
```env
AVATAR_SERVICE_URL=https://your-ai-service.railway.app
AVATAR_API_KEY=your-secret-key
```

## Monitoring and Maintenance

### Health Checks

Set up monitoring for:
- `GET /health` - Medusa backend health
- Database connection status
- Redis connection status

Recommended tools:
- **Uptime Robot**: Free tier for basic monitoring
- **Better Stack**: Advanced monitoring
- **Datadog**: Enterprise monitoring

### Logs

**Railway:**
```bash
railway logs
```

**Heroku:**
```bash
heroku logs --tail
```

**DigitalOcean:**
Use App Platform console

### Database Backups

**Railway:** Automatic backups included
**Heroku:** `heroku pg:backups:schedule` 
**DigitalOcean:** Enable automatic backups in console

### Scaling

**Railway:**
- Automatically scales based on load
- Upgrade plan for more resources

**Heroku:**
```bash
heroku ps:scale web=2
```

**DigitalOcean:**
- Adjust app resources in console
- Enable autoscaling

## Troubleshooting

### "Cannot connect to database"

1. Verify `DATABASE_URL` is correct
2. Check database is running
3. Verify network access/firewall rules
4. Test connection from deployment platform's console

### "Redis connection error"

1. Verify `REDIS_URL` is correct
2. Check Redis is running
3. Verify network access
4. Test with: `redis-cli -u $REDIS_URL ping`

### CORS errors

1. Update `STORE_CORS` to include your frontend domain
2. Ensure no trailing slashes
3. Restart backend after changes

### Migrations fail

1. Ensure database is accessible
2. Check for existing schema conflicts
3. Review migration files in `src/migrations/`
4. Manually connect to database and check tables

### Avatar not responding

1. Check Medusa backend logs for errors
2. Verify `/store/ai/chat` endpoint is accessible
3. Test with curl command above
4. If using external AI service, verify `AVATAR_SERVICE_URL` is reachable

## Cost Estimates

### Railway (Hobby Plan)
- **Medusa Backend**: $5/month
- **PostgreSQL**: $5/month
- **Redis**: $5/month
- **Total**: ~$15/month

### Heroku
- **Dyno (Hobby)**: $7/month
- **PostgreSQL (Mini)**: $5/month
- **Redis (Mini)**: $3/month
- **Total**: ~$15/month

### DigitalOcean
- **App**: $5-12/month
- **PostgreSQL**: $15/month
- **Redis**: $15/month
- **Total**: ~$35-42/month

### External AI Service
- **Railway Python**: $5/month
- **OpenAI API**: Pay-per-use (~$0.002/1K tokens)
- Estimated: $10-50/month depending on traffic

## Security Checklist

- [ ] Generated strong random JWT_SECRET and COOKIE_SECRET
- [ ] Enabled HTTPS on all domains
- [ ] Configured proper CORS origins (no wildcards in production)
- [ ] Database uses SSL/TLS connection
- [ ] Redis uses password authentication
- [ ] Stripe webhook signatures verified
- [ ] Rate limiting enabled (consider Cloudflare)
- [ ] Admin dashboard uses strong password
- [ ] API keys stored in environment variables, not code
- [ ] Database backups configured
- [ ] Monitoring and alerting set up

## Support

For deployment issues:
- **Medusa Docs**: https://docs.medusajs.com/
- **Railway Docs**: https://docs.railway.app/
- **Heroku Docs**: https://devcenter.heroku.com/
- **DigitalOcean Docs**: https://docs.digitalocean.com/

For GOAT Alliance specific questions:
- Check `docs/MEDUSA_INTEGRATION.md`
- Review `backend/medusa/README.md`
- Open an issue in the repository

## Next Steps

After successful deployment:

1. ✅ Backend deployed and accessible
2. ✅ Migrations run successfully
3. ✅ API endpoints responding
4. ⏭️ Add products via Medusa admin
5. ⏭️ Create blog posts
6. ⏭️ Configure Stripe for payments
7. ⏭️ Deploy external AI service
8. ⏭️ Update frontend with Medusa URL
9. ⏭️ Test avatar chat widget
10. ⏭️ Set up monitoring and backups

Congratulations! Your Medusa store is live! 🎉
