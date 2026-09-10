# Capacity Connect — Production Fix Pass — 2026-09-10

## Fixed in this package

### Admin Approvals
- Changed approvals from a cramped two-column layout to a clear vertical workflow: Trainees first, Trainers second.
- Each approval list has a bounded scroll area so additional applications do not make the page grow indefinitely.
- Kept profile review, approve and reject actions aligned inside each application row.
- Fixed trainer approval action to send the backend-supported `active` status instead of the invalid `approved` status.

### Profile routing
- Fixed the Admin avatar menu's **My profile** action so it opens `/admin/profile` instead of incorrectly returning to the Admin Dashboard.
- Existing trainee and trainer profile routes remain unchanged.

### Notifications routing
- Added dedicated `/trainer/notifications` and `/admin/notifications` API routes.
- Updated the shared Notifications page to resolve the correct dashboard role from the current route, so trainer/admin notifications no longer depend on the trainee endpoint.

### Backend distribution
- Regenerated the checked-in `server/dist` JavaScript from the updated TypeScript source so `npm start` and `npm run dev` use the same route behavior.

## Validation performed
- All client/server TypeScript/TSX source files passed a TypeScript syntax/transpile diagnostic pass.
- Checked-in server distribution JavaScript passed `node --check`.
- Client route and API route coverage was reviewed, including trainer, trainee and admin workflows.
- ZIP integrity is verified after packaging.

## Environment limitation
A full dependency installation and browser E2E run could not be performed in this isolated environment because the npm registry/DNS is unavailable. The package therefore keeps the existing dependency manifests and local-demo architecture unchanged. Run `npm install` on the development machine, then `npm run dev` for the final live browser verification.
