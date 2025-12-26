# GOAT Alliance Medusa Store

E-commerce backend powered by Medusa.js with blog module and autonomous sales avatar integration.

## Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Redis server

### Installation

```bash
# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your database and Redis URLs

# Run migrations
npm run migrate

# Start development server
npm run dev
```

Medusa will be available at:
- Admin: http://localhost:9000/app
- Storefront API: http://localhost:9000/store

## Features

### Blog Module

Full-featured blog with:
- Markdown content support
- Tags and categorization
- SEO fields (title, description)
- Draft/Published/Archived status
- Storefront and admin APIs

**Endpoints:**
- `GET /store/blog/posts` - List published posts
- `GET /store/blog/posts/:slug` - Get single post
- `GET /store/blog/tags` - List tags
- `POST /admin/blog/posts` - Create post (admin)
- `PATCH /admin/blog/posts/:id` - Update post (admin)
- `DELETE /admin/blog/posts/:id` - Delete post (admin)

### Autonomous Sales Avatar

Intelligent chat interface for customers:
- Natural conversation handling
- Product recommendations
- Cart management
- Customer history awareness
- Fallback responses when AI service unavailable

**Endpoint:**
- `POST /store/ai/chat` - Avatar chat interface

### Standard Medusa Features

- Product catalog
- Cart and checkout
- Order management
- Customer accounts
- Admin dashboard
- Stripe payment integration (optional)

## Project Structure

```
backend/medusa/
├── src/
│   ├── api/                 # HTTP endpoints
│   │   ├── admin/          # Admin routes
│   │   │   └── blog/       # Blog admin API
│   │   └── store/          # Storefront routes
│   │       ├── ai/         # Avatar chat
│   │       └── blog/       # Blog storefront API
│   ├── models/             # Database entities
│   │   ├── blog-post.ts    # BlogPost entity
│   │   └── blog-tag.ts     # BlogTag entity
│   ├── repositories/       # Data access
│   │   ├── blog-post.ts
│   │   └── blog-tag.ts
│   ├── services/           # Business logic
│   │   ├── blog.ts         # Blog CRUD service
│   │   └── avatar-gateway.ts  # Avatar integration
│   ├── migrations/         # Database migrations
│   └── subscribers/        # Event handlers
│       └── daily-outbound.ts  # Scheduled campaigns
├── data/                   # Seed data
├── medusa-config.js        # Medusa configuration
├── package.json
└── tsconfig.json
```

## Configuration

### Environment Variables

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/medusa_store

# Redis
REDIS_URL=redis://localhost:6379

# Secrets (generate secure random strings for production)
JWT_SECRET=your-jwt-secret-here
COOKIE_SECRET=your-cookie-secret-here

# CORS
STORE_CORS=http://localhost:3000,http://localhost:5173
ADMIN_CORS=http://localhost:7001

# External AI Service (optional)
AVATAR_SERVICE_URL=https://your-ai-service.com
AVATAR_API_KEY=your-api-key

# Stripe (optional)
STRIPE_API_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### Database Setup

**Using PostgreSQL locally:**
```bash
# Create database
createdb medusa_store

# Run migrations
npm run migrate
```

**Using managed PostgreSQL:**
Set `DATABASE_URL` to your managed database connection string.

### Redis Setup

**Using Redis locally:**
```bash
# Start Redis
redis-server

# Verify it's running
redis-cli ping  # Should return PONG
```

**Using managed Redis:**
Set `REDIS_URL` to your managed Redis connection string.

## Development

### Running the Server

```bash
# Development mode with hot reload
npm run dev

# Production build
npm run build

# Production server
npm run start
```

### Type Checking

```bash
npm run typecheck
```

### Database Migrations

```bash
# Run migrations
npm run migrate

# Generate new migration (after model changes)
npx medusa migrations generate CreateNewFeature
```

## API Usage

### Blog API Examples

**List posts:**
```bash
curl "http://localhost:9000/store/blog/posts?limit=10&offset=0"
```

**Get single post:**
```bash
curl "http://localhost:9000/store/blog/posts/your-post-slug"
```

**Create post (admin):**
```bash
curl -X POST "http://localhost:9000/admin/blog/posts" \
  -H "Content-Type: application/json" \
  -d '{
    "slug": "my-first-post",
    "title": "My First Post",
    "body_markdown": "# Hello World\n\nThis is my first post!",
    "status": "published",
    "published_at": "2024-12-01T00:00:00Z"
  }'
```

### Avatar Chat API Example

```bash
curl -X POST "http://localhost:9000/store/ai/chat" \
  -H "Content-Type: application/json" \
  -d '{
    "conversation_id": null,
    "message": "I need roofing services in Seattle",
    "avatar_id": "goat-alliance-avatar",
    "customer": {
      "email": "customer@example.com",
      "region_id": "us"
    },
    "client_view": {
      "page": "/",
      "url": "http://localhost:3000/",
      "device": "desktop"
    }
  }'
```

Response:
```json
{
  "conversation_id": "conv_1234567890_abc123",
  "avatar_reply": {
    "reply_text": "I'd be happy to help you find roofing services! Can you tell me more about what you need?",
    "emotion": "curious",
    "animation_key": null,
    "speech_hint": "normal"
  },
  "cart_delta": {
    "action": "none",
    "cart_id": null,
    "summary": null
  },
  "suggested_actions": []
}
```

## External AI Service Integration

The avatar gateway can connect to external AI services for intelligent responses.

### Expected API Contract

Your AI service should implement:

**POST /storefront_chat**
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

Response should match the avatar chat response format shown above.

### Connecting Your Service

1. Deploy your AI service (CrewAI, custom LangChain, etc.)
2. Set environment variables:
   ```env
   AVATAR_SERVICE_URL=https://your-service.com
   AVATAR_API_KEY=your-secret-key
   ```
3. Restart Medusa backend

The avatar gateway will automatically forward requests to your service.

## Deployment

### Railway

Railway is recommended for Medusa deployment:

1. Create PostgreSQL and Redis add-ons
2. Set environment variables
3. Deploy from GitHub repository
4. Run migrations: `npm run migrate`

### Heroku

```bash
# Add PostgreSQL and Redis
heroku addons:create heroku-postgresql:mini
heroku addons:create heroku-redis:mini

# Set environment variables
heroku config:set JWT_SECRET=$(openssl rand -base64 32)
heroku config:set COOKIE_SECRET=$(openssl rand -base64 32)

# Deploy
git push heroku main

# Run migrations
heroku run npm run migrate
```

### DigitalOcean App Platform

1. Create PostgreSQL and Redis databases
2. Create App from GitHub repository
3. Set environment variables in App settings
4. Add run command: `npm run migrate && npm run start`

## Troubleshooting

### Database Connection Errors

- Verify `DATABASE_URL` format: `postgresql://user:password@host:port/database`
- Check PostgreSQL is running: `pg_isready`
- Verify network access to database

### Redis Connection Errors

- Verify `REDIS_URL` format: `redis://host:port`
- Check Redis is running: `redis-cli ping`
- Verify network access to Redis

### CORS Errors

Update `STORE_CORS` and `ADMIN_CORS` in `medusa-config.js` to include your frontend URLs.

### TypeScript Errors

```bash
# Clean and rebuild
rm -rf dist
npm run build
```

## Additional Resources

- [Medusa Documentation](https://docs.medusajs.com/)
- [Main Integration Guide](../../docs/MEDUSA_INTEGRATION.md)
- [Blog Module Source](./src/models/blog-post.ts)
- [Avatar Gateway Source](./src/services/avatar-gateway.ts)

## License

See the main repository LICENSE file.
