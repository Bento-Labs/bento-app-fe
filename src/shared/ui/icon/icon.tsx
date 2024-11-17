import { ComponentProps } from "react";

import { twMerge } from "tailwind-merge";

import * as ICONS from "./svg";

export type Name = keyof typeof ICONS;

type Props = {
  name: Name;
  svgClassName?: string;
} & ComponentProps<"span">;

export const Icon = ({ className, name, svgClassName, ...props }: Props) => {
  const IconElement = ICONS[name];

  return (
    <span
      className={twMerge(
        "relative box-content flex size-6 items-center",
        className
      )}
      {...props}
    >
      {<IconElement className={twMerge("size-full", svgClassName)} />}
    </span>
  );
};
