"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { I18nProviderClient } from "@/locales/client";
import { TooltipProvider } from "@deepnote-clone/ui/tooltip";
import { isDesktopApp } from "@todesktop/client-core/platform/todesktop";
import type { ReactNode } from "react";


type ProviderProps = {
  locale: string;
  children: ReactNode;
};

export function Providers({ locale, children }: ProviderProps) {
  return (
    <I18nProviderClient locale={locale}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <TooltipProvider>{children}</TooltipProvider>
      </ThemeProvider>
    </I18nProviderClient>
  );
}
