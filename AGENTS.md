# Repository Guidelines

Repdex is a TypeScript + React portfolio app: exercise catalog, training timers, BMI calculator, and accessibility controls. These guidelines apply to all contributors and AI agents working in this codebase.

---

## Project Structure

```
src/
  pages/        # Route-level components — orchestrate data and layout
  components/   # Reusable UI blocks — receive props, render, emit events
  context/      # Cross-cutting state (FavoritesContext, AccessibilityContext)
  utils/        # API helpers and shared logic (fetchData.ts is the API entry point)
  types/        # Shared domain models (index.ts)
docs/
  ARCHITECTURE.md   # Design rationale and extension guidelines
  SECURITY.md       # OWASP-aligned frontend security baseline
.github/workflows/
  ci.yml            # Quality gate + dependency audit on every PR and push to main
```

---

## Build, Test, and Development Commands

Requires **Node ≥ 18** and **npm ≥ 9**.

```bash
cp .env.example .env      # Copy and fill in API keys before first run
npm install               # Install dependencies

npm start                 # Start dev server at http://localhost:3000
npm run build             # Production build → build/
npm run test              # Run tests in watch mode
npm run test:ci           # Single test run (used in CI)
npm run lint              # Lint src/ with ESLint
npm run lint:fix          # Auto-fix lint issues
npm run typecheck         # TypeScript check (no emit)
npm run check             # Full gate: lint + typecheck + test:ci + build
```

Run `npm run check` locally before opening a PR — CI runs the same command.

---

## Coding Style & Naming Conventions

- **Indentation**: 2 spaces (enforced by `.editorconfig`)
- **Line endings**: LF; files must end with a newline
- **Language**: TypeScript only — `allowJs` is disabled; `noImplicitAny` is enabled
- **Linter**: ESLint with `airbnb` + `@typescript-eslint/recommended` configs
- **Component definitions**: any style is allowed (`react/function-component-definition` is off)
- **Naming**:
  - React components and type names → `PascalCase`
  - Functions, variables, hooks → `camelCase`
  - Files mirror their primary export (`ExerciseCard.tsx`, `fetchData.ts`)
- **Max line length**: 550 characters (ESLint enforced)
- **Blank lines**: at most 1 consecutive blank line inside a file

Do not disable ESLint rules inline without a comment explaining why.

---

## Testing Guidelines

- **Framework**: Jest + React Testing Library (via `react-scripts`)
- **Run**: `npm run test:ci` for a single pass; `npm test` for watch mode
- **Priority**: unit-test utility functions and data transformations first; add component tests for UI state transitions that are easy to regress
- **Naming**: test files live next to the code they test — `fetchData.test.ts`, `ExerciseCard.test.tsx`
- **CI requirement**: all tests must pass as part of `npm run check` before merge

---

## Commit & Pull Request Guidelines

- Write commit messages in the **imperative mood**: `Add BMI calculator page`, `Fix timer reset on route change`
- Scope the subject line to one logical change; keep it under 72 characters
- Use the body to explain *why* when the reason is not obvious from the diff
- PRs must:
  - Pass the full CI quality gate (`lint`, `typecheck`, `test:ci`, `build`)
  - Keep `noImplicitAny` clean — no new implicit `any` types
  - Include a short description of what changed and why
  - Reference any related issue if applicable

---

## Security & Configuration

- **Never commit `.env`** — it is gitignored; use `.env.example` for documentation
- API keys must only be read from `REACT_APP_*` environment variables
- All external requests go through `src/utils/fetchData.ts` — add new endpoints there
- CI runs `npm audit --audit-level=critical` on every push; resolve critical advisories before merging
- See `docs/SECURITY.md` for the full OWASP-aligned baseline

---

## Architecture Quick Reference

- **Pages** fetch and normalize data; pass it down to components as props
- **Components** are kept as pure as possible — no direct API calls, no global state mutations
- **Context** (`context/`) is reserved for state that multiple routes genuinely share
- **`src/utils/fetchData.ts`** is the single API entry point — do not scatter `fetch` calls across components
- See `docs/ARCHITECTURE.md` for extension patterns and key module descriptions
