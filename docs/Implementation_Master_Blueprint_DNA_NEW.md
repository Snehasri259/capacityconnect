# CAPACITY CONNECT

# IMPLEMENTATION MASTER DNA v3.0

## FINAL TECHNICAL + FEATURE + UX EXECUTION BLUEPRINT

---

# 01. PURPOSE OF THIS DNA

This document defines exactly:

* What must be built
* In what order
* Which pages are required
* Which features belong to each role
* Which APIs are required
* Which database entities are required
* Who can access what
* What happens after every action
* How frontend and backend connect
* How errors are handled
* How security works
* How the complete demo works

The goal is:

**No developer should need to guess what a feature means or what happens next.**

---

# 02. FINAL TECHNOLOGY STACK

## FRONTEND

* React
* Vite
* TypeScript
* Tailwind CSS
* React Router
* TanStack Query
* React Hook Form
* Zod
* Recharts
* Lucide icons

---

# 03. BACKEND

* Node.js
* Express.js
* TypeScript
* REST API

Base API:

`/api/v1`

Architecture:

**Modular Monolith**

This keeps the project simple enough for a hackathon while allowing future growth.

---

# 04. DATABASE

Use:

**PostgreSQL**

Recommended platform:

**Supabase**

Use PostgreSQL for structured application data.

Use secure object storage for:

* PDFs
* Presentations
* Recorded lectures
* Study materials
* Certificates

---

# 05. AUTHENTICATION

Use:

**Supabase Auth**

or an equivalent secure authentication system.

Authentication handles:

* Signup
* Sign in
* Sign out
* Password reset
* Email verification
* Session management

Application authorization remains the responsibility of the backend.

---

# 06. CORE ARCHITECTURE

```text
CAPACITY CONNECT
        |
        v
     React UI
        |
        v
 React Query / Forms
        |
        v
 REST API
        |
        v
 Express Backend
        |
   +----+----+
   |         |
Services   Auth
   |
   +-------------------------------+
   |       |       |       |       |
Courses  Skills  Assessment  Trainer  Analytics
   |
   v
PostgreSQL
   |
   v
Secure Storage
```

---

# 07. FRONTEND STRUCTURE

```text
src/
│
├── app/
│   ├── router/
│   ├── providers/
│   └── queryClient/
│
├── components/
│   ├── ui/
│   ├── forms/
│   ├── navigation/
│   ├── cards/
│   ├── charts/
│   ├── tables/
│   ├── assessment/
│   └── competency/
│
├── layouts/
│   ├── PublicLayout/
│   ├── AuthLayout/
│   ├── TraineeLayout/
│   ├── TrainerLayout/
│   └── AdminLayout/
│
├── features/
│   ├── auth/
│   ├── onboarding/
│   ├── profiles/
│   ├── competencies/
│   ├── courses/
│   ├── learning/
│   ├── assessments/
│   ├── trainers/
│   ├── interventions/
│   ├── certificates/
│   ├── feedback/
│   ├── notifications/
│   ├── announcements/
│   └── analytics/
│
├── pages/
│   ├── public/
│   ├── auth/
│   ├── trainee/
│   ├── trainer/
│   └── admin/
│
├── hooks/
├── lib/
├── types/
├── utils/
└── styles/
```

---

# 08. BACKEND STRUCTURE

```text
src/
│
├── config/
├── middleware/
├── routes/
├── controllers/
├── services/
├── repositories/
├── validators/
├── policies/
├── utils/
├── jobs/
├── analytics/
└── types/
```

Domain services:

```text
auth
organizations
users
roles
trainee
trainer
competency
skills
diagnostic
skillGap
recommendation
courses
learning
resources
assessments
interventions
reassessment
certificates
feedback
notifications
announcements
analytics
capacity
audit
```

---

# 09. DATABASE CORE ENTITIES

## Identity

* users
* roles
* user_roles
* organizations
* departments

## Trainee

* trainee_profiles
* qualifications
* work_experience
* trainee_skills
* interests
* trainee_certificates

## Trainer

* trainer_profiles
* trainer_expertise
* trainer_competencies
* trainer_certifications
* trainer_courses
* trainer_performance

## Competency

* competency_domains
* competencies
* skills
* competency_levels
* role_requirements
* role_requirement_competencies
* trainee_competencies
* trainer_competencies
* competency_evidence
* competency_history

## Courses

* courses
* course_modules
* course_competencies
* course_prerequisites
* course_enrollments
* learning_resources
* trainer_library

## Assessment

* assessments
* questions
* question_options
* assessment_questions
* assessment_attempts
* assessment_answers
* assessment_results

## Intervention

* interventions
* intervention_actions
* intervention_progress
* reassessments

## Certification

* certificates
* certificate_requirements
* certificate_verifications

## Communication

* notifications
* announcements
* achievements

## Feedback

* course_feedback
* content_feedback
* trainer_feedback

## System

* audit_logs
* activity_logs

---

# 10. IMPORTANT DATABASE RULE

Every important record should contain ownership information where appropriate.

Examples:

```text
organization_id
created_by
updated_by
created_at
updated_at
```

This allows future multi-organization support.

---

# 11. ORGANIZATION ISOLATION

Even though MVP is IMD-first, data must be organization-aware.

Example:

```text
Organization
    |
    +-- Users
    +-- Departments
    +-- Roles
    +-- Competencies
    +-- Courses
    +-- Trainers
    +-- Trainees
    +-- Assessments
```

A user from Organization A must never automatically access Organization B's private data.

---

# 12. SOFT DELETE

Important records should generally not be permanently deleted immediately.

Use:

`deleted_at`

where appropriate.

This helps:

* Audit
* Recovery
* Historical analytics
* Data integrity

---

# 13. AUTHENTICATION FLOW

## TRAINEE

```text
Landing
 ↓
Get Started
 ↓
Trainee
 ↓
Signup
 ↓
Email verification
 ↓
Onboarding
 ↓
Diagnostic
 ↓
Competency result
 ↓
Dashboard
```

---

