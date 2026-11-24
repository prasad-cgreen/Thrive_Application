# xThrive website

The xThrive by CGreen landing site: Next.js, exported to static HTML/CSS/JS and served by nginx.

## Run locally

```sh
npm install
cp .env.example .env.local   # then set NEXT_PUBLIC_RELIVE_URL=http://localhost:5173
npm run dev                  # http://localhost:3001
```

The "Log in" buttons need Relive running too (its frontend on port 5173).

## Build and deploy

```sh
npm run build                # writes the static site to out/
docker compose up -d --build # serves it on port 3001
```

Point the Thrive domain at port 3001 through your https proxy. Set `NEXT_PUBLIC_RELIVE_URL` in `.env` (copy `.env.example`) before building; it defaults to `https://relive.co.in`.

## How login works

Thrive has no login of its own yet. Every "Log in" or "get started" button links to `<RELIVE_URL>/?login=1&from=thrive` (see `loginUrl` in `lib/content.ts`), and Relive's landing page opens its login dialog straight away for `?login`. Conversation buttons ("Speak to us" and the like) go to `/contact/` instead.

## Notes

- Internal links are plain `<a>`, not `next/link`: with the static export, Next 16's prefetch asks for files under names the export does not write, which gives 404s.
- The support phone and email in `lib/content.ts` are Relive's CGreen line for now.
