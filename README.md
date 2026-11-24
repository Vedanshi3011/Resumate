# Resumate

A full-stack MERN resume builder with an editorial marketing site, a live-preview editor, and a real ATS scoring engine. Built to look and behave like a production product rather than a template.

- **Frontend:** React 18 + Vite + React Router
- **Backend:** Node + Express + MongoDB (Mongoose)
- **Auth:** JWT (localStorage) + bcrypt
- **Styling:** hand-written CSS design system (no UI framework)
- **Exports:** print-to-PDF from a real A4 text layer

---

## Quick start

```bash
# 1. Install everything (root + server + client)
npm run install:all

# 2. Create the server environment file
#    Windows PowerShell
Copy-Item server/.env.example server/.env
#    macOS / Linux
cp server/.env.example server/.env

# 3. Make sure MongoDB is running, then seed the demo account
npm run seed

# 4. Run the API and the web app together
npm run dev
```

Open <http://localhost:5173>.

### Demo credentials

```
email:    demo@resumate.app
password: demo1234
```

The seed creates the demo user (Pro plan) and two sample resumes. You can also use the **Try the demo account** button on the login page.

---

## Open the project in VS Code

From the repository root:

```bash
code .
```

If `code` is not on your PATH, open VS Code → **File → Open Folder** and select this folder.

Recommended extensions are listed in `.vscode/extensions.json`; VS Code will offer to install them. Two terminals are useful:

```bash
# terminal 1 — API
npm run server

# terminal 2 — web app
npm run client
```

Or run both with `npm run dev` and use the VS Code **Terminal → Split Terminal** view.

### First-run checklist

1. `npm run install:all`
2. Copy `server/.env.example` → `server/.env`
3. Start MongoDB (local service, or use Atlas)
4. `npm run seed`
5. `npm run dev`
6. Open <http://localhost:5173>

---

## Push to GitHub

The repository is already initialized as a git repo with an initial commit. Create an empty repository on GitHub (no README, no `.gitignore`), then run:

```bash
git remote add origin https://github.com/YOUR_USERNAME/resumate.git
git branch -M main
git push -u origin main
```

If you have the GitHub CLI (`gh`) installed instead:

```bash
gh auth login
gh repo create resumate --public --source=. --remote=origin --push
```

### What is and is not committed

Committed: source, styles, data, lockfiles, deployment configs, `.env.example`.

Ignored: `node_modules/`, `dist/`, `server/.env`, logs, and other secrets. Never commit a real `.env` or a database password.

If you ever commit a secret by mistake, rotate it immediately — removing it from the latest commit is not enough.

---

## Requirements

| Tool | Version |
| --- | --- |
| Node.js | 18+ (20 recommended) |
| npm | 9+ |
| MongoDB | 6+ local, or a free MongoDB Atlas cluster |

### Using MongoDB Atlas instead of a local install

1. Create a free cluster at <https://www.mongodb.com/atlas>.
2. Add a database user and allow your IP.
3. Copy the connection string into `server/.env`:

```env
MONGODB_URI=mongodb+srv://USER:PASSWORD@cluster0.xxxxx.mongodb.net/resumate?retryWrites=true&w=majority
```

---

## Environment variables

`server/.env`

| Key | Purpose | Example |
| --- | --- | --- |
| `PORT` | API port | `5000` |
| `MONGODB_URI` | Mongo connection string | `mongodb://127.0.0.1:27017/resumate` |
| `JWT_SECRET` | Signing secret for auth tokens | long random string |
| `CLIENT_URL` | Allowed CORS origin(s), comma separated | `http://localhost:5173` |

The client talks to `/api`, which Vite proxies to `http://localhost:5000` in development (see `client/vite.config.js`). To point at a deployed API, set `VITE_API_URL` in `client/.env`.

---

## Scripts

From the repository root:

| Script | What it does |
| --- | --- |
| `npm run install:all` | Installs root, server, and client dependencies |
| `npm run dev` | Runs API + Vite together with `concurrently` |
| `npm run server` | API only (`nodemon`) |
| `npm run client` | Vite only |
| `npm run seed` | Seeds the demo user and sample resumes |
| `npm run build` | Production build of the client |
| `npm start` | Starts the API in production mode |

---

## Page structure

```
/                          Home — marketing landing page
/templates                 Template gallery with filters + full preview modal
/examples                  Six role-based resume examples, copy into builder
/ats-checker               Paste resume text, optional job description, get a score
/pricing                   Plans, billing toggle, comparison table, billing FAQ
/career-center             Article index with category filters + newsletter
/career-center/:slug       Individual guide with related reading
/about                     Story, values, team
/contact                   Contact form backed by the API
/login                     Sign in (with one-click demo login)
/signup                    Create account
/privacy                   Privacy policy
/terms                     Terms of service
/dashboard                 Saved resumes, scores, duplicate/delete  (protected)
/builder/new               Guest or signed-in editor, supports ?template=
/builder/:id               Edit a saved resume  (protected)
*                          404
```

### The builder

The editor is a two-pane app: section steps on the left, a live A4 preview on the right.