## TRAINER

```text
Landing
 ↓
Get Started
 ↓
Trainer
 ↓
Signup
 ↓
Email verification
 ↓
Trainer profile
 ↓
Submit for approval
 ↓
Pending approval
 ↓
Admin approves
 ↓
Trainer dashboard
```

---

## ADMIN

Admin account must be created through controlled administrative setup.

Do not expose public:

**Create Admin Account**

---

# 14. SIGN-IN FLOW

```text
Sign In
 ↓
Enter email/password
 ↓
Validate
 ↓
Authenticate
 ↓
Check account status
 ↓
Identify role
 ↓
Check permissions
 ↓
Redirect
```

Redirect:

```text
Trainee → /trainee/dashboard
Trainer → /trainer/dashboard
Admin → /admin/dashboard
```

---

# 15. ACCOUNT STATES

Every account should support clear states:

* Pending
* Active
* Suspended
* Disabled

Trainer:

* Pending Approval
* Approved
* Rejected
* Suspended

---

# 16. AUTHENTICATION ERROR CASES

Handle:

* Invalid email
* Invalid password
* Unverified email
* Account pending
* Account suspended
* Account disabled
* Expired session
* Password reset
* Network failure
* Duplicate account

Use simple user messages.

---

# 17. FRONTEND ROUTE GUARD

Every protected page checks:

```text
Authenticated?
     ↓
Active account?
     ↓
Correct role?
     ↓
Permission?
     ↓
Resource access?
```

---

# 18. BACKEND AUTHORIZATION

Never trust frontend permissions.

Every protected API must validate:

* User identity
* Organization
* Role
* Permission
* Resource ownership

---

# 19. TRAINEE ONBOARDING IMPLEMENTATION

Route:

`/trainee/onboarding`

Use five steps.

## STEP 1

Basic information.

## STEP 2

Qualifications and experience.

## STEP 3

Skills and interests.

## STEP 4

Certificates and previous training.

## STEP 5

Diagnostic assessment.

Save progress between steps.

A trainee should not lose everything because they refresh the browser.

---

# 20. TRAINEE PROFILE

Profile contains:

### Personal

* Name
* Organization
* Department
* Role

### Professional

* Qualifications
* Experience
* Skills
* Interests

### Learning

* Completed courses
* Current courses
* Certificates

### Competency

* Current competency
* Required competency
* Skill gaps
* Progress

---

# 21. DIAGNOSTIC ASSESSMENT IMPLEMENTATION

The diagnostic assessment is connected to competencies.

Each question should map to:

```text
Question
 ↓
Skill
 ↓
Competency
 ↓
Domain
```

When submitted:

```text
Answers
 ↓
Automatic scoring
 ↓
Skill scores
 ↓
Competency scores
 ↓
Required levels
 ↓
Gap calculation
 ↓
Priority
```

---

# 22. COMPETENCY CALCULATION

Keep the first version deterministic.

Example:

```text
Current Score = weighted evidence score
```

Evidence may include:

* Diagnostic result
* Course assessment
* Reassessment
* Practical activity
* Trainer feedback
* Verified previous learning

The exact weights should be configurable.

---

# 23. IMPORTANT RULE

Do not allow AI to silently change competency scores.

Competency calculations must be:

**deterministic + explainable + auditable.**

---

# 24. SKILL GAP ENGINE

Input:

```text
Current competency
+
Required competency
+
Competency importance
+
Evidence confidence
```

Output:

```text
Gap
+
Priority
+
Reason
+
Recommended action
```

---

# 25. GAP EXAMPLE

```text
Data Processing

Current: 55
Required: 80
Gap: 25

Priority: Moderate
```

Then:

**Recommended next step**

Data Processing Fundamentals

---

# 26. RECOMMENDATION ENGINE

Recommendation inputs:

* Skill gap
* Competency
* Required level
* Course mapping
* Course difficulty
* Prerequisites
* Previous learning
* Trainer expertise
* Trainer performance
* Availability

Output:

```text
Recommended Course
+
Recommended Resources
+
Recommended Trainer
```

---

# 27. RECOMMENDATION EXPLANATION

Every recommendation must explain itself.

Example:

**Why this course?**

“This course covers the skills where your current level is below the required level.”

---

# 28. TRAINEE DASHBOARD

API data:

```text
GET /api/v1/trainee/dashboard
```

Dashboard returns:

* Competency
* Required competency
* Skill gaps
* Recommendations
* Active courses
* Upcoming assessments
* Recent feedback
* Certificates
* Notifications

Primary component:

**Your Next Step**

---

# 29. COURSE DISCOVERY

API:

```text
GET /api/v1/courses
```

Support:

* Search
* Subject
* Competency
* Level
* Trainer
* Duration
* Status

---

# 30. COURSE DETAIL

API:

```text
GET /api/v1/courses/:courseId
```

Show:

* Course name
* Description
* Trainer
* Competencies
* Objectives
* Duration
* Level
* Prerequisites
* Modules
* Resources
* Assessment
* Certificate requirements

---

# 31. COURSE ENROLLMENT

Flow:

```text
View course
 ↓
Check eligibility
 ↓
Check prerequisites
 ↓
Enroll
 ↓
Create enrollment
 ↓
Show confirmation
 ↓
Course appears in My Learning
```

API:

```text
POST /api/v1/courses/:courseId/enroll
```

Enrollment must be idempotent.

Repeated clicks must not create duplicate enrollments.

---

# 32. LEARNING FLOW

```text
Course
 ↓
Module
 ↓
Resource
 ↓
Learning activity
 ↓
Progress update
 ↓
Next module
 ↓
Final assessment
```

Track:

* Started
* In progress
* Completed

---

# 33. RESOURCE TYPES

Support:

* Recorded lecture
* Presentation
* PDF
* Document
* Notes
* Reference material
* Study material

Every resource must have:

* Owner
* Course
* Competency
* Resource type
* Access permission
* Version
* Status

---

# 34. TRAINER LIBRARY

Trainer:

