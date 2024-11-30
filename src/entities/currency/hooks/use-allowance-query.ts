import { queryOptions, useQueries, useQuery } from "@tanstack/react-query";
import invariant from "tiny-invariant";
import { Address, erc20Abi, getContract, PublicClient } from "viem";
import { useAccount, useChainId, usePublicClient } from "wagmi";

import { QueryOptions } from "shared/types";

type Params = {
  accountAddress: Address | undefined;
  currencyAddress: Address;
  contractAddress: Address;
  pc: PublicClient | undefined;
};
export const getUseAllowanceQueryKey = ({
  accountAddress,
  currencyAddress,
  contractAddress,
}: Omit<Params, "pc">) => {
  return [
    "use-allowance-query",
    accountAddress,
    currencyAddress,
    contractAddress,
  ];
};

const getQueryOptions = <TData = bigint>(
  params: Params,
  options?: QueryOptions<bigint, unknown, TData>
) => {
  const { accountAddress, contractAddress, currencyAddress, pc } = params;
  return queryOptions<bigint, unknown, TData>({
    queryKey: getUseAllowanceQueryKey({
      accountAddress,
      contractAddress,
      currencyAddress,
    }),
    queryFn: async () => {
      invariant(pc, "useAllowancesQuery. pc is undefined");
      invariant(accountAddress, "useAllowancesQuery. address is undefined");

      const contract = getContract({
        abi: erc20Abi,
        address: currencyAddress,
        client: pc,
      });

      return contract.read.allowance([accountAddress, contractAddress]);
    },
    enabled: Boolean(accountAddress && pc),
    ...options,
  });
};

type UseAllowanceQueryParams = {
  currencyAddress: Address;
  contractAddress: Address;
};

export const useAllowanceQuery = <TData = bigint>(
  params: UseAllowanceQueryParams,
  options?: QueryOptions<bigint, unknown, TData>
) => {
  const { address: accountAddress } = useAccount();
  const chainId = useChainId();
  const pc = usePublicClient({ chainId });

  const { currencyAddress, contractAddress } = params;

  return useQuery(
    getQueryOptions<TData>(
      {
        contractAddress,
        currencyAddress,
        accountAddress,
        pc,
      },
      options
    )
  );
};

type UseAllowancesQueryParams = {
  currencyAddresses: Address[];
  contractAddress: Address;
};
export const useAllowancesQueries = <TData = bigint>(
  params: UseAllowancesQueryParams,
  options?: QueryOptions<bigint, unknown, TData>
) => {
  const { contractAddress, currencyAddresses } = params;
  const chainId = useChainId();
  const pc = usePublicClient({ chainId });
  const { address } = useAccount();

  return useQueries({
    queries: currencyAddresses.map((currencyAddress) => {
      return getQueryOptions<TData>(
        {
          contractAddress,
          accountAddress: address,
          currencyAddress,
          pc,
        },
        options
      );
    }),
  });
};
