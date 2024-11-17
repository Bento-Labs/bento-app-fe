import { Chain, createClient, http } from "viem";
import { createConfig, createStorage } from "wagmi";
import { sepolia } from "wagmi/chains";

const supportedChains: [Chain, ...Chain[]] = [sepolia];

export const config = createConfig({
  storage: createStorage({
    key: `galactica-wagmi.${supportedChains[0].id}`,
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
      transport: http(chain.rpcUrls.default.http[0]),
    });
  },
});

export type Config = typeof config;

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
