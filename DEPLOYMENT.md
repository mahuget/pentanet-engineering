# Deployment Checklist — Pentanet Engineering PLC

## Pre-deployment (do these first)

- [ ] Build passes locally: `npm run build`
- [ ] TypeScript passes: `npm run type-check`
- [ ] No secrets in codebase: `.env.local` is in `.gitignore`
- [ ] `.env.example` has all variable names (no real values)
- [ ] Placeholder content reviewed — nothing invented is live-facing

## Step 1 — Push to GitHub

If the project is not yet on GitHub:

```bash
# In the project directory
git init
git add .
git commit -m "Initial commit — Pentanet Engineering PLC website"

# Create a new repository on github.com (do not initialise with README)
# Then:
git remote add origin https://github.com/YOUR_USERNAME/pentanet-engineering.git
git branch -M main
git push -u origin main
```

Do not commit `.env.local`. Verify it is listed in `.gitignore` before pushing.

## Step 2 — Connect to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New → Project"
3. Import your GitHub repository
4. Framework preset: **Next.js** (auto-detected)
5. Root directory: `.` (leave as default)
6. Do NOT deploy yet — configure environment variables first

## Step 3 — Configure environment variables in Vercel

In Vercel project → Settings → Environment Variables, add:

| Variable | Value | Environment |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://yourdomain.com` | Production |
| `DATABASE_URL` | Supabase pooler connection string | All |
| `DIRECT_URL` | Supabase direct connection string | All |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Your Sanity project ID | All |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` | All |
| `SANITY_API_TOKEN` | Read-only Sanity token | All |
| `RESEND_API_KEY` | Your Resend API key | All |
| `RESEND_FROM_ADDRESS` | Verified sender address | All |
| `RESEND_NOTIFY_ADDRESS` | Notification recipient | All |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Turnstile site key | All |
| `TURNSTILE_SECRET_KEY` | Turnstile secret key | All |
| `UPSTASH_REDIS_REST_URL` | Upstash Redis URL | All |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash Redis token | All |

## Step 4 — Run database migrations before deploying

Before the first deployment with a live database:

```bash
# From your local machine with DIRECT_URL set in .env.local
npx prisma migrate deploy
```

This creates the `contact_submissions` and `quote_requests` tables.

## Step 5 — Deploy

Click "Deploy" in Vercel. Monitor the build log for errors.

## Step 6 — Verify the deployment

After deployment, test:
- [ ] Homepage loads correctly
- [ ] Dark/light mode toggle works
- [ ] All navigation links work
- [ ] `/services/telecom-installation` loads (and other service pages)
- [ ] Contact form submits and shows success message
- [ ] Quote form submits and shows success message
- [ ] Check Supabase dashboard — rows appear in `contact_submissions`
- [ ] Check email inbox — notification received
- [ ] `/sitemap.xml` returns valid XML
- [ ] `/robots.txt` returns correct rules

## Step 7 — Custom domain

Only do this after receiving the domain from the client:

1. Vercel project → Settings → Domains → Add domain
2. Follow Vercel's DNS instructions for your registrar
3. Vercel automatically provisions HTTPS via Let's Encrypt
4. Update `NEXT_PUBLIC_SITE_URL` to the new domain
5. Redeploy to regenerate sitemap with correct URLs

## Services to set up (if not already)

| Service | URL | Free tier suitable? |
|---|---|---|
| Supabase | supabase.com | **No** — use Pro ($25/mo) for production (free tier pauses) |
| Vercel | vercel.com | **No** — use Pro ($20/mo) for commercial use |
| Sanity | sanity.io | Yes (≤3 editors) |
| Resend | resend.com | Yes (3,000 emails/mo) |
| Cloudflare Turnstile | dash.cloudflare.com | Yes (free) |
| Upstash | upstash.com | Yes (10k req/day) |

**Minimum monthly production cost: ~$45–50/mo** (Vercel Pro + Supabase Pro)
