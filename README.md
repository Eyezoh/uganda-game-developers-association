# Uganda Game Developers Association — website

A static site for the **Uganda Game Developers Association (UGDA)**, the association for
studios, developers, artists and educators making games in Uganda.

The information architecture and page structure follow the
[Dutch Games Association](https://dutchgamesassociation.nl/) site, which was used as the
reference model. All copy, styling and assets here are original — the palette is drawn
from the Ugandan flag (black, gold, red) rather than the DGA's navy and orange.

## Live site

**https://www.ugda.ug/** is the one official address. Every page's canonical tag, the
sitemap, the structured data and `llms.txt` point there.

| Host | URL | Notes |
| --- | --- | --- |
| Vercel (production) | https://www.ugda.ug/ | Deploys on push to `main`. `ugda.ug` and `http://` redirect here. |
| Vercel default domain | https://uganda-games-association.vercel.app | Redirects permanently to `www.ugda.ug` (see `vercel.json`). |
| GitHub Pages | https://eyezoh.github.io/uganda-game-developers-association/ | Mirror. Its canonical tags point to `www.ugda.ug`, so search engines index only the official copy. |

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
├── index.html                      Home: hero, what we do, membership, the Ugandan scene
├── game-developers-in-uganda.html  Sourced guide to Ugandan studios, teams and events
├── about.html                      Story, mission, divisions, FAQ
├── members.html                    Membership: directory (empty until members join), offer, bands
├── events.html                     Upcoming UGDA events, recent events in Uganda, event formats
├── projects.html                   Programmes being set up, advocacy
├── news.html                       Association news and press coverage
├── contact.html                    How to reach the UGDA
├── robots.txt / sitemap.xml        Crawl rules and page list for search engines
├── llms.txt                        Plain summary of the site for AI assistants
├── vercel.json                     Redirects the .vercel.app domain to www.ugda.ug
├── <key>.txt                       IndexNow key (proves to Bing that we own the site)
├── css/styles.css                  Whole design system: tokens, components, responsive rules
├── js/main.js                      Nav, accordion, scroll reveal
└── assets/                         Logo, favicon, share image, app icon, partners/ logos
```

Every page shares the same `<header>` and `<footer>` markup. The current page is
highlighted by `js/main.js`, which matches `location.pathname` against the nav links.
Home is linked as `./` (not `index.html`) so that the only URL for it is the bare domain.
Adding a page means copying the header/footer block, adding it to `sitemap.xml` and
`llms.txt`, and giving it its own title, description and canonical tag.

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

## Search engines and AI assistants

What is in place:

- **Canonical tags** on every page point to `https://www.ugda.ug/<page>`.
- **Titles and descriptions** are written for searches like "game developers in Uganda".
- **Structured data** (JSON-LD in each `<head>`): `Organization` and `WebSite` on the home
  page, `FAQPage` on About and the guide, `Article` with its news citations on the guide.
  The FAQ structured data must match the visible questions word for word, so edit both.
- **`sitemap.xml`**: update `<lastmod>` when a page changes.
- **`robots.txt`** allows every crawler, AI crawlers included.
- **`llms.txt`**: a plain summary for AI assistants that read it.
- **Share image** (`assets/og-image.png`) for links posted on WhatsApp, LinkedIn, X etc.
- **IndexNow**: after deploying a change, tell Bing (which feeds ChatGPT search and
  Copilot) about it:

  ```bash
  KEY=$(basename $(ls *.txt | grep -E '^[0-9a-f]{32}\.txt$') .txt)
  curl -s -X POST https://api.indexnow.org/indexnow -H 'Content-Type: application/json' \
    -d "{\"host\":\"www.ugda.ug\",\"key\":\"$KEY\",\"urlList\":[\"https://www.ugda.ug/\"]}"
  ```

Content rule: everything the site states as fact must be true, and facts about the wider
Ugandan scene must cite a source. Search engines and AI assistants repeat what they find
here, so an invented member count or partner becomes a public claim.

What only the owner can do (needs your accounts):

- [ ] **Google Search Console**: add `ugda.ug` as a Domain property (DNS TXT record),
      then submit `https://www.ugda.ug/sitemap.xml`.
- [ ] **Bing Webmaster Tools**: import the site from Search Console and submit the sitemap.
- [ ] Get other sites to link to `www.ugda.ug`: the outlets and organisers named in the
      guide, Ugandan tech hubs, universities, game-dev communities.
- [ ] Create LinkedIn / X / Instagram / YouTube accounts, link them from the footer and
      add them to `sameAs` in the home page's `Organization` structured data.

## Still to fill in

- [ ] **Contact email.** `ugda.ug` has no mail records yet, so no address is shown and
      there are no forms. Set up mail (e.g. `hello@ugda.ug`), then add it to the contact
      page, the footer and the `Organization` structured data.
- [ ] **Team.** The founder (Isaac Amumpaire) is on the About page; add board members or
      other team members as they join.
- [ ] **Dates** for the Kelele Collective game-development meetup and the Birungi Studio /
      Kelele Collective partnership (news posts currently say "2026").
- [ ] **Membership fees**: add real figures once agreed.
- [ ] **Member directory**: add members as they join.
- [ ] **Legal status** (e.g. registered non-profit): add once confirmed.

## Licence

Code is MIT licensed (see [LICENSE](LICENSE)). Site content and branding belong to the
Uganda Game Developers Association.
