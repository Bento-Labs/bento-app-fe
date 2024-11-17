import React from "react";

import { twMerge } from "tailwind-merge";

import placeholder from "shared/ui/icon/svg/currency-placeholder.svg";

type Props = {
  fallbackUrl?: string;
} & React.ImgHTMLAttributes<HTMLImageElement>;

export const Img = ({
  className,
  fallbackUrl = placeholder,
  ...props
}: Props) => {
  return (
    <img
      {...props}
      src={props.src ?? fallbackUrl}
      className={twMerge("select-none", className)}
      alt={props.alt}
      onError={(e) => {
        if (!fallbackUrl) return;
        e.currentTarget.onerror = null;
        e.currentTarget.src = fallbackUrl;
      }}
    />
  );
};
