# Capacity Connect — Final Onboarding & Dynamic Flow Fix

## Requested behavior implemented

New trainee:
1. Sign Up page contains only account basics (role, full name, work email, password, confirmation and consent).
2. Submitting the basic account creates a `pending` account with `diagnosticTestStatus=not_started` and a token.
3. The trainee is taken to a separate, clean professional-profile form.
4. The final action is `Request Approval`.
5. Profile data is saved first, then the approval request is submitted.
6. The application remains `pending` and the diagnostic is locked.
7. Admin sees the trainee in Approvals and can open the full profile before approving.
8. Admin approval changes the account to `active`, clears `approvalRequired`, and leaves the diagnostic as `not_started`.
9. On the trainee's first sign-in after approval, the app routes to `/trainee/diagnostic`.
10. Starting the diagnostic sets `diagnosticTestStatus=in_progress`.
11. Submitting the diagnostic sets it to `completed` and makes the dashboard available.
12. Later sign-ins go directly to the trainee dashboard.

New trainer:
- Existing two-stage signup -> trainer profile -> Request Approval flow is preserved.
- Admin approval activates the trainer and the trainer dashboard remains dynamically scoped to that trainer's data.

## Technical changes

- Trainee signup no longer requires professional-profile fields on `/auth/signup`.
- Trainee signup now returns a token so the user can complete onboarding immediately while the account is pending.
- Trainee accounts start with `onboardingComplete=false`, `diagnosticTestStatus=not_started`, and `approvalRequired=true`.
- Added `POST /trainee/request-approval`.
- Updated `POST /trainee/onboarding/complete` to save the profile while pending and keep the account pending.
- Updated the trainee route guard so pending users can reach `/trainee/onboarding` but cannot access the rest of the trainee workspace.
- Updated the signup UI so the long trainee form is no longer embedded in the signup page.
- Updated trainee onboarding to match the trainer pattern: one clean profile form with a final `Request Approval` action.
- The request action performs profile save followed by approval submission.
- Existing first-login diagnostic routing remains role/status based.
- Existing trainer and admin workflows are preserved.

## Validation performed

- All client TS/TSX source files were transpiled with TypeScript syntax diagnostics; no syntax errors were reported.
- All server TypeScript source files were transpiled to ESM JavaScript without package type-checking dependencies.
- All generated server JavaScript files passed `node --check`.
- Verified the compiled server contains `/auth/signup`, `/trainee/onboarding/complete`, and `/trainee/request-approval`.
- Verified the final archive with `unzip -t`.

## Environment limitation

A full browser E2E test could not be executed in this isolated environment because the project's npm dependencies are not installed and the environment cannot download them from the npm registry. No live-browser test result is claimed.
