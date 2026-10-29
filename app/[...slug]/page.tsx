import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader, SiteFooter } from "../components/SiteChrome";
import { services, additionalProducts, resourcePages, type Feature } from "../site-content";
import { Actions, FAQs, Sections, Workflow, ProductVisual, ProductGrid, PricingContent, AboutContent, CareersContent, EventsContent, ContactContent, HelpContent, NewsContent, BlogContent, LegalHub } from "../components/PageContent";
import LegalContent from "../components/LegalContent";
import live from "../../content/source/live-content.json";
import shared from "../page.module.css";
import styles from "../interior.module.css";
const allProducts:Feature[]=[...services,...additionalProducts];
const paths=["services","features","pricing",...Object.keys(resourcePages),...allProducts.map(p=>`services/${p.slug}`),...live.blogPosts.map(p=>`blogs/${p.slug}`)];
export const dynamicParams=false;
export function generateStaticParams(){return paths.map(path=>({slug:path.split("/")}))}
function getPage(path:string){const product=allProducts.find(p=>`services/${p.slug}`===path);const post=live.blogPosts.find(p=>`blogs/${p.slug}`===path);const resource=resourcePages[path];return {product,post,resource};}
export async function generateMetadata({params}:{params:Promise<{slug:string[]}>}):Promise<Metadata>{
 const {slug}=await params;const path=slug.join("/");const {product,post,resource}=getPage(path);
 const title=product?.name??post?.title??resource?.title??(path==="pricing"?"Pricing & Credits":"Features");
 const description=product?.summary??post?.excerpt??resource?.description??(path==="pricing"?"Compare Arine plans: ₹3,000 with 1,200 credits, ₹11,000 with 3,450 credits and ₹15,000 with 7,800 credits. Review usage and billing information.":"Explore ARINE’s connected growth workflows for D2C brands, freelancers and agencies, from Meta Automation to future business tools.");
 return {title:`${title} — ARINE Ecosystem`,description,alternates:{canonical:`https://www.arineecosystem.com/${path}`},robots:{index:false,follow:false},openGraph:{title,description,type:post?"article":"website",...(post?{publishedTime:post.date}:{})}};
}
const legalPaths=["privacy","terms","data-deletion","cookie-policy","refund-policy"];
export default async function InteriorPage({params}:{params:Promise<{slug:string[]}>}){
 const {slug}=await params;const path=slug.join("/");if(!paths.includes(path))notFound();
 const {product,post,resource}=getPage(path);const ecosystem=path==="services"||path==="features";const legal=legalPaths.includes(path);
 const title=product?.headline??post?.title??resource?.title??(path==="pricing"?"Clear Plans. Considered Usage.":"One Connected Growth Ecosystem.");
 const description=product?.summary??post?.excerpt??resource?.description??(path==="pricing"?"Compare prices and included credits, then understand the usage rules before choosing your next step.":"Explore ARINE’s growth workflows for D2C brands, freelancers and agencies.");
 return <div className={shared.page}><a className={shared.skipLink} href="#main-content">Skip to content</a><SiteHeader comingSoon={product?.comingSoon}/><main id="main-content" tabIndex={-1} className={styles.main}>
 <section className={styles.hero}><div className={styles.eyebrow}>{product?.name??resource?.category??(post?post.category:"THE ARINE ECOSYSTEM")}{product?.comingSoon&&<span className={styles.comingSoonBadge}>Coming Soon</span>}</div><h1>{title}</h1><p>{description}</p>{post&&<div className={styles.articleMeta}><time dateTime={post.date}>{new Intl.DateTimeFormat("en-IN",{day:"numeric",month:"long",year:"numeric",timeZone:"UTC"}).format(new Date(post.date+"T00:00:00Z"))}</time><span>{post.readTime}</span></div>}{product&&!product.comingSoon&&<Actions/>}</section>
 {product&&<><ProductVisual feature={product}/><Sections sections={product.sections}/><Workflow feature={product}/>{product.faqs&&<FAQs items={product.faqs}/>} {!product.comingSoon&&<section className={styles.closeStatement}><h2>Bring clarity to your next step.</h2><p>Open Arine to review the features available to your account.</p><Actions/></section>}</>}
 {ecosystem&&<><ProductGrid/><div className={styles.narrow}><h2 className={styles.secondaryHeading}>Other product directions</h2><div className={styles.additional}>{additionalProducts.map(p=><a key={p.slug} href={`/services/${p.slug}`}>{p.name}<span>↗</span></a>)}</div></div></>}
 {path==="pricing"&&<PricingContent/>}{path==="about"&&<AboutContent/>}{path==="career"&&<CareersContent/>}{path==="events"&&<EventsContent/>}{path==="help-center"&&<HelpContent/>}{path==="contact"&&<ContactContent/>}{path==="news"&&<NewsContent/>}{path==="blogs"&&<BlogContent/>}{path==="legal"&&<LegalHub/>}{legal&&<LegalContent slug={path}/>}
 {post&&<><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({"@context":"https://schema.org","@type":"BlogPosting",headline:post.title,description:post.excerpt,datePublished:post.date,articleSection:post.category,mainEntityOfPage:`https://www.arineecosystem.com/blogs/${post.slug}`,publisher:{"@type":"Organization",name:"ARINE"}}).replace(/</g,"\\u003c")}}/><article className={styles.articleBody} dangerouslySetInnerHTML={{__html:post.html}}/><section className={styles.related}><h2>Keep reading.</h2>{live.blogPosts.filter(p=>p.slug!==post.slug).sort((a,b)=>Number(b.category===post.category)-Number(a.category===post.category)).slice(0,3).map(p=><a href={`/blogs/${p.slug}`} key={p.slug}><span>{p.category}</span><h3>{p.title}</h3><span>Read article ↗</span></a>)}</section><div className={styles.inlineLinks}><a href="/blogs">← All articles</a></div></>}
 </main><SiteFooter comingSoon={product?.comingSoon}/></div>;
}
