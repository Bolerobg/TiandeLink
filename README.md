# SaasLink

SaasLink is a Docker-ready Linktree-style SaaS starter for Ubuntu servers.

## What is included

- Next.js App Router application.
- PostgreSQL database via Docker Compose.
- Prisma schema and initial migration.
- Public profile page at `/:username`.
- Register/login/logout with httpOnly sessions.
- User dashboard at `/dashboard`.
- Link creation, inline editing, reorder, hide/show, delete and profile theme editing.
- Click tracking through `/api/click/:linkId`.
- Dashboard stats and per-link analytics.

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
- Register: http://localhost:3000/register
- Login: http://localhost:3000/login
- Dashboard: http://localhost:3000/dashboard
- Demo profile: http://localhost:3000/demo

## Docker

```bash
docker compose up --build -d
```

The web container runs Prisma migrations before starting Next.js.

Useful commands:

```bash
docker compose ps
docker compose logs -f web
docker compose down
```

After pulling new code on a server:

```bash
git pull
docker compose up --build -d
```

## Product roadmap

See `docs/linktree-analysis.md` for the Linktree feature analysis and the staged SaasLink roadmap.
