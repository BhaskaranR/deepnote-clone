"use client"

import * as React from "react"
import { ChevronDown, Database, FileText, Home, Plus, Terminal } from "lucide-react"

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
} from "@deepnote-clone/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@deepnote-clone/ui/dropdown-menu"
import { Button } from "@deepnote-clone/ui/button"
import { Card } from "@deepnote-clone/ui/card"
import { TeamSwitcher } from "@/components/team-switcher"

export function AppSidebar() {
  return (
    <Sidebar>
       <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs">Notebooks</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#">
                    <FileText className="h-4 w-4" />
                    <span>Init</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive>
                  <a href="#">
                    <FileText className="h-4 w-4" />
                    <span>notebook</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-xs">Integrations</SidebarGroupLabel>
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
                <p>Upload CSVs, Parquet files or images. Files are shared with notebooks in this project.</p>
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
                      <div className="text-xs text-muted-foreground">2 vCPUs, 5 GB memory</div>
                    </div>
                    <ChevronDown className="ml-auto h-4 w-4" />
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <div className="text-xs font-semibold">Python 3.11 for data science</div>
                    <ChevronDown className="ml-auto h-4 w-4" />
                  </Button>
                  <Button variant="outline" className="w-full justify-center gap-2 text-xs">
                    Stop machine
                  </Button>
                </div>
            </div>
          </SidebarGroupContent>
        </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

