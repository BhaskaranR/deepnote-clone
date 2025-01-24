import "server-only";

import { unstable_cache } from "next/cache";
import { cache } from "react";
import { createClient as createClientAdmin } from "../clients/admin";
import { createClient } from "../clients/server";
import {
  getTeamByIdQuery,
  getTeamBySlugQuery,
  getTeamMembersQuery,
  getTeamUserQuery,
  getPendingTeamInvitesQueryForUser,
  getTeamsByUserIdQuery,
  getTeamInvitesQuery,
  getUserQuery,
} from "../queries";

export const getSession = cache(async () => {
  const supabase = createClient();

  return supabase.auth.getUser();
});

export const getUser = async () => {
  const {
    data: { user },
  } = await getSession();
  const userId = user?.id;

  if (!userId) {
    return null;
  }

  const supabase = createClient();

  return unstable_cache(
    async () => {
      return getUserQuery(supabase, userId);
    },
    ["user", userId],
    {
      tags: [`user_${userId}`],
      revalidate: 180,
    },
  )();
};

export const getTeamBySlug = async (slug: string) => {
  const supabase = createClient();
  const user = await getUser();
  const userId = user?.id;

  if (!userId) {
    return;
  }

  return getTeamBySlugQuery(supabase, userId, slug);
};

export const getTeamById = async (teamId: string) => {
  const supabase = createClient();
  return getTeamByIdQuery(supabase, teamId);
};

export const getTeams = async () => {
  const supabase = createClient();

  const user = await getUser();
  const userId = user?.id;

  if (!userId) {
    return;
  }

  return unstable_cache(
    async () => {
      return getTeamsByUserIdQuery(supabase, userId);
    },
    ["teams", userId],
    {
      tags: [`teams_${userId}`],
      revalidate: 10,
    },
  )();
};

export const getPendingTeamInvites = async () => {
  const supabase = createClient();
  const user = await getUser();
  const userId = user?.id;

  if (!userId) {
    return;
  }

  return unstable_cache(
    async () => {
      return getPendingTeamInvitesQueryForUser(supabase, user!.username!);
    },
    ["pending_team_invites", user!.username!],
    {
      tags: [`pending_team_invites_${userId}`],
      revalidate: 180,
    },
  )();
};

export const getTeamUser = async (slug?: string) => {
  const supabase = createClient();
  const user = await getUser();
  const teamId = user?.team_id!;

  return unstable_cache(
    async () => {
      return getTeamUserQuery(supabase, {
        userId: user!.id,
        teamId,
        slug,
      });
    },
    ["team", "user", user!.id],
    {
      tags: [`team_user_${user!.id}`],
      revalidate: 180,
    },
  )();
};

export const getTeamMembers = async () => {
  const supabaseAdmin = createClientAdmin();

  const user = await getUser();
  const teamId = user?.team_id;

  if (!teamId) {
    return null;
  }

  return unstable_cache(
    async () => {
      return getTeamMembersQuery(supabaseAdmin, teamId);
    },
    ["team_members", teamId],
    {
      tags: [`team_members_${teamId}`],
      revalidate: 10,
    },
  )();
};

export const getTeamInvites = async () => {
  const supabase = createClient();

  const user = await getUser();
  const teamId = user?.team_id;

  if (!teamId) {
    return;
  }

  return unstable_cache(
    async () => {
      return getTeamInvitesQuery(supabase, teamId);
    },
    ["team", "invites", teamId],
    {
      tags: [`team_invites_${teamId}`],
      revalidate: 180,
    },
  )();
};

export const getUserInvites = async () => {
  const supabase = createClient();

  const user = await getUser();
  const email = user?.username!;

  return unstable_cache(
    async () => {
      return getTeamInvitesQuery(supabase, email);
    },
    ["user", "invites", email],
    {
      tags: [`user_invites_${email}`],
      revalidate: 180,
    },
  )();
};

