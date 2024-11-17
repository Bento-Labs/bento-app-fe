import { ElementType, PropsWithChildren } from "react";

import { twMerge } from "tailwind-merge";

import { PolymorphicProps } from "shared/types";

import { Spinner } from "../spinner";

export type Theme = "parisGreenGradient";

export type Props = {
  className?: string;
  disabled?: boolean;
  isLoading?: boolean;
  theme?: Theme;
};

export const Button = <E extends ElementType = "button">(
  props: PropsWithChildren<PolymorphicProps<E, Props>>
) => {
  const {
    as: Comp = "button",
    children,
    className,
    disabled = false,
    isLoading = false,
    theme = "parisGreenGradient",
    ...restProps
  } = props;

  const content = isLoading ? (
    <span className="opacity-0">{children}</span>
  ) : (
    children
  );

  return (
    <Comp
      {...restProps}
      className={twMerge(
        "relative inline-flex cursor-pointer select-none items-center justify-center rounded-lg px-4.5 py-2 text-center font-medium transition",
        (isLoading || disabled) && "pointer-events-none",
        theme === "parisGreenGradient" ? "" : "",

        className
      )}
    >
      {isLoading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <Spinner className={twMerge("size-4 text-white")} />
        </span>
      )}
      {content}
    </Comp>
  );
};
