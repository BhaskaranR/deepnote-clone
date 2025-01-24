import { InfinityIcon } from "@deepnote-clone/ui/icons";
import clsx from "clsx";
import React from "react";

export function Logo({ className }: { className?: string }) {
  return (
    <div
      className={clsx(
        "whitespace-nowrap font-display flex items-center text-lg text-black dark:text-white",
        className,
      )}
    >
      <span className="leading-none">L</span>
      <InfinityIcon className="h-5 w-5 mx-[1px] translate-y-[0.5px] bg-gradient-to-br dark:from-white white:from-black from-black from-30% dark:to-white/40 white:to-black/40 to-black/40" />
      <span className="bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent leading-none">
        pEarn
      </span>
    </div>
  );
}
