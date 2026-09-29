# Frontend Audit and Testing Plan

Audit date: 2026-09-29  
Scope: Current public-facing Next.js portfolio routes and shared site shell. This is a source and local-runtime UX audit, not a security review or legal review. No application implementation was changed as part of this audit.

## Audit Status

The source was reviewed for all 15 principles in `AGENTS.md`, across the route files, shared navigation/footer, contact and newsletter forms, event/work detail pages, gallery lightbox, FAQs, team controls, metadata, and representative data. The supplied audit instructions reference an additional heuristics reference file that was not available in the workspace; the complete 15-principle checklist in `AGENTS.md` was used instead.

All 11 declared routes were requested locally: `/`, `/about`, `/services`, `/works`, `/works/thrift`, `/events`, `/events/design-systems-workshop`, `/gallery`, `/contact`, `/privacy-policy`, and `/terms-and-conditions` returned HTTP 200. An unknown route returned HTTP 404 and rendered the custom not-found message. This is a smoke check using the development server, not a production-host test.

The homepage was visually inspected at desktop (1440 x 900) and mobile (390 x 844). The measured document width did not exceed the viewport at either size. The mobile navigation control was present and initially reported `aria-expanded="false"`. No complete route-by-route visual review, interaction walkthrough, keyboard-only pass, assistive-technology pass, or cross-browser pass has been completed.

## Findings

Severity scale: 4 = users cannot complete a task or may suffer serious harm; 3 = major task failure or recurring misleading behavior; 2 = noticeable barrier with a workaround; 1 = cosmetic. Severity reflects user impact, not implementation effort.

### Severity 3 - Major

1. **Event cards offer registration for dates already past.** Principle: match between system and real world; error prevention. `src/data/events.ts` marks March 14 and April 22, 2026 as `upcoming`, although the audit date is September 29, 2026. Visitors may try to book an event that has already happened. Verify dates and statuses against the event owner before launch and ensure the upcoming filter only includes future events.

2. **Primary inquiry and subscription actions do not deliver submissions.** Principles: visibility of system status; error recovery; tolerance and forgiveness. `src/components/sections/contact/ContactSection.tsx` logs data locally, clears the entered values, and shows a modal; `src/components/navigation/Footer.tsx` similarly logs the email and displays “Thanks for subscribing!” without subscribing. The contact modal discloses that no email was created, but only after the user submits. Visitors can lose their typed inquiry and believe they have contacted the studio. Before launch, either connect a real delivery endpoint/service or clearly describe the controls as a non-submitting demo and provide a working `mailto:` or other contact route. Do not clear user input until an actual outcome is known.

### Severity 2 - Minor

3. **Dialogs do not provide complete keyboard/focus management.** Principles: user control and freedom; accessibility; error recovery. The contact, newsletter, event-registration, and gallery lightbox overlays did not show Escape dismissal, focus trapping, or focus restoration in the initial review; the gallery lightbox also lacked dialog semantics. Keyboard and screen-reader users may become disoriented or tab behind an overlay. **Status 2026-09-29:** implemented shared focus placement, Tab containment, Escape dismissal, and focus restoration for these dialogs; the gallery dialog now has a name and its thumbnail controls are inside the dialog boundary. Local browser checks passed for the exercised open/close/focus paths. Cross-browser and assistive-technology verification remains pending.

4. **Gallery tiles and founder selectors are not keyboard-operable controls.** Principles: flexibility and efficiency; affordances and signifiers; accessibility. In the initial review, `src/components/sections/gallery/BentoGallery.tsx` opened items from clickable `motion.div` elements, and `src/components/sections/about/FounderSection.tsx` changed the active founder from clickable `div` elements, without button semantics or keyboard handling. Keyboard-only visitors could not reliably reach or activate these controls. **Status 2026-09-29:** gallery tiles and thumbnails now use labeled native buttons with a pressed state; local checks verified dialog focus and thumbnail selection. Native buttons provide standard Enter/Space activation. Founder selectors remain unmodified and need a separate approved change.

5. **The contact name label is not associated with its field.** Principles: recognition over recall; accessibility. In `src/components/sections/contact/ContactSection.tsx`, “Your Name” has no `htmlFor`, and its input has no matching `id`; clicking the label does not focus the field and assistive technology may not announce the label. Add a stable matching `id`/`htmlFor` pair.

