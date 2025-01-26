"use client";

import { House } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@deepnote-clone/ui/breadcrumb";
import { Separator } from "@deepnote-clone/ui/separator";
import { SidebarTrigger } from "@deepnote-clone/ui/sidebar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@deepnote-clone/ui/sheet";
import { Comments } from "@/components/workbook/comments";
import { Button } from "@deepnote-clone/ui/button";
import { MessageSquare } from "lucide-react";
import { BlockEditor } from "@deepnote-clone/editor/BlockEditor";
import { Avatar, AvatarFallback } from "@deepnote-clone/ui/avatar";

export default function Page() {
  return (
    <>
      <header className="-ml-4 mr-4 md:m-0 z-10 px-4 md:px-0 md:border-b-[1px] flex justify-between pt-4 pb-2 md:pb-4 gap-2 items-center todesktop:sticky todesktop:top-0 todesktop:bg-background todesktop:border-none sticky md:static top-0 backdrop-filter backdrop-blur-xl md:backdrop-filter md:backdrop-blur-none dark:bg-[#121212] bg-[#fff] bg-opacity-70 ">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1 md:hidden" />
          <Separator orientation="vertical" className="mr-2 h-4 md:hidden" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/">
                  <House />
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage> A/B Testing</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="flex space-x-2 no-drag ml-auto gap-2">
          <Button variant="secondary">Share</Button>
          <Sheet>
            <SheetTrigger>
              <Button variant="ghost" size="icon">
                <MessageSquare className="size-4" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader className="mb-10 flex justify-between items-center flex-row">
                <h2 className="text-xl">Comments</h2>
              </SheetHeader>
              <Comments />
            </SheetContent>
          </Sheet>
          <Avatar className="rounded-full w-8 h-8 cursor-pointer mr-2">
            <AvatarFallback>
              <span className="text-sm">B</span>
            </AvatarFallback>
          </Avatar>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min mx-auto lg:w-[75%]">
        
          <BlockEditor />
        </div>
      </div>
    </>
  );
}
