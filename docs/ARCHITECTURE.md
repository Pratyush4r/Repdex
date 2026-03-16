# Architecture Notes

This document is intended for future contributors (including future you) to quickly understand how the app is organized and where to extend it safely.

## Design Approach

The codebase follows a compositional React style inspired by common design-pattern guidance:

- `Pages` orchestrate data flow and section layout for each route.
- `Components` stay focused on rendering and local UI behavior.
- `Context Providers` (`Favorites`, `Accessibility`) hold cross-cutting state.
- `Utilities` (for example `fetchData`) centralize shared technical logic.

This separation keeps features understandable and easier to evolve without regressions.

## Data and State Flow

- API calls are centralized in `src/utils/fetchData.ts`.
- Route pages fetch and normalize data before passing it to components.
- Global user preferences and bookmarks are stored through context + local storage.
- Derived UI state (filters, pagination, timers) stays local to relevant pages/components.

## Key Modules

- `App.tsx`: app shell, routes, theme mode switching, pointer background effect.
- `context/AccessibilityContext.tsx`: persistent accessibility settings and CSS variable sync.
- `context/FavoritesContext.tsx`: bookmark persistence and helpers.
- `components/TimerStudio.tsx`: timer modes and session logic.
- `pages/ExerciseDetail.tsx`: exercise details + related fetch orchestration.
- `types/index.ts`: shared domain models to keep props/state contracts explicit.

## Extension Guidelines

- Add new global behavior in `context/` only when multiple routes truly need it.
- Add API endpoints through `fetchData.ts` and normalize responses near route-level code.
- Keep components as pure as possible: receive props, render UI, emit events.
- Prefer explicit naming over clever abstractions.
- When behavior is non-obvious, add concise comments near decision points.
- Keep `noImplicitAny` clean (enabled in `tsconfig.json`) before merge.

## Testing Strategy

- Unit tests for utilities and transformation logic first.
- Add component tests for UI state transitions that are easy to regress.
- Keep CI green with `npm run check` before merge.
