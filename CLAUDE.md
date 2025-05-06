# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build/Lint/Test Commands
- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm lint` - Run ESLint (add this if not already in package.json)

## Project Structure
- `src/components/` - React UI components
  - `ui/` - Base UI components (shadcn/ui)
  - `shared/` - Common layout and shared components
  - `pages/` - Page-specific components organized by route
  - `projects/` - Project showcase components
- `src/pages/` - Astro route pages
- `src/content/` - Content collections (markdown)
- `src/lib/` - Utilities and helper functions
- `public/` - Static assets

## Site Structure
- `/` - ホームページ (Hero, サービス紹介, 実績一覧)
- `/about` - 会社概要ページ
- `/projects` - 開発実績一覧ページ
  - `/projects/[slug]` - 個別プロジェクト詳細ページ
- `/members` - メンバー紹介ページ
- `/blog` - 技術ブログページ
- `/contact` - お問い合わせページ
- `/careers` - 採用情報ページ
  - `/careers/[position]` - 個別求人ページ
- `/privacy-policy` - プライバシーポリシーページ

## Code Style Guidelines
- **TypeScript**: Use strict type checking with explicit types for function parameters and returns
- **Imports**: Group imports by external libs first, then internal components (alphabetical order)
- **Components**: React functional components with explicit prop interfaces
- **Formatting**: 
  - Follow Prettier config (2 spaces, 80 chars limit, double quotes)
  - Use trailing commas in objects and arrays
- **Naming**: 
  - React components: PascalCase
  - Functions/variables: camelCase
  - Types/interfaces: PascalCase with "Props" suffix for component props
- **CSS**: Use Tailwind utility classes with cn() for conditional classes
- **Components**: Follow shadcn/ui patterns for new UI components