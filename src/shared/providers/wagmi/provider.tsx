import { PropsWithChildren } from "react";

import { WagmiProvider } from "wagmi";

import { Config as Cfg, config } from "./app-kit-config";

// import { config, Config as Cfg } from "./config";

export type Config = Cfg;
export const Provider = ({ children }: PropsWithChildren) => {
  return <WagmiProvider config={config}>{children}</WagmiProvider>;
};

declare module "wagmi" {
  interface Register {
    config: Config;
  }
}
