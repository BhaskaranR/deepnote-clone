"use client";

import {
  Frame,
  Home,
  Settings2,
  Clock,
  Lock,
  Database,
  Calendar,
} from "lucide-react";
import { NavMain } from "./nav-main"
import type React from "react";
import { MoreHorizontal, type LucideIcon } from "lucide-react"
import { Plus } from "lucide-react"
import { Hand } from "lucide-react";
import { Clipboard, Folder, Star, FilePlus, Copy, Edit, Trash } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarRail,
} from "@deepnote-clone/ui/sidebar";
import { TeamSwitcher } from "@/components/team-switcher";
import { Separator } from "@deepnote-clone/ui/separator";
import Link from "next/link";
import { Logo } from "@/components/logo";


// Dynamically import NavProjects with no SSR

// This is sample data.
const data = {
  projects: [
    {
      name: "Home",
      url: "/",
      icon: <Home className="h-10 w-10" />,
    },
    {
      name: "Integrations",
      url: "/integrations",
      icon: <Frame className="h-10 w-10" />,
    },
    {
      name: "Settings & Members",
      url: "/settings",
      icon: <Settings2 className="h-10 w-10" />,
    },
  ],
};

// This is sample data.
const data1 = {
  navMain: [
    {
      title: "Recents",
      url: "#",
      icon: Clock,
    },
    {
      title: "Private Projects",
      url: "#",
      icon: Lock,
      endIcon: Plus,
      items: [
        {
          title: "New Project",
          url: "#",
        },
        {
          title: "New Project from Template",
          url: "#",
          isActive: true,
        },
      ],
    },
    {
      title: "Data Apps",
      url: "#",
      icon: Database,
    },
    {
      title: "Scheduled Projects",
      url: "#",
      icon: Calendar,
    },
  ],
}

const data2 = {
  navMain: [
    {
      title: "Project",
      url: "#",
      endIcon: Plus,
      items: [
        {
          title: "Copy link to project",
          url: "#",
          icon: Clipboard,
        },
        {
          title: "Move project",
          url: "#",
          icon: Folder,
        },
        {
          title: "Add to favorite projects",
          url: "#",
          icon: Star,
        },
        {
          title: "Add to templates",
          url: "#",
          icon: FilePlus,
        },
        {
          title: "Duplicate project",
          url: "#",
          icon: Copy,
        },
        {
          title: "Rename project",
          url: "#",
          icon: Edit,
        },
        {
          title: "Delete project",
          url: "#",
          icon: Trash,
        },
      ],
    },
  ],
}

const menuItems = [
  {
    title: "Copy link to project",
    url: "#",
    icon: Clipboard,
  },
  {
    title: "Move project",
    url: "#",
    icon: Folder,
  },
  {
    title: "Add to favorite projects",
    url: "#",
    icon: Star,
  },
  {
    title: "Add to templates",
    url: "#",
    icon: FilePlus,
  },
  {
    title: "Duplicate project",
    url: "#",
    icon: Copy,
  },
  {
    title: "Rename project",
    url: "#",
    icon: Edit,
  },
  {
    title: "Delete project",
    url: "#",
    icon: Trash,
  }
];

const data3 = {
  navMain: [
    {
      title: "Welcome",
      url: "#",
      startIcon: Hand,
    },
    {
      title: "Daily Stock Price Dashboard",
      url: "#",
      items: menuItems,
      endIcon: MoreHorizontal,
    },
    {
      title: "Sentiment Analysis of Deepnote",
      url: "#",
      endIcon: MoreHorizontal,
      items: menuItems,
    }
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarMenu>
            {data.projects.map((item) => (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton asChild>
                  <a href={item.url}>
                    {item.icon}
                    <span>{item.name}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <Separator />
        <SidebarGroup>
        <NavMain items={data1.navMain} />
        </SidebarGroup>
        <Separator />

        <SidebarGroup>
          <NavMain items={data2.navMain} />
          <NavMain items={data3.navMain} />

        </SidebarGroup>


      
      </SidebarContent>
      <SidebarFooter>
        <Link href="/" >
          <Logo className="h-8 w-auto" />
        </Link>
      </SidebarFooter> 
      <SidebarRail />
    </Sidebar>
  );
}
