# Cloud Job Dashboard

A frontend-only cloud job monitoring dashboard. Users can create compute jobs, monitor their status, inspect job details, and review billing — following the workflow **Create Job → View Jobs → View Job Details → View Billing**.

Built with React 19 + TypeScript + Vite, styled with Tailwind CSS and shadcn/ui (Radix-based) primitives, with mock data persisted in `localStorage`.

## 1. Setup Instructions

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev

# Lint
npm run lint
```

No environment variables or backend are required — the app seeds itself from
`src/data/jobs.seed.json` into `localStorage` on first run.

## 2. Design Decisions

- **Thin components over pure logic.** All real logic (filtering, sorting, pagination, validation, persistence) lives in small pure functions/modules under `src/lib`. Components stay prop-driven and side-effect free.
- **State is derived, not duplicated.** `JobsPage` stores only filter inputs (status, search, sort, page); the visible list is always `paginate(applyFilters(jobs, query))`. This avoids sync bugs between a "filtered copy" and the source of truth.
- **Persistence behind one module.** `jobsStore` is the only code that touches `localStorage`; it seeds from `jobs.seed.json` on first run. Swapping in a real API later means rewriting one module, not the components.
- **`useJobs` as the single source of truth.** It simulates async latency so the loading skeleton is genuine and exposes a mockable error path.
- **Distinct states.** Empty-because-no-jobs (offers "New Job") is treated differently from empty-because-filters-matched-nothing (offers to adjust filters), rather than a single `length === 0` check.
- **Reusable loading skeleton.** A single `SkeletonTable` (configurable rows/columns) drives the loading state across Jobs, Billing, and Dashboard, so the placeholder always mirrors the real table shape.
- **shadcn/ui primitives** give accessible dialogs, selects, and the slide-in side panel (focus trapping, keyboard handling, animations) without rebuilding them.

## 3. What I Would Improve

- Replace the mock store with a real API and React Query for caching/retries.
- Live status transitions (websocket/polling) instead of static seed statuses.
- Server-side pagination, sorting, and search for large datasets.
- URL-synced filters (store query/sort/page in the URL for shareable views).
- Automated tests (unit + Playwright e2e) and an accessibility audit.
- Real file upload/download and authentication.

## 4. Deployed Version

Live on Vercel (auto-deploys on every push to `master`):

**https://frontend-take-home-assignment-umber.vercel.app**

Source: https://github.com/ptpl2602/Frontend-Take-Home-Assignment
