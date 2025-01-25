"use client";

import { AppSidebar } from "./app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@deepnote-clone/ui/sidebar";
import dynamic from "next/dynamic";

const HotKeys = dynamic(() => import("@/components/hot-keys").then((mod) => mod.HotKeys), {
  ssr: false,
});

interface SidebarWrapperProps {
  children?: React.ReactNode;
}

export function SidebarWrapper({
  children,
}: SidebarWrapperProps) {
  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <SidebarInset className="relative">
        <div className="relative">{children}</div>
        <HotKeys />
      </SidebarInset>
    </SidebarProvider>
  );
}
