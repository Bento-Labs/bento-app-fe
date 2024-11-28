import { useQuery } from "@tanstack/react-query";
import invariant from "tiny-invariant";
import { getContract } from "viem";
import { useChainId, usePublicClient } from "wagmi";

import { bentoVaultCoreConfig } from "shared/config";
import { bentoVaultCoreABI } from "shared/config/abi";

export type Weights = readonly [
  usdtWeight: number,
  usdcWeight: number,
  daiWeight: number,
  usdeWeight: number,
];

export const useWeightsQuery = () => {
  const chainId = useChainId();
  const pc = usePublicClient();
  return useQuery({
    queryKey: ["weights"],
    queryFn: async () => {
      invariant(pc, "useWeightsQuery. pc is undefined");
      const contract = getContract({
        address: bentoVaultCoreConfig[chainId],
        abi: bentoVaultCoreABI,
        client: pc,
      });

      const weights = await contract.read.getWeights();

      return weights as Weights;

      //   return [25, 37.5, 25, 30] as Weights;
    },

    enabled: Boolean(pc),
  });
};
