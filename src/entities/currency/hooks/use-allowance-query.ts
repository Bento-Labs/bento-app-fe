import { Address, erc20Abi } from "viem";
import {
  useAccount,
  useChainId,
  useReadContract,
  useReadContracts,
} from "wagmi";

import { Config } from "shared/providers/wagmi";

type Options<TData = bigint> = {
  account?: Address;
  chainId?: number;
  select?: (allowance: bigint) => TData;
};

type UseAllowanceQueryParams = {
  currencyAddress: Address;
  contractAddress: Address;
};

export const useAllowanceQuery = <TData = bigint>(
  params: UseAllowanceQueryParams,
  options?: Options<TData>
) => {
  const { address: accountAddress } = useAccount();
  const chainId = useChainId();

  const { currencyAddress, contractAddress } = params;

  return useReadContract<
    typeof erc20Abi,
    "allowance",
    readonly [Address, Address],
    Config,
    TData
  >({
    chainId: options?.chainId || chainId,
    abi: erc20Abi,
    functionName: "allowance",
    account: options?.account ?? accountAddress,
    address: currencyAddress,
    args: accountAddress ? [accountAddress, contractAddress] : undefined,
    query: {
      select: options?.select,
    },
  });
};

type UseAllowancesQueryParams = {
  currencyAddresses: Address[];
  contractAddress: Address;
};
export const useAllowancesQueries = <TData = bigint>(
  params: UseAllowancesQueryParams,
  options?: Options<TData>
) => {
  const { currencyAddresses, contractAddress } = params;

  const { address: accountAddress } = useAccount();
  const chainId = useChainId();

  const contracts = currencyAddresses.map((currencyAddress) => {
    return {
      chainId: options?.chainId || chainId,
      abi: erc20Abi,
      functionName: "allowance",
      // account: options?.account ?? accountAddress,
      address: currencyAddress,
      args: accountAddress ? [accountAddress, contractAddress] : undefined,
    };
  });

  return useReadContracts({
    contracts: contracts,
  });
};
