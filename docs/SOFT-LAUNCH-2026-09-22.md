# Peptis soft-launch assessment: verification and fixes

Verified 22 September 2026 against main at 81e9fde, the supplied 21 September PDF and the live www Terms page.

## Verdict

The assessment was useful but already partly superseded. Main and www now have Terms/Contact, an email gate with consent, a four-category box without supplier notes/collagen, no consultation offering on the main offerings page, a short `/go/ad` page, a plan email form, no public Brand Kit link, and first-party event collection. The old GET `/api/reservations` returning 404 did not establish that the POST signup API had been removed: POST still exists for free summaries.

Eight questions with an email gate after question two is not intrinsically contradictory. We now explain eight core questions plus planning refinements. An open plan is a product decision, not a compliance defect; optional starter-guide email capture remains. Selling collagen would not by itself promise loose-skin prevention, but it is absent from the current box and should remain separate from complete protein. Article length is not a launch pass/fail measure. Do not invent clinical reviewers.

## Changes in this patch

- Replaced placeholder postal text with the business correspondence address in the shared company record: 10 Glenlake Parkway, Suite 130, Atlanta, GA 30328, United States. This is not described as the Wyoming registered office. Company source: shared document “Information Edge Insights LLC”, reviewed 22 September.
- Added consent before the first health question; required consent on server writes. Versioned consent records. Raw questionnaire answers and prescriptions remain in the browser. Explicitly requested summary priorities are stored with the contact and delivered by the email provider.
- Removed third-party analytics and ad-pixel initialization. An allowlist strips all identity, answers, medication/provider data, derived priorities and free-form URLs/properties from first-party analytics. Server-only events cannot be forged through the browser event API. No Meta CAPI lead uploads.
- Added `/admin/funnel`, protected by existing admin authentication, with daily event counts. Counts are not unique people; accepted email is not confirmed inbox delivery.
- Made the email gate await storage success. Added honest email-failure states. Final summary emails now contain actual selected priorities, useful next steps, starter-guide/plan links, the business address and an unsubscribe link. Resource emails contain no unsolicited box sales pitch. Signup retries reuse the saved summary and email idempotency key.
- Added a standalone `/box-updates` form with explicit email consent and saved interest. It does not require health answers. Removed price-lock promises; $59/month is a target until commercial terms are confirmed. Legacy `/go/box` redirects here; `/go/care` redirects to the free quiz.
- Removed SMS collection and legacy clinical/supplier copy from alternate landing pages. Aligned Privacy, Health Data and Terms with actual collection and sending behavior.
- Corrected `/plan` copy: email sends the starter guide; the custom programme stays on the device and can be exported. No claim that a custom programme is attached to an email account.
- Added page-specific server metadata, real 404s including unknown publication categories and blog slugs, and a sitemap entry for box updates.
- Added production signup readiness checks: require an email key and DATA_DIR inside a Railway volume. Without them, respond 503 rather than claim that an ephemeral record is a durable signup. The UI explains temporary email unavailability and allows the free quiz and on-screen plan to continue.

## Validation

Run `npm ci`, `npm run build`, `npm run lint`, `npm run test:launch`.

Integration suite covers legal-page metadata; nested 404s; analytics data minimisation; rejection without consent; raw-answer exclusion; final summary content; postal address and unsubscribe link; idempotent retry; box opt-in; suppression after unsubscribe; email failures; authenticated funnel reporting. Email transport is mocked and sends nothing externally.

## Production dependencies still open

Railway production, peptis-web: connected to main. Its rendered variable list contains no RESEND_API_KEY, DATA_DIR or ADMIN_TOKEN. Runtime logs say data dir `/app/data` and admin desk off. Service configuration shows no volume mount. These are genuine launch blockers; a code push does not establish email delivery, durable leads or admin access.

A read-only container inspection confirmed `/app/data` is empty: no signup records need migrating. A 1 GB `peptis-data` volume and DATA_DIR=/app/data have now been staged. Activation and persistence across a restart still need verification. Configure a Peptis-owned verified email sender/API key and the existing admin authentication securely. The connected Resend account currently lists only glp.directory; do not reuse that independent business's domain as Peptis's sender.

Live bare-domain `/terms` returned a 502 in the cloud browser; `www.peptis.com/terms` rendered. Both domains are attached to Railway. Investigate apex routing/DNS separately. Use www for validation and do not assume the root-domain problem is fixed by this code.

No supplier launch date, fixed founding-price commitment, named clinical reviewer or company-account ownership was invented. Confirm those operational facts. Counsel should check the final notices and consent for the actual markets and processors; this patch is not legal clearance.

Physical iPhone/Android layout, mobile PDF export and live mailbox receipt remain unverified. The cloud browser cannot reach the local preview; do not report local API integration checks as a completed mobile/browser test.

## Controlled acquisition test (proposal, no spend authorized here)

Use `/go/ad` after operational checks pass. Proposed ceiling from the assessment: £1,000 over 7–10 days. Record actual USD spend at the platform's applied exchange rate rather than mixing currencies. Review days 3 and 10.

| Metric | Proposed hypothesis | Definition / caveat |
|---|---|---|
| Cost per valid signup | Below $5 | USD spend / deduplicated, consenting, deliverable leads; exclude internal tests and obvious fraud |
| Quiz-to-signup | At least 40% | Distinct valid quiz signups / quiz starts. Current anonymous counters measure events, not unique visitors; reconcile deduplicated lead counts and state that limitation |
| Box demand | At least 10% | Confirmed box opt-ins / valid free signups. Report CTA clicks separately; a click is not a reservation or willingness to pay |
| Week-one engagement | 35% opens is only a diagnostic | Prefer guide/plan use and replies; privacy mail features make opens unreliable |
| Safety / quality | Zero health data in analytics; consent present on every new saved summary | Inspect controlled test data and export only consent-eligible contacts |

Stop traffic on broken signup/email delivery, missing consent or lost data. A cheap email lead does not establish commercial demand; test a real purchasable offer only after fulfillment and terms are ready.

Production acceptance: one controlled signup received in a test inbox; correct summary; working unsubscribe; no subsequent marketing after opt-out; observable server events; records survive redeployment; terms/contact/privacy/404 routes; mobile quiz/plan/export. Supplier dates, account ownership and counsel review have named human owners before any paid launch.

Email reference: FTC CAN-SPAM business guidance, https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business (reviewed 22 September 2026). It supports postal address and opt-out requirements; it does not establish that these pages are fully compliant with every applicable law.
