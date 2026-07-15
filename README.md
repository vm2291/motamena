# Math Olympiad Trainer Academy — Website

A website for the Math Olympiad Trainer Academy (SITE · MIMS).

## What's inside

```
mota-site/
├── index.html          Home
├── about.html          About the Academy
├── programs.html       Programs, cycles, workshops, presentations
├── impact.html         Interactive AY 2025–26 Impact Topography and reflections
├── curriculum.html     Curriculum overview
├── library.html        Knowledge Hub
├── atlas/              Atlas of Scholars
├── archive/            Cycle archive
├── team.html           Leadership and coaches
├── resources.html      Resources for participants
├── contact.html        Contact and AY 2026–27 expression of interest
├── css/
│   ├── style.css       Core site styles
│   └── impact.css      Impact Topography styles
├── js/
│   ├── main.js         Theme toggle, mobile nav, reveal-on-scroll
│   ├── application.js  Safe application-button activation
│   └── application-config.js  Verified Google Form configuration
├── files/              Four cycle exercise PDFs and the Impact Topography report
├── images/             All photographs and illustrations
└── partials/
    └── logo.svg        Site logo
```

There is **no server-side code in the website**. The separate Apps Script
package creates and administers the Google Form, applicant register, dashboard,
acknowledgements, and notifications. The website opens the verified published
Google Form only after `js/application-config.js` contains the real form URL
and `isOpen` is set to `true`.

## Run it locally

The site is just files, so any static server works.

**Option 1 — Python (built into macOS and Linux):**
```bash
cd mota-site
python3 -m http.server 8000
```
Then open `http://localhost:8000` in your browser.

**Option 2 — Node.js:**
```bash
cd mota-site
npx serve .
```

**Option 3 — VS Code Live Server extension:** right-click `index.html` →
"Open with Live Server".

## Deploy it on your own hosting

Because the site is fully static, you have many free or low-cost options.

### Option A — Netlify (drag and drop, free tier)
1. Sign up at [netlify.com](https://www.netlify.com).
2. From the dashboard, drag the entire `mota-site/` folder onto the deploy
   area. Done. You get a public URL immediately.
3. To use a custom domain (e.g. `mota.nyu.edu` or a `.org` you own), add it
   under **Site settings → Domain management** and follow the DNS instructions.

### Option B — Vercel (free tier)
1. Push the folder to a GitHub repository.
2. Sign in at [vercel.com](https://vercel.com) with GitHub and import the repo.
3. Framework preset: **Other**. Build command: leave blank. Output directory:
   leave as the project root. Deploy.

### Option C — GitHub Pages (free)
1. Push the folder to a GitHub repository named, for example, `mota-site`.
2. In the repo, go to **Settings → Pages**.
3. Source: **Deploy from a branch**. Branch: `main`. Folder: `/ (root)`. Save.
4. Your site appears at `https://<your-username>.github.io/mota-site/`.

### Option D — Cloudflare Pages (free, fast)
1. Sign in at [pages.cloudflare.com](https://pages.cloudflare.com).
2. Connect a GitHub repo or upload the folder directly.
3. No build command; output directory is the project root.

### Option E — A traditional web host (cPanel / FTP)
If your university or department hosting uses cPanel, Plesk, or plain FTP/SFTP:

1. Upload **the contents** of `mota-site/` (not the folder itself) to your
   `public_html`, `www`, or equivalent web root.
2. Visit your domain. `index.html` is served by default.

### Option F — AWS S3 + CloudFront
1. Create an S3 bucket, enable static website hosting, and upload all files.
2. Put CloudFront in front for HTTPS and caching. Point your domain at the
   CloudFront distribution.

## URLs without `.html`

The current preview server uses a redirect so `/about` works as well as
`/about.html`. Most static hosts (Netlify, Vercel, Cloudflare Pages, GitHub
Pages) handle this automatically — they serve `about.html` when you request
`/about`. If you use a host that does not, every internal link in the site
already includes the full filename, so the site will still work.

## Updating content

All content lives directly in the HTML files. To edit text, open the relevant
`.html` file in any text editor (VS Code, Sublime, Notepad++, even TextEdit)
and change the words. No build step is required — save the file and reload the
page.

To swap an image, drop the new file into `images/` (keep the same filename to
avoid editing the HTML) or update the `<img src="...">` reference.

## Things to know about external dependencies

- **Google Fonts** are loaded from `fonts.googleapis.com`. The site works
  offline-friendly enough without them, but for the intended typography
  (Cormorant Garamond, Inter, Amiri) the visitor's browser fetches them on
  first load. If your hosting environment blocks external requests, you can
  self-host these fonts in the `fonts/` folder and update `css/style.css`.
- **AY 2026–27 application link:** run `getWebsiteConfiguration` in the supplied
  Apps Script project, copy the returned block into `js/application-config.js`,
  and redeploy the site. Until then, the site intentionally shows the application
  as awaiting its verified form link.

## License and ownership

The website displays a Math Olympiad Trainer Academy copyright notice. Credited
third-party materials remain subject to their source terms. The code structure
may be modified and redeployed by the Academy.
