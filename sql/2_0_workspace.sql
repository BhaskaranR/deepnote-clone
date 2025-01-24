CREATE TABLE Team(
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  avatar_url varchar(255),
  slug text unique default null,
  contact_name varchar(255),
  team_name varchar(255) NOT NULL,
  tags text[],
  plan text default 'free',
  created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE Team_Users(
  id serial PRIMARY KEY,
  team_id uuid REFERENCES Team(id),
  user_id uuid REFERENCES public.users(id),
  role VARCHAR(255),
  is_active BOOLEAN DEFAULT TRUE,
  created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE public.Team DISABLE ROW LEVEL SECURITY;

grant usage on schema public to supabase_auth_admin;

grant all
  on table public.Team
to supabase_auth_admin;

grant all
  on table public.team_users
to anon;

CREATE OR REPLACE FUNCTION "public"."create_team"("team_name" character varying, "slug" character varying) RETURNS "uuid"
      LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'public'
    AS $$
declare
    new_team_id uuid;
begin
    insert into Team (team_name, slug) values (team_name, slug) returning id into new_team_id;
    insert into Team_Users (user_id, team_id, role) values (auth.uid(), new_team_id, 'owner');

    return new_team_id;
end;
$$;

ALTER FUNCTION "public"."create_team"("team_name" character varying, "slug" character varying) OWNER TO "postgres";

GRANT ALL ON FUNCTION "public"."create_team"("team_name" character varying, "slug" character varying) TO "anon";
GRANT ALL ON FUNCTION "public"."create_team"("team_name" character varying, "slug" character varying) TO "authenticated";
GRANT ALL ON FUNCTION "public"."create_team"("team_name" character varying, "slug" character varying) TO "service_role";