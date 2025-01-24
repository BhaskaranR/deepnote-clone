"use server";

import { resend } from "@/utils/resend";
import { LogEvents } from "@deepnote-clone/events/events";
import { setupAnalytics } from "@deepnote-clone/events/server";
import { getUser } from "@deepnote-clone/supabase/cached-queries";
import { deleteUser } from "@deepnote-clone/supabase/mutations";
import { createClient } from "@deepnote-clone/supabase/server";
import { redirect } from "next/navigation";

export const deleteUserAction = async () => {
  const supabase = createClient();
  const user = await getUser();

  const { data: membersData } = await supabase
    .from("team_users")
    .select("team_id, team:team_id(id, team_name, avatar_url)")
    .eq("user_id", user?.id!);


  const teamIds = [];

  if (teamIds?.length) {
    // Delete all teams with only one member
    await supabase.from("team").delete().in("id", teamIds);
  }

  const userId = await deleteUser(supabase);

  await resend.contacts.remove({
    email: user?.username!,
    audienceId: process.env.RESEND_AUDIENCE_ID!,
  });

  const analytics = await setupAnalytics({
    userId,
  });

  analytics.track({
    event: LogEvents.DeleteUser.name,
    user_id: userId,
    channel: LogEvents.DeleteUser.channel,
  });

  redirect("/");
};
