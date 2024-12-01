import { queryOptions, useQueries, useQuery } from "@tanstack/react-query";
import invariant from "tiny-invariant";
import {
  Address,
  erc20Abi,
  formatUnits,
  getContract,
  PublicClient,
} from "viem";
import { useAccount, useChainId, usePublicClient } from "wagmi";

import { Currency } from "shared/config";
import { QueryOptions } from "shared/types";

type Result = {
  formatted: string;
  balance: bigint;
};

type Params = {
  accountAddress: Address | undefined;
  currency: Pick<Currency, "address" | "decimals">;
  pc: PublicClient | undefined;
};

export const getUseAllowanceQueryKey = ({
  accountAddress,
  currency,
}: Omit<Params, "pc">) => {
  return ["use-balance-query", accountAddress, currency];
};

const getQueryOptions = <TData = Result>(
  params: Params,
  options?: QueryOptions<Result, unknown, TData>
) => {
  const { accountAddress, currency, pc } = params;
  return queryOptions<Result, unknown, TData>({
    queryKey: getUseAllowanceQueryKey({
      accountAddress,
      currency,
    }),
    queryFn: async () => {
      invariant(pc, "useAllowancesQuery. pc is undefined");
      invariant(accountAddress, "useAllowancesQuery. address is undefined");

      const contract = getContract({
        abi: erc20Abi,
        address: currency.address,
        client: pc,
      });

      const raw = await contract.read.balanceOf([accountAddress]);
      return { formatted: formatUnits(raw, currency.decimals), balance: raw };
    },
    enabled: Boolean(accountAddress && pc),
    ...options,
  });
};

type UseBalancesQueries = {
  currencies: Params["currency"][];
};

export const useBalancesQueries = <TData = Result>(
  params: UseBalancesQueries,
  options?: QueryOptions<Result, unknown, TData>
) => {
  const { address } = useAccount();
  const pc = usePublicClient();
  return useQueries({
    queries: params.currencies.map((currency) => {
      return getQueryOptions(
        { currency, accountAddress: address, pc },
        options
      );
    }),
  });
};

type UseBalanceQuery = {
  currency: Params["currency"];
};
export const useBalanceQuery = <TData = Result>(
  params: UseBalanceQuery,
  options?: QueryOptions<Result, unknown, TData>
) => {
  const { address } = useAccount();
  const chainId = useChainId();
  const pc = usePublicClient({ chainId });
  return useQuery(
    getQueryOptions(
      { accountAddress: address, pc, currency: params.currency },
      options
    )
  );
};
