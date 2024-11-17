import type { ElementType, PropsWithChildren } from "react";

import { twMerge } from "tailwind-merge";

import type { PolymorphicProps } from "shared/types";

interface Props {
  className?: string;
}

export function Link<E extends ElementType = "a">(
  props: PropsWithChildren<PolymorphicProps<E, Props>>
) {
  const { as: Comp = "a", children, className, ...restProps } = props;

  return (
    <Comp
      {...restProps}
      className={twMerge(
        "cursor-pointer text-center text-parisGreen outline-none hover:text-parisGreen",
        className
      )}
    >
      {children}
    </Comp>
  );
}
