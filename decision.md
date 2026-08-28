# Folder, page, and route decision

## What this project uses

This is a Next.js App Router project. In Next.js, a folder inside `src/app` becomes part of a URL only when it contains a `page.tsx` file.

For example:

| File | Route |
| --- | --- |
| `src/app/page.tsx` | `/` |
| `src/app/about/page.tsx` | `/about` |
| `src/app/services/page.tsx` | `/services` |
| `src/app/works/page.tsx` | `/works` |
| `src/app/works/[slug]/page.tsx` | `/works/project-name` |
| `src/app/blog/page.tsx` | `/blog` |
| `src/app/blog/[slug]/page.tsx` | `/blog/article-name` |
| `src/app/contact/page.tsx` | `/contact` |

The same pattern is used for events, gallery, privacy policy, and terms and conditions.

## Why these folders are used

- `src/app/` contains pages and routes only.
- `src/components/atoms/` contains small reusable items such as Button, Badge, Container, and Heading.
- `src/components/navigation/` contains the Navbar and Footer used on every page.
- `src/components/sections/` contains page sections grouped by page name, for example `sections/home` and `sections/works`.
- `src/data/content.ts` contains sample work and blog information in one place.

This keeps the project easy to understand: find a page in `src/app`, find its page content in the related `components/sections` folder, and use shared components only when they are reused.

## Why `[slug]` is used

`[slug]` is needed only for pages that have many detail pages.

- `works/[slug]/page.tsx` lets one page show many projects, such as `/works/field-notes`.
- `blog/[slug]/page.tsx` lets one page show many articles, such as `/blog/designing-for-clarity`.

Without `[slug]`, a separate page file would be needed for every project or article.

## Important Next.js correction

For a custom 404 page, Next.js App Router uses `src/app/not-found.tsx`, not `404.tsx`. This page is shown when a route does not exist or when a project/article slug cannot be found.

## What was added

- The folders and `page.tsx` files requested for all main pages.
- Shared layout, navbar, footer, and reusable components.
- Sample data for works and blog detail routes.
- `not-found.tsx` for invalid pages.
- This decision document.

The sample text, project data, gallery placeholders, and legal-page text can be replaced later. The folder and route structure can stay the same.
