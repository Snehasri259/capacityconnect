# Capacity Connect — Support + Trainee Approval/Diagnostic Workflow Fix

## Fixed issues

### Trainer Support
- Fixed the runtime crash caused by `ListChecks` being used without importing it from `lucide-react`.
- Kept the existing Support workspace and API behavior intact.
- Support route remains `/trainer/support` and uses `/api/v1/trainer/support` plus `/api/v1/trainer/requests`.

### New trainee workflow
Implemented the requested lifecycle:

NEW USER
  -> Sign Up + trainee professional details
  -> status = pending
  -> diagnostic_test_status = not_started
  -> profile is sent directly to Admin Approvals
  -> Admin reviews trainee profile
  -> Admin approves
  -> status = active
  -> First Sign In
  -> Diagnostic Test opens automatically
  -> start sets diagnostic_test_status = in_progress
  -> submit sets diagnostic_test_status = completed
  -> Dashboard opens

Completed trainees keep direct dashboard access.

### Removed
- Removed the trainee `Request Approval` step after diagnostic.
- Removed the `/trainee/request-approval` API endpoint from the active source.

### Admin review
Admin approval profile now shows trainee:
- name/email
- department
- professional role
- organization
- qualification
- experience
- skills
- interests
- previous learning/certificates
- diagnostic status
- application state

### Trainer onboarding
Existing trainer onboarding/approval flow was preserved.

## Validation performed
- Parsed all client TS/TSX source files successfully with TypeScript transpilation.
- Recompiled server TypeScript sources to checked-in `server/dist` using the installed TypeScript compiler.
- `node --check` passed for all generated server JavaScript files.
- Verified the trainee approval-request endpoint/UI is absent from source.
- Verified `ListChecks` is imported where Trainer Support uses it.
- Verified final archive with `unzip -t`.

A full live browser E2E test was not possible in this execution environment because the project's npm dependencies could not be installed from the registry. The source and compiled server paths were nevertheless syntax-validated and the requested state/routing flow was checked statically.
