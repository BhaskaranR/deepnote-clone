import { setupAnalytics } from "@deepnote-clone/events/server";
import {
  getPendingTeamInvites,
  getTeams,
  getUser,
} from "@deepnote-clone/supabase/cached-queries";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";

const ClientSidebarWrapper = dynamic(
  () =>
    import("./components/sidebar-wrapper").then((mod) => mod.SidebarWrapper),
  { ssr: false },
);

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();
  const teams = await getTeams();

  const pendingInvites = await getPendingTeamInvites();
  if (!teams?.data?.length && !pendingInvites?.data?.length) {
    redirect("/onboarding/welcome");
  }

  if (!user?.team_id) {
    redirect("/teams");
  }
  if (user) {
    await setupAnalytics({ userId: user.id });
  }
  return (
      <ClientSidebarWrapper >
        {children}
      </ClientSidebarWrapper>
  );
}
