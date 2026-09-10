CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS organizations(
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), name text NOT NULL, created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now(), deleted_at timestamptz
);
CREATE TABLE IF NOT EXISTS users(
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), organization_id uuid REFERENCES organizations(id), email text UNIQUE NOT NULL, name text NOT NULL,
  status text NOT NULL DEFAULT 'active', department text, job_role text, created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now(), deleted_at timestamptz
);
CREATE TABLE IF NOT EXISTS roles(id uuid PRIMARY KEY DEFAULT gen_random_uuid(), name text UNIQUE NOT NULL);
CREATE TABLE IF NOT EXISTS user_roles(user_id uuid REFERENCES users(id) ON DELETE CASCADE, role_id uuid REFERENCES roles(id) ON DELETE CASCADE, PRIMARY KEY(user_id,role_id));
CREATE TABLE IF NOT EXISTS departments(id uuid PRIMARY KEY DEFAULT gen_random_uuid(), organization_id uuid REFERENCES organizations(id), name text NOT NULL, created_at timestamptz DEFAULT now());

CREATE TABLE IF NOT EXISTS trainee_profiles(user_id uuid PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE, department_id uuid REFERENCES departments(id), role_requirement_id uuid, experience_years numeric DEFAULT 0, onboarding_step int DEFAULT 1, onboarding_complete boolean DEFAULT false);
CREATE TABLE IF NOT EXISTS qualifications(id uuid PRIMARY KEY DEFAULT gen_random_uuid(), trainee_id uuid REFERENCES users(id) ON DELETE CASCADE, name text NOT NULL, institution text, year int);
CREATE TABLE IF NOT EXISTS work_experience(id uuid PRIMARY KEY DEFAULT gen_random_uuid(), trainee_id uuid REFERENCES users(id) ON DELETE CASCADE, title text NOT NULL, organization_name text, years numeric DEFAULT 0, description text);
CREATE TABLE IF NOT EXISTS trainee_skills(trainee_id uuid REFERENCES users(id) ON DELETE CASCADE, skill_name text NOT NULL, level int DEFAULT 0, PRIMARY KEY(trainee_id,skill_name));
CREATE TABLE IF NOT EXISTS interests(trainee_id uuid REFERENCES users(id) ON DELETE CASCADE, interest text NOT NULL, PRIMARY KEY(trainee_id,interest));
CREATE TABLE IF NOT EXISTS trainee_certificates(id uuid PRIMARY KEY DEFAULT gen_random_uuid(), trainee_id uuid REFERENCES users(id) ON DELETE CASCADE, title text NOT NULL, issuer text, issued_at date, verification_status text DEFAULT 'Pending');

CREATE TABLE IF NOT EXISTS trainer_profiles(user_id uuid PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE, approval_status text NOT NULL DEFAULT 'Pending', experience_years numeric DEFAULT 0, bio text);
CREATE TABLE IF NOT EXISTS trainer_expertise(trainer_id uuid REFERENCES users(id) ON DELETE CASCADE, expertise text NOT NULL, level int DEFAULT 0, PRIMARY KEY(trainer_id,expertise));
CREATE TABLE IF NOT EXISTS trainer_competencies(trainer_id uuid REFERENCES users(id) ON DELETE CASCADE, competency_id uuid, level int DEFAULT 0, PRIMARY KEY(trainer_id,competency_id));
CREATE TABLE IF NOT EXISTS trainer_certifications(id uuid PRIMARY KEY DEFAULT gen_random_uuid(), trainer_id uuid REFERENCES users(id) ON DELETE CASCADE, title text NOT NULL, issuer text, issued_at date);
CREATE TABLE IF NOT EXISTS trainer_performance(trainer_id uuid PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE, score numeric DEFAULT 0, feedback_score numeric DEFAULT 0, updated_at timestamptz DEFAULT now());

