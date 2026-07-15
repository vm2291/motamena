# Hosting the Math Olympiad Trainer Academy website

This is a **plain static site** — HTML, CSS, JavaScript, and image files. There is no backend, no database, no build step. Any static-hosting service that serves files over HTTPS will run it.

This document covers everything you need to deploy it yourself.

---

## What's in the bundle

```
mota-site/
├── index.html              ← Home
├── about.html              ← About / mission / partners
├── programs.html           ← Cycle history, Summer 2025 workshop, IMO 2025 card, participant presentations
├── impact.html             ← Interactive AY 2025–26 Impact Topography and anonymous reflections
├── curriculum.html         ← Curriculum overview
├── library.html            ← Knowledge Hub
├── atlas/                  ← Atlas of Scholars
├── archive/                ← Cycle archive
├── team.html               ← Leadership and instructors
├── resources.html          ← Reading list and references
├── contact.html            ← Contact and application
├── imo-2025.html           ← UAE IMO 2025 Training Camp record
├── css/                    ← Core and Impact Topography styles
├── js/                     ← Site behavior and verified application configuration
├── files/                  ← Cycle exercises and Impact Topography report
├── partials/logo.svg       ← SVG mark (also inlined in headers)
├── images/                 ← 14 photographs and institutional image assets
└── README.md               ← Project notes
```

Current bundle: 34 HTML pages, 14 image assets, five PDFs, and approximately 7.5 MB in total.

