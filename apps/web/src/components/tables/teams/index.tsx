import { getUser } from "@deepnote-clone/supabase/cached-queries";
import {
  getTeamsByUserIdQuery,
  getTeamInvitesQuery,
} from "@deepnote-clone/supabase/queries";
import { createClient } from "@deepnote-clone/supabase/server";
import { DataTable } from "./table";

export async function TeamsTable() {
  const supabase = createClient();
  const user = await getUser();

  const [teams, invites] = await Promise.all([
    getTeamsByUserIdQuery(supabase, user?.id),
    getTeamInvitesQuery(supabase, user?.username),
  ]);

  return (
    <DataTable
      data={[
        ...(teams?.data ?? []),
        ...(invites?.data?.map((invite) => ({ ...invite, isInvite: true })) ??
          []),
      ]}
    />
  );
}
