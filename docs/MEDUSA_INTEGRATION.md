# Medusa Store with Autonomous Sales Avatar Integration

## Overview

This integration adds a full-featured e-commerce store powered by Medusa.js with an autonomous sales avatar that acts as an intelligent sales assistant and concierge for visitors.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend (Vite/React)                    │
│  ┌──────────────────┐         ┌──────────────────┐         │
│  │  AvatarChat      │         │   BlogList       │         │
│  │  Component       │         │   Component      │         │
│  └────────┬─────────┘         └────────┬─────────┘         │
└───────────┼────────────────────────────┼───────────────────┘
            │                            │
            │ POST /store/ai/chat        │ GET /store/blog/posts
            │                            │
┌───────────▼────────────────────────────▼───────────────────┐
│              Medusa Backend (/backend/medusa)               │
│  ┌────────────────────────────────────────────────────┐    │
│  │  Blog Module                                       │    │
│  │  • BlogPost & BlogTag entities                    │    │
│  │  • Storefront routes (/store/blog/*)              │    │
│  │  • Admin routes (/admin/blog/*)                   │    │
│  └────────────────────────────────────────────────────┘    │
│  ┌────────────────────────────────────────────────────┐    │
│  │  Avatar Gateway Service                            │    │
│  │  • AvatarGatewayService                           │    │
│  │  • /store/ai/chat endpoint                        │    │
│  │  • Product/Cart/Customer tools                    │    │
│  └───────────────────┬────────────────────────────────┘    │
└────────────────────┼─────────────────────────────────────┘
                     │
                     │ POST /storefront_chat
                     │ POST /daily_outbound
                     ▼
         ┌───────────────────────────┐
         │  External AI Service      │
         │  (CrewAI / Yappiverse)   │
         └───────────────────────────┘
```

## Components

### Backend (/backend/medusa)

#### Blog Module

**Entities:**
- `BlogPost`: Stores blog articles with markdown content, SEO fields, and publish status
- `BlogTag`: Categorizes blog posts with slugs and names

**Services:**
- `BlogService`: CRUD operations for posts and tags

**API Routes:**
- `GET /store/blog/posts` - List published posts (supports search, tag filter, pagination)
- `GET /store/blog/posts/:slug` - Get single published post
- `GET /store/blog/tags` - List all tags
- `POST /admin/blog/posts` - Create draft post (admin only)
- `PATCH /admin/blog/posts/:id` - Update post (admin only)
- `DELETE /admin/blog/posts/:id` - Delete post (admin only)

#### Avatar Gateway

**Service:**
- `AvatarGatewayService`: Handles chat requests, product queries, cart management, customer history

**API Routes:**
- `POST /store/ai/chat` - Main avatar chat endpoint

**Features:**
- Conversation continuity via conversation_id
- Fallback responses when external AI service unavailable
- Integration with Medusa's product, cart, and customer services
- Support for external avatar services (CrewAI, Yappiverse, etc.)

### Frontend (/frontend/src)

#### TypeScript Clients

**`lib/medusa-avatar.ts`:**
- `MedusaAvatarClient`: Type-safe client for avatar chat API
- `AvatarChatRequest/Response` interfaces
- Automatic device detection
- Conversation management

**`lib/medusa-blog.ts`:**
- `MedusaBlogClient`: Type-safe client for blog API
- `BlogPost/BlogTag` interfaces
- Search and filtering support

#### UI Components

**`components/AvatarChat.tsx`:**
- Full-featured chat widget with brand styling
- Floating button that toggles chat interface
- Message history with user/avatar distinction
- Loading states and error handling
- Brand colors: Charcoal (#3C494E), Keppel (#00B39F), Saffron (#EBC017)

**`components/BlogList.tsx`:**
- Displays blog posts with excerpts
- Tag filtering
- Click-to-read-more functionality
- Loading and error states
- Brand-styled cards

## Setup Instructions

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- Redis (for caching and events)
- (Optional) External AI service URL and API key

### 1. Backend Setup

```bash
cd backend/medusa

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Edit .env with your database and Redis URLs
# DATABASE_URL=postgresql://user:password@localhost:5432/medusa_store
# REDIS_URL=redis://localhost:6379

# Generate Medusa configuration
# JWT_SECRET and COOKIE_SECRET should be random secure strings

# Run migrations
npm run migrate

# Start development server
npm run dev
```

The Medusa admin will be available at `http://localhost:9000/app`
The storefront API will be at `http://localhost:9000/store`

### 2. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create .env file
echo "VITE_MEDUSA_URL=http://localhost:9000" > .env

# Start development server
npm run dev
```

The frontend will be available at `http://localhost:5173`

### 3. Seed Blog Content

Create initial blog posts via the admin API or Medusa admin interface.

Example using curl:

```bash
# Create a tag
curl -X POST http://localhost:9000/admin/blog/posts \
  -H "Content-Type: application/json" \
  -d '{
    "slug": "first-post",
    "title": "Welcome to Our Blog",
    "body_markdown": "# Welcome\n\nThis is our first post!",
    "status": "published",
    "published_at": "2024-12-01T00:00:00Z"
  }'
```

## Configuration

### Environment Variables

**Backend (.env):**
```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/medusa_store

# Redis
REDIS_URL=redis://localhost:6379

# Secrets (generate random strings)
JWT_SECRET=your-jwt-secret
COOKIE_SECRET=your-cookie-secret

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

**Frontend (.env):**
```env
VITE_MEDUSA_URL=http://localhost:9000
```

### Customization

#### Brand Styling

The avatar chat widget uses the following brand colors from the existing design system:
- **Charcoal**: `#3C494E` - Primary background and header
- **Keppel**: `#00B39F` - Primary accent (buttons, links)
- **Saffron**: `#EBC017` - Secondary accent (avatar icon)

To customize, edit the color values in:
- `/frontend/src/components/AvatarChat.tsx`
- `/frontend/src/components/BlogList.tsx`

#### Avatar Behavior

To customize avatar responses, edit:
- `/backend/medusa/src/services/avatar-gateway.ts` (fallback responses)

For production, connect an external AI service by setting `AVATAR_SERVICE_URL` and `AVATAR_API_KEY`.

## Usage

### Integrating the Avatar Widget

Add the avatar chat widget to any page:

```tsx
import { AvatarChat } from './components/AvatarChat';

function App() {
  return (
    <div>
      {/* Your page content */}
      
      <AvatarChat
        medusaUrl="http://localhost:9000"
        avatarId="goat-alliance-avatar"
        regionId="us"
        customerId={currentUser?.id}
        customerEmail={currentUser?.email}
        cartId={currentCart?.id}
        onCartUpdate={(cartId) => {
          // Handle cart updates
          console.log('Cart updated:', cartId);
        }}
      />
    </div>
  );
}
```

### Displaying Blog Posts

```tsx
import { BlogList } from './components/BlogList';

