# Jilmeker ERP Phase 1 plan

## Approved scope

Build a working, responsive Phase 1 demo for Jilmek Construction's roofing management ERP. The demo focuses on the operational shell and the highest-value connected workflow surfaces: dashboard, customers, roofing surveys, the first version of a roof-area estimator, projects, inventory, finance summaries and reports.

The demo will use an explicit sample workspace so the interface can be evaluated without pretending that sample data is production data. Customer records, project records and inventory rows are held in browser state for this phase. The estimator performs a transparent gable-roof surface-area calculation from user inputs and shows its assumptions, but it does not approve or price a quotation automatically.

## Design direction

The selected direction is **Construction Control Room**: a calm, premium operations interface with a deep navy foundation, warm safety-orange actions and paper-toned work surfaces. The layout uses a persistent rail and offset content panels rather than a generic centered dashboard. Dense operational information is balanced with generous spacing, clear status chips and visible next actions.

Core principles are clarity before decoration, traceability before automation, Ghana-ready business context and mobile resilience. The interface uses Inter-like system typography, short labels, compact tables, progress bars and orange focus states. The brand voice is direct and operational: “See what needs attention.” and “Move a roof from survey to handover with fewer gaps.”

## Structure

- `app/page.tsx`: client-side demo shell, navigation, dashboard and module views.
- `app/globals.css`: responsive design system and component styling.
- `lib/roofing.ts`: pure roof-estimation calculation and validation function.
- `scripts/roofing-check.ts`: deterministic calculation checks for the estimator.
- `public/manus-routes.json`: route manifest for the single-page demo.
- `.env.example`: reserved configuration notes; no secrets are required for the demo.

## Phase boundary

Authentication, database persistence, backend permission enforcement, file storage, PDF generation, production notifications, audit persistence and VPS deployment are not claimed as complete in this demo. They are listed as the next phase dependencies in `TODO.md`.
