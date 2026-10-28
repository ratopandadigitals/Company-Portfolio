# Development Rules

These rules describe how to plan and change this portfolio repository. Preserve the existing visual design unless a UI change is explicitly requested.

## Delivery Order

1. **Public frontend first:** agree on routes, content, layout, responsive behavior, accessibility, and interaction states.
2. **Admin panel second:** build or review the management workflows that correspond to the public content. Keep admin controls and public presentation separate.
3. **Backend third:** connect approved frontend and admin workflows to authenticated APIs, MongoDB, Cloudinary, email, or other external services.

A feature may be developed across phases when the owner requests it, but keep the responsibilities clear and do not silently redesign the public UI during backend integration.

## Discussion and Approval

- For audits, explain the finding, its impact, and a narrow proposed fix before editing.
- Work on one approved finding or feature at a time. Make the smallest change that addresses it, validate that change, then report the result and wait before moving to the next item.
- Ask a concise question when the requested behavior, data ownership, security boundary, or migration effect is ambiguous.
- Do not broaden an approved task to adjacent refactors. Never overwrite unrelated or user-authored working-tree changes.

## Project Structure

- `src/app/` owns Next.js App Router routes, route handlers, and page composition. Keep route files focused on loading/composing the page or implementing HTTP contracts.
- `src/components/atoms/` contains small reusable UI primitives such as buttons, inputs, containers, headings, and links.
- `src/components/sections/<domain>/` contains public page sections grouped by domain, such as `home`, `services`, `works`, `events`, `gallery`, `about`, and `contact`.
- `src/components/admin/` contains admin-only UI: layouts, dashboard pieces, tables, and domain-specific forms.
- `src/features/<domain>/` is for domain behavior that is shared across routes or has enough complexity to warrant a feature boundary. Do not create a feature wrapper for a one-off component.
- `src/lib/` contains server-side infrastructure and shared domain helpers such as MongoDB access, auth, validation, mail, rate limiting, and notifications.
- `src/data/` contains static seed/default data and typed API clients where one already exists. Static seed data is not a second runtime source of truth for MongoDB-backed modules.
- `src/types/` contains shared data contracts that do not belong to one presentation component.
- `public/` contains static assets. Uploaded media should use the existing Cloudinary upload flow and MongoDB should store its URL, not a browser data URL.

## Component Boundaries

- Build from the page inward: route composition, domain section or feature, then reusable atoms where there is real reuse.
- Keep public presentation in `components/sections`; keep management presentation in `components/admin`.
- Prefer local state for a component-owned interaction. Introduce shared/global state only when multiple distant parts of the app genuinely need the same live state.
- Use server components and direct server-side data reads for page-level public data where appropriate. Use client components for interactions and browser APIs.
- Reuse the repository’s established design system and existing markup when a task is about data integration or backend behavior.

## Data and API Rules

- MongoDB is the runtime source of truth for migrated content. Keep seed values in their existing data modules and migrate them idempotently; do not silently overwrite live records.
- Public reads may be unauthenticated when the content is public. Admin writes must verify an authenticated session in the API, not only hide controls in the UI.
- Authentication and input validation solve different problems. Validate API payload shape, field types, allowed values, lengths, and module invariants on the server.
- Use MongoDB indexes for uniqueness and frequent lookup/order fields. Make ID allocation concurrency-safe; application-level check-then-insert logic alone is not a uniqueness guarantee.
- For public submissions that send email, use shared application-level rate limits and the configured Vercel edge protections. Do not use in-memory rate-limit state across serverless instances.
- Persist admin notifications for the agreed events; notification failure must not make an already successful primary operation appear to have failed, except where both writes are intentionally part of a transaction.
- Keep API response and error behavior consistent with neighboring routes. Include loading, empty, error, and retry states in admin data views where applicable.

## Validation and Handoff

- After each focused edit, run the narrowest relevant lint, type, or test check; then run broader checks when the change crosses shared contracts.
- Report checks that fail and distinguish pre-existing failures from changes introduced by the current task.
- Database migrations that create indexes or counters must be run explicitly against the intended database. Do not run destructive migrations or alter production data without approval.
- Do not commit, push, or change branches unless explicitly requested.
