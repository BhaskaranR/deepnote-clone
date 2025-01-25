CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL,
    sharing VARCHAR(50) NOT NULL,
    author VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_opened_at TIMESTAMP
);

ALTER TABLE projects DISABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS "public"."project_attachments" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "type" "text",
    "project_id" "uuid" REFERENCES "public"."projects"("id") ON DELETE CASCADE,
    "team_id" "uuid",
    "size" bigint,
    "name" "text",
    "path" "text"[]
);

ALTER TABLE "public"."project_attachments" OWNER TO "postgres";

ALTER TABLE project_attachments DISABLE ROW LEVEL SECURITY;
INSERT INTO projects (name, status, sharing, author, created_at, last_opened_at)
VALUES 
    ('A/B Testing', 'Idle', 'Private', 'Bhaskaran Rathnachalam', NOW() - INTERVAL '10 hours', NOW() - INTERVAL '10 minutes'),
    ('A/B Testing', 'Idle', 'Private', 'Bhaskaran Rathnachalam', NOW() - INTERVAL '10 hours', NOW() - INTERVAL '10 hours'),
    ('Bhaskaran Rathnachalam’s Untitled', 'Idle', 'Private', 'Bhaskaran Rathnachalam', NOW() - INTERVAL '10 hours', NOW() - INTERVAL '10 hours');

