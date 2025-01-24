import { client as RedisClient } from "@deepnote-clone/kv/client";
import type { OnboardingStep } from "@deepnote-clone/supabase/types";

export async function getOnboardingStep(
  id: string,
): Promise<OnboardingStep | undefined> {
  try {
    const step = await RedisClient.get(`onboarding-step:${id}`);
    return step ?? undefined;
  } catch (e) {
    console.error("Failed to get onboarding step", e);
    return undefined;
  }
}
