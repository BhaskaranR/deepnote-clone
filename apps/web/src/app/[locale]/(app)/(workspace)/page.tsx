import { Header } from "@/components/header"
import { ProjectsTable } from "@/components/tables/projects"
import { ProjectsSkeleton } from "@/components/tables/projects/table"
import { Suspense } from "react"

export default function Page() {
  
  return (
    <>
    <Header/>

    <div className="mx-auto my-10 max-w-[900px]">
      <Suspense fallback={<ProjectsSkeleton />}>
        <ProjectsTable />
      </Suspense>
    </div>
    </>
  )
}
