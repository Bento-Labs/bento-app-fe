import { PropsWithChildren, useContext } from "react";

import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

import { TabsContext } from "./context";

type Props = {
  disabled?: boolean;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
};

export const Tab = (props: PropsWithChildren<Props>) => {
  const {
    children,
    className,
    isActive: isActiveProp = false,
    onClick,
    disabled,
    ...restProps
  } = props;

  const { lineLayoutId } = useContext(TabsContext);

  const isActive = isActiveProp;

  return (
    <button
      className={twMerge(
        "relative z-0 flex cursor-pointer items-center gap-x-1.5 rounded p-2 font-medium text-ironsideGrey outline-none transition-colors",
        isActive && "text-parisGreen",
        className
      )}
      onClick={onClick}
      style={{
        WebkitTapHighlightColor: "transparent",
      }}
      {...restProps}
    >
      {isActive && (
        <motion.span
          className="absolute inset-0 -z-10 size-full rounded bg-zeus"
          layoutId={`line-${lineLayoutId}`}
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
      {children}
    </button>
  );
};
