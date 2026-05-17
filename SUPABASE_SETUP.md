# Supabase Setup (Option B — Vercel Production)

The app now uses **Supabase** directly from the browser. No Railway/Express needed for signup, login, enrollments, or contact form.

## Step 1: Supabase project

1. Open [supabase.com/dashboard](https://supabase.com/dashboard)
2. Use existing project **urfkxvueoxnuzxjlcaqu** or create a new one
3. Go to **Project Settings → API** and copy:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon public** key → `VITE_SUPABASE_ANON_KEY`

## Step 2: Run database schema

1. In Supabase: **SQL Editor → New query**
2. Paste full contents of `supabase/schema.sql`
3. Click **Run**

This creates tables, sample courses, RLS policies, and the auth trigger for user profiles.

## Step 3: Auth settings

1. **Authentication → Providers → Email** — keep enabled
2. For easier testing, disable **Confirm email**:
   - **Authentication → Providers → Email → Confirm email** = OFF
3. **Authentication → URL Configuration**:
   - Site URL: `https://way-2-upskill-careers.vercel.app` (your Vercel URL)
   - Redirect URLs: add your Vercel URL and `http://localhost:8080`

## Step 4: Vercel environment variables

Vercel Dashboard → your project → **Settings → Environment Variables**:

| Variable | Value |
|----------|--------|
| `VITE_SUPABASE_URL` | `https://xxxxx.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | `eyJhbG...` (anon key) |

Apply to **Production**, **Preview**, and **Development**.

Then **Deployments → Redeploy** (required — Vite bakes env vars at build time).

## Step 5: Local development

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Fill in your Supabase URL and anon key, then:

```bash
npm run dev -- --host 127.0.0.1
```

You do **not** need `npm run server` for signup/login anymore.

## Admin dashboard

Admin RLS allows these emails to read all users/enrollments:

- `letsupskill57@gmail.com`
- `admin@zyvotrix.com`

Sign up/login with an admin email to use `/admin`, or add your email in `supabase/schema.sql` policies and re-run that section.

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Signup fails / RLS error | Re-run `supabase/schema.sql`; check trigger `on_auth_user_created` exists |
| Login "Invalid login credentials" | Wrong password, or email not confirmed (disable confirm email in Auth) |
| Enrollments fail | User must be logged in (authenticated session) |
| Old local-only accounts | Re-signup on Supabase Auth (old `users` rows without `auth.users` id won't work) |

## Architecture

```
Browser (Vercel)
    ↓  @supabase/supabase-js
Supabase Auth + PostgreSQL
```

No `localhost:3001` in production.
