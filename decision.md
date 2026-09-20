# Folder, Page, And Route Decisions

## Current decisions

This project uses Next.js App Router. A folder inside `src/app` becomes a URL route when it contains a `page.tsx` file.

For example:

| File | Route |
| --- | --- |
| `src/app/page.tsx` | `/` |
| `src/app/about/page.tsx` | `/about` |
| `src/app/services/page.tsx` | `/services` |
| `src/app/works/page.tsx` | `/works` |
| `src/app/works/[slug]/page.tsx` | `/works/project-name` |
| `src/app/contact/page.tsx` | `/contact` |

The same pattern is used for events, gallery, blog, privacy policy, and terms and conditions.

## Why these folders are used

- `src/app/` contains pages and routes only.
- `src/components/atoms/` contains small reusable items such as Button, Badge, Container, and Heading.
- `src/components/navigation/` contains the Navbar and Footer used on every page.
- `src/components/sections/` contains page sections grouped by page name, for example `sections/home` and `sections/works`.
- Page-specific presentation lives in `src/components/sections`.
- Reusable primitives live in `src/components/atoms`.
- Current work data is read from `src/data/works.ts`; event data is read from `src/data/events.ts`.
- `src/data/content.ts` is a separate sample model and should not become a second source of truth without an explicit decision.

This keeps the project easy to understand: find a page in `src/app`, find its page content in the related `components/sections` folder, and use shared components only when they are reused.

## Dynamic routes

`[slug]` is needed only for pages that have many detail pages.

- `works/[slug]/page.tsx` lets one page show many projects, such as `/works/field-notes`.
- `blog/[slug]/page.tsx` is reserved for article detail pages when the blog feature is made stable.

Without `[slug]`, a separate page file would be needed for every project or article.

## Next.js routing rule

For a custom 404 page, Next.js App Router uses `src/app/not-found.tsx`, not `404.tsx`. This page is shown when a route does not exist or when a project/article slug cannot be found.

## What happens after the frontend

The next phase is product hardening, not more visual sections. First make the current application build cleanly, then make its data and content authoritative, connect real form handling, improve SEO and accessibility, and validate the production deployment. New features should be added only after their route, data owner, loading state, error state, and accessibility behavior are documented.