**External dependencies (loaded over HTTPS from Google's CDN — no setup needed):**
- Google Fonts: Cormorant Garamond, Inter, Amiri (Arabic on continuum.html only)

That's it. No npm, no Node, no Python. Open `index.html` in a browser and it works.

## Activate the AY 2026–27 application

The site deliberately ships with the application button closed until the real
Google Form exists. After running the supplied Apps Script system in the owner
account, run `getWebsiteConfiguration`, copy the exact returned block into
`js/application-config.js`, and redeploy the site. No Apps Script web-app
deployment is required.

---

## URL structure

The HTML files use `.html` extensions in their links (e.g. `<a href="about.html">`). Most hosts will serve `about.html` when the URL is `/about.html`. Some hosts also rewrite `/about` → `/about.html` automatically (called "clean URLs"). Both work — no action needed from you. If you want clean URLs everywhere, see the host-specific notes below.

---

## Option 1 — GitHub Pages (free, simplest if you use GitHub)

**Best for:** non-technical owners who want a free permanent URL and don't mind a `*.github.io` subdomain (or who already have a custom domain).

1. Create a new public repo on GitHub, e.g. `mota-website`.
2. Upload every file and folder from this bundle to the repo (drag-and-drop in the GitHub web UI works).
3. In the repo, go to **Settings → Pages**.
4. Under "Source," select **Deploy from a branch**.
5. Pick branch `main` and folder `/ (root)`. Save.
6. Within a minute or two GitHub gives you a URL like `https://your-username.github.io/mota-website/`.

To use your own domain (e.g. `mota.ae`): add a `CNAME` file at the repo root containing just `mota.ae`, then point your DNS at GitHub's IPs ([GitHub Pages custom domain docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)).

**Cost:** Free, no limits worth caring about for a site this size.

---

## Option 2 — Netlify (free tier, easiest custom-domain experience)

**Best for:** owners who want clean URLs, instant deploys, and the friendliest custom-domain setup.

1. Sign up at [netlify.com](https://www.netlify.com) (free, no credit card).
2. From the dashboard, drag the entire `mota-site` folder onto the deploy zone.
3. You get a URL like `https://glowing-name-123abc.netlify.app` instantly.
4. Rename the subdomain or add your own domain under **Domain settings**.

Netlify rewrites `/about` → `/about.html` automatically and provisions free HTTPS.

**Cost:** Free up to 100 GB bandwidth/month — far more than you'll need.

---

## Option 3 — Cloudflare Pages (free, fastest CDN globally)

**Best for:** owners who want global low-latency delivery and don't mind a short setup.

1. Sign up at [pages.cloudflare.com](https://pages.cloudflare.com).
2. Either:
   - Connect a GitHub repo (same as Option 1, but Cloudflare serves it), **or**
   - Use the "Direct Upload" option and upload the `mota-site` folder as a ZIP.
3. No build command needed; leave the build output directory as `/`.
4. Cloudflare gives you a `*.pages.dev` URL and free HTTPS.

**Cost:** Free, unlimited bandwidth, no usage caps for static sites.

---

## Option 4 — Vercel (free tier, polished developer experience)

**Best for:** owners comfortable with the command line or with GitHub.

1. Sign up at [vercel.com](https://vercel.com).
2. Either connect a GitHub repo, or run `npx vercel` from inside the `mota-site` folder.
3. Vercel auto-detects it as a static site and deploys.
4. You get a `*.vercel.app` URL; add your own domain in the dashboard.

**Cost:** Free for personal/non-commercial use.

---

## Option 5 — Your own server / AWS S3 / DigitalOcean / shared hosting

**Best for:** owners who already pay for hosting elsewhere or want full control.

Upload the contents of `mota-site/` to your web root (often called `public_html/`, `www/`, or `htdocs/`) via FTP, SFTP, or your host's file manager. Make sure `index.html` is at the root. That's the whole deployment.

**For Apache servers (most cPanel hosts):** to get clean URLs (`/about` instead of `/about.html`), drop this `.htaccess` file in the web root:

```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^([^.]+)$ $1.html [NC,L]
```

**For nginx:** add this inside your server block:

```nginx
location / {
  try_files $uri $uri.html $uri/ =404;
}
```

**For AWS S3 + CloudFront:** upload the folder to an S3 bucket, enable "Static website hosting," point a CloudFront distribution at it, and (optionally) attach a CloudFront Function to append `.html` to extensionless URLs. AWS has a full walkthrough [here](https://docs.aws.amazon.com/AmazonS3/docs/HostingWebsiteOnS3Setup.html).

---

## Local preview before you deploy

To check the site on your own laptop first:

**Option A — Python (already installed on Mac/Linux):**
```bash
cd mota-site
python3 -m http.server 8000
```
Then open `http://localhost:8000` in your browser.

**Option B — Node:**
```bash
cd mota-site
npx serve .
```

**Option C — VS Code:** Install the "Live Server" extension, right-click `index.html`, choose "Open with Live Server."

Just double-clicking `index.html` in Finder/Explorer mostly works too, though some browsers block certain features when loading from `file://` URLs.

---

## Editing content later

Every page is a single HTML file with readable English text — open it in any editor (VS Code, Sublime, even TextEdit) and search for the sentence you want to change. The structure mirrors what you see on screen.

For consistency:
- **Headings, eyebrows, ledes** live near the top of each section.
- **Colors and fonts** are defined as CSS variables at the top of `css/style.css` — change them once, and the whole site follows.
- **Images** go in `images/`. Reference them by filename in the HTML.

If you change the IMO 2025 page text, the source language to preserve is in `imo-2025.html`. The "not part of the Academy" framing appears three times deliberately — keep all three if you keep any of them, so the boundary stays clear to readers.

---

## What it costs to run

For traffic on the order of a few thousand visitors per month, every option above is **free**. The only money you might spend:

- **Custom domain** (e.g. `mota.ae`): ~$10–50/year from a registrar like Namecheap, Porkbun, or your local provider.
- **Email on your domain** (optional): Google Workspace or Zoho Mail, ~$3–6/user/month.

You will not pay for the website itself.

---

## If you get stuck

The fastest path is Netlify drag-and-drop (Option 2). If something breaks after deployment:

1. Confirm `index.html` is at the root, not nested in a subfolder.
2. Confirm the `images/`, `css/`, and `js/` folders are at the same level as `index.html`.
3. Open the browser's developer tools (F12) → Network tab → reload. Anything in red is a missing file — usually a typo in a path.

That's the whole site. Have a good launch.
