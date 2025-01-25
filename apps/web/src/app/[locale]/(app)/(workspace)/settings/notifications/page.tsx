import { NotificationsSettingsList } from "@/components/notifications-settings-list";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Notifications | Deepnote Clone",
};

export default async function Notifications() {
  return (
    <Suspense>
      <NotificationsSettingsList />
    </Suspense>
  );
}
