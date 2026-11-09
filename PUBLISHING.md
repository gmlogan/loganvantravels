# Publishing cheat sheet

Site: <https://travels.loganfamily.co.uk/> · Repo: `gmlogan/loganvantravels`

Deploys are **automatic**: every push to `main` triggers the GitHub Actions
workflow (`.github/workflows/hugo.yml`), which builds with Hugo and publishes to
GitHub Pages in ~30–40s. You never configure Pages by hand.

Run everything below from the project root: `/Users/graham/websites/loganvantravels`

---

## One-time setup (new machine / fresh clone)

The theme's CSS is built with Tailwind and isn't committed to the repo, so
after cloning (with submodules) run:

```bash
cd themes/congo && npm install && cd ../..
npm run build
```

This writes `assets/css/compiled/main.css` (git-ignored). You only need to
re-run `npm run build` after editing a layout/template file — plain content
edits (new posts, front matter) don't need it.

---

## Everyday cycle

Preview locally while editing (live-reloads on save):

```bash
hugo server -D
```

Publish when happy:

```bash
git add -A
git commit -m "Add Foo Bar trip"
git push
```

Live a minute later.

---

## New post

Use the CMS at `/admin/` (Sveltia CMS), then pick the category under **Van Trips**
(Aire, Pub, CCC, CAMC, Event, Parkup, Independent), **Holidays**, **Ski Trips** or
**City Breaks**. Saving commits to `main` and deploys. The folder is named
`YYYY-MM-DD-title` from the arrival date and title, with photos saved beside the post.
Photos are converted to WebP (max 1200px wide) on upload. Pick "entry" (the post's own
folder) for images, so they get thumbnails.

**Pages** (About etc.) and **Trips** have their own collections. New pages need a link
adding to `config/_default/menus.toml`.

By hand: add `content/posts/YYYY-MM-DD-title/index.md` with the front matter below,
and put images in the same folder (`![](image-1.webp)`).

```yaml
---
title: "Some Place"
category: van-trips          # van-trips | holidays | ski-trips | city-breaks
subcategory: ccc             # van-trips: aire pub ccc camc event parkup independent; holidays: beach cottage overseas
arrival: 2026-07-05
departure: 2026-07-07        # optional
trip: 2026-north-east        # optional; a folder name under content/trips
address: "..."               # optional, plus map_link, country, facilities, cost_per_night, rating
---
```

`category` and `subcategory` are Hugo taxonomies: each builds a listing page and is
used in the menus. Intro text for them is in `content/category/` and
`content/subcategory/`. Trips are a section (`content/trips/<name>/`), not a taxonomy.
Posts use `arrival` as their date.

---

## Check the build before pushing (optional)

```bash
hugo --gc --minify
```

Non-zero exit or `ERROR:` lines → fix before pushing. A broken build fails the
Action and the previous live site stays up.

---

## Watch / troubleshoot the deploy

```bash
gh run watch --repo gmlogan/loganvantravels --exit-status
```

```bash
gh run view --repo gmlogan/loganvantravels --log-failed
```

Force a redeploy with no code change:

```bash
gh workflow run "Deploy Hugo site to Pages" --repo gmlogan/loganvantravels
```

Actions dashboard: <https://github.com/gmlogan/loganvantravels/actions>

---

## Notes

- **Theme** is a git submodule (`themes/congo`). After `git clone` on a new
  machine: `git submodule update --init --recursive`. To update it later:
  `git submodule update --remote themes/congo` then commit.
- `public/` and `resources/` are build output — git-ignored, never committed.
- Custom-domain config lives in `static/CNAME` + `baseURL` in
  `config/_default/hugo.toml`. Don't remove `static/CNAME` or Pages drops the
  domain.
- If the site looks stale right after a deploy, it's browser/CDN cache —
  hard-refresh (Cmd-Shift-R).
