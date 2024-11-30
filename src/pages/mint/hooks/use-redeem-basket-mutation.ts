import { useMutation } from "@tanstack/react-query";
import invariant from "tiny-invariant";
import { getContract } from "viem";
import { useChainId, useWalletClient } from "wagmi";

import { bentoVaultCoreConfig } from "shared/config";
import { bentoVaultCoreABI } from "shared/config/abi";

export const useRedeemBasketMutation = () => {
  const chainId = useChainId();
  const { data: wc } = useWalletClient();
  return useMutation({
    mutationFn: async () => {
      invariant(wc, "useRedeemBasketMutation. wc is undefined");

      const bentoVaultCoreAddress = bentoVaultCoreConfig[chainId];
      const contract = getContract({
        abi: bentoVaultCoreABI,
        address: bentoVaultCoreAddress,
        client: wc,
      });

      console.log(contract);

      // contract.write.
    },
  });
};
