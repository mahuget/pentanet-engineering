# Pentanet Engineering PLC — Website

Official website for Pentanet Engineering PLC, an engineering company specialising in telecom installation, tower erection, civil works, power installation, solar installation, and data center construction across Ethiopia and East Africa.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) + TypeScript |
| Styling | Tailwind CSS + CSS custom properties |
| Animations | Framer Motion |
| CMS | Sanity.io (schemas ready — project ID needed) |
| Database | PostgreSQL via Supabase + Prisma ORM |
| Email | Resend |
| Spam protection | Cloudflare Turnstile |
| Rate limiting | Upstash Redis (in-memory fallback) |
| Deployment | Vercel |

## Running Locally

```bash
# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local
# Edit .env.local with your credentials (see below)

# Generate Prisma client
npm run db:generate

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The site works without any credentials configured — forms validate and respond gracefully, database and email are simply skipped.

## Environment Variables

Copy `.env.example` to `.env.local` and fill in the values. See `.env.example` for detailed instructions on where to get each credential.

Required for full functionality:
- `DATABASE_URL` + `DIRECT_URL` — Supabase PostgreSQL connection strings
- `RESEND_API_KEY` — Email notifications
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY` + `TURNSTILE_SECRET_KEY` — Spam protection
- `NEXT_PUBLIC_SANITY_PROJECT_ID` — CMS content

## Database Setup

After configuring `DATABASE_URL` and `DIRECT_URL`:

```bash
# Generate Prisma client types
npm run db:generate

# Run migrations (development)
npm run db:migrate

# Or push schema without migration history (staging only)
npm run db:push
```

**Never run `prisma migrate reset` on a production database.**

## Content Management

Once `NEXT_PUBLIC_SANITY_PROJECT_ID` is configured:

```bash
# Install Sanity CLI globally
npm install -g @sanity/cli

# Initialise Studio (run once)
npx sanity init --project [your-project-id]
```

Content types defined: Services, Projects, Team Members, News Posts, Site Settings.

## Production Build

```bash
npm run build
```

## Deployment (Vercel)

1. Push this repository to GitHub
2. Import the repository in [vercel.com](https://vercel.com)
3. Add all environment variables from `.env.example` in Vercel dashboard
4. Deploy

See DEPLOYMENT.md for the full deployment checklist.

## Pages

| Route | Description |
|---|---|
| `/` | Homepage |
| `/about` | About Us |
| `/services` | Services listing |
| `/services/[slug]` | Individual service (6 routes) |
| `/projects` | Projects portfolio |
| `/projects/[slug]` | Individual project |
| `/team` | Team profiles |
| `/quality-safety` | Quality & Safety |
| `/news` | News & Insights |
| `/news/[slug]` | Individual article |
| `/contact` | Contact form |
| `/request-quote` | Quote request form |
| `/privacy-policy` | Privacy Policy |
| `/sitemap.xml` | Auto-generated sitemap |
| `/robots.txt` | Search engine rules |

## Important Notes

- All contact details, projects, team profiles, and company statistics are currently placeholders. Replace with real data before launch.
- The Privacy Policy is a draft — it must be legally reviewed before going live.
- The Sanity CMS schemas are defined and ready; a Sanity project needs to be created and connected.
