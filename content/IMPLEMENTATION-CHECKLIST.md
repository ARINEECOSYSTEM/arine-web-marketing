# ARINE implementation checklist — October 29, 2026

## Implemented in the existing Next.js project

- [x] Shared ivory/navy/forest-teal editorial theme and existing supplied logo.
- [x] FEATURES dropdown: Meta Automation, Google Automation, Creative Engine,
  Store Management, CFO, CRM, SEO, GEO. Only the last five are Coming Soon.
- [x] Resources: About Us, Policies, Careers, Events, Help Center, News.
- [x] Original `/services/:slug` URLs retained; `/features/:slug` redirects there.
  `/career` retained with `/careers` alias; `/help-centre` redirects to Help Center.
- [x] Eight complete feature pages with explanatory content and accessible
  illustrative workflows. Future products have no sign-up/contact controls.
- [x] Meta capabilities grounded in the existing published product policies;
  campaigns described as paused for review, without guaranteed results.
- [x] Google Ads direction distinguished from documented GA4 and Search Console
  read-only connections and the pack’s internal-test-page limitation.
- [x] Creative workflow board, planning, review and iteration explained without
  claiming automatic publishing or testing.
- [x] About introduction, five service pillars and founder-story sequence restored
  from the actual live website, not invented from the brief.
- [x] Four supplied Careers roles, responsibilities and role-specific email drafts.
- [x] Completed September online event with supplied 80+ brands; upcoming December
  event without invented dates, speakers, agendas or registration links.
- [x] Help Center: eight FAQ topics, supplied email and WhatsApp, support form and
  server-side validation. Delivery remains configuration-blocked (see below).
- [x] News layout and reusable dated card template. Press concept kept in an
  unpublished Markdown draft; no fabricated coverage displayed.
- [x] Pricing: ₹3,000 / 1,200 credits; ₹11,000 / 3,450 credits;
  ₹15,000 / 7,800 credits. Equal-weight cards, usage explanation and FAQs.
- [x] Explicit configuration table instead of fabricated action/model usage costs,
  billing labels or checkout actions. No estimator without consumption data.
- [x] Nine original blog posts restored with exact source slugs, titles, dates,
  categories, excerpts, read times and body content. Search, category selection,
  six-per-page pagination, article templates and related posts implemented.
- [x] Public policy URLs retained; current published legal wording recovered and
  restyled. Source snapshots preserved independently from rendered additions.
- [x] Verification-pack supplements added as drafts to Privacy, Terms, Data
  Deletion and Cookies; no claims of approved Google/Meta verification.
- [x] Google scopes, no current Google-to-AI processing, documented Meta permission
  purposes, brand deletion request, sign-in/active-brand cookies and PostHog
  review requirements recorded without inventing production configuration.
- [x] Footer: features/resources/policies/support, original social URLs and dynamic
  copyright year. User-supplied support email used in current contact actions.
- [x] Homepage remains centered with removed eyebrow, product composition and CTAs
  kept removed. Fictional customer metrics/testimonial and simulated-success
  modal forms removed. Store-URL redirect and growth calculator preserved.
- [x] Unique metadata/canonicals and source-supported BlogPosting structured data.
  Interior pages remain noindex in this unpublished review build.
- [x] Lightweight CSS transitions, semantic headings, focus states, reduced motion,
  narrow-screen layouts and scrollable long policy/article tables implemented.

## Verification evidence

- Production build and TypeScript validation passed.
- 36 generated page routes checked; all passed. Nine source articles restored.
- Seven support-route tests passed.
- Generated-page audit: one H1, metadata, resolved internal links, public legal
  links, exact price-credit pairings, roles/event facts, no conversion controls on
  the five Coming Soon pages, no missing article bodies or dead policy anchors.
- Support route tests: malformed fields, missing configuration, cross-origin
  input, honeypot, upstream failure, missing acknowledgement, explicit mocked
  delivery acknowledgement and HTTPS-only delivery configuration.
- No real support messages sent; successful unit-test delivery is mocked.
- Browser inspection was denied by the browser security policy while acquiring
  the existing error-page tab. No workaround was attempted. A fresh visual,
  keyboard and device-size browser pass remains outstanding.

## Required before publication / live delivery

1. **Legal source:** the five-page PDF is a verification checklist, not the three
   replacement legal documents it references. Supply the full approved Privacy
   Policy, Terms and Data Deletion texts and exact approved Google Limited Use
   sentence. Existing September 20, 2026 dates were not replaced with a false
   publication date.
2. **Legal facts:** confirm Grievance Officer, company postal address, hosting,
   actual providers, cookies, retention settings, production permissions and
   brand-level deletion behavior. Current source names PayU; pack names Razorpay.
3. **Support:** configure a real `SUPPORT_WEBHOOK_URL` and optional token for
   `arine.soem@gmail.com`, with explicit delivery acknowledgement. Until then the
   form’s submit button is disabled; direct requests return an honest 503. Working
   email and WhatsApp links remain available.
4. **Pricing:** supply billing period, action/model costs, failed-operation rules,
   credit expiry/carry-over, entitlements and real payment destination.
5. **Product:** confirm current application access and production implementation;
   marketing-source and PDF evidence do not constitute a live product test.
6. **News:** supply the named publication, article URL and date before using any
   press claim. No magazine coverage has been published here.
7. **Browser QA:** refresh/open the local preview and complete device, keyboard,
   console and form checks when browser authority is available.
8. Authorize live publication; no deployment or production account setting changed.
