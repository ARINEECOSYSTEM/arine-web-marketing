import { buildStoreLoginUrl } from "../lib/store-connection";
const escapeHtml=(value:string)=>value.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#39;');
export function GET(request:Request) {
 const website=new URL(request.url).searchParams.get('website')||'';
 try{
  const destination=buildStoreLoginUrl(website,process.env.APP_WEBSITE);
  return new Response(null,{status:303,headers:{Location:destination,'Cache-Control':'no-store'}});
 }catch{
  // Native form submissions still receive useful validation when JavaScript is unavailable.
  return new Response(`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>Check your store URL — ARINE</title><style>*{box-sizing:border-box}body{margin:0;padding:80px 24px;background:#f7f6f2;color:#17212b;font:15px/1.7 Arial,sans-serif}main{max-width:560px;margin:auto}h1{font:400 42px/1.15 Georgia,serif;letter-spacing:-1px}label{display:block;margin:24px 0 8px}form{display:flex;gap:10px;flex-wrap:wrap}input{flex:1;min-width:180px;padding:14px;border:1px solid #cbd5c7;background:white;font:inherit}button{padding:14px 22px;background:#17212b;color:#fff;border:0;cursor:pointer;font:inherit}a{display:inline-block;color:#315e58;margin-top:30px}input:focus-visible,button:focus-visible,a:focus-visible{outline:2px solid #315e58;outline-offset:4px}</style></head><body><main><p>ARINE ECOSYSTEM</p><h1>Check your store URL.</h1><p id="url-error">Enter a valid store URL, such as yourstore.com or https://yourstore.com.</p><label for="website">Store URL</label><form action="/connect" method="get"><input id="website" name="website" maxlength="2048" inputmode="url" autocomplete="url" aria-describedby="url-error" value="${escapeHtml(website.slice(0,2048))}"><button type="submit">Connect →</button></form><a href="/">← Back to home</a></main></body></html>`,{status:400,headers:{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store'}});
 }
}