CREATE TABLE IF NOT EXISTS competency_domains(id uuid PRIMARY KEY DEFAULT gen_random_uuid(), organization_id uuid REFERENCES organizations(id), name text NOT NULL);
CREATE TABLE IF NOT EXISTS competencies(id uuid PRIMARY KEY DEFAULT gen_random_uuid(), domain_id uuid REFERENCES competency_domains(id), name text NOT NULL);
CREATE TABLE IF NOT EXISTS skills(id uuid PRIMARY KEY DEFAULT gen_random_uuid(), competency_id uuid REFERENCES competencies(id) ON DELETE CASCADE, name text NOT NULL);
CREATE TABLE IF NOT EXISTS competency_levels(id uuid PRIMARY KEY DEFAULT gen_random_uuid(), name text UNIQUE NOT NULL, rank int NOT NULL);
CREATE TABLE IF NOT EXISTS role_requirements(id uuid PRIMARY KEY DEFAULT gen_random_uuid(), organization_id uuid REFERENCES organizations(id), name text NOT NULL, description text, created_by uuid REFERENCES users(id), updated_by uuid REFERENCES users(id), created_at timestamptz DEFAULT now(), updated_at timestamptz DEFAULT now(), deleted_at timestamptz);
DO $$ BEGIN ALTER TABLE trainee_profiles ADD CONSTRAINT fk_trainee_role_requirement FOREIGN KEY(role_requirement_id) REFERENCES role_requirements(id); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
CREATE TABLE IF NOT EXISTS role_requirement_competencies(role_requirement_id uuid REFERENCES role_requirements(id) ON DELETE CASCADE, competency_id uuid REFERENCES competencies(id) ON DELETE CASCADE, required_score int NOT NULL CHECK(required_score BETWEEN 0 AND 100), PRIMARY KEY(role_requirement_id,competency_id));
CREATE TABLE IF NOT EXISTS trainee_competencies(user_id uuid REFERENCES users(id) ON DELETE CASCADE, competency_id uuid REFERENCES competencies(id), current_score int NOT NULL CHECK(current_score BETWEEN 0 AND 100), required_score int NOT NULL CHECK(required_score BETWEEN 0 AND 100), PRIMARY KEY(user_id,competency_id));
CREATE TABLE IF NOT EXISTS competency_evidence(id uuid PRIMARY KEY DEFAULT gen_random_uuid(), user_id uuid REFERENCES users(id), competency_id uuid REFERENCES competencies(id), source_type text NOT NULL, source_id text, score numeric NOT NULL, confidence numeric DEFAULT 1 CHECK(confidence BETWEEN 0 AND 1), created_at timestamptz DEFAULT now());
CREATE TABLE IF NOT EXISTS competency_history(id uuid PRIMARY KEY DEFAULT gen_random_uuid(), user_id uuid REFERENCES users(id), competency_id uuid REFERENCES competencies(id), previous_score int, new_score int, reason text, changed_by uuid REFERENCES users(id), created_at timestamptz DEFAULT now());

CREATE TABLE IF NOT EXISTS courses(id uuid PRIMARY KEY DEFAULT gen_random_uuid(), organization_id uuid REFERENCES organizations(id), trainer_id uuid REFERENCES users(id), title text NOT NULL, description text, level text, duration text, status text DEFAULT 'Draft', version int DEFAULT 1, created_by uuid REFERENCES users(id), updated_by uuid REFERENCES users(id), created_at timestamptz DEFAULT now(), updated_at timestamptz DEFAULT now(), deleted_at timestamptz);
CREATE TABLE IF NOT EXISTS course_modules(id uuid PRIMARY KEY DEFAULT gen_random_uuid(), course_id uuid REFERENCES courses(id) ON DELETE CASCADE, title text NOT NULL, position int NOT NULL, status text DEFAULT 'Published');
CREATE TABLE IF NOT EXISTS course_competencies(course_id uuid REFERENCES courses(id) ON DELETE CASCADE, competency_id uuid REFERENCES competencies(id), PRIMARY KEY(course_id,competency_id));
CREATE TABLE IF NOT EXISTS course_prerequisites(course_id uuid REFERENCES courses(id) ON DELETE CASCADE, prerequisite text NOT NULL, PRIMARY KEY(course_id,prerequisite));
CREATE TABLE IF NOT EXISTS course_enrollments(id uuid PRIMARY KEY DEFAULT gen_random_uuid(), course_id uuid REFERENCES courses(id), trainee_id uuid REFERENCES users(id), progress int DEFAULT 0 CHECK(progress BETWEEN 0 AND 100), status text DEFAULT 'In Progress', created_at timestamptz DEFAULT now(), updated_at timestamptz DEFAULT now(), UNIQUE(course_id,trainee_id));
CREATE TABLE IF NOT EXISTS learning_resources(id uuid PRIMARY KEY DEFAULT gen_random_uuid(), course_id uuid REFERENCES courses(id), owner_id uuid REFERENCES users(id), competency_id uuid REFERENCES competencies(id), resource_type text NOT NULL, title text NOT NULL, storage_path text, mime_type text, file_size_bytes bigint, version int DEFAULT 1, status text DEFAULT 'Draft', created_at timestamptz DEFAULT now(), updated_at timestamptz DEFAULT now(), deleted_at timestamptz);
CREATE TABLE IF NOT EXISTS trainer_library(id uuid PRIMARY KEY DEFAULT gen_random_uuid(), trainer_id uuid REFERENCES users(id), resource_id uuid REFERENCES learning_resources(id), created_at timestamptz DEFAULT now());

