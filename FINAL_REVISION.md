# Capacity Connect — Final Revision Handoff

This revision addresses the requested search, assessment lifecycle, reassessment, landing-page, routing, and missing-plan functionality.

## Search
- Shared premium SearchField component.
- Live page search for trainee courses/assessments, trainer learners/courses/resources/assessments, and admin users.
- Global top-bar search now searches role-relevant content and navigation destinations.

## Assessment lifecycle
- Trainer creates a draft assessment.
- Trainer submits it for review.
- Admin reviews and approves it.
- Approval changes it to Open/published.
- Only eligible trainees enrolled in the related published course see it.
- Server validates attempt limits and deadlines.
- Correct answers are never returned to trainee assessment UI.
- Results are evaluated server-side.

## Learning and reassessment
- Course progress can be advanced from the course page and is stored against the trainee enrollment in demo mode.
- Reassessment is gated by completion of assigned support steps.
- Reassessment updates the trainee's competency state in demo mode.
- Certificate generation checks completion, assessment result, and competency target.

## Admin capability
- Added Role Requirements page and API.
- Role requirements now have role, department, competency, target level and importance.
- Assessment approval is available to admin.

## Landing page
- Hero kept intact.
- Removed duplicate Capacity Path representation.
- Added a restrained journey-progress rail showing scroll progress and active story stage.
- Reworked How It Works as an alternating vertical timeline.
- Added Evidence, Growth, and Individual → Development → Organization impact sections.
- Reworked Capacity Intelligence onto the same calm neutral canvas system.
- Added premium decision-oriented data representations.
- Reworked footer and public navigation.

## Quality checks
- TypeScript source transpile/syntax check: PASS across 15 source files.
- External package declaration scan: PASS when workspace subpaths are normalized to their package roots.
- No missing package declarations were found.
- The environment could not download npm registry packages, so a real dependency install/build could not be completed here.
