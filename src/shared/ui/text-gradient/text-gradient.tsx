import { PropsWithChildren } from "react";

import { twMerge } from "tailwind-merge";

type Props = {
  className?: string;
};

export const TextGradient = (props: PropsWithChildren<Props>) => {
  const { children, className } = props;
  return (
    <span
      className={twMerge(
        "inline-block bg-parisGreenGradient bg-clip-text text-transparent",
        className
      )}
    >
      {children}
    </span>
  );
};
