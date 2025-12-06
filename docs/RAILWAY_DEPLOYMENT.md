# Railway Deployment Guide

## Project Information

- **Railway Project ID**: `5cb1b605-4ea7-468c-861a-481d4b77d63d`
- **Application**: Goat Alliance Admin Dashboard
- **Framework**: Next.js 15

## Prerequisites

1. Railway CLI installed (`npm i -g @railway/cli`)
2. Railway account with access to the project
3. Environment variables configured

## Environment Variables

Ensure the following environment variables are set in Railway:

### Required
```
DATABASE_URL=postgresql://...
NEXTAUTH_URL=https://your-domain.railway.app
NEXTAUTH_SECRET=your-secret-key
```

### Optional (for full functionality)
```
# Stripe
STRIPE_PUBLISHABLE_KEY=pk_...
STRIPE_SECRET_KEY=sk_...
STRIPE_WEBHOOK_SECRET=whsec_...

# OAuth (optional)
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...

# Printify (optional)
PRINTIFY_API_TOKEN=...
PRINTIFY_SHOP_ID=...

# Email (optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=...
SMTP_PASS=...
```

## Deployment Steps

### 1. Link to Railway Project

```bash
# Login to Railway
railway login

# Link to the specific project
railway link 5cb1b605-4ea7-468c-861a-481d4b77d63d
```

### 2. Deploy

```bash
# Deploy to Railway
railway up
```

Or push to the connected branch and Railway will auto-deploy.

### 3. Set Environment Variables

```bash
# Set environment variables via CLI
railway variables set NEXTAUTH_SECRET=your-secret

# Or use the Railway dashboard
railway open
```

### 4. Run Database Migrations

```bash
# Run Prisma migrations on Railway
railway run npx prisma migrate deploy

# Generate Prisma client
railway run npx prisma generate
```

## Build Configuration

The project uses the `railway.json` configuration file:

```json
{
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "npm install && npm run build"
  },
  "deploy": {
    "startCommand": "npm run start",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

## Post-Deployment

1. Verify the admin dashboard at `https://your-domain.railway.app/admin`
2. Check logs: `railway logs`
3. Monitor metrics in Railway dashboard

## Troubleshooting

### Build Failures
```bash
# Check build logs
railway logs --deployment

# Rebuild
railway up --detach
```

### Environment Variables Not Loading
- Verify variables are set in Railway dashboard
- Restart the service after adding new variables
- Check variable names match exactly (case-sensitive)

### Database Connection Issues
- Verify DATABASE_URL is set correctly
- Ensure Prisma migrations have been run
- Check database is provisioned and accessible

## Cost Optimization

The configuration includes:
- Restart policy with max retries to prevent runaway costs
- ON_FAILURE restart policy to avoid unnecessary restarts
- Optimized build process with caching

## Maintenance

### Viewing Logs
```bash
railway logs
```

### Restarting Service
```bash
railway restart
```

### Accessing Railway Dashboard
```bash
railway open
```

## Alternative Deployment (Coolify)

The application is also compatible with Coolify for self-hosted deployments. See `docs/COOLIFY_MIGRATION.md` for details.

## Support

For Railway-specific issues:
- Railway Documentation: https://docs.railway.app
- Railway Discord: https://discord.gg/railway

For application issues:
- Check project README.md
- Review application logs
- Contact development team