6. **The events route nests a main landmark.** Principle: structure; accessibility. `src/app/events/page.tsx` renders `<main>` inside the `<main>` already provided by `src/app/layout.tsx`. Multiple nested main landmarks make page structure less predictable for assistive-technology navigation. Replace the route-level wrapper with a neutral container or section.

7. **Some public team profile links are placeholders.** Principles: match between system and real world; error prevention; consistency. `src/components/sections/about/MemberSection.tsx` contains `#` social destinations and comments indicating the photos should be replaced. Visitors can be sent to the page top instead of a profile, and unverified names/photos may misrepresent the team. Confirm all profiles and destinations or omit unavailable links and profiles.

8. **Global social links include generic destinations.** Principle: match between system and real world. `src/components/navigation/Footer.tsx` points Twitter and LinkedIn labels to platform homepages rather than the studio's profiles. Visitors intending to follow the studio reach unrelated generic pages. Replace with verified profile URLs or remove those links.

9. **Legal and privacy statements need an owner accuracy review.** Principles: consistency and standards; error prevention; help and documentation. The policy pages describe collection, cookies, marketing, third-party services, and business/legal arrangements. The audit did not verify that these practices or business details match the site's actual production configuration. Visitors may make decisions based on inaccurate disclosures. Have the owner and, where appropriate, a qualified legal reviewer confirm the copy before public release; this finding is not legal advice.

10. **Current-page styling may not identify detail-route context.** Principle: recognition over recall; consistency and standards. `src/components/navigation/Navbar.tsx` marks a link active only when `pathname === item.href`; a visitor on `/works/[slug]` or `/events/[slug]` may not see Works or Events selected. Consider matching route prefixes for detail pages if the active navigation state is intended to persist.

## Fifteen-Principle Coverage

| Principle | Audit result |
| --- | --- |
| 1. Visibility of System Status | Finding 2: demo submission feedback can be mistaken for delivery; no real pending/success/failure lifecycle exists. |
| 2. Match Between System and Real World | Findings 1, 7, 8, 9: stale event dates, unverified profiles, generic social destinations, and unverified policy claims. |
| 3. User Control and Freedom | Dialogs and the mobile menu now support Escape dismissal; dialog focus is contained and restored. Mobile-menu dismissal on route selection still needs runtime verification. |
| 4. Consistency and Standards | Findings 9 and 10: policy claims need validation; active navigation may disappear on detail routes. |
| 5. Error Prevention | Findings 1, 2, 7, 9: prevent booking past events, avoid false form completion, and verify public claims. Browser-native required/email validation exists on form fields that declare it. |
| 6. Recognition Over Recall | Finding 5: contact name label is not associated with its field; route context may be missing on detail pages. |
| 7. Flexibility and Efficiency | Gallery tiles and thumbnails are keyboard-operable; founder selectors still need keyboard semantics. Cross-browser interaction checks remain pending. |
| 8. Aesthetic and Minimalist Design | Homepage hierarchy and restrained red/neutral palette were visually inspected at two sizes; remaining routes and design coherence were not visually audited. No verified finding recorded from this limited sample. |
| 9. Error Recovery | Finding 2: no real submission failure/retry lifecycle and contact values are cleared after local demo submit. |
| 10. Help and Documentation | FAQ section supplies grouped answers and visible questions; no additional contextual help finding was verified. |
| 11. Affordances and Signifiers | Gallery tiles/thumbnails now use native buttons; founder selectors remain non-native clickable elements. |
| 12. Structure | Finding 6: nested main landmark on events. Shared header, main content, footer, and legal article structure are present. |
| 13. Accessibility | Dialog semantics and keyboard focus handling were improved; remaining source findings include the contact label, nested landmark, and founder selectors. Contrast and screen-reader output still need measured/manual testing. |
| 14. Perceptibility | Interactive filters and accordion buttons have visible state styling; mobile/desktop visual-state combinations and contrast were not fully validated. |
| 15. Tolerance and Forgiveness | Finding 2 remains: contact data is cleared after demo submission. Dialog Escape dismissal and focus restoration are implemented; broader recovery states remain pending. |

## Strengths

