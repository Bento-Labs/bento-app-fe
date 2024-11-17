import { PropsWithChildren } from "react";

import { WagmiProvider } from "wagmi";

import { config } from "./config";

export const Provider = ({ children }: PropsWithChildren) => {
  return <WagmiProvider config={config}>{children}</WagmiProvider>;
};
