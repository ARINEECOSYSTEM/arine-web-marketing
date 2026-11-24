// Build the static, SEO-ready ARINE site into ./dist
// 1. bundles src/ into hashed CSS + JS assets
// 2. writes one HTML file per route with its own <title>, meta description, canonical and Open Graph tags
// 3. pre-renders each route's content into the HTML (so crawlers and AI bots see real text without JS)
// Usage: node scripts/build.mjs   (needs Playwright with Chromium for step 3)
import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import crypto from 'node:crypto';
import vm from 'node:vm';
import { createRequire } from 'node:module';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const SRC = path.join(ROOT, 'src');
const DIST = path.join(ROOT, 'dist');
const SITE = 'https://arineecosystem.com';
const read = f => fs.readFileSync(path.join(SRC, f), 'utf8');
const hash = s => crypto.createHash('sha256').update(s).digest('hex').slice(0, 10);
const esc = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

fs.rmSync(DIST, { recursive: true, force: true });
fs.mkdirSync(path.join(DIST, 'assets'), { recursive: true });

// ---------- 1. assets ----------
const css = read('styles.css') + '\n' + read('theme.css');
// images: move the inline base64 images out to cacheable files
fs.mkdirSync(path.join(DIST, 'assets/img'), { recursive: true });
const assetsJs = read('assets.js').replace(/"([a-z0-9_-]+)": "data:image\/(\w+);base64,([^"]*)"/g, (m, k, ext, b64) => {
  // blog images keep their SEO file names under /images/blog/; UI images get hashed names
  const buf = Buffer.from(b64, 'base64'), name = k.includes('-') ? `images/blog/${k}.${ext}` : `assets/img/${k}.${hash(b64)}.${ext}`;
  fs.mkdirSync(path.join(DIST, path.dirname(name)), { recursive: true });
  fs.writeFileSync(path.join(DIST, name), buf);
  return `"${k}": "/${name}"`;
});
const js = [assetsJs, ...['core.js', 'pages.js', 'blog.js', 'init.js', 'theme.js'].map(read)].join('\n');
const cssName = `assets/app.${hash(css)}.css`;
const jsName = `assets/app.${hash(js)}.js`;
fs.writeFileSync(path.join(DIST, cssName), css);
fs.writeFileSync(path.join(DIST, jsName), js);
for (const f of fs.readdirSync(path.join(ROOT, 'static'))) fs.copyFileSync(path.join(ROOT, 'static', f), path.join(DIST, f));
fs.copyFileSync(path.join(ROOT, 'robots.txt'), path.join(DIST, 'robots.txt'));

// ---------- 2. route list + SEO data (read from the app itself) ----------
const routes = await (async () => {
  // evaluate the page modules in a tiny fake DOM to read A.SEO and A.POSTS
  const sandbox = { window: {}, document: { documentElement: {}, querySelector: () => null }, matchMedia: () => ({ matches: false }), console };
  sandbox.window = sandbox; vm.createContext(sandbox);
  vm.runInContext(['assets.js', 'core.js', 'pages.js', 'blog.js'].map(read).join('\n') + ';this.__A=A;', sandbox);
  const A = sandbox.__A, out = [];
  for (const [k, v] of Object.entries(A.SEO)) {
    if (k === '404') continue;
    out.push({ key: k, path: v[2], title: v[0], desc: v[1] });
  }
  const POLX = { '/terms': ['Terms', 'Terms of Service | ARINE', 'Read the ARINE terms of service covering accounts, ad platform connections, credits, billing and acceptable use.'],
    '/data-deletion': ['Data deletion', 'Data Deletion Instructions | ARINE', 'How to disconnect accounts and request deletion of your data from ARINE, including Meta and Google data.'],
    '/refund-policy': ['Refunds', 'Refund and Cancellation Policy | ARINE', 'ARINE refund and cancellation policy for monthly and annual plans, credits and top-ups.'],
    '/cookie-policy': ['Cookies', 'Cookie Policy | ARINE', 'Learn which cookies ARINE uses, why we use them and how you can manage your cookie preferences.'] };
  for (const [p, [, t, d]] of Object.entries(POLX)) out.push({ key: 'policy', path: p, title: t, desc: d });
  for (const po of A.POSTS) {
    const pt = (A.PTITLE || {})[po.slug] || po.title;
    out.push({ key: 'blog-' + po.slug, path: '/blogs/' + po.slug, image: po.cover ? { src: `/images/blog/${po.cover[0]}.webp`, alt: po.cover[1], w: po.cover[2], h: po.cover[3] } : null, imgs: (po.body || []).filter(b => b[0] === 'img').map(b => ({ src: `/images/blog/${b[1]}.webp`, alt: b[2] })), title: (pt + ' | ARINE Blog').length <= 60 ? pt + ' | ARINE Blog' : pt, desc: po.ex.length > 160 ? po.ex.slice(0, 157).replace(/\s+\S*$/, '') + '…' : po.ex });
  }
  out.push({ key: '404', path: '/404', title: A.SEO['404'][0], desc: A.SEO['404'][1], noindex: true });
  return out;
})();

