import {origin,seoHead} from './seo.mjs';
import {mkdir,readFile,writeFile,copyFile} from 'node:fs/promises';
const pages=JSON.parse(await readFile('src/content/pages.json','utf8'));
const home=await readFile('src/content/home.html','utf8');
await mkdir('dist/assets',{recursive:true});
const assets=['global-reticulum-cover-v1.webp','opening-community-cover-v1.webp','logo-optimized.png','logo-filter.svg','favicon.svg','nova-scotia-coast-v1.webp','cooler-node-concept-v1.webp','lora-glovebox-v1.webp','social-coast.jpg'];
for(const asset of assets)await copyFile('src/assets/'+asset,'dist/assets/'+asset);
await copyFile('src/style.css','dist/assets/style.css');
const nav=[['/network/','Network'],['/projects/','Projects'],['/hardware/','Hardware'],['/field-notes/','Build reports'],['/assistance/','Work with us']];
function shell(title,body,path='/'){return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">${seoHead(path)}<link rel="stylesheet" href="/assets/style.css?v=20261116"><link rel="icon" href="/assets/favicon.svg" type="image/svg+xml"></head><body class="${path==='/'?'home-coastal':'inner-page'}"><a class="skip" href="#main">Skip to content</a><header><a class="brand" href="/" aria-label="ciXnet home"><img src="/assets/logo-optimized.png" alt="ciXnet"><span>NETWORK ENGINEERING</span></a><nav aria-label="Main navigation">${nav.map(([url,label])=>`<a ${(url===path||((url==='/projects/'||url==='/field-notes/'||url==='/network/')&&path.startsWith(url)))?'aria-current="page"':''} href="${url}">${label}</a>`).join('')}</nav><a class="github" href="https://github.com/Thorian">GitHub ↗</a></header><main id="main">${body}</main><footer><a class="footer-brand" href="/">ci<span class="brand-x">X</span>net<span>Network engineering & development.</span></a><nav class="footer-nav" aria-label="Footer"><a href="/configurations/">Configuration</a><a href="/about/">About ciXnet</a><a href="/assistance/">Project enquiries</a></nav></footer></body></html>`}
await writeFile('dist/index.html',shell('Network engineering & development',home));
for(const [slug,[title,headline,body]] of Object.entries(pages)){await mkdir(`dist/${slug}`,{recursive:true});await writeFile(`dist/${slug}/index.html`,shell(title,`<section class="page-head">${slug.startsWith('projects/')?`<p class="page-context">${title}</p>`:''}<h1>${headline}</h1></section><article class="prose">${body}</article>`,`/${slug}/`));}
await writeFile('dist/404.html',shell('Page not found','<section class="page-head"><p class="eyebrow">404</p><h1>Page not found</h1><a class="button" href="/">Back to home →</a></section>','/404.html'));
await writeFile('dist/_headers','/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  Content-Security-Policy: default-src \'self\'; img-src \'self\'; style-src \'self\'; frame-ancestors \'none\'; base-uri \'self\'\n');
console.log('Built '+(Object.keys(pages).length+2)+' static HTML pages in dist/.');

const urls=['/',...Object.keys(pages).map(slug=>'/'+slug+'/')];
await writeFile('dist/sitemap.xml','<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+urls.map(path=>'  <url><loc>'+origin+path+'</loc></url>').join('\n')+'\n</urlset>\n');
await writeFile('dist/robots.txt','User-agent: *\nAllow: /\n\nSitemap: '+origin+'/sitemap.xml\n');
