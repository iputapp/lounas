# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Install dependencies
npm i

# Development server
npm run dev

# Build (runs prisma generate first)
npm run build

# Lint (all linters)
npm run lint

# Auto-fix lint issues
npm run format

# Individual linters
npm run lint:next
npm run lint:eslint
npm run lint:stylelint
npm run lint:prettier

# Database
npm run db:gen          # Generate Prisma client + Zod schemas
npm run db:mig:dev      # Run migrations (uses .env.local)
npm run db:studio       # Open Prisma Studio (uses .env.local)
```

There are no tests in this project.

## Architecture

**lounas** is a Japanese lunch recommendation web app (Next.js 14 App Router + TypeScript) targeting workers near Cocoon Tower.

### Route Groups

- `src/app/(root)/` — Landing page (desktop). Middleware rewrites `/` to `(root)/mobile` for mobile devices.
- `src/app/(pages)/` — Public pages: `recommend/`, `dish/`, `restaurant/`, `signup/`, `tos/`, `privacy/`
- `src/app/webapp/` — Authenticated app shell with bottom nav: `home/`, `diary/`, `ranking/`, `user/`
- `src/app/api/auth/` — Supabase auth callbacks (`callback/`, `otp/`)
- `src/app/api/v-beta/` — REST API routes: `recommend/`, `restaurant/`, `restaurants/`, `dish/`, `dishes/`, `user/`

### Middleware (`src/middleware.ts`)

Handles auth-based routing. Authenticated users are redirected away from public pages into `/webapp`; unauthenticated users are redirected away from `/webapp` to `/webapp/user/signin`. Mobile detection rewrites `/` to `/mobile` for unauthenticated mobile users.

### Key Libraries

| Path | Purpose |
|---|---|
| `src/lib/prisma.ts` | Singleton Prisma client |
| `src/lib/supabase/` | Supabase clients: `client.ts` (browser), `server.ts` (RSC), `middleware.ts` (edge) |
| `src/lib/zod/` | **Auto-generated** Zod schemas from `prisma/schema.prisma` via `zod-prisma-types` — do not edit manually |
| `src/lib/swr.ts` | SWR fetcher utility |
| `src/hooks/auth/` | Custom hooks for OTP auth flow |
| `src/_constants/links.ts` | App-wide link constants |
| `src/styles/` | Global SCSS (included via `sassOptions.includePaths`) |

### Data Layer

- **Database**: Supabase (PostgreSQL) with `public` and `auth` schemas
- **ORM**: Prisma 5 with `multiSchema` preview feature
- **Zod schemas** are generated automatically — run `npm run db:gen` after schema changes
- Migrations require `.env.local` (loaded via `dotenv-cli`)

### Styling

Uses both **Tailwind CSS** and **SCSS Modules**. CSS module class names use camelCase (configured in `next.config.mjs`). SVGs are imported as React components via `@svgr/webpack`; SVG fill/stroke colors are normalized to `currentColor` automatically.

### Components (`src/components/`)

Organized by UI type: `backgrounds/`, `buttons/`, `cards/`, `dialogs/`, `forms/`, `headers/`, `image/`, `layouts/`, `lists/`, `lottie/`, `navigations/`, `overlays/`, `progresses/`, `skeletons/`, `suspenses/`, `widgets/`.

## Commit Convention

```
<type>(<scope>): <short summary>
```

Types: `build`, `ci`, `docs`, `feat`, `fix`, `perf`, `refactor`, `test`

Branch naming: `<type>/x-y-z` branched from `develop`.

## Environment Variables (`.env.local`)

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
DIRECT_URL=          # For Prisma migrations
DATABASE_URL=        # For Prisma Client (Supavisor/pgbouncer)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
NEXT_PUBLIC_GA_TRACKING_ID=
```
