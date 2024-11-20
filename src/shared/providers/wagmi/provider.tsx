import { PropsWithChildren } from "react";

import { WagmiProvider } from "wagmi";

import { Config, config } from "./app-kit-config";

export const Provider = ({ children }: PropsWithChildren) => {
  return <WagmiProvider config={config}>{children}</WagmiProvider>;
};

declare module "wagmi" {
  interface Register {
    config: Config;
  }
}
