"use client";

import type { ReactNode } from "react";

type HoverTooltipProps = {
  label: string;
  side?: "top" | "right";
  children?: ReactNode;
  className?: string;
};

export function HoverTooltip({
  label,
  side = "top",
  children,
  className = "",
}: HoverTooltipProps) {
  const positionClassName =
    side === "right"
      ? "left-[4.6rem] top-1/2 -translate-y-1/2"
      : "bottom-[calc(100%+0.65rem)] left-1/2 -translate-x-1/2";

  return (
    <>
      {children}
      <div
        className={`pointer-events-none absolute ${positionClassName} z-40 whitespace-nowrap rounded-full border border-[#dfe8c5] bg-[#171717] px-3 py-1.5 text-[0.7rem] font-semibold tracking-[0.08em] text-white opacity-0 shadow-md transition duration-200 group-hover:opacity-100 ${className}`}
      >
        {label}
      </div>
    </>
  );
}
