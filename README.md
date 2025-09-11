# GOAT Alliance

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fexecutiveusa%2Fgoatalliance&env=VERCEL_TOKEN&envDescription=Vercel%20deployment%20token&envLink=https%3A%2F%2Fvercel.com%2Fdocs%2Fconcepts%2Fprojects%2Fenvironment-variables)

## Network of Vetted Professionals

GOAT Alliance is a platform connecting top-tier professionals in a trusted network. The platform consists of a Next.js frontend optimized for Vercel deployment and an Encore.ts backend.

## 🚀 One-Click Deployment

This project is configured for **one-click deployment** to Vercel:

1. Click the "Deploy with Vercel" button above
2. The Vercel token is pre-configured: `EjBjbF7mtHNgV6KXh7lTpLsL`
3. Your frontend will be automatically deployed and configured

## 🏗️ Project Structure

```
goatalliance/
├── frontend/          # Next.js frontend application
│   ├── src/app/       # App router pages
│   ├── .env*          # Environment configurations
│   └── package.json
├── backend/           # Encore.ts backend API
│   ├── api.ts         # API endpoints
│   ├── encore.app     # Encore configuration
│   └── package.json
├── vercel.json        # Vercel deployment configuration
└── .env*              # Project environment variables
```

## 🔧 Development

### Frontend (Next.js)
```bash
cd frontend
npm install
npm run dev
```

### Backend (Encore.ts)
```bash
cd backend
npm install
npm run dev
```

## 🌐 Environment Variables

The project includes pre-configured environment variables:

- **VERCEL_TOKEN**: `EjBjbF7mtHNgV6KXh7lTpLsL` (configured for deployment)
- **NEXT_PUBLIC_API_URL**: Backend API endpoint
- **NEXT_PUBLIC_APP_NAME**: Application name
- **NEXT_PUBLIC_APP_DESCRIPTION**: Application description

## 📡 API Endpoints

The Encore.ts backend provides these endpoints:

- `GET /health` - Health check
- `GET /alliance/info` - Get alliance information
- `POST /ping` - Connectivity test

## 🚢 Deployment

### Frontend to Vercel
The frontend is optimized for Vercel deployment with:
- Automatic builds via `vercel.json` configuration
- Environment variable management
- Next.js 13+ App Router support
- TypeScript support

### Backend to Encore Cloud
The backend follows Encore.ts protocols:
- Service-based architecture
- Type-safe API endpoints
- Built-in request validation
- Cloud-native deployment ready

## 🔐 Security

- Environment variables are properly configured
- CORS settings for frontend-backend communication
- Type-safe API contracts
- Production-ready configurations
