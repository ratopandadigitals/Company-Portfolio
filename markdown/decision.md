# Folder, Page, And Route Decisions

## Frontend audit and change approval

**Status: Process agreed; implementation edits below are unapproved and awaiting review.**

The frontend-first goal is to audit and finish the user-facing experience before starting backend integration. An audit should report verified findings, explain their impact, and propose a small fix with its tradeoffs. The developer should wait for the project owner's review and approval before changing implementation files. Do not interpret an audit request as permission to fix every issue found.

During the current audit, implementation edits were made before that approval. They remain in the working tree for review and have not been reverted:

| Change | Reason it was made | Review status |
| --- | --- | --- |
| Make the footer subscription form stack on narrow screens and let its button fill the available width | The form was identified as a source of horizontal overflow on mobile. | Unapproved; verify at target mobile widths and decide whether to keep. |
| Remove the unused `framer-motion/m` import from `Container` | Lint reported an unused import. | Unapproved; confirm the lint finding and decide whether to keep. |
| Remove the brand name from the privacy and terms page titles | The global title template was observed appending the brand, resulting in duplicated branding. | Unapproved; verify the resulting browser tab and search metadata, then decide whether to keep. |

The edits targeted the apparent owner of each issue: responsive form layout in the footer, the unused import in its component, and page-specific titles where metadata is declared. That was the implementation rationale, not a substitute for the owner's decision. The audit did not establish that these fixes are the only acceptable approaches.

### Approved accessibility changes - 2026-09-29

The owner explicitly approved the dialog, gallery keyboard-control, and mobile-menu Escape fixes after reviewing the UX findings. These changes are implemented and locally checked; cross-browser and assistive-technology verification remains pending. Details and results are recorded in `testing.md`.

| Change | Files | Status |
| --- | --- | --- |
| Add shared dialog focus placement, Tab containment, Escape dismissal, and focus restoration; apply it to contact, newsletter, event-registration, and gallery dialogs | `src/components/hooks/useDialogFocus.ts`, `src/components/navigation/Footer.tsx`, `src/components/sections/contact/ContactSection.tsx`, `src/components/sections/events/EventsSection.tsx`, `src/components/sections/gallery/BentoGallery.tsx` | Owner-approved; implemented; local browser checks passed |
| Make gallery tiles and thumbnails labeled native buttons, include the thumbnail dock within dialog semantics/focus handling, and close cleanly | `src/components/sections/gallery/BentoGallery.tsx` | Owner-approved; implemented; local browser checks passed |
| Close the mobile navigation on Escape and return focus to its toggle | `src/components/navigation/Navbar.tsx` | Owner-approved; implemented; local browser check passed |

For the rest of this project, report each finding with evidence, user impact, and a proposed change; separate implementation blockers from recommendations; and wait for explicit approval before editing code. Documentation changes explicitly requested by the owner, such as updating this decision record or the architecture guide, may be made within that request. Keep frontend completion and backend integration as separate phases.

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

## Admin storage hydration and lint suppression

**Decision: Keep admin `localStorage` reads after hydration only for modules that still use browser storage, and suppress the specific effect lint rule at those initialization updates.**

For modules that still use browser storage, admin data getters provide deterministic fallback data during server rendering. The admin pages load saved browser values in an effect after hydration so the initial server and browser output remain consistent. Initializing React state directly from these getters could make those outputs differ and trigger a hydration mismatch. This decision does not apply to modules whose data has moved to MongoDB.

The `react-hooks/set-state-in-effect` rule flags the synchronous state update used to apply the browser-only value. Suppress that rule only on the relevant admin initialization updates, with an inline explanation; do not disable it globally or for unrelated state changes. Revisit this decision if storage moves to an asynchronous server source or a `useSyncExternalStore` adapter with a defined server snapshot.

## MongoDB authority for Enquiries and Services

