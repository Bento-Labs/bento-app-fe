import { Address, erc20Abi } from "viem";
import { useAccount, useChainId, useReadContract } from "wagmi";

import { Config } from "shared/providers/wagmi";

type Options<TData = bigint> = {
  account?: Address;
  chainId?: number;
  select?: (balance: bigint) => TData;
};

export const useBalanceQuery = <TData = bigint>(
  currencyAddress: Address,
  options?: Options<TData>
) => {
  const { address: accountAddress } = useAccount();
  const chainId = useChainId();

  return useReadContract<
    typeof erc20Abi,
    "balanceOf",
    readonly [Address],
    Config,
    TData
  >({
    chainId: options?.chainId || chainId,
    abi: erc20Abi,
    functionName: "balanceOf",
    account: options?.account ?? accountAddress,
    address: currencyAddress,
    args: accountAddress ? [accountAddress] : undefined,
    query: {
      select: options?.select,
    },
  });
};
