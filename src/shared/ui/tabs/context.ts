import { createContext } from "react";

type TabsContextType = {
  lineLayoutId: string;
};

export const TabsContext = createContext<TabsContextType>({
  lineLayoutId: "",
});
