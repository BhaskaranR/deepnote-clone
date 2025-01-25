"use client"
import { House } from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@deepnote-clone/ui/breadcrumb"
import { Separator } from "@deepnote-clone/ui/separator"
import { SidebarTrigger } from "@deepnote-clone/ui/sidebar"
import { Suspense } from "react";
import { Skeleton } from "@deepnote-clone/ui/skeleton";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "@deepnote-clone/ui/sheet";
import { Comments } from "@/components/workbook/comments";
import { Button } from "@deepnote-clone/ui/button";
import { MessageSquare } from 'lucide-react';
import { BlockEditor } from "@deepnote-clone/editor/BlockEditor";

export  default function Page() {
  return (
    <>
    <header className="flex h-16 shrink-0 items-center gap-2">
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

      <div className="flex space-x-2 no-drag ml-auto">
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
        
        {/* <Suspense fallback={<Skeleton className="h-8 w-8 rounded-full" />}>
          <UserMenu />
        </Suspense> */}
        </div>
    </header>
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" >
        <BlockEditor />
      </div>
    </div>
    </>
  )
}
