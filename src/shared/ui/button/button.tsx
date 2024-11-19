import { ElementType, PropsWithChildren } from "react";

import { twMerge } from "tailwind-merge";

import { PolymorphicProps } from "shared/types";

import { Spinner } from "../spinner";

export type Theme = "parisGreenGradient" | "mirage";

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
    as = "button",
    children,
    className,
    disabled = false,
    isLoading = false,
    theme = "parisGreenGradient",
    ...restProps
  } = props;
  const Comp = as;

  const content = isLoading ? (
    <span className="opacity-0">{children}</span>
  ) : (
    children
  );

  return (
    // FIXME: https://github.com/emotion-js/emotion/issues/3245
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <Comp
      {...restProps}
      disabled={disabled}
      className={twMerge(
        "relative inline-flex cursor-pointer select-none items-center justify-center rounded-lg px-3 py-2 text-center text-sm font-medium transition-colors",
        (isLoading || disabled) && "pointer-events-none",

        theme === "parisGreenGradient" &&
          "bg-parisGreenGradient hover:brightness-105 active:brightness-105 disabled:bg-darkGrey disabled:bg-none",

        theme === "mirage" &&
          "bg-mirage  hover:brightness-105 active:brightness-105 disabled:bg-darkGrey disabled:bg-none",

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
