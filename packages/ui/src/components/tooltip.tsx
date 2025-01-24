"use client";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import * as React from "react";
import { HelpCircle } from "lucide-react";

import type {  ButtonProps } from "./button";
import { cn } from "../utils";
import { ReactNode, useState } from "react";

export interface TooltipProps
  extends Omit<TooltipPrimitive.TooltipContentProps, "content"> {
  content:
    | ReactNode
    | string
    | ((props: { setOpen: (open: boolean) => void }) => ReactNode);
  contentClassName?: string;
  disableHoverableContent?: TooltipPrimitive.TooltipProps["disableHoverableContent"];
}

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className,
      )}
      {...props}
    />
  </TooltipPrimitive.Portal>
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;


export function InfoTooltip(props: Omit<TooltipProps, "children">) {
  return (
    <Tooltip {...props}>
      <HelpCircle className="h-4 w-4 text-gray-500" />
    </Tooltip>
  );
}

export function ButtonTooltip({
  children,
  tooltipProps,
  ...props
}: {
  children: ReactNode;
  tooltipProps: TooltipProps;
} & ButtonProps) {
  return (
    <Tooltip {...tooltipProps}>
      <button
        type="button"
        {...props}
        className={cn(
          "flex h-6 w-6 items-center justify-center rounded-md text-gray-500 transition-colors duration-75 hover:bg-gray-100 active:bg-gray-200 disabled:cursor-not-allowed disabled:hover:bg-transparent",
          props.className,
        )}
      >
        {children}
      </button>
    </Tooltip>
  );
}


export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };

