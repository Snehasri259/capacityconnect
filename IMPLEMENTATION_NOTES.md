# Implementation Notes

## Root cause of the unstyled screenshot
The earlier project contained Tailwind directives but did not contain the required `tailwind.config.js` and `postcss.config.js`. Vite therefore served the class names without generating Tailwind CSS. The browser fell back to default HTML styling.

This revision adds both configuration files and a centralized CSS layer, which is the primary fix for the screenshot.

## Validation performed in this environment
- Inspected all three Capacity Connect DNAs again.
- Reviewed the existing project source and found the missing Tailwind/PostCSS configuration.
- Added the missing client build configuration and environment examples.
- Added complete role routes and connected UI flows.
- Added API validation, role authorization, rate limiting and safe error responses.
- Ran global TypeScript parsing checks. Package-resolution errors remain in this execution environment because npm registry access timed out before dependencies could be installed; the errors are missing installed packages, not syntax errors in the checked source.

## Important deployment boundary
The demo is intentionally usable without cloud credentials. Production deployment must connect the repository layer to PostgreSQL/Supabase, use managed authentication/email verification, private object storage, real file validation, migrations, backups and CI/E2E testing.

## Final Revision Notes — September 2026

- Global search now searches role-relevant content, not only navigation labels.
- Page search fields use a shared premium SearchField component and live filtering.
- Trainer assessment lifecycle: Draft -> Submitted -> Admin approval -> Open -> learner attempt -> Evaluated.
- Learners only receive published/open assessments for courses in which they are enrolled.
- Assessment questions returned to trainees never include the correct answer.
- Assessment attempts are protected against starting duplicate in-progress attempts and exceeding attempt limits.
- Server-side deadline checks are supported for assessments created with a real date/time.
- Course learning progress can be advanced from the course detail page and is stored against the trainee enrollment in demo mode.
- Reassessment is gated by completion of the assigned support plan.
- Certificate generation is gated by completion, a passing course assessment, and required competency.
- Admin role requirements are now represented as first-class data and a dedicated admin route/page.
- Landing page now uses a single Capacity Path hero representation, a vertical journey progress rail, an alternating timeline, evidence story, growth visualization, organizational impact section, and a premium footer.
- Production cloud services still require deployment-specific configuration and secrets. The local demo remains intentionally self-contained.
