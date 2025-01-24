import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./db";
export type Client = SupabaseClient<Database>;

export * from "./db";

export const ONBOARDING_STEPS = [
  "teams",
  "workspace",
  "completed",
] as const;

export type OnboardingStep = (typeof ONBOARDING_STEPS)[number];
