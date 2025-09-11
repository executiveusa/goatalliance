# G.O.A.T. ALLIANCE

**NETWORK OF VETTED PROFESSIONALS**

A production-ready Next.js 15 + TypeScript SaaS platform connecting clients with vetted professionals through a comprehensive directory system, premium contractor features, and subscription-based services.

## Features

- 🚀 **Next.js 15** with TypeScript and App Router
- 🎨 **Modern UI** with Tailwind CSS and shadcn/ui components
- 🔐 **Authentication** with NextAuth.js
- 💾 **Database** with Prisma and PostgreSQL
- 💳 **Payments** with Stripe (subscriptions & one-time)
- 📱 **Responsive** design for all devices
- 🏢 **Professional Directory** with search and filtering
- 👑 **Premium Contractor** pages and features
- 📊 **Admin Dashboard** for management
- 📝 **Blog System** with Markdown CMS and SSR
- ⚡ **Performance** optimized with caching and SEO

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

3. **Set up the database:**
   ```bash
   npm run db:push
   npm run db:seed
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000)** with your browser.

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication pages
│   ├── (marketing)/       # Landing page, blog
│   ├── admin/             # Admin dashboard
│   ├── directory/         # Professional listings
│   ├── contractor/        # Contractor premium pages
│   └── api/               # API routes
├── components/            # Reusable UI components
├── lib/                   # Utilities, database, auth config
├── prisma/               # Database schema and migrations
├── content/              # Blog markdown files
├── public/               # Static assets
└── types/                # TypeScript type definitions
```

## Tech Stack

- **Framework:** Next.js 15 with TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **Database:** Prisma + PostgreSQL
- **Authentication:** NextAuth.js
- **Payments:** Stripe
- **Content:** Markdown with gray-matter
- **Deployment:** Vercel (recommended)

## Environment Variables

```bash
# Database
DATABASE_URL="postgresql://..."

# Authentication
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# OAuth Providers (optional)
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."

# Stripe
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Email (optional)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"

# Printify
PRINTIFY_API_TOKEN="your-printify-jwt-token"
PRINTIFY_SHOP_ID="your-printify-shop-id"
```

## Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run db:push      # Push schema to database
npm run db:seed      # Seed database with sample data
npm run stripe:listen # Listen for Stripe webhooks (dev)
```

## Deployment

This app is optimized for deployment on Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your environment variables
4. Deploy!

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.