// ---------- HTML shell ----------
let head = read('head.html');
head = head.replace(/<meta name="claude:[^>]*>\n?/, '');
const shell = r => {
  const url = r.path === '/404' ? SITE + '/' : SITE + (r.path === '/' ? '/' : r.path);
  let h = head
    .replace(/<title>[^<]*<\/title>/, `<title>${esc(r.title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*/, `$1${esc(r.desc)}`)
    .replace(/(<link rel="canonical" href=")[^"]*/, `$1${url}`)
    .replace(/(<meta property="og:title" content=")[^"]*/, `$1${esc(r.title)}`)
    .replace(/(<meta property="og:description" content=")[^"]*/, `$1${esc(r.desc)}`)
    .replace(/(<meta property="og:url" content=")[^"]*/, `$1${url}`)
    .replace(/(<meta name="twitter:title" content=")[^"]*/, `$1${esc(r.title)}`)
    .replace(/(<meta name="twitter:description" content=")[^"]*/, `$1${esc(r.desc)}`);
  if (r.key.startsWith('blog-')) h = h.replace('<meta property="og:type" content="website">', '<meta property="og:type" content="article">');
  if (r.noindex || r.key === 'signup') h = h.replace(/(<meta name="robots" content=")[^"]*/, '$1noindex, follow');
  return `<!doctype html>
<html lang="en-IN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
${h}
<meta name="arine-mode" content="paths">
${r.image ? `<meta property="og:image" content="${SITE}${r.image.src}">\n<meta property="og:image:width" content="${r.image.w}">\n<meta property="og:image:height" content="${r.image.h}">\n<meta property="og:image:alt" content="${esc(r.image.alt)}">\n<meta name="twitter:image" content="${SITE}${r.image.src}">\n<link rel="preload" as="image" href="${r.image.src}" fetchpriority="high">` : `<meta property="og:image" content="${SITE}/icon-512.png">`}
<link rel="icon" type="image/png" sizes="48x48" href="/favicon.png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="stylesheet" href="/${cssName}">
<noscript><style>.rv,.an,.an .w>span,.w>span{opacity:1!important;transform:none!important;clip-path:none!important}</style></noscript>
<script src="/${jsName}" defer></script>
</head>
<body>
<header class="nav" id="nav"></header><div class="mm" id="mm"></div><main id="view"></main><footer class="foot" id="foot"></footer>
</body>
</html>
`;
};
const fileFor = p => p === '/' ? 'index.html' : p.slice(1) + '.html';
for (const r of routes) {
  const f = path.join(DIST, fileFor(r.path));
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, shell(r));
}

// ---------- 3. pre-render ----------
const MIME = { '.webp': 'image/webp', '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.xml': 'application/xml', '.txt': 'text/plain' };
const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  let f = path.join(DIST, p === '/' ? 'index.html' : p);
  if (!fs.existsSync(f) || fs.statSync(f).isDirectory()) f = path.join(DIST, p.replace(/\/$/, '') + '.html');
  if (!fs.existsSync(f)) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'content-type': MIME[path.extname(f)] || 'application/octet-stream' });
  fs.createReadStream(f).pipe(res);
}).listen(0);
const port = server.address().port;
let chromium;
try { chromium = createRequire(import.meta.url)('playwright').chromium; } catch { console.warn('Playwright not found: skipping pre-render'); }
if (chromium) {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.route(/fonts\.(googleapis|gstatic)\.com|development\.arineecosystem\.com/, r => r.abort());
  for (const r of routes) {
    await page.goto(`http://localhost:${port}${r.path}`, { waitUntil: 'load' });
    await page.waitForTimeout(400);
    const snap = await page.evaluate(() => {
      document.querySelectorAll('#view .rv, #view .an').forEach(e => e.classList.add('in'));
      const ld = document.getElementById('ld-route');
      return { view: document.getElementById('view').innerHTML, nav: document.getElementById('nav').innerHTML, foot: document.getElementById('foot').innerHTML, mm: document.getElementById('mm').innerHTML, ld: ld && ld.textContent.length > 2 ? ld.textContent : '' };
    });
    const f = path.join(DIST, fileFor(r.path));
    let html = fs.readFileSync(f, 'utf8')
      .replace('<header class="nav" id="nav"></header>', `<header class="nav" id="nav">${snap.nav}</header>`)
      .replace('<div class="mm" id="mm"></div>', `<div class="mm" id="mm">${snap.mm}</div>`)
      .replace('<main id="view"></main>', `<main id="view">${snap.view}</main>`)
      .replace('<footer class="foot" id="foot"></footer>', `<footer class="foot" id="foot">${snap.foot}</footer>`);
    if (snap.ld) html = html.replace('</head>', `<script type="application/ld+json" id="ld-route">${snap.ld.replace(/</g, '\\u003c')}</script>\n</head>`);
    fs.writeFileSync(f, html);
    console.log('rendered', r.path);
  }
  await browser.close();
}
server.close();
const today = new Date().toISOString().slice(0, 10);
fs.writeFileSync(path.join(DIST, 'sitemap.xml'), '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n' +
  routes.filter(r => !r.noindex && r.key !== 'signup').map(r => `  <url><loc>${SITE}${r.path === '/' ? '/' : r.path}</loc><lastmod>${today}</lastmod>${[r.image, ...(r.imgs || [])].filter(Boolean).map(im => `<image:image><image:loc>${SITE}${im.src}</image:loc></image:image>`).join('')}</url>`).join('\n') + '\n</urlset>\n');
fs.copyFileSync(path.join(DIST, 'sitemap.xml'), path.join(ROOT, 'sitemap.xml'));
console.log(`done: ${routes.length} pages, ${cssName}, ${jsName}`);
