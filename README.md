# ARINE Ecosystem website

Marketing website for [ARINE](https://arineecosystem.com), the AI growth operating system for D2C brands.

## Structure

- `src/` – source: styles (`styles.css`, `theme.css`), page templates (`pages.js`, `blog.js`, `core.js`), router and interactions (`init.js`, `theme.js`), images (`assets.js`) and the `<head>` (`head.html`).
- `static/` – favicons and icons copied into the build.
- `scripts/build.mjs` – builds `dist/`: hashed CSS/JS, images as WebP files, one pre-rendered HTML file per page with its own title, description, canonical and structured data.
- `dist/` – the built site that Vercel serves (committed, so Vercel needs no build step).
- `robots.txt`, `sitemap.xml` – copied into `dist/`.
- `vercel.json` – clean URLs, redirects, caching and security headers.

## Edit and deploy

1. Edit files in `src/`.
2. Run `node scripts/build.mjs` (needs Node 18+ and Playwright: `npm i -g playwright && npx playwright install chromium`).
3. Commit and push. Vercel deploys every push to `main` automatically.

## Pages

`/`, `/pricing`, `/meta-ads-automation`, `/google-ads-automation`, `/ai-creative-engine`, `/crm-automation`, `/store-management-automation`, `/seo-automation`, `/geo-automation`, `/virtual-cfo`, `/enterprise`, `/about`, `/events`, `/careers`, `/creators`, `/support`, `/help-centre`, `/blogs`, `/blogs/<slug>`, `/privacy`, `/terms`, `/data-deletion`, `/refund-policy`, `/cookie-policy`, `/signup` (noindex).

## Forms

Careers and support forms post to FormSubmit, which forwards to arine.soem@gmail.com. The first submission sends an activation email to that inbox that must be confirmed once.
