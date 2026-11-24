# xThrive

The xThrive by CGreen website: a Next.js frontend, exported to static HTML/CSS/JS and served by nginx. Laid out like the Relive repo (root workspace, `frontend/`, one root `Dockerfile` and `docker-compose.yml`).

## Run locally

```powershell
npm install
copy .env.example frontend\.env.local   # then set NEXT_PUBLIC_RELIVE_URL=http://localhost:5173
npm run dev
```

- Web: `http://localhost:3001`
- The "Log in" buttons need Relive running too (its web app on port 5173).

## Build and deploy

```powershell
npm run build                  # writes the static site to frontend/out
docker compose up -d --build   # serves it on port 3001
```

Point the Thrive domain at port 3001 through your https proxy. Set `NEXT_PUBLIC_RELIVE_URL` in a root `.env` (copy `.env.example`) before building; it defaults to `https://relive.co.in`.

`frontend/` has its own `package-lock.json` because Docker builds it on its own. After adding or upgrading a frontend package, also run `npm install` inside `frontend/` so that lockfile stays in step.

## How login works

Thrive has no login of its own yet. Every "Log in" or "get started" button links to `<RELIVE_URL>/?login=1&from=thrive` (see `loginUrl` in `frontend/lib/content.ts`), and Relive's landing page opens its login dialog straight away for `?login`. Conversation buttons ("Speak to us" and the like) go to `/contact/` instead.

## Notes

- Internal links are plain `<a>`, not `next/link`: with the static export, Next 16's prefetch asks for files under names the export does not write, which gives 404s.
- The support phone and email in `frontend/lib/content.ts` are Relive's CGreen line for now.
