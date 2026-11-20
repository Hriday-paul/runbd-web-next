# Structure

Path alias: `@/*` → `src/*`.

```
messages/            en.json, bn.json translations
src/
  app/
    [locale]/        all pages (listings, details, auth, user/ and vendor/ dashboards, payment)
    api/             payment callbacks, revalidate endpoint
    sitemap.ts, robots.ts
  components/
    <Feature>/       feature components (CarBuySell, BikeBuySell, Job, Lawyers, ...)
    AddPost/         post-ad form for each category
    EditPost/
    JSON_LD/         structured-data generators
    ui/              shadcn/ui primitives (new-york style)
  shared/            cross-feature UI: Navbar, Footer, dashboard Sidebar, SimilarAd, loaders, LazyLoadAd
  lib/
    services/        server-side fetch helpers (tagged cache)
    Actions/         server actions (mutate, then revalidateTag)
    Tags.ts          cache tags + categoryRouteMap
  redux/
    api/             RTK Query endpoints injected into baseApi
    slices/          userSlice (persisted)
    types.ts         shared types (Add, IMeta, ...)
  i18n/              next-intl routing, navigation, request config
  hooks/             useUpdateMultipleSearchParams
  utils/config.ts    env config + static option lists (brands, car types, lawyer specializations)
  middleware.ts      i18n + auth/role guards
```

## Category pattern

`categoryRouteMap` in `src/lib/Tags.ts` maps backend category names to route slugs:

| Backend      | Route         | Components                |
|--------------|---------------|---------------------------|
| Car          | `carbuysell`  | `components/CarBuySell/`  |
| Bike         | `bikebuysell` | `components/BikeBuySell/` |
| CarRent      | `car-rent`    | `components/RentCar/`     |
| Workshop     | `workshop`    | `components/WorkShop/`    |
| Accessories  | `accessories` | `components/Accessories/` |
| Job          | `jobs`        | `components/Job/`         |
| Exchange     | `exchange`    | `components/Exchange/`    |
| Lawyer       | `lawyers`     | `components/Lawyers/`     |

Each category follows the same layout:
- Pages: `src/app/[locale]/<slug>/page.tsx` for the listing and `[id]/page.tsx` for the detail page.
- Components: a server wrapper (such as `Cars.tsx`), plus `*Filter`, `*Items` (client, infinite scroll), `*Card` and `*Details`.
- Form: `src/components/AddPost/<Category>Form.tsx`.
- Cache tag: in `src/lib/Tags.ts`.
- JSON-LD: in `src/components/JSON_LD/`.

To add a category, copy an existing one end to end.