```text
Create resource
 ↓
Upload file
 ↓
Validate
 ↓
Save metadata
 ↓
Optional admin review
 ↓
Publish
```

Trainee:

```text
Course/library
 ↓
View allowed resources
 ↓
Open/download
```

Private resources must not have public URLs.

---

# 35. FILE SECURITY

Validate:

* File type
* File size
* Filename
* MIME type
* Access permission

Do not trust the extension alone.

Store private learning content in protected storage.

---

# 36. TRAINER PROFILE

Trainer profile contains:

* Name
* Organization
* Qualifications
* Experience
* Expertise
* Skills
* Competencies
* Certifications
* Courses
* Training history
* Learner feedback
* Performance

---

# 37. TRAINER DASHBOARD

API:

```text
GET /api/v1/trainer/dashboard
```

Show:

* Active learners
* Courses
* Pending assessments
* Learners needing support
* Course performance
* Upcoming deadlines
* Recent activity

Primary section:

**Learners Who Need Help**

---

# 38. TRAINER COURSE CREATION

Flow:

```text
Create course
 ↓
Basic details
 ↓
Learning objectives
 ↓
Competency mapping
 ↓
Modules
 ↓
Resources
 ↓
Assessment
 ↓
Review
 ↓
Submit
 ↓
Admin approval
 ↓
Publish
```

---

# 39. COURSE STATES

Use:

```text
Draft
 ↓
Submitted
 ↓
Under Review
 ↓
Approved
 ↓
Published
 ↓
Archived
```

Trainer cannot bypass approval where approval is required.

---

# 40. TRAINER QUESTIONNAIRE

Trainer can create:

* Title
* Instructions
* Questions
* Course
* Competency
* Deadline
* Attempt rules

States:

```text
Draft
Published
Open
Closed
Evaluated
```

---

# 41. MCQ SYSTEM

Support:

* Question bank
* Subject
* Competency
* Skill
* Options
* Correct answer
* Marks

Assessment configuration:

* Time limit
* Deadline
* Passing score
* Attempt limit

---

# 42. ASSESSMENT ATTEMPT FLOW

```text
Open assessment
 ↓
Check eligibility
 ↓
Check deadline
 ↓
Start attempt
 ↓
Answer questions
 ↓
Save progress
 ↓
Submit
 ↓
Evaluate
 ↓
Create result
 ↓
Update learning/competency
```

---

# 43. ASSESSMENT STATES

```text
Not Started
In Progress
Submitted
Evaluated
Result Available
Late
```

---

# 44. ASSESSMENT SAFETY

Prevent:

* Duplicate submissions
* Unauthorized access
* Editing submitted attempts
* Submission after closed deadline unless explicitly allowed

Use server-side deadline validation.

---

# 45. PERFORMANCE MONITORING

Trainer can open:

`/trainer/learners/:learnerId`

Show:

* Profile
* Course progress
* Assessment scores
* Competencies
* Skill gaps
* Learning history
* Intervention history
* Reassessment history

---

# 46. “NEEDS SUPPORT” ENGINE

A trainee may be flagged when:

* Assessment performance is low
* Required competency is far away
* Progress is stalled
* Repeated attempts fail
* Important competency is below target

Do not label users negatively.

Use:

**Needs Support**

instead of:

**Poor Performer**

---

# 47. TRAINER INTERVENTION

Trainer selects:

**Give Support**

Then chooses:

* Review resource
* Practice activity
* Additional material
* Trainer session
* Reattempt assessment
* Custom guidance

Trainer adds a message.

Then:

**Assign Support**

---

# 48. TRAINEE INTERVENTION

Trainee sees:

### Your Improvement Plan

```text
1. Review Module 2
2. Complete practice activity
3. Meet trainer
4. Take reassessment
```

Track completion.

---

# 49. REASSESSMENT

Flow:

```text
Intervention completed
 ↓
Reassessment available
 ↓
Start
 ↓
Submit
 ↓
Evaluate
 ↓
Compare with previous result
 ↓
Update competency
 ↓
Show growth
```

---

# 50. COMPETENCY GROWTH

Example:

```text
Diagnostic      55
       ↓
Course          63
       ↓
Intervention
       ↓
Reassessment    73
       ↓
Target          80
```

Store every major competency change in history.

---

# 51. CERTIFICATE ENGINE

Certificate eligibility can depend on:

* Course completion
* Passing assessment
* Required competency
* Practical requirement
* Trainer/admin approval

Only generate when requirements are satisfied.

---

# 52. CERTIFICATE FLOW

```text
Requirements checked
 ↓
Eligible
 ↓
Generate certificate
 ↓
Create unique ID
 ↓
Store certificate
 ↓
Show trainee
 ↓
Allow download
```

---

# 53. CERTIFICATE VERIFICATION

Route:

`/verify/:certificateId`

API:

```text
GET /api/v1/certificates/:certificateId/verify
```

Return only safe public information.

---

# 54. FEEDBACK SYSTEM

The original problem statement requires feedback.

Support:

### Course feedback

Trainee rates/comments on course.

### Content feedback

Trainee can provide feedback on:

* Lecture
* Presentation
* Document
* Study material

### Trainer feedback

Trainee can provide feedback about training.

Feedback should connect to the correct object.

---

# 55. ADMIN USER MANAGEMENT

Admin can:

* Search users
* Filter users
* Approve
* Reject
* Activate
* Deactivate
* Suspend
* Manage roles
* View profiles

All important actions should create audit records.

---

# 56. ADMIN COMPETENCY MANAGEMENT

Admin:

```text
Create domain
 ↓
Create competency
 ↓
Add skills
 ↓
Define levels
 ↓
Map to roles
 ↓
Map courses
 ↓
Map assessments
 ↓
Publish
```

---

# 57. ADMIN ROLE REQUIREMENTS

Example:

```text
Weather Analyst

Data Processing       → Proficient
Forecast Interpretation → Advanced
Communication         → Working
```

These requirements drive the gap engine.

---

# 58. ADMIN COURSE MANAGEMENT

Admin can:

