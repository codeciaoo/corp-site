# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build/Lint/Test Commands
- `pnpm dev` - Start development server (generates the font subsets first)
- `pnpm build` - Build for production (fonts → astro build → `scripts/phrase-wrap.mjs`, which inserts phrase breaks into the built HTML)
- `pnpm fonts` - Regenerate the web-font subsets (run after adding copy)
- `pnpm qa` - API tests, build, wrap check, then every quality gate (forbidden words, type tokens, overflow, console errors, axe, clipped text, small teal, prose rules, keyboard, motion, Lighthouse)
- `pnpm qa:fast` - Same without Lighthouse
- `pnpm qa:words` - Source-level checks only (forbidden words, type tokens)
- `pnpm qa:wrap` - Line-wrap and overflow check at 375px in Chrome and WebKit (needs a build)
- `pnpm test:api` - Tests for `/api/contact` (uses a local fake webhook, never the real one)
- `node scripts/shots.mjs /path ...` - Screenshots into `design/shots/` (`--browser webkit|firefox`, `--widths`, `--at <selector>`)
- `scripts/review-pack.sh` - Screenshots of the built site for review (1440 in Chrome, 375 in WebKit), sliced into `design/qa/review-*`
- `node scripts/dump-copy.mjs` - Write all page copy from the build into `design/CONTENT.md`
- `node scripts/type-audit.mjs /path ...` - List rendered font family / weight / size combinations
- `node scripts/build-og.mjs` - Regenerate `public/og.png`

The dev server can serve stale scoped CSS under load. Verify visuals against the build (`pnpm build`, then `scripts/review-pack.sh`).

## Read First
- `design/BRIEF-company.md` - Who the company is, the site concept, the writing rules, what must never be published
- `design/SYSTEM.md` - How to build pages with the design system
- `design/CONTENT.md` - All page copy, generated from the build (do not edit by hand)
- `tasks/lessons.md` - Lessons from past corrections

## Project Structure
- `src/layouts/Base.astro` - Layout for every page (header, footer, shared script)
- `src/styles/site.css` - Tokens (color, type scale, grid) and shared classes
- `src/scripts/site.ts` - Shared motion: line/fill state changes, logo glyph springs, header, menu
- `src/lib/fx.ts` - Splits display text into per-character spans
- `src/lib/status.ts` - Maps a status label to a fill level (status pill, case study head)
- `src/components/`
  - `site/` - Shared parts (Header, Footer, Fx, Glyph, PageHero, SectionHead, Cta, ...)
  - `home/`, `approach/`, `work/`, `about/`, `members/`, `portfolio/`, `careers/`, `contact/`, `forms/` - Page sections
- `src/data/` - Copy and structured data for pages
- `src/content/projects/` - Case studies (Markdown, content collection)
- `src/pages/` - Astro routes. `api/contact.ts` is the only server route
- `scripts/` - Font subsetting, phrase wrapping, QA, screenshots, copy dump, OG image
- `design/` - Briefs, direction boards, QA output
- `public/` - Static assets

## Site Structure
- `/` - トップ
- `/approach` - つくり方
- `/projects` - 実績の一覧
  - `/projects/[slug]` - 実績の詳細
- `/about` - 会社
- `/members` - メンバー
  - `/members/[slug]` - メンバーのポートフォリオ。URL を直接渡すページで、サイト内からはリンクしない（代表が導線を外している）。`STANDALONE=true` でビルドすると、田原のページはヘッダーとフッターなしになる
- `/careers` - 採用
  - `/careers/fullstack`, `/careers/intern` - 職種の詳細
- `/contact` - お問い合わせ
- `/privacy-policy` - 個人情報保護方針
- `/blog` - Zenn のパブリケーションへリダイレクト

## Code Style Guidelines
- **Pages and components**: Astro components (`.astro`) with scoped `<style>`. No React, Tailwind, or shadcn/ui (the integrations are removed from `astro.config.mjs`; the packages and Storybook config are leftovers)
- **TypeScript**: Strict. Explicit types for function parameters and returns
- **Imports**: External libs first, then internal (alphabetical order)
- **Formatting**: Prettier config (2 spaces, 80 chars, double quotes, trailing commas)
- **Naming**: Components PascalCase, functions/variables camelCase, types PascalCase
- **Typography**: Only the tokens in `site.css` (`--f-sans`, `--f-mono`, `--fw-regular`, `--fw-bold`, `--fs-*`). `pnpm qa:words` fails on raw values. A justified exception needs a `型の外: 理由` comment on the same line
- **Line/fill text (`Fx`)**: On a non-paper background, set `--sec-bg` to the background color. Outline text means only "the old way" or "a design not yet verified", and is used at 48px or larger (see `design/SYSTEM.md`)
- **Line wrapping**: Do not set `word-break` in components. The build inserts phrase breaks so headings and body wrap at phrase boundaries in every browser
- **Motion**: Use the existing mechanisms (`data-reveal`, `Fx`, `Glyph`). Respect `prefers-reduced-motion`
- **Copy**: Follow `design/BRIEF-company.md` section 3. Headings carry no 「、」「。」. No client names, amounts, or unsourced numbers. Do not remove or rewrite facts the owner already published (job conditions, career history, numbers on the old site) without being asked

## Environment
- `SLACK_WEBHOOK_URL` - Required by `/api/contact`. Set it as a Cloudflare Pages secret. Never commit it
