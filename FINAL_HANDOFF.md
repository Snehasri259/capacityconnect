# Capacity Connect — Final Functional Revision

## Core flow
Landing → Trainee signup → onboarding → role selection → 10-question role-specific diagnostic → competency baseline → skill-gap analysis → roadmap → trainer recommendations → course discovery → enrollment → protected learning resources → course assessment → result/evidence → trainer support → reassessment → competency growth → certificate eligibility → organizational capacity.

## Assessment visibility rule
Course assessments are owned by a trainer and attached to a course. They are NOT globally available to every trainee.

A trainee sees an assessment only when:
1. The assessment is approved/published (Open).
2. The trainee is enrolled in the assessment's course.
3. The assessment deadline has not passed.
4. The trainee has not exhausted the attempt limit.

Assessment results are stored against the trainee + assessment attempt and update the competency evidence for the assessment competency.

The diagnostic is separate from trainer-created course assessments and is always role-specific after onboarding.

## Role-specific diagnostic
Supported demo roles:
- Weather Analyst
- Forecast Officer
- Remote Sensing Analyst

Each role has a dedicated 10-question bank. Questions cover the competencies defined for that role. Options are presented in varied positions so the correct answer is not always option A.

## Roadmap
The roadmap is generated from:
Role requirement → diagnostic evidence → current competency → gap → priority → matching published course → approved trainer.

The roadmap is deterministic and explainable. It is not presented as a mysterious AI score.

## Trainer support
Trainer support is only available for learners connected to one of the trainer's courses. Support creates a learner improvement plan. Reassessment becomes available only after the assigned support steps are completed.

## Enrollment and resources
My Learning shows only enrolled courses. Explore Courses shows published courses. Protected course resources require enrollment.

## Development commands

```bash
npm install
npm run dev
```

Build:

```bash
npm run build
```

Tests:

```bash
npm test
```

## Demo accounts

Trainee:
- ananya@imd.gov.in
- Demo@123

Trainer:
- rao@imd.gov.in
- Demo@123

Admin:
- admin@imd.gov.in
- Demo@123

## Production boundary
The demo data layer is intentionally in-memory for the local hackathon workflow. The PostgreSQL schema includes the production data model for organizations, profiles, competencies, role requirements, courses, resources, assessments, attempts, evidence, interventions, reassessments, certificates, notifications and audit/activity logs.

Real deployment still requires managed authentication, PostgreSQL connection, private object storage, production secrets, HTTPS, backups and deployment infrastructure.
