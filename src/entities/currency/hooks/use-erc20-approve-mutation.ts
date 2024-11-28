import { useMutation } from "@tanstack/react-query";
import invariant from "tiny-invariant";
import { Address, erc20Abi, getContract } from "viem";
import { waitForTransactionReceipt } from "viem/actions";
import { useWalletClient } from "wagmi";

type Params = {
  currencyAddress: Address;
  contractAddress: Address;
  amount: bigint;
};

export const useERC20ApproveMutation = () => {
  const { data: wc } = useWalletClient();
  return useMutation({
    mutationFn: async (params: Params) => {
      invariant(wc, "useERC20ApproveMutation. wc is undefined");

      const { contractAddress, currencyAddress, amount } = params;
      const contract = getContract({
        abi: erc20Abi,
        address: currencyAddress,
        client: wc,
      });

      const {
        request: { args, ...options },
      } = await contract.simulate.approve([contractAddress, amount]);

      const hash = await contract.write.approve(args, options);

      const receipt = await waitForTransactionReceipt(wc, { hash });

      return receipt;
    },
  });
};
