"use client";
import { changeTeamAction } from "@/actions/change-team-action";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@deepnote-clone/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@deepnote-clone/ui/sidebar";
import { ChevronsUpDown, Plus } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import Image from "next/image";
import { useRouter } from "next/navigation";
import * as React from "react";

export const TeamSwitcher = () => {
  // const [isOpen, onOpenChange] = React.useState(false);
  const { isMobile } = useSidebar();
  const [activeTeam, setActiveTeam] = React.useState(null);
  const [teams, setTeams] = React.useState([]);
  const [pendingInvites, setPendingInvites] = React.useState([]);
  const router = useRouter();
  const changeTeam = useAction(changeTeamAction);

  React.useEffect(() => {
    async function fetchTeams() {
      try {
        const response = await fetch("/api/teams");
        if (!response.ok) {
          throw new Error("Failed to fetch teams");
        }
        const data = await response.json();
        setTeams(data.teams);
        setPendingInvites(data.pendingInvites);
        setActiveTeam(data.teams[0]); // Set the first team as active by default
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    }

    fetchTeams();
  }, []);

  if (!teams.length)
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary bg-muted text-sidebar-primary-foreground">
                  <Image
                    src="https://api.dicebear.com/9.x/notionists/png?seed=cus_BH6tDUWc9n0Y2pf55tVbk1hc"
                    alt="Default Team Avatar"
                    width={24}
                    height={24}
                    className="size-4 shrink-0"
                  />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold ">
                    <div className="bg-gray-200 animate-pulse h-4 w-24 rounded"/>
                  </span>
                  <span className="truncate text-xs">
                    <div className="bg-gray-200 animate-pulse h-4 w-24 rounded"/>
                  </span>
                </div>
                <ChevronsUpDown className="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    );

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                {activeTeam?.avatar_url ? (
                  <Image
                    src={activeTeam.avatar_url}
                    alt={activeTeam.team_name}
                    width={24}
                    height={24}
                    className="size-4 shrink-0"
                  />
                ) : (
                  <Image
                    src="https://api.dicebear.com/9.x/notionists/png?seed=cus_BH6tDUWc9n0Y2pf55tVbk1hc"
                    alt="Default Team Avatar"
                    width={24}
                    height={24}
                    className="size-4 shrink-0"
                  />
                )}
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {activeTeam?.team_name || (
                    <div className="bg-gray-200 animate-pulse h-4 w-24 rounded"></div>
                  )}
                </span>
                <span className="truncate text-xs">{activeTeam?.plan}</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Organizations
            </DropdownMenuLabel>
            {teams.map((team, index) => (
              <DropdownMenuItem
                key={team.id}
                onClick={() => {
                  setActiveTeam(team);
                  changeTeam.execute({
                    teamId: team.id,
                    redirectTo: "/",
                  });
                }}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-sm border">
                  {team.avatar_url ? (
                    <Image
                      src={team.avatar_url}
                      alt={team.team_name}
                      width={24}
                      height={24}
                      className="size-4 shrink-0"
                    />
                  ) : (
                    <div className="size-4 shrink-0 bg-gray-200 animate-pulse rounded-full">
                      {/* Skeleton loader for avatar */}
                    </div>
                  )}
                </div>
                {team.team_name}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="gap-2 p-2"
              onClick={() => router.push("/teams")}
            >
              <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                <Plus className="size-4" />
              </div>
              <div className="font-medium text-muted-foreground flex flex-col">
                Create or join a team{" "}
                {pendingInvites.length > 0 && (
                  <span className="text-xs text-muted-foreground">
                    ({pendingInvites.length} pending)
                  </span>
                )}
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
