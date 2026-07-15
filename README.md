# Najmul Huda — Portfolio

Full-stack developer & competitive-programmer portfolio, built with Next.js
(App Router) + TypeScript + Tailwind CSS + MongoDB  + JWT auth.

## Stack

- **Frontend**: Next.js 16 App Router, TypeScript, Tailwind CSS, Recharts
- **Backend**: Next.js Route Handlers (`app/api/**`), MongoDB native driver
  with a singleton `MongoClient` (`lib/mongodb.ts`)
- **Auth**: JWT sessions (`jose`) protecting write endpoints; structured so it
  can be swapped for a full `better-auth()` instance later without touching
  route handlers
- **Data**: three collections — `projects`, `stats`, `timeline`

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in MONGODB_URI, JWT_SECRET, ADMIN_EMAIL/PASSWORD
npm run seed                  # populates MongoDB with starter content
npm run dev
```

Open http://localhost:3000.

If MongoDB is unreachable or a collection is empty, every data-fetching
component (`StatsGrid`, `TopProjects`, `JourneySection`, `/projects` page)
falls back to the same content in `lib/fallback-data.ts`, so the site never
renders blank during setup.

## Project structure

```
app/
  layout.tsx              Root layout — fonts, ThemeProvider, Navbar, Footer
  page.tsx                Homepage: Hero → Stats → About → TopProjects → Journey → Contact
  globals.css             Theme CSS variables (dark/light) + base styles
  projects/page.tsx        /projects — full searchable/filterable archive
  api/
    projects/route.ts      GET (public, ?featured=&category=) / POST (auth)
    stats/route.ts         GET stat cards
    timeline/route.ts       GET journey entries
    auth/login/route.ts     POST — issues JWT session cookie

components/                One component per section/piece of UI
lib/
  mongodb.ts               MongoClient singleton (dev-HMR safe)
  auth.ts                  JWT sign/verify + requireAuth guard
  use-reveal.ts             IntersectionObserver hooks for scroll-reveal
  fallback-data.ts          Seed-mirroring fallback content
  site-config.ts            Name, socials, email — single source of truth
models/types.ts             Shared TS interfaces for Mongo documents
scripts/seed.ts              One-off DB seeding script (npm run seed)
```

## Content model

- `projects`: `{ slug, title, category: "web"|"cp"|"opensource", status,
  year, type, metricValue, metricLabel, tags[], description, featured,
  order }` — the homepage shows the 6 highest-priority `featured: true`
  projects; `/projects` shows everything.
- `stats`: `{ key, label, value, order }` — the 4 "by the numbers" cards.
- `timeline`: `{ role, meta, heading, description, order }` — the journey
  entries, rendered oldest → newest.

## Auth

`POST /api/auth/login` checks the submitted email/password against
`ADMIN_EMAIL`/`ADMIN_PASSWORD` and, if valid, sets an httpOnly JWT cookie.
`requireAuth()` in `lib/auth.ts` guards mutation routes (e.g.
`POST /api/projects`) — swap it out for `better-auth`'s session helpers if
you outgrow the single-admin model.