* Create
* Review
* Approve
* Reject
* Publish
* Archive
* Monitor enrollment
* Monitor completion
* Manage content

---

# 59. ADMIN ASSESSMENT MANAGEMENT

Admin can see:

* Assessment count
* Participation
* Completion
* Average score
* Pass rate
* Performance trends
* Assessment status

---

# 60. ADMIN CERTIFICATION MANAGEMENT

Show:

* Certificates issued
* Certificates by course
* Certification rate
* Verification status
* Recent certificates

---

# 61. ADMIN ANNOUNCEMENTS

Admin can publish:

* New courses
* Training schedules
* Assessment deadlines
* New learning content
* Achievements
* Important notices
* Certification announcements

Audience can be:

* Everyone
* Trainees
* Trainers
* Specific organization/group

---

# 62. HOMEPAGE CONTENT MANAGEMENT

Selected admin-published content can appear on the landing/home experience.

Examples:

**New Learning Content**

**Upcoming Training**

**Latest Achievement**

**Important Announcement**

Everything must come from approved data.

---

# 63. ADMIN DASHBOARD

Dashboard must include the original requested statistics:

* Total trainees
* Total trainers
* Active users
* Total courses
* Course enrollments
* Course completion rate
* Assessment participation
* Average assessment score
* Certificates issued
* Training participation trends
* Popular courses
* Trainer performance
* Competency distribution

Then extend them with:

* Skill gaps
* Competency coverage
* Training demand
* Competency growth

---

# 64. ORGANIZATIONAL CAPACITY DASHBOARD

This is the advanced layer.

Admin can see:

```text
Organization
 ↓
Roles
 ↓
Required competencies
 ↓
Current competencies
 ↓
Skill gaps
 ↓
Training demand
 ↓
Courses
 ↓
Trainers
 ↓
Improvement
```

---

# 65. CAPACITY HEATMAP

Rows:

Competencies

Columns:

Roles / departments

Cell:

Current vs required.

Click cell:

```text
Competency
 ↓
Affected users
 ↓
Gap
 ↓
Available courses
 ↓
Available trainers
 ↓
Recommended action
```

---

# 66. TRAINER RECOMMENDATION ENGINE

Admin example:

```text
Subject:
Satellite Meteorology

Required Level:
Advanced
```

System evaluates:

* Subject expertise
* Skill level
* Qualifications
* Experience
* Certifications
* Previous courses
* Feedback
* Performance

Output:

```text
Trainer A — 94% match
Trainer B — 87% match
Trainer C — 73% match
```

The score must be explainable.

---

# 67. TRAINER MATCHING SCORE

Use a transparent weighted model.

Example:

```text
Subject expertise       30%
Competency level        20%
Experience              15%
Qualifications          10%
Certifications          10%
Previous performance    10%
Learner feedback         5%
```

Weights should be configurable.

Do not present the weights as official IMD rules.

They are platform logic.

---

# 68. PERSONALIZED COURSE RECOMMENDATION

Trainee recommendation considers:

* Skill gaps
* Interests
* Qualifications
* Experience
* Completed courses
* Assessment performance
* Competencies
* Course availability

Recommendation must prioritize actual skill needs.

---

# 69. AI LAYER

AI is optional support.

AI can generate:

* Learning explanations
* Recommendation explanations
* Learning summaries
* Admin insight summaries
* Suggested resources

AI should not directly modify:

* User roles
* Permissions
* Certificate validity
* Final competency records
* Assessment scores

without deterministic validation and authorized human/system rules.

---

# 70. AI FAILURE FALLBACK

If AI is unavailable:

The product must still work.

Use deterministic:

* Course mapping
* Skill-gap logic
* Trainer matching
* Rule-based recommendations

No feature should completely break because an AI API fails.

---

# 71. NOTIFICATION SYSTEM

Events generate notifications.

Examples:

```text
Course enrollment
Assessment deadline
Assessment result
Trainer intervention
Certificate earned
Trainer approval
Course approval
New learning content
Announcement
```

Do not create duplicate notifications when the same event is processed twice.

---

# 72. AUDIT LOGGING

Record sensitive actions:

* Login events where appropriate
* Role changes
* User approval
* User suspension
* Course approval
* Competency changes
* Certificate generation
* Certificate changes
* Resource publishing
* Assessment configuration changes

Audit logs should not be editable by normal users.

---

# 73. SECURITY MODEL

Implement:

* Secure authentication
* Role-based authorization
* Organization isolation
* Input validation
* API authorization
* Secure file uploads
* Private storage
* Session/token protection
* Rate limiting
* Audit logs
* Safe error messages
* Database access controls

---

# 74. INPUT VALIDATION

Use:

**Zod**

Validate:

* Signup
* Login
* Profile
* Course
* Assessment
* Questions
* Feedback
* Announcements
* Competency configuration

Validate on:

**Frontend + Backend**

Backend validation is mandatory.

---

# 75. API ERROR FORMAT

Use a consistent structure.

Example:

```json
{
  "success": false,
  "error": {
    "code": "COURSE_NOT_FOUND",
    "message": "We couldn't find this course."
  }
}
```

Do not expose stack traces.

---

# 76. IMPORTANT ERROR CODES

Examples:

```text
AUTH_INVALID_CREDENTIALS
AUTH_ACCOUNT_PENDING
AUTH_ACCOUNT_SUSPENDED
AUTH_UNAUTHORIZED

USER_NOT_FOUND
FORBIDDEN

COURSE_NOT_FOUND
COURSE_NOT_PUBLISHED
COURSE_ALREADY_ENROLLED

ASSESSMENT_NOT_FOUND
ASSESSMENT_CLOSED
ASSESSMENT_ALREADY_SUBMITTED

CERTIFICATE_NOT_FOUND

RESOURCE_NOT_FOUND
RESOURCE_ACCESS_DENIED

VALIDATION_ERROR
RATE_LIMITED
SERVER_ERROR
```

---

# 77. API GROUPS

## Authentication

