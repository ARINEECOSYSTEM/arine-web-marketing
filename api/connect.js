// /connect?website=yourstore.com -> redirects to the ARINE app login with the store URL
// (kept from the previous site so existing links keep working)
const DEFAULT_APP = 'https://app.arineecosystem.com/';
const esc = v => String(v).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
function appBase() {
  const c = (process.env.APP_WEBSITE || DEFAULT_APP).trim();
  try { const u = new URL(/^[a-z][a-z\d+.-]*:\/\//i.test(c) ? c : 'https://' + c); return ['https:', 'http:'].includes(u.protocol) && !u.username ? u.origin + '/' : DEFAULT_APP; } catch { return DEFAULT_APP; }
}
function validStore(v) {
  if (!v || v.length > 2048 || /\s/.test(v)) return false;
  try {
    const u = new URL(/^https?:\/\//i.test(v) ? v : v.startsWith('//') ? 'https:' + v : 'https://' + v);
    return ['https:', 'http:'].includes(u.protocol) && !u.username && !u.password && u.hostname.includes('.') && u.hostname.split('.').every(p => /^[a-z\d](?:[a-z\d-]*[a-z\d])?$/i.test(p));
  } catch { return false; }
}
module.exports = (req, res) => {
  const website = (new URL(req.url, 'https://x').searchParams.get('website') || '').trim();
  const target = new URL('/login', appBase());
  if (website && !validStore(website)) {
    res.statusCode = 400; res.setHeader('Content-Type', 'text/html; charset=utf-8'); res.setHeader('Cache-Control', 'no-store');
    return res.end(`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>Check your store URL | ARINE</title><style>body{margin:0;padding:80px 24px;background:#F4F6F9;color:#0A1621;font:16px/1.6 system-ui,sans-serif}main{max-width:560px;margin:auto}h1{font-size:40px;letter-spacing:-.03em;margin:0 0 12px}form{display:flex;gap:10px;flex-wrap:wrap;margin-top:20px}input{flex:1;min-width:200px;padding:14px;border:1px solid #E2E8EF;border-radius:12px;font:inherit}button{padding:14px 22px;border:0;border-radius:12px;background:#06202D;color:#fff;font:inherit;cursor:pointer}a{color:#0A8CA0}</style></head><body><main><h1>Check your store URL.</h1><p>Enter a valid store URL, such as yourstore.com.</p><form action="/connect" method="get"><input name="website" aria-label="Store URL" value="${esc(website.slice(0, 2048))}"><button type="submit">Connect</button></form><p><a href="/">Back to home</a></p></main></body></html>`);
  }
  if (website) target.searchParams.set('website', website);
  res.statusCode = 303; res.setHeader('Location', target.href); res.setHeader('Cache-Control', 'no-store'); res.end();
};