Steps: **Personal → Experience → Education → Skills → Summary → Design**

- **Autosave** debounces for ~1s. Signed-in users save to Mongo; guests save to `localStorage` under `resumate.guestDraft`.
- **First save** of a guest draft that becomes a signed-in resume navigates from `/builder/new` to `/builder/:id` with `replace: true`.
- **Prefill:** examples store a resume in `sessionStorage.resumate.prefill` before navigating to `/builder/new`.
- **Templates:** `?template=modern` applies a layout + its default color/font.
- **Design step:** 8 templates (5 base layouts + theme variants), 6 accent colors + custom picker, 4 typefaces, cozy/compact density.
- **ATS chip:** runs the resume text through the same scoring engine and opens a compact report.
- **PDF:** uses the browser print dialog with an isolated `.print-area` on A4 (`print.css`).

---

## API

Base URL: `/api`

| Method | Path | Auth | Notes |
| --- | --- | --- | --- |
| GET | `/health` | — | Liveness check |
| POST | `/auth/register` | — | `{ name, email, password }` |
| POST | `/auth/login` | — | `{ email, password }` |
| GET | `/auth/me` | Bearer | Current user |
| GET | `/resumes` | Bearer | Full resume documents, newest first |
| POST | `/resumes` | Bearer | Create (30 resume cap) |
| GET | `/resumes/:id` | Bearer | One resume |
| PUT | `/resumes/:id` | Bearer | Update; `calculateScore: true` recomputes ATS |
| POST | `/resumes/:id/duplicate` | Bearer | Copy |
| DELETE | `/resumes/:id` | Bearer | Delete |
| POST | `/ats/check` | — | `{ text, jobDescription? }` → report |
| POST | `/contact` | — | `{ name, email, topic, message }` |

### ATS scoring (100 points)

| Category | Points |
| --- | --- |
| Contact details | 10 |
| Core sections | 20 |
| Length & density | 10 |
| Action verbs | 15 |
| Quantified impact | 15 |
| Readability | 10 |
| Role keywords (job description) | 20 |

The report returns `score`, `grade`, `breakdown`, `issues`, `wins`, `matchedKeywords`, `missingKeywords`, `wordCount`, `actionVerbs`, and `metrics`.

---

## Project layout

```
.
├─ package.json                 # root scripts (install:all, dev, seed)
├─ client/
│  ├─ index.html                # fonts + meta
│  ├─ vite.config.js            # /api proxy → :5000
│  └─ src/
│     ├─ main.jsx / App.jsx     # router + providers
│     ├─ lib/                   # api, auth context, toasts, text helpers
│     ├─ data/                  # resume fixtures, templates, examples, articles, site
│     ├─ components/            # nav, footer, resume sheet, modal, score ring…
│     ├─ builder/               # step forms + preview pane
│     ├─ pages/                 # every route
│     └─ styles/                # tokens, base, chrome, sheet, home, pages, builder, print
└─ server/
   ├─ .env.example
   └─ src/
      ├─ index.js               # express app + CORS + routes
      ├─ config/db.js
      ├─ models/                # User, Resume, Contact
      ├─ middleware/auth.js     # JWT guard + error handler
      ├─ routes/                # auth, resumes, ats, contact
      ├─ utils/ats.js           # scoring engine + text extraction
      └─ seed/seed.js           # demo user + two resumes
```

---

## Design system

- **Brand violet** `#5B3DF5`, deep ink `#14111F`, warm cream `#FAF6EF`, lilac `#F1ECFF`, coral `#FF6B4A`.
- **Type:** Fraunces (display serif, italic emphasis), Inter (UI), Source Serif 4 (resume option).
- **Resume sheets** are real HTML/CSS sized with container query units (`cqw`), so one component renders identically as a 240px dashboard thumbnail, a large preview, and a printed A4 page.
- Motion uses a shared easing token; content reveals on scroll via `IntersectionObserver` (`Reveal`), and respects `prefers-reduced-motion`.
- No stock photography: marketing art is built from CSS, typography, and live resume mockups.

### Browser support

Modern evergreen browsers. The CSS uses container queries and `color-mix()`, and the print isolation uses `:has()` in a progressive-enhancement fallback.

---

## Deploy

The app is three pieces: a static React build, a Node API, and MongoDB. The simplest reliable setup is **Vercel (or Netlify) + Render + MongoDB Atlas**, all of which have free tiers.

### 1. Database — MongoDB Atlas

1. Create a free cluster at <https://www.mongodb.com/atlas>.
2. Create a database user (save the password).
3. Under **Network Access**, allow `0.0.0.0/0` for a quick start, or the Render egress IPs for a tighter setup.
4. Copy the connection string:

```text
mongodb+srv://USER:PASSWORD@cluster0.xxxxx.mongodb.net/resumate?retryWrites=true&w=majority
```

### 2. API — Render

**Blueprint route (recommended):**

1. Push the repo to GitHub.
2. In Render: **New → Blueprint**, select the repo. Render reads `render.yaml`.
3. Fill the two secrets it asks for:
   - `MONGODB_URI` — the Atlas string.
   - `CLIENT_URL` — your frontend URL (you can set this after step 3; comma-separate multiple origins).
