import { createClient as createAdminClient } from "../clients/admin";
import {
  getCurrentUserTeamQuery,
  getUserInviteQuery,
  getUserInviteQueryByCode,
} from "../queries";
import type { Client } from "../types";

export async function deleteAttachment(supabase: Client, id: string) {
  const { data } = await supabase
    .from("project_attachments")
    .delete()
    .eq("id", id)
    .select("id, project_id, name, team_id")
    .single();

  return data;
}

export async function updateUser(supabase: Client, data) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return;
  }
  return supabase
    .from("users")
    .update(data)
    .eq("id", user.id)
    .select()
    .single();
}

export async function deleteUser(supabase: Client) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return;
  }

  await Promise.all([
    supabase.auth.admin.deleteUser(user.id),
    supabase.from("users").delete().eq("id", user.id),
    supabase.auth.signOut(),
  ]);

  return user.id;
}

export async function updateTeam(supabase: Client, data) {
  const userData = await getCurrentUserTeamQuery(supabase);
  if (!userData?.team_id) {
    return;
  }

  return supabase
    .from("team")
    .update(data)
    .eq("id", userData?.team_id)
    .select("*")
    .single();
}

type UpdateUserTeamRoleParams = {
  role: "owner" | "member";
  userId: string;
  teamId: string;
};

export async function updateUserTeamRole(
  supabase: Client,
  params: UpdateUserTeamRoleParams,
) {
  const { role, userId, teamId } = params;

  return supabase
    .from("team_users")
    .update({
      role,
    })
    .eq("user_id", userId)
    .eq("team_id", teamId)
    .select()
    .single();
}

export async function deleteTeam(supabase: Client, teamId: string) {
  return supabase.from("team").delete().eq("id", teamId);
}

type DeleteTeamMemberParams = {
  userId: string;
  teamId: string;
};

export async function deleteTeamMember(
  supabase: Client,
  params: DeleteTeamMemberParams,
) {
  return supabase
    .from("team_users")
    .delete()
    .eq("user_id", params.userId)
    .eq("team_id", params.teamId)
    .select()
    .single();
}

type CreateTeamParams = {
  name: string;
  slug: string;
  email: string;
};

export async function createTeam(
  supabase: Client,
  params: CreateTeamParams,
) {
  const { data, error } = await supabase.rpc("create_team", {
    team_name: params.name,
    slug: params.slug,
  });
  console.log(error);
  return data;
}

type LeaveTeamParams = {
  userId: string;
  teamId: string;
};

export async function leaveTeam(
  supabase: Client,
  params: LeaveTeamParams,
) {
  return supabase
    .from("team_users")
    .delete()
    .eq("team_id", params.teamId)
    .eq("user_id", params.userId)
    .select()
    .single();
}

export async function joinTeamByInviteCode(supabase: Client, code: string) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.email) {
    return;
  }
  const { data: inviteData } = await getUserInviteQuery(supabase, {
    code,
    email: user.email,
  });

  if (inviteData) {
    // Add user team todo change this to use normal supabase
    const supabaseAdmin = createAdminClient();
    await supabaseAdmin.from("team_users").insert({
      user_id: user.id,
      team_id: inviteData?.team_id,
      role: inviteData.role,
    });

    // Set current team
    const { data } = await supabase
      .from("users")
      .update({
        team_id: inviteData?.team_id,
      })
      .eq("id", user.id)
      .select()
      .single();

    // remove invite
    await supabase.from("user_invites").delete().eq("code", code);

    return data;
  }

  return null;
}

export async function canJoinTeamByInviteCode(supabase: Client, code: string) {
  const { data: inviteData } = await getUserInviteQueryByCode(supabase, {
    code,
  });

  return inviteData;
}
