"use client";

import * as React from "react";
import {
  ChevronDown,
  Database,
  FileText,
  Home,
  Plus,
  Terminal,
  Power,
  Clipboard,
  Copy,
  Edit,
  FilePlus,
  Folder,
  Lock,
  Maximize,
  Trash,
  BarChart2,
  File,
  Download,
  Settings,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@deepnote-clone/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@deepnote-clone/ui/dropdown-menu";
import { Button } from "@deepnote-clone/ui/button";
import { Card } from "@deepnote-clone/ui/card";
import { TeamSwitcher } from "@/components/team-switcher";
import { NavMain } from "@/components/nav-main";
import { MoreHorizontal, type LucideIcon } from "lucide-react";
import { Hand } from "lucide-react";
import { SnowflakeIcon } from "@deepnote-clone/ui/icons";

const menuItems = [
  {
    title: "Rename",
    url: "#",
    icon: Edit,
  },
  {
    title: "Duplicate",
    url: "#",
    icon: Copy,
  },
  {
    title: "Create app",
    url: "#",
    icon: FilePlus,
  },
  {
    title: "View analytics",
    url: "#",
    icon: BarChart2,
  },
  {
    title: "Auto-lock notebook",
    url: "#",
    icon: Lock,
  },
  {
    title: "Make notebook full-width",
    url: "#",
    icon: Maximize,
  },
  {
    title: "Copy link to notebook",
    url: "#",
    icon: Clipboard,
  },
  {
    title: "Export as .ipynb",
    url: "#",
    icon: FileText,
  },
  {
    title: "Export as .pdf",
    url: "#",
    icon: File,
  },
  {
    title: "Export to filesystem",
    url: "#",
    icon: Download,
  },
  {
    title: "Delete",
    url: "#",
    icon: Trash,
  },
];

const data1 = {
  navMain: [
    {
      title: "Init",
      url: "#",
      endIcon: Plus,
    },
    {
      title: "Notebooks",
      url: "#",
      items: menuItems,
      endIcon: MoreHorizontal,
    },
  ],
};

export function AppSidebar() {
  const { isMobile } = useSidebar();
  return (
    <Sidebar>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs">Notebooks</SidebarGroupLabel>
          <SidebarGroupContent>
            <NavMain items={data1.navMain} />
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarMenu>
            <DropdownMenu key="integrations">
              <SidebarMenuItem>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                    <a href="#" className="flex items-center gap-2">
                      <span>Integrations</span>
                    </a>
                    <Plus className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
              </SidebarMenuItem>
              <DropdownMenuContent
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
                className="min-w-56 rounded-lg p-3 gap-5 text-sm"
              >
                <input
                  type="text"
                  placeholder="Search integration to connect"
                  className="w-full p-2 mb-2 border border-gray-300 rounded"
                />
                <DropdownMenuItem asChild key="demo-snowflake" className="flex items-center gap-2 p-1 mt-2">
                  <a href="#" className="flex items-center gap-2">
                    <SnowflakeIcon />
                    <span>[Demo] Snowflake</span>
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild key="create-integration" className="flex items-center gap-2 p-1 mt-2">
                  <a href="#" className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    <span>Create a new integration</span>
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenu>

          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#">
                    <Database className="h-4 w-4" />
                    <span>[Demo] Postgres</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <div className="flex items-center justify-between px-2">
            <SidebarGroupLabel className="text-xs">Files</SidebarGroupLabel>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Plus className="h-4 w-4" />
              <span className="sr-only">Add file</span>
            </Button>
          </div>
          <SidebarGroupContent>
            <Card className="mx-2 flex flex-col items-center gap-4 p-4 text-center text-sm text-muted-foreground">
              <FileText className="h-8 w-8" />
              <div className="space-y-2">
                <h3 className="font-semibold text-foreground">Import files</h3>
                <p>
                  Upload CSVs, Parquet files or images. Files are shared with
                  notebooks in this project.
                </p>
              </div>
            </Card>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-xs">Terminals</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#">
                    <Terminal className="h-4 w-4" />
                    <span>{"Bhaskaran Rathnachalam's terminal"}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarGroupLabel className="text-xs">Machine</SidebarGroupLabel>
        <SidebarGroupContent>
          <div className="space-y-2 px-2">
            <div className="space-y-4">
              <Button variant="outline" className="w-full justify-start">
                <div>
                  <div className="text-xs font-semibold">Basic</div>
                  <div className="text-xs text-muted-foreground">
                    2 vCPUs, 5 GB memory
                  </div>
                </div>
                <ChevronDown className="ml-auto h-4 w-4" />
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <div className="text-xs font-semibold">
                  Python 3.11 for data science
                </div>
                <ChevronDown className="ml-auto h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="w-full justify-center gap-2 text-xs"
              >
                <Power className="h-4 w-4 mr-2" /> Stop machine
              </Button>
            </div>
          </div>
        </SidebarGroupContent>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
