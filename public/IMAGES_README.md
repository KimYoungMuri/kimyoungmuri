# Supabase restore: get images working again

This app expects images to be served from **Supabase Storage** on a **new** project (the old one was paused and can’t be restored).

## 1. Create a new project and restore

Follow the official guide:

**[Restore Dashboard backup](https://supabase.com/docs/guides/platform/migrating-within-supabase/dashboard-restore)**

- Create a new Supabase project.
- Download the backup from the old (paused) project and restore the **database** with `psql` as in the docs.
- Use the **Google Colab script** linked in the same docs to migrate **storage objects** from your downloaded backup into the new project’s Storage.  
  (After DB restore, bucket metadata exists but the actual files do not until you run that script.)

## 2. Make storage buckets public (so images load without signed URLs)

In the **new** project:

1. Go to **Storage** in the dashboard.
2. For each bucket used by this app (`uploads`, `music`, `blog`), open it → **Policies** (or bucket settings).
3. Add a policy that allows **public read** for these buckets (e.g. “Allow public read for all” on the object), or make the bucket public if your Supabase version supports it.

The app uses **public** URLs like:

`https://YOUR_PROJECT_REF.supabase.co/storage/v1/object/public/BUCKET/path.jpg`

So the buckets (or their objects) must be publicly readable.

## 3. Set env vars and rebuild

1. Copy `.env.example` to `.env.local`.
2. In the new project: **Settings → API**.
3. Set in `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL` = Project URL (e.g. `https://xxxx.supabase.co`)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = `anon` public key
   - `SUPABASE_SERVICE_ROLE_KEY` = `service_role` key (for NextAuth; keep secret).
4. Restart the dev server (and redeploy if applicable).

Images are loaded from:

- `uploads/` — headshot, boxplot, stanford_repair
- `music/` — background.jpg
- `blog/` — intro_pic.jpg, w_dad.jpg

Once the new project has these files (via the Colab migration) and the buckets are public, the site will load them using the URL and keys from `.env.local`.
