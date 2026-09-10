# Capacity Connect — Final Approval & Onboarding Revision

## Correct trainee access lifecycle

1. Trainee signs up.
2. Trainee is authenticated only into the onboarding workspace.
3. Dashboard navigation, global search, notifications and profile controls are hidden during onboarding and diagnostic.
4. Trainee completes onboarding.
5. Trainee takes the role-specific 10-question diagnostic once.
6. Server stores diagnostic evidence, competency results, skill gaps, roadmap and trainer recommendations.
7. Diagnostic result shows **Request Approval** only. It does not expose the operational dashboard or roadmap as a bypass.
8. Requesting approval changes the trainee account to `pending` and the local session is cleared.
9. Admin reviews the trainee in Users and approves/rejects the account.
10. Approved trainee can sign in and receives the stored personalized dashboard.

## One-time diagnostic protection

The server rejects `/diagnostic`, `/diagnostic/start` and `/diagnostic/submit` after a completed diagnostic. Browser Back cannot create a second diagnostic attempt.

## Trainer access

Trainees can view matched trainer profiles and send training requests. Trainers see requests in Support and can approve or decline them. An approved trainer relationship can grant access to that trainer's protected course resources and assessments, while normal course enrollment remains supported.

## Existing demo accounts

Existing demo learners remain active so the complete learning journey can be demonstrated without requiring approval each time. Newly registered trainees follow the approval flow.
