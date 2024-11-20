import { Chain, createClient, http } from "viem";
import { mainnet, sepolia } from "viem/chains";
import { createConfig, createStorage } from "wagmi";

const supportedChains: [Chain, ...Chain[]] = [sepolia, mainnet];

export const config = createConfig({
  storage: createStorage({
    key: `bento-wagmi.${supportedChains[0].id}`,
    storage: localStorage,
  }),
  chains: supportedChains,
  client: ({ chain }) => {
    return createClient({
      batch: {
        multicall: {
          batchSize: 1024 * 3, // 3kb
        },
      },
      chain,
      transport: http(),
    });
  },
});

export type Config = typeof config;
