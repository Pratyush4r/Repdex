# Repdex

Repdex is a TypeScript React portfolio project for exploring exercises, running training timers, and calculating BMI.

## What It Does

- Search exercises by name, body part, target muscle, or equipment.
- View exercise details with related videos and similar movements.
- Save favorite exercises locally.
- Use timer modes: countdown, HIIT, and stopwatch.
- Use accessibility controls: theme, text size, UI scale, reduced motion, readable font, contrast.

## Tech Stack

- React 18 + TypeScript
- Material UI (MUI)
- React Router v6
- RapidAPI (ExerciseDB, YouTube Search)
- ESLint + GitHub Actions CI

## Run Locally

```bash
cd projects/repdex
cp .env.example .env
npm install
npm start
```

Open `http://localhost:3000`.

## Environment Variables

Set these in `.env`:

- `REACT_APP_RAPID_API_KEY` (required)
- `REACT_APP_YOUTUBE_RAPID_API_KEY` (optional, requires separate RapidAPI subscription for YouTube endpoint)

## Scripts

- `npm start` - start dev server
- `npm run build` - production build
- `npm run test` - test watcher
- `npm run test:ci` - single test run (CI mode)
- `npm run lint` - lint source files
- `npm run lint:fix` - auto-fix lint issues
- `npm run typecheck` - TypeScript check
- `npm run check` - lint + typecheck + tests + build

## Project Structure

- `src/pages` route-level pages
- `src/components` reusable UI blocks
- `src/context` app-wide state (favorites, accessibility)
- `src/utils` API helpers and shared utilities
- `src/types` shared domain types
- `docs/ARCHITECTURE.md` maintainability and extension notes
- `docs/SECURITY.md` OWASP-aligned frontend baseline

## Engineering Notes

- Design follows a simple compositional pattern: pages orchestrate, components render, contexts manage cross-cutting state.
- API handling is centralized in `src/utils/fetchData.ts` for consistent error handling and key checks.
- CI runs quality and dependency audit workflows in `.github/workflows/ci.yml`.

## Deployment

Target platform: Netlify.

Build command:

```bash
npm run build
```

Publish directory:

```text
build
```
