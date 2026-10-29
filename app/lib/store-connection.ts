const DEFAULT_APP_WEBSITE = "https://app.arineecosystem.com/";
export function normalizeStoreUrl(input: string): string {
 const value=input.trim();
 if(!value||value.length>2048||/\s/.test(value))throw new Error("Enter a valid store URL, such as yourstore.com.");
 let url:URL;
 try{url=new URL(/^https?:\/\//i.test(value)?value:value.startsWith('//')?`https:${value}`:`https://${value}`)}catch{throw new Error("Enter a valid store URL, such as yourstore.com.")}
 if(!['https:','http:'].includes(url.protocol)||url.username||url.password||!url.hostname.includes('.')||!url.hostname.split('.').every(part=>/^[a-z\d](?:[a-z\d-]*[a-z\d])?$/i.test(part)))throw new Error("Enter a valid store URL, such as yourstore.com.");
 return url.href;
}
export function buildStoreSignupUrl(input:string,appWebsite=DEFAULT_APP_WEBSITE):string {
 const website=normalizeStoreUrl(input);
 const target=new URL('/signup',appWebsite||DEFAULT_APP_WEBSITE);
 if(!['https:','http:'].includes(target.protocol))throw new Error("Application URL must use HTTP or HTTPS.");
 target.searchParams.set('website',website);
 return target.href;
}
