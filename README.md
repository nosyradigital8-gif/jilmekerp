# Jilmeker ERP

A Phase 1 working demo for Jilmek Roofing & Construction Ltd. The interface is designed as a roofing operations control room for Ghanaian business workflows: customers, roof surveys, transparent estimation, projects, materials, finance and reporting.

## Run locally

```bash
npm install
npm run dev
```

The dev server runs on port `3002`.

## Demo login

Open `/login` first. The demo credentials are `admin@jilmek.demo` and `demo1234`. The login stores a browser-only demo flag and redirects to the dashboard. This is intentionally not production authentication; server-side sessions, password hashing and role enforcement remain Phase 2 work.

Useful checks:

```bash
npm run typecheck
npm run test:roofing
npm run build
```

## Phase 1 demo boundary

The dashboard clearly labels sample records. Customer, project, inventory and finance views are browser-state demo surfaces. The roof estimator performs a tested gable-roof surface-area calculation from entered measurements and shows its assumptions, but it does not claim quotation approval or production pricing accuracy.

Production work still required includes a relational database and migrations, secure authentication and backend permissions, persistent APIs, validated Jilmek/manufacturer roofing rules, document generation, uploads, audit logs, notifications, backups and VPS deployment. See `plan.md` and `TODO.md`.
