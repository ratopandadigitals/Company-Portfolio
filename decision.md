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
