# SaasLink

SaasLink is a Docker-ready Linktree-style SaaS starter for Ubuntu servers.

## What is included

- Next.js App Router application.
- PostgreSQL database via Docker Compose.
- Prisma schema and initial migration.
- Public profile page at `/:username`.
- Demo dashboard at `/dashboard`.
- Link creation, hide/show, delete and profile theme editing.
- Click tracking through `/api/click/:linkId`.

## Local development

```bash
cp .env.example .env
npm install
npm run db:migrate
npm run db:seed
npm run dev
```

Open:

- App: http://localhost:3000
- Dashboard: http://localhost:3000/dashboard
- Demo profile: http://localhost:3000/demo

## Docker

```bash
docker compose up --build
```

The web container runs Prisma migrations before starting Next.js.

## Product roadmap

See `docs/linktree-analysis.md` for the Linktree feature analysis and the staged SaasLink roadmap.
