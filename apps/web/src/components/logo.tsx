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
      <span className="leading-none">Dee</span>
      <span className="bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent leading-none">
        pNote Clone
      </span>
    </div>
  );
}