```text
POST /auth/signup
POST /auth/signin
POST /auth/signout
POST /auth/forgot-password
POST /auth/reset-password
POST /auth/verify-email
GET  /auth/me
```

---

## Trainee

```text
GET   /trainee/profile
PUT   /trainee/profile
GET   /trainee/dashboard
GET   /trainee/competencies
GET   /trainee/skill-gaps
GET   /trainee/recommendations
GET   /trainee/courses
GET   /trainee/assessments
GET   /trainee/certificates
GET   /trainee/interventions
```

---

## Courses

```text
GET    /courses
GET    /courses/:id
POST   /courses/:id/enroll
GET    /courses/:id/resources
GET    /courses/:id/modules
```

---

## Trainer

```text
GET   /trainer/dashboard
GET   /trainer/profile
PUT   /trainer/profile
GET   /trainer/learners
GET   /trainer/learners/:id
POST  /trainer/courses
PUT   /trainer/courses/:id
POST  /trainer/resources
POST  /trainer/assessments
POST  /trainer/interventions
```

---

## Assessment

```text
GET   /assessments/:id
POST  /assessments/:id/start
POST  /assessments/:id/attempts
PUT   /attempts/:id/answers
POST  /attempts/:id/submit
GET   /attempts/:id/result
```

---

## Admin

```text
GET   /admin/dashboard
GET   /admin/users
PUT   /admin/users/:id/status
PUT   /admin/users/:id/role

GET   /admin/competencies
POST  /admin/competencies

GET   /admin/courses
PUT   /admin/courses/:id/approve

GET   /admin/assessments
GET   /admin/certificates

POST  /admin/announcements
GET   /admin/analytics
GET   /admin/capacity
```

---

# 78. API CONTRACT RULE

Every endpoint must define:

* Method
* Route
* Authentication
* Permission
* Request
* Validation
* Response
* Error codes

No undocumented important API.

---

# 79. STATE MANAGEMENT

Use server-state management through:

**TanStack Query**

Use local React state for:

* Modal state
* Tabs
* Temporary UI state
* Form state

Do not put all application data into one giant global store.

---

# 80. FORM MANAGEMENT

Use:

**React Hook Form + Zod**

Every form must provide:

* Validation
* Loading
* Error
* Success
* Disabled state

---

# 81. LOADING STATES

Every API-driven page must have a loading state.

Use:

* Skeletons
* Button loading
* Content placeholders

Avoid blank screens.

---

# 82. EMPTY STATES

Every major collection must have an intentional empty state.

Example:

**No courses yet**

**Recommended courses will appear here after your assessment.**

---

# 83. ERROR STATES

Every major page must support:

```text
Loading
Success
Empty
Error
Retry
```

---

# 84. FRONTEND ERROR BOUNDARY

Unexpected frontend errors must not destroy the whole application.

Show:

**Something went wrong.**

**[Try Again]**

Log technical details separately.

---

# 85. NETWORK FAILURE

If the network fails:

Show:

**You appear to be offline.**

For assessment:

Protect unsent answers where technically possible.

Never falsely tell the trainee:

**Assessment submitted**

unless the server confirms submission.

---

# 86. CONCURRENCY

Important operations must protect against duplicate actions.

Examples:

* Double enrollment
* Double certificate generation
* Duplicate assessment submission
* Duplicate notification
* Duplicate approval

Use:

* Database constraints
* Transactions
* Idempotency
* Unique keys

---

# 87. TRANSACTIONS

Use transactions for multi-step critical operations.

Example:

Certificate generation:

```text
Check requirements
 ↓
Create certificate
 ↓
Create verification record
 ↓
Update trainee status
 ↓
Commit
```

If something fails:

**Rollback.**

---

# 88. PERFORMANCE

Prioritize:

* Pagination
* Lazy loading
* Optimized queries
* Indexed database fields
* Image optimization
* Code splitting
* Cached API data
* Efficient chart queries

Do not load the entire database into the browser.

---

# 89. SEARCH + FILTERING

Large lists must support:

* Search
* Filters
* Sorting where useful
* Pagination

Especially:

* Users
* Courses
* Trainers
* Assessments
* Resources
* Certificates

---

# 90. ANALYTICS RULE

Analytics must use one trusted definition for each metric.

Example:

**Course Completion Rate**

must have one defined calculation.

Do not allow trainee dashboard and admin dashboard to calculate it differently.

---

# 91. ANALYTICS DATA FLOW

```text
Database
 ↓
Analytics service
 ↓
Validated metric
 ↓
API
 ↓
Dashboard
```

Charts should never contain manually typed fake values in production code.

---

# 92. DEMO DATA

Create a controlled demo dataset.

Use:

* IMD
* Departments
* Example roles
* Example competencies
* Example courses
* Example trainers
* Example trainees
* Assessments
* Skill gaps
* Interventions
* Certificates

Data must be relationally connected.

---

# 93. DEMO STORY

Use one primary trainee.

Example:

**Ananya**

Role:

**Weather Analyst**

Required:

Data Processing — 80

Diagnostic:

55

Gap:

25

Recommendation:

Data Processing Fundamentals

Trainer:

Dr. Rao

Assessment:

54%

Intervention:

Data Cleaning Practice

Reassessment:

73%

Then Admin sees:

**Competency improvement**

---

# 94. SECOND DEMO STORY

Admin creates:

**Satellite Meteorology — Advanced**

System evaluates trainers.

Output:

```text
Trainer A — 94%
Trainer B — 87%
Trainer C — 73%
```

Admin sees why Trainer A is the strongest match.

This proves the competency mapping feature.

---

# 95. COMPLETE DEMO FLOW

```text
LANDING
 ↓
SIGNUP
 ↓
TRAINEE ONBOARDING
 ↓
PROFILE
 ↓
DIAGNOSTIC
 ↓
COMPETENCY
 ↓
SKILL GAP
 ↓
COURSE RECOMMENDATION
 ↓
TRAINER RECOMMENDATION
 ↓
ENROLL
 ↓
LEARN
 ↓
ASSESS
 ↓
TRAINER SEES PERFORMANCE
 ↓
TRAINER GIVES SUPPORT
 ↓
REASSESS
 ↓
COMPETENCY GROWTH
 ↓
CERTIFICATE
 ↓
ADMIN CAPACITY DASHBOARD
```