CREATE TABLE IF NOT EXISTS assessments(id uuid PRIMARY KEY DEFAULT gen_random_uuid(), course_id uuid REFERENCES courses(id), title text NOT NULL, time_limit_minutes int, deadline timestamptz, passing_score int DEFAULT 70 CHECK(passing_score BETWEEN 0 AND 100), attempt_limit int DEFAULT 1, status text DEFAULT 'Open');
CREATE TABLE IF NOT EXISTS questions(id uuid PRIMARY KEY DEFAULT gen_random_uuid(), assessment_id uuid REFERENCES assessments(id) ON DELETE CASCADE, skill_id uuid REFERENCES skills(id), question_text text NOT NULL, marks int DEFAULT 1);
CREATE TABLE IF NOT EXISTS question_options(id uuid PRIMARY KEY DEFAULT gen_random_uuid(), question_id uuid REFERENCES questions(id) ON DELETE CASCADE, text text NOT NULL, is_correct boolean DEFAULT false);
CREATE TABLE IF NOT EXISTS assessment_questions(assessment_id uuid REFERENCES assessments(id) ON DELETE CASCADE, question_id uuid REFERENCES questions(id) ON DELETE CASCADE, position int NOT NULL, PRIMARY KEY(assessment_id,question_id));
CREATE TABLE IF NOT EXISTS assessment_attempts(id uuid PRIMARY KEY DEFAULT gen_random_uuid(), assessment_id uuid REFERENCES assessments(id), trainee_id uuid REFERENCES users(id), attempt_number int NOT NULL DEFAULT 1, status text DEFAULT 'In Progress', score numeric, started_at timestamptz DEFAULT now(), submitted_at timestamptz, UNIQUE(assessment_id,trainee_id,attempt_number));
CREATE TABLE IF NOT EXISTS assessment_answers(attempt_id uuid REFERENCES assessment_attempts(id) ON DELETE CASCADE, question_id uuid REFERENCES questions(id), option_id uuid REFERENCES question_options(id), PRIMARY KEY(attempt_id,question_id));

CREATE TABLE IF NOT EXISTS diagnostic_attempts(id uuid PRIMARY KEY DEFAULT gen_random_uuid(), trainee_id uuid REFERENCES users(id) ON DELETE CASCADE, role_name text NOT NULL, question_count int NOT NULL, score numeric, status text DEFAULT 'In Progress', started_at timestamptz DEFAULT now(), submitted_at timestamptz);
CREATE TABLE IF NOT EXISTS diagnostic_answers(attempt_id uuid REFERENCES diagnostic_attempts(id) ON DELETE CASCADE, question_key text NOT NULL, skill_name text NOT NULL, selected_option int, is_correct boolean, PRIMARY KEY(attempt_id,question_key));
CREATE TABLE IF NOT EXISTS learning_roadmaps(id uuid PRIMARY KEY DEFAULT gen_random_uuid(), trainee_id uuid REFERENCES users(id) ON DELETE CASCADE, role_name text NOT NULL, status text DEFAULT 'Active', created_at timestamptz DEFAULT now(), updated_at timestamptz DEFAULT now());
CREATE TABLE IF NOT EXISTS roadmap_steps(id uuid PRIMARY KEY DEFAULT gen_random_uuid(), roadmap_id uuid REFERENCES learning_roadmaps(id) ON DELETE CASCADE, competency_id uuid REFERENCES competencies(id), course_id uuid REFERENCES courses(id), trainer_id uuid REFERENCES users(id), position int NOT NULL, current_score int, required_score int, gap int, priority text, status text DEFAULT 'Pending');

CREATE TABLE IF NOT EXISTS assessment_results(id uuid PRIMARY KEY DEFAULT gen_random_uuid(), attempt_id uuid UNIQUE REFERENCES assessment_attempts(id) ON DELETE CASCADE, score numeric NOT NULL, passed boolean NOT NULL, focus_areas text[] DEFAULT '{}', created_at timestamptz DEFAULT now());

CREATE TABLE IF NOT EXISTS interventions(id uuid PRIMARY KEY DEFAULT gen_random_uuid(), trainee_id uuid REFERENCES users(id), trainer_id uuid REFERENCES users(id), action text NOT NULL, message text, status text DEFAULT 'Assigned', created_at timestamptz DEFAULT now(), updated_at timestamptz DEFAULT now());
CREATE TABLE IF NOT EXISTS intervention_actions(id uuid PRIMARY KEY DEFAULT gen_random_uuid(), intervention_id uuid REFERENCES interventions(id) ON DELETE CASCADE, action text NOT NULL, position int NOT NULL, status text DEFAULT 'Pending');
CREATE TABLE IF NOT EXISTS intervention_progress(id uuid PRIMARY KEY DEFAULT gen_random_uuid(), action_id uuid REFERENCES intervention_actions(id) ON DELETE CASCADE, trainee_id uuid REFERENCES users(id), completed_at timestamptz);
CREATE TABLE IF NOT EXISTS reassessments(id uuid PRIMARY KEY DEFAULT gen_random_uuid(), trainee_id uuid REFERENCES users(id), competency_id uuid REFERENCES competencies(id), previous_score int, new_score int, created_at timestamptz DEFAULT now());

