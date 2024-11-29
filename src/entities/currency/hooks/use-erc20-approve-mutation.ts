import { useMutation } from "@tanstack/react-query";
import invariant from "tiny-invariant";
import { Address, erc20Abi, getContract } from "viem";
import { waitForTransactionReceipt } from "viem/actions";
import { useWalletClient } from "wagmi";

type Params = {
  currencyAddress: Address;
  contractAddress: Address;
};

export const useERC20ApproveMutation = () => {
  const { data: wc } = useWalletClient();
  return useMutation({
    mutationFn: async (params: Params) => {
      invariant(wc, "useERC20ApproveMutation. wc is undefined");

      const { contractAddress, currencyAddress } = params;
      const contract = getContract({
        abi: erc20Abi,
        address: currencyAddress,
        client: wc,
      });

      const totalSupply = await contract.read.totalSupply();

      const {
        request: { args, ...options },
      } = await contract.simulate.approve([contractAddress, totalSupply]);

      const hash = await contract.write.approve(args, options);

      const receipt = await waitForTransactionReceipt(wc, { hash });

      return receipt;
    },
  });
};