---

# 96. DEVELOPMENT STRATEGY

Do not build all frontend pages first.

Build complete vertical slices.

---

# 97. SLICE 1 — FOUNDATION

Build:

* Project setup
* Database
* Authentication
* Roles
* Permissions
* Layouts
* Navigation
* Error handling

Completion:

**Users can securely enter the correct application.**

---

# 98. SLICE 2 — TRAINEE

Build:

* Onboarding
* Profile
* Diagnostic
* Competency
* Skill gaps
* Dashboard

Completion:

**Trainee can understand their current skill level.**

---

# 99. SLICE 3 — LEARNING

Build:

* Courses
* Enrollment
* Modules
* Resources
* Trainer library
* Progress

Completion:

**Trainee can discover and complete learning.**

---

# 100. SLICE 4 — ASSESSMENT

Build:

* Question bank
* MCQ
* Assessment
* Attempt
* Automatic scoring
* Result
* History

Completion:

**Trainee can be assessed and receive a result.**

---

# 101. SLICE 5 — TRAINER

Build:

* Trainer profile
* Approval
* Dashboard
* Course creation
* Resource upload
* Questionnaire
* Learner performance
* Intervention

Completion:

**Trainer can teach and support learners.**

---

# 102. SLICE 6 — REASSESSMENT

Build:

* Intervention tracking
* Reassessment
* Competency history
* Growth visualization

Completion:

**The platform proves improvement.**

---

# 103. SLICE 7 — CERTIFICATION

Build:

* Eligibility rules
* Certificate generation
* Certificate page
* Verification

Completion:

**Successful trainees can receive verifiable certificates.**

---

# 104. SLICE 8 — ADMIN

Build:

* User management
* Competency management
* Role requirements
* Course approval
* Assessment monitoring
* Certification monitoring
* Announcements

Completion:

**Admin can control the platform.**

---

# 105. SLICE 9 — CAPACITY INTELLIGENCE

Build:

* Organizational competency
* Skill-gap heatmap
* Training demand
* Trainer matching
* Capacity trends

Completion:

**Admin can understand organizational capability.**

---

# 106. SLICE 10 — FINAL POLISH

Perform:

* Responsive testing
* Accessibility
* Security testing
* Performance testing
* Error testing
* Empty states
* Loading states
* Animation polish
* Visual alignment
* Content review

---

# 107. TESTING PYRAMID

## Unit Tests

Test:

* Gap calculations
* Competency calculations
* Recommendation ranking
* Certificate eligibility
* Permission checks

## Integration Tests

Test:

* API + database
* Authentication
* Enrollment
* Assessment submission
* Certificate generation

## End-to-End Tests

Test:

* Signup
* Login
* Onboarding
* Diagnostic
* Course enrollment
* Assessment
* Trainer intervention
* Reassessment
* Certificate
* Admin analytics

---

# 108. BUSINESS RULE TESTING

Do not test only buttons.

Test business rules.

Example:

If:

```text
Current = 55
Required = 80
```

Then:

```text
Gap = 25
```

If assessment is submitted twice:

**Only one valid submission.**

If trainee does not meet certificate requirements:

**No certificate.**

If trainer is not approved:

**Cannot publish organizational course.**

---

# 109. SECURITY TESTING

Test:

* Trainee accessing admin URL
* Trainer accessing admin API
* User accessing another user's private data
* Unauthorized resource downloads
* Invalid file uploads
* Invalid role changes
* Expired sessions
* Repeated requests

---

# 110. ACCESSIBILITY TESTING

Check:

* Keyboard navigation
* Focus states
* Contrast
* Form labels
* Screen-reader structure
* Error messages
* Touch targets
* Reduced motion

---

# 111. RESPONSIVE TESTING

Test at:

* 1440px
* 1280px
* 1024px
* 768px
* 390px

Check every major screen.

---

# 112. BROWSER TESTING

At minimum test:

* Chrome
* Edge
* Firefox

Mobile browser behavior should also be checked.

---

# 113. ENVIRONMENT MANAGEMENT

Use:

```text
.env.local
.env.development
.env.production
```

Never commit:

* Passwords
* Private keys
* Service-role keys
* API secrets

---

# 114. SERVICE-ROLE SECURITY

Supabase service-role credentials must never be exposed to the browser.

They belong only in trusted backend/server environments.

---

# 115. DATABASE SECURITY

Use database-level access policies where appropriate.

Do not rely only on frontend filtering.

---

# 116. FILE STORAGE SECURITY

Use private buckets for:

* Learning resources
* Trainer uploads
* Certificates where appropriate

Generate controlled access rather than exposing permanent public file URLs.

---

# 117. RATE LIMITING

Apply rate limits especially to:

* Login
* Signup
* Password reset
* Assessment submission
* File upload
* Public certificate verification

---

# 118. OBSERVABILITY

Every backend request should have a request ID.

Track:

* Errors
* Slow requests
* Failed API calls
* Authentication failures
* Important system events

Do not expose internal logs to users.

---

# 119. BACKUP + RECOVERY

For production-oriented architecture:

* Database backups
* Storage backup strategy
* Recovery process
* Data export plan

The hackathon implementation can keep this lightweight but must not ignore it.

---

# 120. VERSIONING

API:

`/api/v1`

Course content:

Maintain version information.

Competency:

Maintain history when requirements change.

Certificates:

Never silently rewrite historical certificate information.

---

# 121. COMPETENCY CHANGE HISTORY

If:

```text
Data Processing target
80 → 85
```

record:

* Previous value
* New value
* Who changed it
* When
* Reason if required

---

# 122. CONTENT GOVERNANCE

Trainer uploads:

**Draft**

↓

Review

↓

Approved

↓

Published

↓

Archived

