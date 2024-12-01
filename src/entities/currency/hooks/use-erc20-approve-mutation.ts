import { useMutation, useQueryClient } from "@tanstack/react-query";
import invariant from "tiny-invariant";
import { Address, erc20Abi, getContract } from "viem";
import { waitForTransactionReceipt } from "viem/actions";
import { useAccount, useWalletClient } from "wagmi";

import { Currency } from "shared/config";
import { notifyPromise } from "shared/ui/toast";

import { getUseAllowanceQueryKey } from "./use-allowance-query";

type Params = {
  currency: Currency;
  contractAddress: Address;
};

export const useERC20ApproveMutation = () => {
  const { data: wc } = useWalletClient();
  const { address: accountAddress } = useAccount();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: Params) => {
      invariant(wc, "useERC20ApproveMutation. wc is undefined");

      const { contractAddress, currency } = params;
      const contract = getContract({
        abi: erc20Abi,
        address: currency.address,
        client: wc,
      });

      const totalSupply = await contract.read.totalSupply();

      const {
        request: { args, ...options },
      } = await contract.simulate.approve([contractAddress, totalSupply]);

      const hash = await contract.write.approve(args, options);

      const receiptPromise = waitForTransactionReceipt(wc, { hash });

      notifyPromise(receiptPromise, {
        pending: "Pending...",
        success: `Spending ${currency.symbol} has been approved`,
        error: "Error",
      });

      return await receiptPromise;
    },
    onSuccess: async (_, variables) => {
      const { contractAddress, currency } = variables;
      const key = getUseAllowanceQueryKey({
        accountAddress,
        contractAddress,
        currencyAddress: currency.address,
      });

      const result = await queryClient.invalidateQueries({ queryKey: key });
      return result;
    },
  });
};
