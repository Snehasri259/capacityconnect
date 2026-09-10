# Capacity Connect

Capacity Connect is a competency-first digital capacity building and learning platform for IMD-style organizational training workflows.

## What is fixed in this build
- Tailwind CSS is fully configured and processed by PostCSS.
- Poppins + Inter + IBM Plex Mono are applied consistently.
- Indigo / Blue / Teal / neutral design tokens are centralized.
- Public landing page follows the 8-section story from the Design DNA.
- Role-based routing exists for Trainee, Trainer and Admin.
- Core trainee loop: onboarding → competency → gaps → course → assessment → support → reassessment → certificate verification.
- Trainer loop: dashboard → learners → performance → support → courses/resources/assessments.
- Admin loop: approvals → users → role requirements → view courses/assessments → certificates → announcements → analytics → capacity → trainer matching.
- REST API is under `/api/v1`.
- The local demo works without a database; PostgreSQL schema + Docker are included for production-oriented setup.
- API uses signed demo tokens, role checks, rate limiting, Helmet, CORS and consistent error responses.
- Admin approvals are vertically stacked with bounded scrolling, admin profile navigation is correct, and trainer/admin notification routes are role-correct.

## Requirements
- Node.js 20+ (Node 22 recommended)
- npm 10+
- Optional: Docker + Docker Compose for PostgreSQL

## Run locally

```bash
npm install
npm run dev
```

Open: http://localhost:5173

API health: http://localhost:4000/api/v1/health

## Demo accounts

- Trainee: `ananya@imd.gov.in` / `Demo@123`
- Trainer: `rao@imd.gov.in` / `Demo@123`
- Admin: `admin@imd.gov.in` / `Demo@123`

## Optional PostgreSQL

```bash
docker compose up -d postgres
```

The SQL schema and seed data are in `database/`.

> The current hackathon/demo server intentionally falls back to connected in-memory demo data so the UI can be demonstrated without requiring cloud credentials. For deployment, replace the demo repositories with the PostgreSQL/Supabase repositories and use a managed authentication provider such as Supabase Auth. Never expose service-role secrets to the browser.

## Production checklist
- Set a long random `AUTH_SECRET`.
- Use HTTPS and a strict `CLIENT_ORIGIN`.
- Use managed authentication / email verification.
- Connect repository services to PostgreSQL/Supabase.
- Use private object storage and signed URLs for learning resources.
- Run database migrations and backups.
- Add CI for lint, typecheck, unit, integration and E2E tests.
- Add observability and deployment secrets through the hosting platform.


## Trainer workflows

Trainer course, resource and assessment creation are interactive routes. Resource creation validates metadata and file size in the browser and persists protected metadata in demo mode; production file bytes should be sent to private object storage. Trainer learners, courses, resources and assessments support search. The top-bar search opens role-relevant navigation and routes directly to the selected area.

## Revision 2.1 trainer workflow updates

- Trainer dashboard quick actions now open dedicated course, resource and assessment creation flows.
- Trainer learner search filters by learner name, skill and status.
- Global dashboard search opens role-relevant areas and routes to them.
- Trainer resources support metadata, competency, access, versioning and draft/publish states.
- Trainer assessments support instructions, MCQs, options, correct answers, marks, time limit, deadline, passing score and attempt limit; trainers publish them when ready.
- Trainer course creation now has a guided flow for details, objectives, competency, modules, assessment and review.
- Trainers can publish their own courses when ready; admins have view-only access to course status and activity.
- Trainees now have an Improvement Plan screen and can mark assigned support steps complete before reassessment.
- The landing page has one Capacity Path only; the duplicate horizontal flow has been removed.
- A subtle right-side scroll progress rail shows landing-page reading progress on large screens.
- Support is explicitly framed as the bridge between assessment evidence and measurable reassessment growth.

## Current content governance

- New trainees and trainers require administrator approval before platform access.
- The Admin Users page contains only approved/active/suspended non-admin accounts. Pending applications appear only in Admin Approvals.
- Administrators do not approve or publish courses or assessments; those pages are view-only. Trainers publish their own course and assessment content when ready.
- The former standalone Competencies navigation has been removed. Role Requirements is the single place for the competency/skill library and role target levels, so the admin experience does not duplicate the same information across two pages.
