# G.O.A.T. ALLIANCE - GitHub Copilot Instructions

**ALWAYS follow these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.**

G.O.A.T. Alliance is a production-ready Next.js 15 + TypeScript SaaS platform connecting clients with vetted professionals through a comprehensive directory system, premium contractor features, and subscription-based services.

## Working Effectively

### Bootstrap and Setup
Run these commands in order to set up the development environment:

1. **Install dependencies:**
   ```bash
   npm install
   ```
   - Takes ~30-40 seconds
   - No network restrictions, all dependencies install cleanly

2. **Database setup:**
   ```bash
   npm run db:push
   npm run db:seed
   ```
   - **IMPORTANT**: Database commands may fail in restricted environments due to Prisma binary download limitations
   - If Prisma commands fail with "ENOTFOUND binaries.prisma.sh", document this limitation and continue with other validations
   - Uses SQLite database (not PostgreSQL as mentioned in some docs)

### Build and Development

3. **Build the application:**
   ```bash
   npm run build
   ```
   - **NEVER CANCEL**: Build takes 15-25 seconds. ALWAYS wait for completion.
   - Set timeout to 60+ seconds minimum
   - Uses Next.js 15 with Turbopack for fast builds
   - Build succeeds even without database connection

4. **Run development server:**
   ```bash
   npm run dev
   ```
   - Starts in ~1 second using Turbopack
   - Runs on http://localhost:3000
   - **NEVER CANCEL**: Let it start completely before testing

5. **Run production server:**
   ```bash
   npm run start
   ```
   - Requires successful build first
   - May fail without proper database setup, this is expected in development

### Code Quality and Validation

6. **Run linting:**
   ```bash
   npm run lint
   ```
   - Takes ~2-3 seconds
   - **ALWAYS run before committing** - CI will fail otherwise
   - Uses ESLint with Next.js and TypeScript rules
   - Must pass with zero errors

## Validation Requirements

**ALWAYS manually validate any changes by:**

1. **Run complete build process:**
   ```bash
   npm install && npm run build && npm run lint
   ```

2. **Test application functionality:**
   - Start dev server: `npm run dev`
   - Navigate to http://localhost:3000
   - Test homepage load
   - Test directory page navigation (/directory)
   - Test blog page navigation (/blog)
   - Verify professional listings display correctly

3. **End-to-end scenarios to test:**
   - Homepage loads with hero section and features
   - Directory page shows professional categories and featured contractors
   - Blog page displays articles with proper formatting
   - Navigation between pages works correctly
   - Responsive design functions on different screen sizes

## Project Structure and Key Files

### Core Directories:
```
├── app/                 # Next.js App Router
│   ├── (auth)/         # Authentication pages (Sign In/Up)
│   ├── (marketing)/    # Public pages (Blog, Pricing)
│   ├── admin/          # Admin dashboard
│   ├── contractor/     # Contractor premium pages
│   ├── directory/      # Professional listings
│   └── api/            # API routes
├── components/         # 5+ reusable UI components
├── lib/                # Utilities (db.ts, blog.ts, utils.ts)
├── prisma/             # Database schema and seed
├── content/            # Blog markdown files
├── public/             # Static assets
└── types/              # TypeScript definitions
```

### Key Files to Know:
- **package.json**: Contains all npm scripts and dependencies
- **prisma/schema.prisma**: Complete database schema with User, Contractor, Category, Review, Subscription models
- **lib/db.ts**: Prisma client setup
- **lib/blog.ts**: Blog content processing with markdown support
- **app/layout.tsx**: Root layout with authentication and global providers
- **app/page.tsx**: Homepage with hero and features sections

### Technology Stack:
- **Framework**: Next.js 15 with TypeScript and App Router
- **Styling**: Tailwind CSS + shadcn/ui components
- **Database**: Prisma + SQLite (local development)
- **Authentication**: NextAuth.js
- **Payments**: Stripe (subscriptions & one-time)
- **Content**: Markdown with gray-matter for blog posts

## Common Issues and Solutions

### Database Issues:
- **Prisma binary download fails**: Expected in restricted environments, document and continue
- **Database not found**: Run `npm run db:push` first to create tables
- **Seed fails**: Create prisma/seed.ts if missing (already included in repo)

### Build Issues:
- **TypeScript errors**: Always fix linting errors before proceeding
- **Missing dependencies**: Run `npm install` if node_modules is missing
- **Port conflicts**: Use different port with `npm run dev -- -p 3001`

### Development Workflow:
- **Always run lint**: `npm run lint` before committing changes
- **Test builds locally**: `npm run build` before pushing
- **Validate manually**: Test actual user scenarios, not just builds

## Environment Variables

The application requires these environment variables for full functionality:
```bash
# Database (SQLite file path)
DATABASE_URL="file:./dev.db"

# Authentication
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# Stripe (for payments)
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."

# Optional: OAuth providers
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
```

**Note**: Application works without environment variables for basic functionality.

## Additional Commands

### Database Management:
```bash
npm run db:generate  # Generate Prisma client
npm run db:studio    # Open Prisma Studio (database GUI)
```

### Stripe Integration:
```bash
npm run stripe:listen  # Listen for webhooks in development
```

## Important Notes

- **NEVER CANCEL long-running commands** - Always wait for completion
- **Always test manually** - Build success doesn't guarantee functionality
- **Use Turbopack** - Already configured for faster builds and development
- **Lint before commit** - CI pipeline will fail on linting errors
- **Database is optional** - App runs without full database setup for UI testing
- **Screenshots recommended** - Take screenshots when validating UI changes

## Quick Reference

### Most Used Commands:
```bash
npm install           # 30-40 seconds
npm run dev          # 1 second startup
npm run build        # 15-25 seconds, NEVER CANCEL
npm run lint         # 2-3 seconds, must pass
```

### Validation Checklist:
- [ ] Dependencies installed successfully
- [ ] Build completes without errors
- [ ] Linting passes with zero issues
- [ ] Dev server starts and responds
- [ ] Homepage loads correctly
- [ ] Directory page shows professionals
- [ ] Blog page displays articles
- [ ] Navigation works between pages