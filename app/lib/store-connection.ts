const DEFAULT_APP_WEBSITE = "https://app.arineecosystem.com/";
export function normalizeStoreUrl(input: string): string {
 const value=input.trim();
 if(!value||value.length>2048||/\s/.test(value))throw new Error("Enter a valid store URL, such as yourstore.com.");
 let url:URL;
 try{url=new URL(/^https?:\/\//i.test(value)?value:value.startsWith('//')?`https:${value}`:`https://${value}`)}catch{throw new Error("Enter a valid store URL, such as yourstore.com.")}
 if(!['https:','http:'].includes(url.protocol)||url.username||url.password||!url.hostname.includes('.')||!url.hostname.split('.').every(part=>/^[a-z\d](?:[a-z\d-]*[a-z\d])?$/i.test(part)))throw new Error("Enter a valid store URL, such as yourstore.com.");
 return url.href;
}
export function normalizeAppWebsite(appWebsite=DEFAULT_APP_WEBSITE): string {
 const configured=appWebsite.trim();
 if(!configured||/\s/.test(configured))return DEFAULT_APP_WEBSITE;
 try {
  const candidate=configured.startsWith('//')?`https:${configured}`:/^[a-z][a-z\d+.-]*:\/\//i.test(configured)?configured:`https://${configured}`;
  const base=new URL(candidate);
  if(!['https:','http:'].includes(base.protocol)||base.username||base.password||!base.hostname)return DEFAULT_APP_WEBSITE;
  return `${base.origin}/`;
 } catch {
  return DEFAULT_APP_WEBSITE;
 }
}
export function getAppLoginUrl(appWebsite=DEFAULT_APP_WEBSITE): string {
 return new URL('/login',normalizeAppWebsite(appWebsite)).href;
}
export function buildStoreLoginUrl(input='',appWebsite=DEFAULT_APP_WEBSITE):string {
 const target=new URL(getAppLoginUrl(appWebsite));
 const website=input.trim();
 if(website){
  normalizeStoreUrl(website);
  target.searchParams.set('website',website);
 }
 return target.href;
}
