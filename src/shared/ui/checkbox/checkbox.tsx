import { ComponentProps } from "react";

import { twMerge } from "tailwind-merge";

type Props = Omit<ComponentProps<"input">, "type">;

export const Checkbox = ({ className, ...props }: Props) => {
  return (
    <div className={twMerge("relative flex w-fit", className)}>
      <input
        className="peer relative size-5 cursor-pointer appearance-none rounded border-2 border-black outline-none disabled:cursor-not-allowed"
        type="checkbox"
        {...props}
      />

      <svg
        className="pointer-events-none absolute left-1/2 top-1/2 hidden size-3.5 -translate-x-1/2 -translate-y-1/2 text-black peer-checked:block"
        fill="none"
        height="15"
        viewBox="0 0 14 14"
        width="14"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.6666 4L5.24992 10.4167L2.33325 7.5"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
};
