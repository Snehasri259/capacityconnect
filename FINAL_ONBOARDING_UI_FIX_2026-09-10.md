# Capacity Connect — Final Trainee Onboarding UI Fix

## Requested UX
The trainee signup flow now mirrors the existing trainer onboarding pattern:

1. Sign Up screen collects role + account credentials only.
2. Successful trainee account creation opens a dedicated trainee profile card.
3. The trainee profile card uses the same centered premium onboarding presentation as Trainer Onboarding.
4. The form asks only project-relevant trainee information: organization, department, professional role, qualification, experience, skills, learning interests, and prior certificates/training.
5. The final action is `Request Approval`.
6. Successful submission opens the application-under-review screen.
7. The application screen now offers `Back to Home`, not a Sign In action.
8. The extra `Next / What happens next` section on the signup page has been removed.

## Preserved behavior
- Existing trainer onboarding remains unchanged.
- Existing trainee approval, diagnostic, dashboard, admin approval, trainer assessments, and trainer support flows remain unchanged.
- First approved trainee sign-in still routes to Diagnostic when diagnostic status is not completed, and to Dashboard when completed.
- Admin approval still controls access.
