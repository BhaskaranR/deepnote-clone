import { NotificationCenter } from "@/components/notification-center";
import { UserMenu } from "@/components/user-menu";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbPage,
} from "@deepnote-clone/ui/breadcrumb";
import { Separator } from "@deepnote-clone/ui/separator";
import { SidebarTrigger } from "@deepnote-clone/ui/sidebar";
import { Skeleton } from "@deepnote-clone/ui/skeleton";
import { Suspense } from "react";

export function Header() {
  return (
    <header className="-ml-4 mr-4 md:m-0 z-10 px-4 md:px-0 md:border-b-[1px] flex justify-between pt-4 pb-2 md:pb-4 gap-2 items-center todesktop:sticky todesktop:top-0 todesktop:bg-background todesktop:border-none sticky md:static top-0 backdrop-filter backdrop-blur-xl md:backdrop-filter md:backdrop-blur-none dark:bg-[#121212] bg-[#fff] bg-opacity-70 ">
      <SidebarTrigger className="ml-3 md:hidden" />

      <Separator orientation="vertical" className="mr-2 h-4 md:hidden" />

      <Breadcrumb className="ml-2">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage> Private Projects</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex space-x-2 no-drag ml-auto">
        <NotificationCenter />

        <Suspense fallback={<Skeleton className="h-8 w-8 rounded-full" />}>
          <UserMenu />
        </Suspense>
      </div>
    </header>
  );
}
