import { DeleteTeam } from "@/components/delete-team";
import { TeamAvatar } from "@/components/team-avatar";
import { TeamName } from "@/components/team-name";
import { getUser } from "@deepnote-clone/supabase/cached-queries";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Team Settings | Deepnote Clone",
};

export default async function Account() {
  const user = await getUser();

  return (
    <div className="space-y-12">
      <TeamAvatar
        teamId={user?.team_id}
        name={user?.team?.team_name}
        logoUrl={user?.team?.avatar_url}
      />

      <TeamName name={user?.team?.team_name} />
      <DeleteTeam teamId={user?.team_id} />
    </div>
  );
}
