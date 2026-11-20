# Architecture

**Stack:** Next.js 16 (App Router), React 19 with the React Compiler, TypeScript, Tailwind v4, shadcn/ui, antd, Redux Toolkit / RTK Query, and next-intl. The backend is a separate API. This repo only consumes it.

## i18n (next-intl)

- The supported locales are `en` (default) and `bn`, with `localePrefix: 'as-needed'`, so English URLs have no prefix and Bengali ones use `/bn/...`.
- Translation strings are in `messages/en.json` and `messages/bn.json`. Add every new key to both files.
- Use `Link`, `useRouter` and `usePathname` from `@/i18n/navigation`, never from `next/link` or `next/navigation`.
- Server components use `getTranslations`; client components use `useTranslations`.

## Auth and route guarding

- `src/middleware.ts` runs the next-intl middleware, then guards `/user`, `/vendor`, `/profile` and `/post` using the `accessToken` cookie.
- It decodes the JWT `role` (`User` | `Vendor`): `/user` is for Users only and `/vendor` is for Vendors only.
- The `accessToken` and `refreshToken` cookies are not httpOnly, so both the client and the server can read them.
- The token refresh (`POST /auth/refresh`) is implemented **twice**: in `src/redux/api/baseApi.ts` for the client and in `serverQueryWithReauth` (`src/lib/services/Mutation.Ad.ts`) for the server. Keep the two in sync.

## Data fetching: two parallel paths

1. **Server (SSR/SEO):** Listing and detail pages are async server components. They turn `searchParams` into a backend query and call `fetch` helpers in `src/lib/services/` with `next: { tags }`. The page passes the *promise* into a server component inside `<Suspense>`, and that component also outputs JSON-LD from `src/components/JSON_LD/`.
2. **Client (RTK Query):** `src/redux/api/baseApi.ts` holds a single `createApi`. Feature APIs use `baseApi.injectEndpoints`. Only `userSlice` is persisted, through redux-persist.

The two paths meet in the listing `*Items` components (for example `CarItems.tsx`):
- The server passes `initialData` and `initialMeta` to the component.
- Infinite scroll (`src/shared/LazyLoadAd.ts`) then loads more pages through an RTK Query lazy query that uses the same `query` object.
- The component is keyed by `JSON.stringify(query)`, so it resets when the filters change.

## Filters are URL-driven

Filter UIs update the search params through `useUpdateMultipleSearchParams` (`src/hooks/UseUpdateSearchPrams.tsx`), which also resets `page=1`. The server page then re-renders with the new query. Keep filter state in the URL, not in component state.

## Cache invalidation

- All cache tags are defined in `src/lib/Tags.ts`. A new cached category needs a tag there.
- Ad mutations go through the server actions in `src/lib/Actions/`. Each one calls the backend, then `revalidateTag(tag, "max")`.
- External invalidation goes through `POST /api/revalidate` with `{ "tags": [...] }`. Every tag must be a key in `Tags.ts`.

## Payments

SSLCommerz posts back to `src/app/api/payment/{success,cancel}/route.ts`. Those routes redirect to the `/payment/*` pages.

## SEO

- Each page exports `metadata` (or `generateMetadata` on detail pages) with `metadataBase: https://runbd.org`, a canonical URL, and `en`/`bn` alternates. Keep this pattern on new pages.
- `src/app/sitemap.ts` and `src/app/robots.ts` generate the crawl files.
