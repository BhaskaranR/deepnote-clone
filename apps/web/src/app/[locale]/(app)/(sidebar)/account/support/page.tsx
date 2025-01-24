import { SupportForm } from "@/components/support-form";
import { getUser } from "@deepnote-clone/supabase/cached-queries";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support | Deepnote Clone",
};

export default async function Support() {
  const userData = await getUser();

  return (
    <div className="space-y-12">
      <div className="max-w-[450px]">
        <SupportForm
          email={userData?.username! || ""}
          avatarUrl={userData?.avatar_url}
          fullName={userData?.full_name}
          teamName={userData?.team?.team_name}
        />
      </div>
    </div>
  );
}
