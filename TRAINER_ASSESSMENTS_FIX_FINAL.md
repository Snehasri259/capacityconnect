# Trainer Assessments — Final Fix

## Root cause
The `/trainer/assessments` API correctly returned each assessment with `questions` as an array. The trainer page rendered that entire array directly inside JSX:

`{a.questions || 0} questions`

Because the array contains question objects, React attempted to render objects as children and threw a runtime exception. The AppShell page error boundary therefore displayed **“This page could not load”** even though the route and API existed.

## Fix
- The trainer assessment card now renders a numeric question count: `Array.isArray(a.questions) ? a.questions.length : ...`.
- The trainer assessments API now also exposes `questionsCount` as a defensive normalized field.
- The compiled backend `dist` route was synchronized with the source route.
- No unrelated dashboard, routing, authentication, data, or UI behavior was changed.

## Validation
- Confirmed the failing page contained direct rendering of `a.questions` while the API returned an array of question objects.
- Confirmed the API response shape and trainer ownership filtering.
- Confirmed the final archive after patching.
