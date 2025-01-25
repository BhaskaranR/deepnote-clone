"use server";

import { Cookies } from "@/utils/constants";
import { createClient } from "@deepnote-clone/supabase/server";
import { addYears } from "date-fns";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { actionClient } from "./safe-action";

export const signInAction = actionClient
  .action(
    async () => {
      const supabase = createClient();

      // TODO: remove this
      const {
        data: { user: existingUser },
        error: signInError,
      } = await supabase.auth.signInWithPassword({
        email: 'test@test.com',
        password: 'test@098',
      })

      cookies().set(Cookies.PreferredSignInProvider, "otp", {
        expires: addYears(new Date(), 1),
      });

      redirect("/");
    },
  );
