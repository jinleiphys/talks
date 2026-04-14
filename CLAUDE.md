# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Multi-talk monorepo for academic presentations by Jin Lei (Tongji University). Each talk is an independent [Slidev](https://sli.dev) project sharing a unified pencil-sketch visual design. Deployed to GitHub Pages at `jinleiphys.github.io/talks/`.

## Build & Development

```bash
# Dev server for a single talk
cd fudan-talk && npm install && npm run dev

# Build a single talk (output in dist/)
cd fudan-talk && npm run build

# Each talk's build script includes its --base path:
#   "build": "slidev build --base /talks/{talk-name}/"
# Do NOT use `npx @slidev/cli build` — it behaves differently from `slidev build`
# via npm scripts and causes sidebar/navigation bugs in production.
```

All talks use `@slidev/cli@^51` with `@slidev/theme-seriph@^0.25`. Node 22.

## Deployment

GitHub Actions (`.github/workflows/deploy.yml`) auto-detects talk directories by finding `slides.md` files, builds all talks, assembles them under `_site/`, and deploys to Pages. Root `index.html` is the landing page.

**Adding a new talk:** Create a directory with `slides.md` and `package.json` (copy from an existing talk, update the `--base` path). Add a card to `index.html`. The workflow auto-discovers it.

## Architecture

Each talk directory contains:
- `slides.md` — Slidev markdown with YAML frontmatter (theme, fonts, transitions)
- `package.json` — Must have `scripts.build` with correct `--base /talks/{dirname}/`
- `style.css` — Shared pencil-sketch design system (CSS vars `--pencil-*`, rice paper background, handwritten fonts via Google Fonts)
- `global-bottom.vue` — Page number overlay (update total count when adding/removing slides)
- `setup/shortcuts.ts` — Remaps arrow/page keys to `nav.next()`/`nav.prev()` so laser pointer clickers step through v-click animations before advancing slides
- `figures/` — Image assets referenced in slides

## Key Design Decisions

- **fudan-talk and sjtu-talk are near-identical** (same content, different venue/date). Changes to one likely need mirroring to the other.
- **Laser pointer support**: `setup/shortcuts.ts` is critical — without it, clicker buttons skip v-click animations and jump directly to next slide.
- **Font stack**: Uses Chinese handwriting fonts (Ma Shan Zheng, ZCOOL family) with Latin fallbacks (Caveat, Patrick Hand). The `style.css` imports them from Google Fonts.
- **index.html**: DAGA "Make Direct Reactions Great Again" campaign theme with red/blue/gold palette, Impact typography, ticker tape animation.
