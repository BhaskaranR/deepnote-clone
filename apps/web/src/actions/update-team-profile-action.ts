"use server";

import { updateTeam } from "@deepnote-clone/supabase/mutations";
import {
  revalidatePath as revalidatePathFunc,
  revalidateTag,
} from "next/cache";
import { redirect } from "next/navigation";
import { authActionClient } from "./safe-action";
import { updateTeamProfileSchema } from "./schema";

export const updateTeamProfileAction = authActionClient
  .schema(updateTeamProfileSchema)
  .metadata({
    name: "update-team-profile",
  })
  .action(
    async ({
      parsedInput: { revalidatePath, redirectTo, id, ...data },
      ctx: { user, supabase },
    }) => {
      const { data: team, error } = await updateTeam(supabase, data);

      if (error) {
        throw error;
      }

      if (revalidatePath) {
        revalidatePathFunc(revalidatePath);
      }

      revalidateTag(`user_${user.id}`);
      revalidateTag(`team_${id}`);

      if (redirectTo) {
        redirect(redirectTo);
      }

      return team;
    },
  );
