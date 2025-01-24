import { getTeamMembers, getTeamUser } from "@deepnote-clone/supabase/cached-queries";
import { DataTable } from "./table";

export async function MembersTable() {
  const user = await getTeamUser();
  const teamMembers = await getTeamMembers();

  return <DataTable data={teamMembers?.data} currentUser={user} />;
}
