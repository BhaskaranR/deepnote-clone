import { ProjectsTable } from "@/components/tables/projects"
import { ProjectsSkeleton } from "@/components/tables/projects/table"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@deepnote-clone/ui/breadcrumb"
import { SidebarTrigger } from "@deepnote-clone/ui/sidebar"
import { Suspense } from "react"

export default function Page() {
  
  return (
    <>
    <header className="flex h-16 shrink-0 items-center gap-2">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1 md:hidden" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage> Private Projects</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>

    <div className="mx-auto max-w-[900px]">
      <Suspense fallback={<ProjectsSkeleton />}>
        <ProjectsTable />
      </Suspense>
    </div>
    </>
  )
}