4. Deploy. The health check is `GET /api/health`.

**Manual route:**

- New → Web Service → root directory `server`
- Build: `npm install`
- Start: `npm start`
- Add the same environment variables.

Notes:

- Free Render services sleep after inactivity; the first request may take ~30s.
- `JWT_SECRET` must be long and random. Render can generate one, or use:
  `node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"`.
- If CORS blocks the frontend, `CLIENT_URL` does not exactly match the browser origin. Include the scheme and no trailing slash.

### 3. Frontend — Vercel

1. **Add New → Project**, import the repo.
2. Set **Root Directory** to `client`. Vercel detects Vite and uses `client/vercel.json`.
3. Add an environment variable:
   - `VITE_API_URL` = `https://YOUR-API.onrender.com/api`
4. Deploy, then go back to Render and set `CLIENT_URL` to the Vercel URL (for example `https://resumate.vercel.app`), and redeploy the API.

**Netlify alternative:** import the repo; `netlify.toml` sets the base to `client`, builds, publishes `dist`, and adds the SPA redirect. Add `VITE_API_URL` in **Site settings → Environment variables**.

### 4. Seed the production database

The seed is idempotent for the demo user and replaces that user's resumes. Run it once with the production connection string:

```bash
# from the repo root, PowerShell
$env:MONGODB_URI="mongodb+srv://..."; $env:JWT_SECRET="..."; npm run seed
```

```bash
# macOS / Linux
MONGODB_URI="mongodb+srv://..." JWT_SECRET="..." npm run seed
```

Or open a shell on the Render service and run `npm run seed` (the service already has the env vars).

Then sign in with `demo@resumate.app` / `demo1234` and **change the demo password before sharing the site publicly** — or delete the demo account.

### Single-service option (one Render web service)

The API can serve the built client when `NODE_ENV=production` and `client/dist` exists. This avoids a second host and CORS entirely.

1. Create a Render Web Service with **root directory = repository root**.
2. Build command:
   `npm install && npm --prefix client install && npm --prefix client run build`
3. Start command: `npm --prefix server start`
4. Environment: `NODE_ENV=production`, `MONGODB_URI`, `JWT_SECRET`. Leave `VITE_API_URL` unset so the client calls `/api` on the same origin.
5. `CLIENT_URL` can be the service URL itself.

The Express entry point checks for `client/dist/index.html`, serves the static files, and falls back to `index.html` for client-side routes.

### Post-deploy checklist

- `GET https://YOUR-API/api/health` returns `{ "ok": true }`.
- Sign up, create a resume, refresh — it is still there.
- Run the ATS check.
- Open a resume and use **Download PDF** (Chrome/Edge, margins **None**, background graphics **on**).
- Watch the browser console for CORS errors; they always mean `CLIENT_URL` and the actual origin differ.
- Confirm `server/.env` was not committed.

### Environment variables summary

| Where | Key | Value |
| --- | --- | --- |
| Render (API) | `MONGODB_URI` | Atlas connection string |
| Render (API) | `JWT_SECRET` | long random string |
| Render (API) | `CLIENT_URL` | deployed frontend origin(s) |
| Render (API) | `NODE_ENV` | `production` |
| Vercel/Netlify | `VITE_API_URL` | `https://YOUR-API.onrender.com/api` |

---

## Roadmap

### Shipped in this build
- Marketing site: home, templates, examples, ATS checker, pricing, career center, about, contact, legal.
- JWT auth with register/login/me, protected dashboard.
- Full resume CRUD, duplication, deletion.
- Split-pane builder with live preview, autosave, guest drafts, prefill, template/color/font/density controls.
- ATS engine with weighted scoring, issue prioritisation, keyword matching.
- Print-to-PDF with an isolated A4 text layer.
- Demo seed script.

### Next up
1. **Cover letters** — same editor shell, letter templates, shared personal details.
2. **Job-description tailoring** — paste a posting in the builder, highlight missing keywords inline.
3. **Version history** — snapshot on save, restore from the dashboard.
4. **Account settings** — profile, password change, data export/delete (GDPR).
5. **Payments** — Stripe Checkout for Pro, webhook to flip `user.plan`.
6. **Share links** — read-only public resume URL with an expiry.
7. **Tests** — Vitest for the ATS engine and resume serialisation; Playwright for the builder happy path.
8. **Accessibility pass** — automated axe checks plus keyboard-only builder review.

### Later
- Multi-language resume output.
- DOCX export.
- Team workspaces for career centers.
- Resume import from PDF (text extraction + section detection).

---

## Notes and limitations

- Print output depends on the browser's PDF engine. Use Chrome or Edge, and choose **Save as PDF** with margins set to **None** and background graphics enabled.
- The ATS checker is a readability/parsing heuristic, not a guarantee of any employer's system.
- Contact messages are stored in Mongo; there is no outbound email integration yet.
- Uploaded images and file storage are intentionally out of scope.

---

## License

MIT — use it, fork it, ship it.
