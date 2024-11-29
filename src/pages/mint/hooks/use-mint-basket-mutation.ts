import { useMutation } from "@tanstack/react-query";
import invariant from "tiny-invariant";
import { getContract, parseUnits } from "viem";
import { waitForTransactionReceipt } from "viem/actions";
import { useChainId, useWalletClient } from "wagmi";

import { bentoUSDConfig, bentoVaultCoreConfig } from "shared/config";
import { bentoVaultCoreABI } from "shared/config/abi";
import { mul } from "shared/utils";

type UseMintBasketMutationParams = {
  amount: string;
  slippage: string;
};

export const useMintBasketMutation = () => {
  const chainId = useChainId();
  const { data: wc } = useWalletClient();

  return useMutation({
    mutationFn: async (params: UseMintBasketMutationParams) => {
      invariant(wc, "useWeightsQuery. pc is undefined");
      const amount = parseUnits(
        params.amount,
        bentoUSDConfig[chainId].decimals
      );

      const contract = getContract({
        address: bentoVaultCoreConfig[chainId],
        abi: bentoVaultCoreABI,
        client: wc,
      });

      console.log({
        amount,
        minimalBentoUSDAmount: BigInt(mul(amount.toString(), 0.99).toString()),
      });
      const {
        request: { args, ...options },
      } = await contract.simulate.mintBasket([
        amount,
        BigInt(mul(amount.toString(), 0.99).toString()),
      ]);

      const hash = await contract.write.mintBasket(args, options);

      const receipt = await waitForTransactionReceipt(wc, { hash });
      return receipt;
    },
  });
};
