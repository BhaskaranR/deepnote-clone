CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
  team_id uuid;
  new_referral_code TEXT;
  referrer_id uuid;
  onboarding_status public.onboarding_status := 'complete';
BEGIN
  SELECT id INTO  team_id
    FROM
      public.team
    WHERE
      team_name = NEW.raw_user_meta_data ->> 'companyName';
  
  INSERT INTO public.users(
    id,
    username,
    team_id,
    full_name,
    phone,
    metadata,
    avatar_url,
    onboarding_status,
    referral_code)
  VALUES (
    NEW.id,
    NEW.email,
    team_id,
    NEW.raw_user_meta_data ->> 'full_name',
    NEW.raw_user_meta_data ->> 'phone',
    NEW.raw_user_meta_data,
    NEW.raw_user_meta_data ->> 'avatar_url',
    onboarding_status
    );

  RETURN new;
END;
$function$;


-- trigger the function every time a user is created
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE PROCEDURE public.handle_new_user();
