import { Chain, createClient, http } from "viem";
import { sepolia } from "viem/chains";
import { createConfig } from "wagmi";

const supportedChains: [Chain, ...Chain[]] = [sepolia];

export const config = createConfig({
  // storage: createStorage({
  //   // key: `bento-wagmi.${supportedChains[0].id}`,
  //   storage: localStorage,
  // }),
  chains: supportedChains,
  client: ({ chain }) => {
    return createClient({
      // batch: {
      //   multicall: {
      //     batchSize: 1024 * 3, // 3kb
      //   },
      // },
      chain,
      transport: http(),
    });
  },
});

export type Config = typeof config;
