import type { Client } from "../types";

export async function getUserQuery(supabase: Client, userId: string) {
  const cols = `
      *,
      team_users!user_id(*),
      team:team_id(slug, team_name, avatar_url)
    `;
  const { data, error } = await supabase
    .from("users")
    .select(cols)
    .eq("id", userId)
    .single();

  if (error) throw error;
  if (!data) throw new Error("User not found");

  return data;
}

export async function getCurrentUserTeamQuery(supabase: Client) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return;
  }
  return getUserQuery(supabase, user.id);
}

export async function getTeamMembersQuery(
  supabase: Client,
  teamId: string,
) {
  const { data, error } = await supabase
    .from("team_users")
    .select(
      `
      id,
      role,
      team_id
    `,
    )
    .eq("team_id", teamId)
    .order("created_at");

  if (error) throw error;

  return {
    data,
  };
}

type GetTeamUserParams = {
  teamId?: string;
  slug?: string;
  userId: string;
};

export async function getTeamUserQuery(
  supabase: Client,
  params: GetTeamUserParams,
) {
  const query = supabase
    .from("team_users")
    .select(
      `
      id,
      role,
      team_id,
      team:team_id(id, slug, team_name, category, tags),
      user:users(id, full_name, avatar_url, username)
    `,
    )
    .eq("user_id", params.userId);

  if (params.slug) {
    query.eq("team.slug", params.slug);
  } else if (params.teamId) {
    query.eq("team_id", params.teamId);
  }

  const { data } = await query.throwOnError().single();

  return {
    data,
  };
}

export async function getTeamByIdQuery(
  supabase: Client,
  teamId: string,
) {
  return supabase
    .from("team")
    .select("*")
    .eq("id", teamId)
    .throwOnError()
    .single();
}

export async function getTeamBySlugQuery(
  supabase: Client,
  userId: string,
  slug: string,
) {
  return supabase.from("team").select("*").eq("slug", slug).single();
}

export async function getTeamsByUserIdQuery(supabase: Client, userId: string) {
  return supabase
    .from("team")
    .select(`
      *,
      team_users!inner(id, role, team_id)
    `)
    .eq("team_users.user_id", userId)
    .throwOnError();
}

export async function getPendingTeamInvitesQueryForUser(
  supabase: Client,
  email: string,
) {
  return supabase
    .from("user_invites")
    .select(
      "id, email, code, role, user:invited_by(*), team:team_id(*)",
    )
    .eq("email", email)
    .throwOnError();
}

export async function getTeamInvitesQuery(
  supabase: Client,
  teamId: string,
) {
  return supabase
    .from("user_invites")
    .select(
      "id, email, code, role, user:invited_by(*), team:team_id(*)",
    )
    .eq("team_id", teamId)
    .throwOnError();
}

export async function getTeamInvitesQueryForUser(
  supabase: Client,
  email: string,
) {
  return supabase
    .from("user_invites")
    .select(
      "id, email, code, role, user:invited_by(*), team:team_id(*)",
    )
    .eq("email", email)
    .throwOnError();
}

type GetUserInviteQueryParams = {
  code: string;
  email?: string;
};

export async function getUserInviteQueryByCode(
  supabase: Client,
  params: GetUserInviteQueryParams,
) {
  return supabase
    .from("user_invites")
    .select(
      "*, user:invited_by(full_name, avatar_url), team:team_id(id, team_name, avatar_url) ",
    )
    .eq("code", params.code)
    .single();
}

export async function getUserInviteQuery(
  supabase: Client,
  params: GetUserInviteQueryParams,
) {
  return supabase
    .from("user_invites")
    .select("*")
    .eq("code", params.code)
    .eq("email", params.email!)
    .single();
}