function BlogPage() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8">Our Blog</h1>
      
      <BlogList
        medusaUrl="http://localhost:9000"
        limit={10}
        onPostClick={(slug) => {
          // Navigate to post detail
          window.location.href = `/blog/${slug}`;
        }}
      />
    </div>
  );
}
```

## API Examples

### Chat with Avatar

```typescript
import { createAvatarClient } from './lib/medusa-avatar';

const client = createAvatarClient({
  medusaUrl: 'http://localhost:9000',
  avatarId: 'goat-alliance-avatar',
});

const response = await client.sendMessage(
  "I'm looking for roofing services in Seattle",
  {
    customerId: 'cust_123',
    cartId: 'cart_456',
  }
);

console.log(response.avatar_reply.reply_text);
// "I'd be happy to help you find roofing services! ..."
```

### Fetch Blog Posts

```typescript
import { createBlogClient } from './lib/medusa-blog';

const client = createBlogClient('http://localhost:9000');

// List posts
const { posts, count } = await client.listPosts({
  q: 'roofing',
  tag: 'contractor-tips',
  limit: 10,
});

// Get single post
const post = await client.getPostBySlug('how-to-win-more-contracts');
```

## Production Deployment

### Database

Use a managed PostgreSQL instance:
- Heroku Postgres
- AWS RDS
- Supabase Postgres
- DigitalOcean Managed Databases

### Redis

Use a managed Redis instance:
- Heroku Redis
- AWS ElastiCache
- Redis Labs
- Upstash

### Medusa Backend

Deploy to:
- Railway (recommended for Medusa)
- Heroku
- DigitalOcean App Platform
- Any Node.js hosting with PostgreSQL + Redis

Set production environment variables and run:
```bash
npm run build
npm run start
```

### Frontend

Deploy to:
- Vercel
- Netlify
- Cloudflare Pages

Build command: `npm run build`
Output directory: `dist`

### External AI Service

For production avatar intelligence, deploy:
- CrewAI agents on a Python server
- Custom LangChain/LlamaIndex application
- Yappiverse or similar avatar service

Configure `AVATAR_SERVICE_URL` and `AVATAR_API_KEY` in Medusa backend.

## Development Roadmap

### Phase 1 (Complete)
- [x] Medusa backend structure
- [x] Blog module entities and services
- [x] Blog API routes (storefront + admin)
- [x] Avatar gateway service
- [x] Avatar chat API endpoint
- [x] TypeScript clients
- [x] Avatar chat widget component
- [x] Blog list component

### Phase 2 (Future)
- [ ] Product browsing UI
- [ ] Cart management UI
- [ ] Checkout flow integration
- [ ] Customer account pages
- [ ] Blog post detail page with markdown rendering
- [ ] Admin UI for blog management
- [ ] CrewAI agent implementation
- [ ] Scheduled daily outbound campaigns
- [ ] Email/SMS integration for outreach

### Phase 3 (Future)
- [ ] Advanced product recommendations
- [ ] Customer segmentation
- [ ] A/B testing for avatar responses
- [ ] Analytics dashboard
- [ ] Multi-language support
- [ ] Voice interface for avatar

## Troubleshooting

### Build Issues

**TypeScript errors:**
```bash
# Regenerate TypeScript declarations
cd backend/medusa
npm run typecheck
```

**Missing dependencies:**
```bash
cd backend/medusa
npm install --legacy-peer-deps
```

### Runtime Issues

**Database connection:**
- Verify `DATABASE_URL` is correct
- Ensure PostgreSQL is running
- Check network access and firewall rules

**Redis connection:**
- Verify `REDIS_URL` is correct
- Ensure Redis is running
- Test with `redis-cli ping`

**CORS errors:**
- Update `STORE_CORS` in medusa-config.js
- Restart Medusa backend after changes

### Avatar Not Responding

1. Check browser console for errors
2. Verify Medusa backend is running on port 9000
3. Test `/store/ai/chat` endpoint directly:
   ```bash
   curl -X POST http://localhost:9000/store/ai/chat \
     -H "Content-Type: application/json" \
     -d '{
       "conversation_id": null,
       "message": "Hello",
       "avatar_id": "test"
     }'
   ```

## Support

For questions or issues:
1. Check the [Medusa documentation](https://docs.medusajs.com/)
2. Review the implementation in `/backend/medusa` and `/frontend/src`
3. Open an issue in the repository

## License

See the main repository LICENSE file.