**Decision: Use MongoDB as the source of truth for Enquiries and Services, and remove their obsolete localStorage helpers.**

The admin screens already read and mutate these modules through authenticated API routes backed by MongoDB. Keeping a second localStorage implementation would create competing sources of truth and make records appear inconsistent between browsers or devices. Shared enquiry domain types now live in `src/types/enquiry.ts`, separate from storage implementation. This cleanup is intentionally limited to Enquiries and Services; other modules keep their current storage until they are migrated and reviewed individually.

The public contact form loads its service choices from `GET /api/services`, so the options match the services admins manage. It submits the selected service ID; the enquiry API verifies that ID against MongoDB and stores both the ID and the current service label. The ID preserves a stable reference, while the label keeps the enquiry readable if the service is later renamed or removed. If service loading fails or no services exist, the form prevents submission rather than presenting stale bundled options.

## MongoDB authority for Works

**Decision: Use MongoDB as the source of truth for Works; keep `WORK_ITEMS` only as migration seed data.**

The public works list, project detail pages, homepage showcase, and sitemap read the works collection. Admin list, create, edit, and delete operations use authenticated API routes. Work images are uploaded through the authenticated Cloudinary upload route and MongoDB stores their URLs rather than browser data URLs, keeping project documents small and usable across browsers.

Legacy browser-saved works are not silently discarded or automatically allowed to overwrite server data. The admin Works list offers an explicit import when it finds the old `admin-works` key, confirms that matching slugs will be replaced, uploads embedded legacy images, and removes that key only after the MongoDB import succeeds. Seed records in `WORK_ITEMS` can be inserted with the existing `scripts/migrate-data.ts` migration; its Works upsert key is the stable slug so renumbered display IDs do not create duplicates.

## MongoDB authority for Events, Gallery, and Client Proof

**Decision: Use MongoDB as the source of truth for Events, Gallery, Testimonials, and Stats. Keep the existing UI and domain behavior while replacing browser persistence with API-backed operations.**

- Events support admin create, edit, and delete; public event listings, detail pages, and sitemap entries read MongoDB. Event writes require an authenticated session and validate event fields and slugs.
- Gallery supports admin create, edit, and delete; its public Bento gallery reads MongoDB. Gallery images upload to Cloudinary as images, and Gallery videos upload as video assets. MongoDB stores the resulting URLs, not file data.
- Testimonials support admin create, edit, and delete; the homepage Client Proof section reads MongoDB. Optional testimonial background images use the authenticated Cloudinary upload route.
- Stats remain a fixed set of three records. Admins can edit values and labels, but cannot add or delete Stats. The API validates the complete three-record update against existing MongoDB records.
- Admin write routes require authentication. Payload validation is still required because browser form constraints can be bypassed and API requests can be malformed; validation checks data shape, field types, allowed values, lengths, and fixed-set invariants before database writes. Authentication and validation address different concerns.
- `scripts/migrate-data.ts` seeds bundled default Gallery, Stats, and Testimonials records with `$setOnInsert`, preserving existing documents with matching IDs. It does not import data saved only in a user's browser localStorage.
- After migration, the only active `localStorage` use found in the application is the explicit legacy Works import (`admin-works`). The `localStorage` text in the Enquiries detail page is commented-out old code, not an active storage path.

## Public form rate limiting

**Decision: Protect public Enquiry and Newsletter submissions at both the application and Vercel edge layers.**

- Application routes use Upstash Redis sliding windows keyed by Vercel-derived client IP: 5 Enquiry submissions and 3 Newsletter submissions per 10 minutes.
- Configure `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` in Vercel for every deployed environment. Production requests fail closed with HTTP 503 when the limiter cannot run; local development is allowed without credentials.
- Configure matching Vercel Firewall rate-limit rules for `POST /api/enquiries` and `POST /api/newsletter`. Firewall rules must be set in the Vercel project dashboard and are not represented by this repository code.

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
