"use client";

import type { OnboardingStep } from "@deepnote-clone/supabase/types";
import { Button, type ButtonProps } from "@deepnote-clone/ui/button";
import { LoadingSpinner } from "@deepnote-clone/ui/loading-spinner";
import { useOnboardingProgress } from "./use-onboarding-progress";

export function NextButton({
  step,
  text = "Next",
  ...rest
}: { step: OnboardingStep; text?: string } & ButtonProps) {
  const { continueTo, isLoading, isSuccessful } = useOnboardingProgress();

  return (
    <Button variant="default" onClick={() => continueTo(step)} {...rest}>
      {isLoading || isSuccessful ? <LoadingSpinner /> : text}
    </Button>
  );
}
