import clsx from "clsx";

export function Logo({ className }: { className?: string }) {
  return (
    <div
      className={clsx(
        "whitespace-nowrap font-display flex items-center text-lg text-black dark:text-white",
        className,
      )}
    >
      <span className="leading-none">Deep note Clone</span>
    </div>
  );
}
