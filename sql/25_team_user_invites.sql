-- Supabase AI is experimental and may produce incorrect answers
-- Always verify the output before executing

CREATE SCHEMA IF NOT EXISTS "private";

ALTER SCHEMA "private" OWNER TO "postgres";

create type "public"."teamRoles" as enum('owner', 'member');

alter type "public"."teamRoles" owner to "postgres";

create table if not exists
  "public"."user_invites" (
    "id" uuid default gen_random_uuid () not null,
    "created_at" timestamp with time zone default now() not null,
    "team_id" uuid,
    "email" text,
    "role" "public"."teamRoles",
    "code" text default "public"."nanoid" (24),
    "invited_by" uuid  
  );

alter table "public"."user_invites" owner to "postgres";

alter table "public"."user_invites" enable row level security;

grant all on table "public"."user_invites" to "anon";

grant all on table "public"."user_invites" to "authenticated";

grant all on table "public"."user_invites" to "service_role";

alter table "public"."user_invites" add constraint "user_invites_invited_by_fkey" foreign key ("invited_by") references "public"."users"("id") on delete set null;

ALTER TABLE user_invites
ADD CONSTRAINT unique_email_team_id UNIQUE (email, team_id);

CREATE POLICY "Enable select for users based on email" ON "public"."user_invites" FOR SELECT USING ((("auth"."jwt"() ->> 'email'::"text") = "email"));


alter table "public"."user_invites" add constraint "user_invites_team_id_fkey" foreign key ("team_id") references "public"."team"("id") on delete set null;
CREATE OR REPLACE FUNCTION "private"."get_invites_for_authenticated_user"() RETURNS SETOF "uuid"
    LANGUAGE "sql" STABLE SECURITY DEFINER
    SET "search_path" TO 'public'
    AS $$
  select team_id
  from user_invites
  where email = auth.jwt() ->> 'email'
$$;

ALTER FUNCTION "private"."get_invites_for_authenticated_user"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "private"."get_teams_for_authenticated_user"() RETURNS SETOF "uuid"
    LANGUAGE "sql" STABLE SECURITY DEFINER
    SET "search_path" TO 'public'
    AS $$
  select team_id
  from Team_Users
  where user_id = auth.uid()
$$;

ALTER FUNCTION "private"."get_teams_for_authenticated_user"() OWNER TO "postgres";

