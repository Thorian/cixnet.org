# ciXnet website

Static HTML website compiled with Node.js. No runtime dependencies, browser JavaScript or access to ciXnet service data.

## Build and preview

Requires Node.js 22 or newer. No dependency installation is needed.

    node build.mjs
    node check.mjs
    node serve.mjs

Open http://127.0.0.1:4173. npm run build and npm run dev are also available when npm is installed.

## Editing

- src/content/home.html: homepage
- src/content/pages.json: page titles and HTML content; keys become URL paths
- src/style.css: responsive styling
- src/assets/: logo and illustration source assets
- build.mjs: shared navigation, page shell and selected production assets
- dist/: generated deployable site

Only the selected artwork is copied by the build. The glovebox image remains a temporary accepted placeholder. Generated assembly images are illustrative and are captioned as concepts. Catalogue reference photographs are not included.

## GitHub and Cloudflare Pages

Use this folder as the root of a dedicated GitHub repository. Connect it through Cloudflare Pages Git integration.

- Production branch: main
- Framework: None
- Build command: node build.mjs
- Output: dist
- Root: empty for a dedicated repository; website-template if importing the parent workspace repository

The archive contains the website only. Do not publish the surrounding Reticulum workspace. Production builds require no secrets or service credentials.

Official documentation: https://developers.cloudflare.com/pages/get-started/git-integration/

## Launch items

- Set up contact@cixnet.org. The website includes a mailto link; email delivery is not configured by this website.
- Connect the selected GitHub repository to Cloudflare Pages and add cixnet.org as a custom domain.
- Client, GroupChat and other unpublished components have information pages without invented download or repository links. Add actual release links when those projects are published.

## Verification

18 static HTML pages. check.mjs validates local page, asset and section-anchor references. Desktop directory and phone homepage/enquiry layouts visually reviewed. No server data or live network status is exposed.
