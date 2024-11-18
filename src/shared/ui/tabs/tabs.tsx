import { PropsWithChildren, useId } from "react";

import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

import { TabsContext } from "./context";

export const Tabs = (props: PropsWithChildren<{ className?: string }>) => {
  const { children, className, ...restProps } = props;
  const lineLayoutId = useId();

  return (
    <motion.div
      layout
      {...restProps}
      className={twMerge("flex rounded-md bg-mirage p-0.5", className)}
    >
      <TabsContext.Provider value={{ lineLayoutId: lineLayoutId }}>
        {children}
      </TabsContext.Provider>
    </motion.div>
  );
};