Do not silently replace published content.

---

# 123. NOTIFICATION IDEMPOTENCY

If the same event is processed twice:

Do not send the user two identical notifications.

---

# 124. DATA INTEGRITY

Important relationships must have database constraints.

Examples:

* Unique email
* Unique enrollment per trainee/course
* Unique certificate ID
* Valid foreign keys
* Valid assessment attempts

---

# 125. DESIGN IMPLEMENTATION

The implementation must use the final Design DNA.

Do not create separate colors or typography inside individual pages.

Use shared design tokens.

---

# 126. DESIGN TOKENS

Centralize:

* Colors
* Font families
* Font sizes
* Spacing
* Radius
* Shadows
* Breakpoints
* Motion durations

No page-specific random values unless genuinely necessary.

---

# 127. COMPONENT SYSTEM

Create reusable components:

```text
Button
Input
Select
Textarea
Modal
Drawer
Badge
Card
Tabs
ProgressBar
ProgressRing
KPI
ChartCard
DataTable
EmptyState
ErrorState
Skeleton
Toast
Notification
CourseCard
TrainerCard
SkillGapCard
CompetencyCard
AssessmentCard
CertificateCard
```

---

# 128. COMPONENT STATES

Reusable components must support:

* Default
* Hover
* Active
* Focus
* Disabled
* Loading
* Error
* Selected

---

# 129. DESIGN CONSISTENCY

If the same concept appears in multiple places, use the same component.

Example:

**Skill Gap Card**

should not have five different designs across the application.

---

# 130. FRONTEND DATA FLOW

Preferred:

```text
Page
 ↓
Feature hook
 ↓
TanStack Query
 ↓
API client
 ↓
Backend API
 ↓
Service
 ↓
Repository
 ↓
Database
```

Keep business logic out of giant React components.

---

# 131. BACKEND DATA FLOW

```text
Request
 ↓
Auth middleware
 ↓
Permission middleware
 ↓
Validation
 ↓
Controller
 ↓
Service
 ↓
Repository
 ↓
Database
 ↓
Response
```

---

# 132. BUSINESS LOGIC LOCATION

Important business rules belong in backend services.

Examples:

* Competency calculation
* Skill gap
* Trainer matching
* Certificate eligibility
* Enrollment rules
* Assessment submission

Do not duplicate important business rules differently in frontend and backend.

---

# 133. SIMPLE USER LANGUAGE

All user-facing text must follow:

**Simple English Rule**

Use:

**View Skill Gaps**

not:

**View Competency Deficiency Analysis**

Use:

**Give Support**

not:

**Initiate Intervention**

Use:

**Required Level**

not:

**Target Competency Threshold**

Use:

**Recommended Course**

not:

**Personalized Learning Intervention**

---

# 134. TECHNICAL LANGUAGE IS INTERNAL

Database names, API names, service names, and code can use technical terminology.

Users should not see technical implementation terms unless necessary.

---

# 135. LANDING PAGE IMPLEMENTATION

The public page contains:

Header

↓

8 sections

↓

Footer

Sections:

1. Hero
2. Problem
3. How It Works
4. Core Capabilities
5. Role Experience
6. Capacity Intelligence
7. Trust + Impact
8. Final CTA

No extra unnecessary sections.

---

# 136. LANDING PAGE PERFORMANCE

Optimize:

* Images
* Fonts
* Animations
* JavaScript
* Lazy-loaded media

The landing page should feel fast.

---

# 137. SEO BASICS

Implement:

* Page title
* Meta description
* Semantic headings
* Accessible images
* Proper link structure

---

# 138. MOBILE LANDING PAGE

Do not simply compress desktop.

Rearrange:

* Hero visual
* Capability cards
* Role cards
* Dashboard preview
* CTA

for mobile readability.

---

# 139. ADMIN DASHBOARD PERFORMANCE

Analytics should not query huge raw datasets on every page load.

Use:

* Aggregated queries
* Cached results
* Proper indexes
* Pagination
* Date filters

---

# 140. FEATURE FLAGS

Use simple feature flags where needed for:

* AI recommendations
* Advanced analytics
* Experimental features

This allows unfinished features to remain disabled without breaking the product.

---

# 141. MVP SCOPE CONTROL

If time becomes limited, prioritize:

```text
Authentication
 ↓
Trainee
 ↓
Diagnostic
 ↓
Competency
 ↓
Skill Gap
 ↓
Course
 ↓
Assessment
 ↓
Trainer
 ↓
Intervention
 ↓
Reassessment
 ↓
Certificate
 ↓
Admin
```

Do not sacrifice the core loop for decorative features.

---

# 142. ORIGINAL PROBLEM-STATEMENT COVERAGE CHECK

The implementation must explicitly satisfy:

[✓] Secure signup

[✓] Secure login

[✓] Trainee role

[✓] Trainer role

[✓] Admin role

[✓] Trainee professional profile

[✓] Qualifications

[✓] Work experience

[✓] Interests

[✓] Skills

[✓] Certificates

[✓] Course discovery

[✓] Course enrollment

[✓] Learning resources

[✓] Recorded lectures

[✓] Presentations

[✓] Study materials

[✓] Subject-wise MCQ assessment

[✓] Assessment results

[✓] Learning progress

[✓] Course feedback

[✓] Training-content feedback

[✓] Trainer profile

[✓] Trainer expertise

[✓] Trainer qualifications

[✓] Trainer experience

[✓] Trainer certifications

[✓] Course creation

[✓] Course management

[✓] Resource upload

[✓] Questionnaire creation

[✓] MCQ creation

[✓] Deadlines

[✓] Participation monitoring

[✓] Performance monitoring

[✓] Assessment analysis

[✓] Trainer feedback

[✓] User approval

[✓] Role management

[✓] User activation/deactivation

[✓] Course approval

[✓] Enrollment monitoring

[✓] Completion monitoring

[✓] Assessment monitoring

[✓] Certification monitoring

[✓] Announcements

[✓] Notifications

[✓] Achievements

[✓] New learning-content publishing

