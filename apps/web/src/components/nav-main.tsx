"use client";

import { MoreHorizontal, type LucideIcon } from "lucide-react";
import { Plus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@deepnote-clone/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@deepnote-clone/ui/sidebar";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    endIcon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
      icon?: LucideIcon;
      endIcon?: LucideIcon;
    }[];
  }[];
}) {
  const { isMobile } = useSidebar();

  return (
    <SidebarMenu>
      {items.map((item) => (
        <DropdownMenu key={item.title}>
          <SidebarMenuItem>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                <a href={item.url} className="flex items-center gap-2">
                  {item.icon && <item.icon className="h-4 w-4" />}
                  <span>{item.title}</span>
                </a>
                {item.endIcon && <item.endIcon className="ml-auto" />}
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            {item.items?.length ? (
              <DropdownMenuContent
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
                className="min-w-56 rounded-lg p-3 gap-5 text-sm"
              >
                {item.items.map((item) => (
                  <DropdownMenuItem asChild key={item.title} className="flex items-center gap-2 p-1 mt-2">
                    <>
                    <a href={item.url} className="flex items-center gap-2">
                      {item.icon && <item.icon className="h-4 w-4" />}
                      <span>{item.title}</span>
                    </a>
                    {item.endIcon && <item.endIcon className="ml-auto" />}
                    </>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            ) : null}
          </SidebarMenuItem>
        </DropdownMenu>
      ))}
    </SidebarMenu>
  );
}
