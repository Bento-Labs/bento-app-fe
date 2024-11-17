import type { PropsWithChildren } from "react";

import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

interface Props {
  className?: string;
}

export function Content({ children, className }: PropsWithChildren<Props>) {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      className={twMerge(
        "z-10 m-auto flex flex-col rounded-xl bg-[center_top] bg-no-repeat shadow-xl",
        className
      )}
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      key="modal"
    >
      {children}
    </motion.div>
  );
}
