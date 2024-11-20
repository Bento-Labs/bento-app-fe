import { PropsWithChildren } from "react";

import { twMerge } from "tailwind-merge";

import { Icon } from "../icon";

type Props = {
  onClose?: () => void;
  className?: string;
};

export const Body = (props: PropsWithChildren<Props>) => {
  const { children, className, onClose } = props;
  return (
    <div
      className={twMerge(
        "relative flex flex-col rounded-xl border border-balticSea bg-woodSmoke px-7 pb-8 pt-9 backdrop-blur-lg",
        className
      )}
    >
      {onClose && (
        <button
          className="absolute right-3 top-3 p-3 text-white/35 hover:text-white/50"
          onClick={onClose}
        >
          <Icon name="plus" className="size-3" />
        </button>
      )}

      {children}
    </div>
  );
};
