# Uganda Game Developers Association — website

A static marketing site for the **Uganda Game Developers Association (UGDA)**, the trade body
representing studios, developers, artists and educators making games in Uganda.

The information architecture and page structure follow the
[Dutch Games Association](https://dutchgamesassociation.nl/) site, which was used as the
reference model. All copy, styling and assets here are original — the palette is drawn
from the Ugandan flag (black, gold, red) rather than the DGA's navy and orange.

## Live site

The site is deployed to two hosts, both serving the same `main` branch.

| Host | URL | Deploys on |
| --- | --- | --- |
| Vercel | https://uganda-games-association.vercel.app | push to `main` |
| GitHub Pages | https://eyezoh.github.io/uganda-game-developers-association/ | push to `main` |

> **Note:** the Vercel project is still named after the repository's original name, so
> its `.vercel.app` subdomain reads `uganda-games-association`. Renaming the project in
> **Vercel → Settings → General → Project Name** changes that subdomain — and will break
> the existing `.vercel.app` link, so do it before sharing the URL widely.

Vercel's Git integration tracks the repository by internal ID rather than by name, so
renaming the GitHub repo does not break the connection.

### GitHub Pages

The site is plain static files, so GitHub Pages can serve it straight from the branch —
no build and no workflow needed.

**Settings → Pages → Build and deployment → Source: _Deploy from a branch_ →
Branch: `main`, folder: `/ (root)` → Save.**

The site then publishes at `https://<user>.github.io/uganda-game-developers-association/`.

<details>
<summary>Optional: deploy with GitHub Actions instead</summary>

A ready-made workflow is included at
[`docs/github-pages-workflow.yml`](docs/github-pages-workflow.yml). It is kept outside
`.github/workflows/` because pushing files there requires a token with the `workflow`
OAuth scope. To use it:

```bash
gh auth refresh -s workflow          # one-time, opens a browser
mkdir -p .github/workflows
git mv docs/github-pages-workflow.yml .github/workflows/deploy.yml
git commit -am "Add Pages deploy workflow" && git push
```

Then set **Settings → Pages → Source: _GitHub Actions_**.
</details>

## Running locally

No build step, no dependencies. Either open `index.html` directly, or serve the folder:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

A local server is recommended over `file://` so that root-relative paths behave the
same way they do in production.

## Structure

```
.
├── index.html          Home — hero, mission, divisions, events, news, newsletter
├── about.html          Story, mission, divisions, team, FAQ
├── members.html        Directory, member benefits, membership bands
├── events.html         Upcoming events and the four event formats
├── projects.html       Mentors, Games Monitor, Awards, chapters, advocacy
├── news.html           Post listing
├── contact.html        Contact form and direct lines
├── css/styles.css      Whole design system — tokens, components, responsive rules
├── js/main.js          Nav, accordion, scroll reveal, form handling
└── assets/             Logo and favicon (SVG)
```

Every page shares the same `<header>` and `<footer>` markup. The current page is
highlighted by `js/main.js`, which matches `location.pathname` against the nav links —
so adding a page means copying the header/footer block and nothing else.

## Design system

Design tokens live in `:root` at the top of `css/styles.css`:

| Token | Value | Use |
| --- | --- | --- |
| `--gold` | `#f5c518` | Primary accent, buttons, highlights |
| `--red` | `#d21034` | Secondary accent |
| `--ink` | `#14161b` | Dark sections, headings |
| `--slate` | `#4d576c` | Body text |

Typography is Poppins (headings) and Roboto (body), loaded from Google Fonts.

Breakpoints: `980px` (grids collapse), `860px` (mobile nav, single-column), `560px`
(stack everything).

### Scroll reveal

Elements with `class="reveal"` fade in via `IntersectionObserver`. They are hidden
**only** when the `js` class is present on `<html>` (set by an inline script in
`<head>`), so if JavaScript fails to load the content still renders normally.

## Before going live

The site is complete and deployable, but a few things are deliberately placeholder and
need real values:

- [ ] **Forms do not submit anywhere.** The contact and newsletter forms validate and
      show a success message client-side only — see the `data-demo-form` handler in
      `js/main.js`. Point them at a real endpoint (Formspree, Netlify Forms, or your own
      backend) before launch.
- [ ] **Content is placeholder copy.** Member names in the directory, event dates,
      news posts, team members, the address, phone number and email addresses are all
      illustrative and must be replaced with real UGDA details.
- [ ] **Membership fees** are described as bands rather than figures; add real numbers.
- [ ] **Social links** in the footer point to `#`.
- [ ] **Canonical URLs** in each page's `<head>` assume
      `https://ugandagamedevelopers.org/` — update to the real domain.
- [ ] Add an Open Graph share image (`og:image`) — the meta tags are in place but no
      image is referenced yet.

## Licence

Code is MIT licensed (see [LICENSE](LICENSE)). Site content and branding belong to the
Uganda Game Developers Association.
