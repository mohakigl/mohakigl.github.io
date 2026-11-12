# Mohak Singh's portfolio

Personal portfolio site (jobs, achievements, experiences, skills), hosted on GitHub Pages at https://mohakigl.github.io from the `main` branch root. Every push to `main` redeploys automatically.

Planning notes and content drafts live in the claude.ai Project "Digital Portffolio". This repo holds the site itself.

## Rules for working here

- Plain HTML, CSS and JavaScript only. No build step, no npm, no frameworks: GitHub Pages serves the files as they are.
- **Content goes in `data/content.js`, not in the HTML.** To add a job, achievement or experience, add an object to `entries`. Skill names in `entries[].skills` must exactly match a name in `skills`, or the skill highlighting won't connect them.
- Keep `data/content.js` as a script that sets `window.PORTFOLIO` (not a .json file loaded with fetch), so `index.html` still works when opened directly from disk.
- Set `sample: false` in `data/content.js` once all placeholder content is replaced; that hides the sample-content banner.
- Images go in `images/`. Compress them (aim for under 300 KB each) and always give them alt text.
- Keep it accessible: visible keyboard focus, `prefers-reduced-motion` respected, works at 375px wide, text contrast at WCAG AA.

## Structure

```
index.html          page skeleton
css/style.css       all styles; colour tokens at the top, dark mode via prefers-color-scheme
js/main.js          renders content, skill highlighting, type filters
data/content.js     all text content
images/             favicon and images
.nojekyll           tells GitHub Pages to serve files as-is
```

## Design

Cool mist background, ink navy text, teal accent, marigold for skill highlights. Bricolage Grotesque for headings, Source Serif 4 for body text. The signature interaction is picking a skill to light up every entry where it was used; keep other motion minimal.

## Previewing and publishing

- Preview: open `index.html` in a browser.
- Publish: commit and push to `main`. The site updates within a minute or two.