[✓] Competency mapping

[✓] Trainer recommendation

[✓] Security

[✓] Responsive design

[✓] Accessibility

[✓] Scalability

[✓] IMD-first implementation

[✓] Multi-organization architecture

## The original uploaded plan explicitly contains these requirements, so none should be accidentally dropped during implementation.

# 143. FINAL USER JOURNEYS

## TRAINEE

```text
Landing
 ↓
Signup
 ↓
Email Verification
 ↓
Onboarding
 ↓
Profile
 ↓
Diagnostic
 ↓
Competency
 ↓
Skill Gap
 ↓
Recommendations
 ↓
Course
 ↓
Enrollment
 ↓
Learning
 ↓
Assessment
 ↓
Result
 ↓
Trainer Support
 ↓
Reassessment
 ↓
Growth
 ↓
Certificate
 ↓
Feedback
```

---

# 144. TRAINER

```text
Landing
 ↓
Signup
 ↓
Verification
 ↓
Profile
 ↓
Admin Approval
 ↓
Dashboard
 ↓
Create Course
 ↓
Map Competencies
 ↓
Add Content
 ↓
Create Assessment
 ↓
Submit
 ↓
Admin Approval
 ↓
Publish
 ↓
Monitor Learners
 ↓
Review Performance
 ↓
Give Support
 ↓
Review Improvement
```

---

# 145. ADMIN

```text
Login
 ↓
Dashboard
 ↓
Approve Users
 ↓
Manage Roles
 ↓
Define Competencies
 ↓
Define Role Requirements
 ↓
Approve Courses
 ↓
Monitor Learning
 ↓
Monitor Assessments
 ↓
Monitor Certificates
 ↓
Publish Announcements
 ↓
View Skill Gaps
 ↓
View Trainer Matches
 ↓
View Capacity
 ↓
Take Action
```

---

# 146. FINAL SYSTEM LOOP

```text
ORGANIZATIONAL NEED
        ↓
ROLE
        ↓
REQUIRED SKILLS
        ↓
TRAINEE
        ↓
DIAGNOSTIC
        ↓
CURRENT COMPETENCY
        ↓
SKILL GAP
        ↓
RECOMMENDED COURSE
        ↓
RECOMMENDED TRAINER
        ↓
LEARNING
        ↓
ASSESSMENT
        ↓
TRAINER SUPPORT
        ↓
REASSESSMENT
        ↓
COMPETENCY GROWTH
        ↓
CERTIFICATE
        ↓
ORGANIZATIONAL CAPACITY
        ↓
NEW TRAINING NEED
        ↺
```

---

# 147. FINAL ACCEPTANCE TEST

Capacity Connect is not complete until a tester can successfully perform:

## Test A

Create trainee account.

## Test B

Complete onboarding.

## Test C

Complete diagnostic.

## Test D

Receive skill-gap result.

## Test E

Receive course recommendation.

## Test F

Receive trainer recommendation.

## Test G

Enroll.

## Test H

Access learning resources.

## Test I

Complete MCQ assessment.

## Test J

Receive result.

## Test K

Trainer sees performance.

## Test L

Trainer gives support.

## Test M

Trainee completes reassessment.

## Test N

Competency increases.

## Test O

Certificate becomes available when eligible.

## Test P

Admin sees updated capacity information.

If these cannot all be demonstrated, the core product is not finished.

---

# 148. FINAL QUALITY GATE

## PRODUCT

[ ] All original problem-statement features implemented.

## UX

[ ] Every user knows what to do next.

## UI

[ ] Consistent design system.

## LANGUAGE

[ ] Simple English everywhere.

## SECURITY

[ ] Frontend and backend authorization.

## DATA

[ ] Correct relationships and constraints.

## PERFORMANCE

[ ] No unnecessary large queries.

## RESPONSIVENESS

[ ] Desktop + tablet + mobile.

## ACCESSIBILITY

[ ] Keyboard + contrast + labels + focus.

## TESTING

[ ] Core business rules tested.

## DEMO

[ ] Complete end-to-end story works.

## INNOVATION

[ ] Competency → Gap → Learning → Trainer → Intervention → Reassessment → Growth is visible.

---

# 149. FINAL TECHNICAL NORTH STAR

Do not build:

**A beautiful collection of pages.**

Build:

**One connected system.**

Every action should create data that powers another useful action.

Example:

Assessment result

→ competency

→ skill gap

→ recommendation

→ enrollment

→ learning

→ trainer insight

→ intervention

→ reassessment

→ growth

→ certificate

→ organizational analytics.

---

# 150. FINAL IMPLEMENTATION PRINCIPLE

**Simple for the user.**

**Structured for the developer.**

**Secure for the organization.**

**Explainable for decision-makers.**

**Scalable for the future.**

---

# 151. FINAL CAPACITY CONNECT TECHNICAL IDENTITY

**Frontend**

React + TypeScript + Tailwind

**Backend**

Node + Express + TypeScript

**Database**

PostgreSQL

**Authentication**

Secure managed authentication

**Storage**

Private object storage

**API**

REST `/api/v1`

**Architecture**

Modular monolith

**State**

TanStack Query

**Forms**

React Hook Form + Zod

**Charts**

Recharts

**Testing**

Unit + Integration + E2E

**Security**

RBAC + organization isolation + validation + audit

---

# 152. FINAL IMPLEMENTATION DNA LOCK

The implementation must follow this exact order:

**PROJECT MASTER DNA**
↓
Defines the product

**DESIGN DNA**
↓
Defines the experience

**IMPLEMENTATION MASTER DNA**
↓
Builds the experience

**FIGMA/UI MASTER DNA**
↓
Translates the design into exact screens

**TESTING + DEMO**
↓
Proves the product

---

# FINAL PRINCIPLE

**Build for IMD.**

**Keep the language simple.**

**Connect every feature.**

**Measure real competency.**

**Turn gaps into action.**

**Turn learning into growth.**

**Turn growth into organizational capacity.**

**Build a product, not just a hackathon demo.**

