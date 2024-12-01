import { useQuery } from "@tanstack/react-query";
import Decimal from "decimal.js";
import invariant from "tiny-invariant";
import { getContract } from "viem";
import { useChainId, usePublicClient } from "wagmi";

import { bentoVaultCoreConfig } from "shared/config";
import { bentoVaultCoreABI } from "shared/config/abi";
import { div, mul } from "shared/utils";

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
      const sum = weights.reduce((acc, w) => {
        acc = acc.plus(w);
        return acc;
      }, new Decimal(0));

      const multiplier = div(100, sum);

      const normalizedWeights = weights.map((w) => {
        return mul(w, multiplier).toNumber();
      });

      return normalizedWeights as unknown as Weights;
    },

    enabled: Boolean(pc),
  });
};
