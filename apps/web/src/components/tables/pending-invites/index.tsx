import { getTeamUser } from "@deepnote-clone/supabase/cached-queries";
import { getTeamInvitesQuery } from "@deepnote-clone/supabase/queries";
import { createClient } from "@deepnote-clone/supabase/server";
import { DataTable } from "./table";

export async function PendingInvitesTable() {
  const supabase = createClient();
  const user = await getTeamUser();
  const teamInvites = await getTeamInvitesQuery(
    supabase,
    user.data.team_id,
  );

  return <DataTable data={teamInvites?.data} currentUser={user?.data} />;
}
