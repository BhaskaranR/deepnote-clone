-- Custom types
CREATE TYPE public.user_status AS enum(
  'ONLINE',
  'OFFLINE'
);

CREATE TYPE public.onboarding_status AS enum(
  'pending',
  'complete'
);

-- USERS
CREATE TABLE public.users(
  -- UUID from auth.users
  id uuid REFERENCES auth.users NOT NULL PRIMARY KEY,
  username text,
  full_name text,
  avatar_url text,
  phone text,
  metadata jsonb,
  onboarding_status onboarding_status DEFAULT 'pending' ::public.onboarding_status,
  status user_status DEFAULT 'OFFLINE' ::public.user_status,
  referral_code text UNIQUE,
  source text,
  team_id uuid references public.team(id) default null,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  locale text DEFAULT 'en'
);

COMMENT ON TABLE public.users IS 'Profile data for each user.';

COMMENT ON COLUMN public.users.id IS 'References the internal Supabase Auth user.';

-- Set up Storage!
INSERT INTO storage.buckets(
  id,
  name)
VALUES (
  'avatars',
  'avatars');

-- Secure the tables
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;

-- Send "previous data" on change
ALTER TABLE public.users REPLICA IDENTITY
  FULL;

-- add tables to the publication
ALTER publication supabase_realtime
  ADD TABLE public.users;

GRANT ALL ON auth.users TO service_role;
