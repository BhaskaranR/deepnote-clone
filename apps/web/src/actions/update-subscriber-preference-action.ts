"use server";

import { updateSubscriberPreference } from "@deepnote-clone/notification";
import { revalidatePath as revalidatePathFunc } from "next/cache";
import { authActionClient } from "./safe-action";
import { updateSubscriberPreferenceSchema } from "./schema";

export const updateSubscriberPreferenceAction = authActionClient
  .schema(updateSubscriberPreferenceSchema)
  .metadata({
    name: "update-subscriber-preference",
  })
  .action(async ({ parsedInput: { revalidatePath, ...data } }) => {
    const preference = await updateSubscriberPreference(data as any);

    revalidatePathFunc(revalidatePath);

    return preference;
  });
