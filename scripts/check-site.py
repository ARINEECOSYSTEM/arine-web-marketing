import json,re
from pathlib import Path
from html import unescape
from urllib.parse import urlsplit
from lxml import html
manifest=json.loads(Path('.next/prerender-manifest.json').read_text())
paths={p for p in manifest['routes'] if not p.startswith('/_') and p!='/favicon.ico'}
aliases={'/help-centre','/careers','/policies'}
failures=[]
for route in sorted(paths):
 file=Path('.next/server/app'+('/index' if route=='/' else route)+'.html')
 tree=html.fromstring(file.read_text())
 def check(condition,note):
  if not condition:failures.append(route+': '+note)
 check(not tree.xpath('//a[contains(@href,"development.arineecosystem.com")]'),'development application link remains')
 check(len(tree.xpath('//h1'))==1,'must have exactly one h1')
 check(bool(tree.xpath('//title/text()')),'missing title')
 check(bool(tree.xpath('//meta[@name="description"]/@content')),'missing description')
 check(bool(tree.xpath('//a[@href="/privacy"]')),'missing public privacy link')
 check(bool(tree.xpath('//a[@href="/data-deletion"]')),'missing deletion link')
 for href in tree.xpath('//a/@href'):
  if href.startswith('/') and not href.startswith('//'):
   target=urlsplit(href).path
   check(target in paths or target in aliases or target.startswith('/features/'),'unknown internal link '+href)
 if route.startswith('/services/') and route.split('/')[-1] in {'store-management','cfo','crm','seo','geo'}:
  check('Coming Soon' in tree.text_content(),'missing coming-soon status')
  check(not tree.xpath('//main//button|//main//form'),'coming-soon page has conversion control')
  check(not tree.xpath('//a[contains(@href,"mailto:")]|//a[contains(@href,"/signup")]|//a[contains(@href,"development.arineecosystem.com")]|//a[contains(@href,"app.arineecosystem.com")]'),'coming-soon page has signup/contact action')
 if route=='/pricing':
  text=tree.text_content()
  for pair in [('₹3,000','1,200'),('₹11,000','3,450'),('₹15,000','7,800')]:
   check(any(all(v in a.text_content() for v in pair) for a in tree.xpath('//article')),'price-credit mismatch '+str(pair))
  check(not tree.xpath('//a[contains(@href,"checkout")]'),'unexpected checkout link')
 if route=='/career':
  for role in ['Software Developer','Sales Manager','Marketing Operations Manager','Performance Marketing Manager']:check(role in tree.text_content(),'missing role '+role)
  check(len(tree.xpath('//a[starts-with(@href,"mailto:arine.soem@gmail.com?subject=Application")]'))==4,'missing application links')
 if route=='/events':
  for text in ['80+','Completed','Upcoming','December']:check(text in tree.text_content(),'missing supplied event detail '+text)
 if route=='/':
  check('Meera S.' not in tree.text_content(),'fictional testimonial remains')
  check('OPTIMISED 82 CAMPAIGNS' not in tree.text_content(),'fictional customer metrics remain')
  check('Start with ARINE' not in tree.text_content(),'removed CTA returned')
  check('Illustrative campaign control centre' not in file.read_text(),'removed hero visual returned')
 if route.startswith('/blogs/'):
  check(len(tree.xpath('//main//article//h2'))>0,'article body not rendered')
 for href in tree.xpath('//a[not(@href)]'):
  failures.append(route+': anchor without destination: '+href.text_content()[:70])
print(json.dumps({'page_routes_checked':len(paths),'blog_articles':len([p for p in paths if p.startswith('/blogs/')]),'failures':failures},indent=2))
raise SystemExit(1 if failures else 0)
