# xThrive

The xThrive by CGreen website and member area, laid out like the Relive repo: a Next.js frontend (static export, served by nginx), an Express API, shared Zod contracts, Prisma, and two databases on Neon. Login works like Relive's: mobile + consent → OTP → PAN → credit report → dashboard.

## Run locally

```powershell
npm install
# Database URLs into .env.local (Neon project "Thrive", branch production, database thrive_app)
"DATABASE_URL=$(neon cs production --database-name thrive_app --pooled)", "DATABASE_URL_UNPOOLED=$(neon cs production --database-name thrive_app)" | Set-Content .env.local -Encoding ascii
npm run db:generate
npm run db:migrate
npm run db:seed
npm run dev
```

- Web: `http://localhost:3001`
- API health: `http://localhost:4200/health`

`frontend/.env.local` holds the browser settings for dev: `NEXT_PUBLIC_API_URL=http://localhost:4200/api/v1` (open the site on `localhost`, not `127.0.0.1`, so the login cookie is sent). Server settings go in `backend/.env` (copy `backend/.env.example`); with none, all providers are mocks.

### Test logins (mock providers, OTP `123456`)

`npm run db:seed` resets these every time it runs:

| Mobile | Case | Lands on |
|---|---|---|
| `9876543210` | Existing user, profile complete | Dashboard |
| `9876543211` | Existing user, details saved, no report yet | Fetch score (resumes onboarding) |
| `9876543212` | New user | Enter PAN (any valid PAN, e.g. `ABCDE1234F`) |

PAN `AAAAA0000A` simulates a failed PAN lookup.

## Databases (Neon)

One Neon project, **Thrive**, branch `production`, with two databases, like Relive's `relive_app` and `relive_audit`: `thrive_app` (users, consents, OTPs, reports) and `thrive_audit` (audit trail). The backend takes the host and credentials from `DATABASE_URL` (pooled, for the app) and `DATABASE_URL_UNPOOLED` (direct, for migrations) and always uses `thrive_app` and `thrive_audit` on that host, whatever database the URL names; `AUDIT_DATABASE_URL*` override the audit one. Locally they come from the root `.env.local` (see Run locally); `backend/.env` wins if it sets them. Neon's default `neondb` database was removed, so `neon env pull` no longer works on this branch (it only picks a database named `neondb`, or the only one): use `neon cs ... --database-name thrive_app` as above.

On a new Neon branch or project, create both databases (Neon console, or `CREATE DATABASE thrive_app;` and `CREATE DATABASE thrive_audit;`) before the first `npm run db:migrate`.

## Build and deploy

```powershell
npm run build                        # shared, backend, then frontend (static site in frontend/out)
docker compose run --rm migrate      # apply database migrations (once per release)
docker compose up -d --build         # API on port 4200, web app on port 3001
```

On the server, `backend/.env` holds the secrets (database URLs, `SESSION_SECRET`, `OTP_PEPPER`, `DATA_ENCRYPTION_KEY`, provider keys, `TURNSTILE_SECRET_KEY`) and `FRONTEND_ORIGIN=https://xthrive.ai`. Browser settings are compiled into the web app, and the Docker build defaults them for xthrive.ai: API `https://api.xthrive.ai/api/v1` and Google Tag Manager `GTM-KP4KGD5M` (Google Analytics); override them, and set `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, in a root `.env` (copy `.env.example`) before building. Point `xthrive.ai` at port 3001 and `api.xthrive.ai` at port 4200 through your https proxy.

Google Tag Manager only loads in builds with `NEXT_PUBLIC_GTM_ID` set (the Docker build), so local `npm run dev` visits aren't counted. Never push personal data (mobile, PAN, name, score) to `dataLayer`.

`frontend/` has its own `package-lock.json` because Docker builds it on its own. After adding or upgrading a frontend package, refresh that lockfile too (for example `npm install --package-lock-only` in a copy of `frontend/` outside the workspace).

## How the frontend fits together

- Marketing pages live in `frontend/app/(site)/` with Thrive's own CSS (`thrive.css`); Tailwind is loaded alongside for the login dialog, with Thrive's styles in a cascade layer between Tailwind's reset and its utilities (`site.css`).
- Every "Log in" / "get started" link is `/?login=1` (plus `&goal=<id>` from the goal buttons): `components/login-dialog.tsx` opens on the home page; the goal is saved as the user's concern after login.
- The dashboard is `frontend/app/portal/`, with its own Tailwind styles (`portal.css`) and none of the marketing pages' CSS.
- Internal links are plain `<a>`, not `next/link`: with the static export, Next 16's prefetch asks for files under names the export does not write, which gives 404s.
- The support phone and email (`frontend/lib/contact.ts`) are CGreen's line, shared with Relive for now.
