import {readFile,readdir,stat} from 'node:fs/promises';import {join} from 'node:path';let n=0,htmlCount=0;async function walk(d){for(const x of await readdir(d)){let f=join(d,x);if((await stat(f)).isDirectory()){await walk(f);continue}if(!f.endsWith('.html'))continue;htmlCount++;const html=await readFile(f,'utf8');for(const [,url] of html.matchAll(/(?:href|src)="(\/[^" ]*)"/g)){let [u,hash]=url.split('#');let target='dist'+u+(u.endsWith('/')?'index.html':'');await stat(target);if(hash&&target.endsWith('.html')){const body=await readFile(target,'utf8');if(!body.includes('id="'+hash+'"'))throw Error('Missing anchor '+url+' in '+f)}n++}if(!html.includes('<main id="main">'))throw Error('Missing main '+f)}}await walk('dist');console.log(htmlCount+' HTML pages; '+n+' internal references and anchors verified.');

const {metadata,origin}=await import('./seo.mjs');
const descriptions=new Set();
for(const [url,[title,description]] of Object.entries(metadata)){
 const file=url==='/'?'dist/index.html':'dist'+url+(url.endsWith('/')?'index.html':'');
 const html=await readFile(file,'utf8');
 if(!html.includes('<meta name="description"')||!html.includes('property="og:image"')||!html.includes('name="twitter:card"'))throw Error('Missing search metadata '+url);
 if(url==='/404.html'){if(!html.includes('noindex,follow'))throw Error('404 must not be indexed');continue}
 if(!html.includes('rel="canonical" href="'+origin+url+'"'))throw Error('Wrong canonical '+url);
 if(descriptions.has(description))throw Error('Duplicate description '+url);descriptions.add(description);
}
const sitemap=await readFile('dist/sitemap.xml','utf8');
if((sitemap.match(/<loc>/g)||[]).length!==Object.keys(metadata).length-1||sitemap.includes('404.html'))throw Error('Sitemap page mismatch');
if(!(await readFile('dist/robots.txt','utf8')).includes('Sitemap: '+origin+'/sitemap.xml'))throw Error('Missing sitemap discovery');
console.log('Unique descriptions, canonical URLs, social tags, 404 indexing and sitemap verified.');
