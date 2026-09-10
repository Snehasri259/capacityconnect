# Capacity Connect — 2026-09-10 Final Admin & Content Governance Fixes

## Requested changes implemented

- Added a branded startup loader that appears during initial application bootstrap.
- Removed the standalone Competencies item from the Admin navigation and global search.
- Kept `/admin/competencies` as a compatibility redirect to `/admin/roles`.
- Role Requirements is now the single admin workspace for role targets and the competency/skill library.
- Admin Users now contains only non-admin accounts that are approved/active/suspended.
- Pending trainee and trainer accounts appear only in Admin Approvals.
- Admin Users action order is status action first (Suspend/Activate), then View Profile.
- Admin Courses is view-only; no admin publish/approval controls are present.
- Admin Assessments is view-only; no admin publish/approval controls are present.
- Trainers can publish their own courses and assessments when ready.
- Added trainer publish endpoints for courses and assessments.
- Removed obsolete trainer submit-for-admin-review UI/routes.
- Trainer assessment page remains available to all approved trainers and shows a clean empty state when a trainer has no assessments.
- Existing trainer assessment seed data remains connected to its owners.
- Admin Approvals action layout is responsive and aligned.
- Existing trainee and trainer learning workflows remain intact.

## Governance decision

The latest product decision overrides the earlier DNA approval assumption for course and assessment publication:

- Admin approves users (trainees/trainers).
- Trainers own and publish their course/assessment content.
- Admin can monitor/view course and assessment status but does not approve or publish them.

## Validation

- Client route count: 53 unique routes.
- No duplicate client route paths.
- Removed admin course/assessment approval endpoints from source API.
- Removed obsolete trainer submit endpoints from source API.
- ZIP integrity checked after packaging.
- Full dependency installation/build was not possible in the execution environment because npm registry access is unavailable; package declarations remain in the workspace manifests.
