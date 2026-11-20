# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Runbd (https://runbd.org) is the Next.js frontend for a Bangladesh marketplace and services platform: vehicles, rentals, workshops, jobs, lawyers and document services. The backend is a separate API.

## Commands

```bash
npm run dev      # dev server
npm run build    # production build
npm start        # serve the build
npx tsc --noEmit # type check (there are no tests or lint)
```

**Pushing to `main` deploys to production** (GitHub Action → VPS → `npm run build` → `pm2 restart`).

## Key rules

- Read env vars through `src/utils/config.ts`, not `process.env`. `SERVER_BASE_API` is used on the server and `NEXT_PUBLIC_BASE_API` on the client.
- Import navigation from `@/i18n/navigation`. Add every translation key to both `messages/en.json` and `messages/bn.json`.
- Keep filter state in the URL search params.
- Ad mutations go through the server actions in `src/lib/Actions/`, which revalidate the tags from `src/lib/Tags.ts`.

## Docs

- @docs/architecture.md: i18n, auth, data fetching (SSR + RTK Query), caching, payments, SEO
- @docs/structure.md: folder layout and the per-category pattern
