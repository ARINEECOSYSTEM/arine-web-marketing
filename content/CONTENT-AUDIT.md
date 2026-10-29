# ARINE source inventory — updated October 29, 2026

## Sources actually read

1. User’s latest master prompt, including exact role names, contact details,
   September attendance figure, December event direction and price/credit totals.
2. All five pages of `Verification pack.pdf`, dated October 29, 2026. Text was
   extracted and page 1 visually inspected. It references three replacement tabs
   but does not contain their full legal text or exact Google Limited Use wording.
3. The public live website HTML and the public application bundle explicitly
   referenced by that HTML: `assets/index-D3shIcxv.js`, retrieved from
   `https://www.arineecosystem.com/`. The web search fetcher could not access the
   site; an ordinary read-only HTTP request succeeded. No authenticated data or
   website code was executed to recover content; static syntax was parsed.
4. Existing local project, assets, route structure and configured-variable names.
   Only `APP_WEBSITE` was configured; no product backend, credit model configuration
   or support-delivery credentials were present.

## Recovered original content

`content/source/live-content.json` preserves nine full blog Markdown articles and
metadata, five About service pillars, four founder-story stages and the original
cookie tables. Existing source filenames/slugs, date values and copy are retained.
`content/source/*.html` contains static snapshots of the published About and legal
copy for comparison. These are source evidence, not assertions that every old
provider, retention promise or marketing claim remains current.

## Implementation decisions

- New feature copy follows the latest authorized master prompt. Creative Engine
  is no longer marked Coming Soon; Store Management, CFO, CRM, SEO and GEO are.
- Source blog routes remain `/blogs/:slug`; policy paths remain `/privacy`,
  `/terms`, `/data-deletion`, `/cookie-policy`, `/refund-policy`, `/legal`.
- The source’s canonical `https://arine.com/` did not match the requested domain;
  current page canonicals use `https://www.arineecosystem.com/` and exact routes.
- About’s founder narrative and its source growth-range claims are retained as
  published source copy. Those claims should be substantiated before republication;
  no new founder biography, customer evidence or metrics were invented.
- Legal source copy stays separate from explicitly labeled draft additions. The
  user’s contact update is applied to rendered email actions, while original
  snapshots retain the old contact for audit. Broken recovered email/refund anchors
  were linked to actual email drafts, and a source opt-out URL typo was corrected.
- Published legal copy names PayU and several old cookie providers; the pack names
  Razorpay and other providers. These conflicts remain visible review items.
- No general claim of compliance or verification approval was added. The exact
  Limited Use wording is explicitly missing, not guessed or paraphrased as approved.
- Current Google reporting is described according to the pack, including its note
  that data displayed only on an internal test page. No Google Ads editing is claimed.
- False homepage testimonials/performance examples and simulated form-success
  messages were removed; other actual calculator and store-URL behavior remains.
- The news archive remains empty until verified dated announcements are supplied;
  its draft press concept is stored outside the website’s published content.

See `IMPLEMENTATION-CHECKLIST.md` for page completion, validation evidence and
specific publication/configuration blockers.
