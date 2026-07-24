# Najmul Huda — Portfolio

Full-stack developer & competitive-programmer portfolio, built with Next.js
(App Router) + TypeScript + Tailwind CSS + MongoDB + better-auth.

## Stack

- **Frontend**: Next.js 16 App Router, TypeScript, Tailwind CSS, Framer Motion, Recharts
- **Backend**: Next.js Server Actions (`lib/action.ts`), MongoDB native driver
- **Auth**: `better-auth` (`lib/auth.ts` / `lib/auth-client.ts`), mounted at `app/api/auth/[...all]/route.ts`
- **Data collections**: `works`, `blogs`, `categories`, `tags`, `stats`,
  `timeline`, `educations`, `skill_items`, `experiences`, `certificates`

## Getting started

```bash
npm install
cp .env.example .env   # fill in MONGODB_URI, DB_NAME, BETTER_AUTH_SECRET, BETTER_AUTH_URL, etc.
npm run dev
```

Open http://localhost:3000. Sign up an account at `/signup`, then the admin
console is available at `/admin` for any signed-in user.

## Project structure

```
app/
  layout.tsx                 Root layout — fonts, ThemeProvider, Navbar, Footer
  page.tsx                   Homepage: Hero → About → TopWork → Stats → Journey
  globals.css                Theme CSS variables (dark/light) + base styles
  work/
    page.tsx                 /work — searchable/filterable work archive
    [id]/page.tsx             /work/[id] — single project, README read live from GitHub
  blog/
    page.tsx                 /blog — searchable/filterable article archive
    [id]/page.tsx             /blog/[id] — single article, content read live from GitHub
  admin/
    page.tsx                  /admin — tabbed console (Work, Blog, Categories, Resume)
    work/add, work/edit/[id]   Add / edit a work project
    blog/add, blog/edit/[id]   Add / edit a blog post
  resume/, services/, login/, signup/
  api/auth/[...all]/route.ts  better-auth route handler

components/
  pages/                     Section + browser components (Hero, WorkBrowser, BlogBrowser, ...)
  admin/                     Admin console tabs, lists, delete confirmations
  forms/                     ImageUploader (ImgBB-backed)
  layout/                    Navbar, Footer, Preloader
  shared/, ui/               Reusable primitives (buttons, toggles, motion wrappers)

lib/
  auth.ts / auth-client.ts    better-auth server + client instances
  action.ts                   All server actions: work/blog/category/resume CRUD
  github-md.ts                GitHub blob → raw URL + markdown section extraction
  site-config.ts              Name, socials, email — single source of truth

models/types.ts               Shared TS interfaces for Mongo documents (Work, BlogPost, ...)
```

## Content model

- **Work** (`works` collection): `{ title, status, year, type, category,
  short_description, featured, tags[], image[], metricValue?, metricLabel?,
  githubUrl }` — the project's full write-up is read live from its GitHub
  README (nothing is stored). The homepage shows `featured: true` works;
  `/work` shows everything.
- **BlogPost** (`blogs` collection): `{ title, category, excerpt, content,
  coverImage?, tags[], publishedAt, readTime?, published, featured?,
  sourceUrl }` — content is likewise pulled live from a GitHub markdown file.
- **CategoryItem** (`categories` collection): `{ type: "work" | "blog",
  label, slug, description?, order? }` — managed from the Admin ▸ Categories
  tab and used to populate the category dropdowns/pills on both the admin
  forms and the public Work/Blog browsers.
- `stats`, `timeline`, `educations`, `skill_items`, `experiences`,
  `certificates` — power the Resume page and homepage stats strip, all
  editable from Admin ▸ Resume Items.

## Auth

`better-auth` handles sessions; any account created via `/signup` can sign in
and manage content from `/admin`. All mutating server actions in
`lib/action.ts` call `requireAdmin()`, which checks for a valid session
before writing to the database.
