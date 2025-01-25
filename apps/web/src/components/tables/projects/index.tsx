import { getUser } from "@deepnote-clone/supabase/cached-queries";
import { getProjectsQuery } from "@deepnote-clone/supabase/queries";
import { createClient } from "@deepnote-clone/supabase/server";
import { DataTable, ProjectsSkeleton } from "./table";
import { Suspense } from "react";


export async function ProjectsTable() {
  const supabase = createClient();
  const user = await getUser();

  const [projects] = await Promise.all([getProjectsQuery(supabase)]);

  return (
    <Suspense fallback={<ProjectsSkeleton />}>
      <DataTable data={projects?.data ?? []} />
    </Suspense>
  );
}