CREATE TABLE IF NOT EXISTS certificates(id uuid PRIMARY KEY DEFAULT gen_random_uuid(), trainee_id uuid REFERENCES users(id), course_id uuid REFERENCES courses(id), certificate_id text UNIQUE NOT NULL, issued_at timestamptz DEFAULT now(), status text DEFAULT 'Valid');
CREATE TABLE IF NOT EXISTS certificate_requirements(id uuid PRIMARY KEY DEFAULT gen_random_uuid(), course_id uuid REFERENCES courses(id), requirement_type text NOT NULL, requirement_value text NOT NULL);
CREATE TABLE IF NOT EXISTS certificate_verifications(id uuid PRIMARY KEY DEFAULT gen_random_uuid(), certificate_id uuid REFERENCES certificates(id), verified_at timestamptz DEFAULT now(), result boolean NOT NULL);

CREATE TABLE IF NOT EXISTS notifications(id uuid PRIMARY KEY DEFAULT gen_random_uuid(), user_id uuid REFERENCES users(id), event_key text NOT NULL, title text NOT NULL, body text NOT NULL, read_at timestamptz, created_at timestamptz DEFAULT now(), UNIQUE(user_id,event_key));
CREATE TABLE IF NOT EXISTS announcements(id uuid PRIMARY KEY DEFAULT gen_random_uuid(), organization_id uuid REFERENCES organizations(id), created_by uuid REFERENCES users(id), audience text NOT NULL, title text NOT NULL, body text NOT NULL, created_at timestamptz DEFAULT now(), updated_at timestamptz DEFAULT now());
CREATE TABLE IF NOT EXISTS achievements(id uuid PRIMARY KEY DEFAULT gen_random_uuid(), organization_id uuid REFERENCES organizations(id), title text NOT NULL, description text, published_by uuid REFERENCES users(id), created_at timestamptz DEFAULT now());

CREATE TABLE IF NOT EXISTS course_feedback(id uuid PRIMARY KEY DEFAULT gen_random_uuid(), from_user_id uuid REFERENCES users(id), course_id uuid REFERENCES courses(id), rating int CHECK(rating BETWEEN 1 AND 5), comment text, created_at timestamptz DEFAULT now());
CREATE TABLE IF NOT EXISTS content_feedback(id uuid PRIMARY KEY DEFAULT gen_random_uuid(), from_user_id uuid REFERENCES users(id), resource_id uuid REFERENCES learning_resources(id), rating int CHECK(rating BETWEEN 1 AND 5), comment text, created_at timestamptz DEFAULT now());
CREATE TABLE IF NOT EXISTS trainer_feedback(id uuid PRIMARY KEY DEFAULT gen_random_uuid(), from_user_id uuid REFERENCES users(id), trainer_id uuid REFERENCES users(id), rating int CHECK(rating BETWEEN 1 AND 5), comment text, created_at timestamptz DEFAULT now());

CREATE TABLE IF NOT EXISTS audit_logs(id uuid PRIMARY KEY DEFAULT gen_random_uuid(), organization_id uuid REFERENCES organizations(id), actor_id uuid REFERENCES users(id), action text NOT NULL, resource_type text NOT NULL, resource_id text, metadata jsonb DEFAULT '{}', created_at timestamptz DEFAULT now());
CREATE TABLE IF NOT EXISTS activity_logs(id uuid PRIMARY KEY DEFAULT gen_random_uuid(), organization_id uuid REFERENCES organizations(id), user_id uuid REFERENCES users(id), event text NOT NULL, metadata jsonb DEFAULT '{}', created_at timestamptz DEFAULT now());

CREATE INDEX IF NOT EXISTS idx_users_org ON users(organization_id);
CREATE INDEX IF NOT EXISTS idx_users_status ON users(status);
CREATE INDEX IF NOT EXISTS idx_courses_org_status ON courses(organization_id,status);
CREATE INDEX IF NOT EXISTS idx_course_enrollments_trainee ON course_enrollments(trainee_id,course_id);
CREATE INDEX IF NOT EXISTS idx_comp_history_user ON competency_history(user_id,created_at);
CREATE INDEX IF NOT EXISTS idx_evidence_user_comp ON competency_evidence(user_id,competency_id,created_at);
CREATE INDEX IF NOT EXISTS idx_audit_org ON audit_logs(organization_id,created_at);
CREATE INDEX IF NOT EXISTS idx_activity_org ON activity_logs(organization_id,created_at);
