import type { ComponentProps } from "react";

import { twMerge } from "tailwind-merge";

export const Input = ({ className, ...props }: ComponentProps<"input">) => {
  return (
    <input
      placeholder="COMING SOON"
      // placeholder="Your address"
      className={twMerge(
        "rounded-lg border border-white/20 bg-mirage p-[15px] text-sm outline-none",
        className
      )}
      {...props}
    />
  );
};