- Shared layout provides a consistent navigation, main-content region, footer, document language, local fonts, and global title/description metadata (`src/app/layout.tsx`).
- Navigation exposes mobile menu state with `aria-expanded` and `aria-controls`; Escape closes it and returns focus to the toggle (`src/components/navigation/Navbar.tsx`).
- FAQ items use native buttons with `aria-expanded`/`aria-controls` and visible focus styling (`src/components/sections/Faq/FaqSection.tsx`).
- Work and event detail routes handle unknown slugs with `notFound()`, and the custom not-found page gives a clear route back home.
- Reduced-motion CSS support exists in `src/app/globals.css`; validate its coverage against every animation during the dedicated motion test phase.

## Test Phases

### Phase 0 - Source and build gates

Purpose: catch lint, type, and compile failures before browser review.

Completed 2026-09-29:

- `npm run lint` - passed with no reported errors or warnings.
- `npx tsc --noEmit` - passed.
- `npm run build` - passed; static routes prerendered and work/event detail routes are server-rendered on demand.

### Phase 1 - Route smoke checks

Purpose: confirm expected routes render and unknown routes return the custom 404.

Completed 2026-09-29 against the local Next.js development server: all 11 routes listed in Audit Status returned HTTP 200; `/not-a-real-route` returned HTTP 404 and rendered the custom not-found heading. Repeat against a production preview before launch.

### Phase 2 - Responsive and visual review

Purpose: verify layout, content fit, images, hierarchy, and interactions at representative phone/tablet/desktop sizes.

Partially completed: homepage inspected at 390 x 844 and 1440 x 900; no horizontal overflow was measured at those viewports. The gallery was also visually opened at the phone viewport. Other routes, tablet widths, long-content edge cases, light theme, and responsive interaction states remain untested. Review every public route at agreed phone, tablet, and desktop widths and record any exceptions before sign-off.

### Phase 3 - Interaction, accessibility, and motion

Partially completed: after the approved fixes, the mobile menu opened, exposed its links, and closed on Escape with focus returned to its toggle. The contact dialog opened with focus inside, kept focus in the dialog on Tab, closed on Escape, and returned focus to the previously focused field. The newsletter dialog opened with focus on Close, closed on Escape, and returned focus to Subscribe Us. The event dialog focused its name field, contained Tab, and closed on Escape with focus returned to its trigger. The gallery dialog exposed its title and named close control, contained focus across the close button and thumbnail buttons, updated the selected thumbnail state, closed on Escape, and returned focus to its opening tile. Contact-name label association was checked and remains missing. These checks used the local development preview and browser-dispatched key events; they do not replace real-device, cross-browser, or assistive-technology testing.

Still pending: verify mobile-menu dismissal after route navigation, theme switch, work/event filters and detail navigation, FAQ keyboard activation, founder controls, full keyboard-only navigation, screen-reader output, contrast, reduced motion, and all remaining input/error states. Re-test findings after approved fixes. Browser automation did not reliably verify FAQ activation or menu closure after route selection, so those checks are not marked passed or failed.

### Phase 4 - Production preview and owner acceptance

Not completed. Deploy a preview to the intended Next.js host, verify environment/domain/HTTPS and all route URLs, inspect browser console and network failures, test real contact behavior selected for launch, review legal/content/assets, and capture owner approval. Do not call the frontend launch-ready solely because the build passes.

### Phase 5 - Admin and backend (later delivery)

Not started and intentionally separate from public frontend sign-off. First agree whether the admin is a route in this app or a separate app. A mock-data admin can be prototyped independently; before production use, test authentication, authorization, persistence, validation, auditability, failure/retry behavior, and public-site data propagation. Do not treat a frontend-only admin as secure or as a real CMS.

## Launch Gate

- [ ] Owner confirms public route list and approves all project, service, team, event, image, contact, and legal content.
- [ ] Event dates/statuses are corrected and verified.
- [ ] Contact and newsletter launch behavior is explicit; real inquiries have a working route.
- [ ] Severity 3 findings are resolved or explicitly accepted with a documented workaround.
- [ ] Responsive route-by-route review and interaction/accessibility phases are completed.
- [ ] Lint, TypeScript, and production build pass on the final approved code.
- [ ] Production preview smoke test passes and owner approves the public frontend.