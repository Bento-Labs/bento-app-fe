import { useCallback } from "react";

import { queryOptions, useQuery, useQueryClient } from "@tanstack/react-query";
import invariant from "tiny-invariant";
import { parseUnits, PublicClient } from "viem";
import { useChainId, usePublicClient } from "wagmi";

import { bentoUSDConfig } from "shared/config";
import { QueryOptions } from "shared/types";
import { sleep } from "shared/utils";

type Params = {
  inputAmount: string;
  chainId: number;
  pc: PublicClient | undefined;
};
const getUseAllowanceQueryKey = ({
  inputAmount,
  chainId,
}: Omit<Params, "pc">) => {
  return ["use-allowance-query", inputAmount, chainId];
};

const getQueryOptions = <TData = bigint[]>(
  params: Params,
  options?: QueryOptions<bigint[], unknown, TData>
) => {
  const { inputAmount, chainId, pc } = params;
  return queryOptions<bigint[], unknown, TData>({
    queryKey: getUseAllowanceQueryKey({
      inputAmount,
      chainId,
    }),
    queryFn: async () => {
      invariant(pc, "useAllowancesQuery. pc is undefined");
      const input = parseUnits(inputAmount, bentoUSDConfig[chainId].decimals);

      // const contract = getContract({
      //   abi: bentoVaultCoreABI,
      //   address: currencyAddress,
      //   client: pc,
      // });

      await sleep(400);

      return [input, input, input, input];
    },
    enabled: Boolean(pc),
    ...options,
  });
};

type UseGetOutputLTAmountsQuery = {
  amount: string;
};

export const useGetOutputLTAmountsQuery = <TData = bigint[]>(
  params: UseGetOutputLTAmountsQuery,
  options?: QueryOptions<bigint[], unknown, TData>
) => {
  const chainId = useChainId();
  const pc = usePublicClient({ chainId });

  return useQuery(
    getQueryOptions<TData>({ pc, chainId, inputAmount: params.amount }, options)
  );
};

export const useFetchGetOutputLTAmountsQuery = () => {
  const chainId = useChainId();
  const pc = usePublicClient({ chainId });
  const queryClient = useQueryClient();

  return useCallback(
    <TData = bigint[]>(
      params: UseGetOutputLTAmountsQuery,
      options?: QueryOptions<bigint[], unknown, TData>
    ) => {
      return queryClient.fetchQuery(
        getQueryOptions<TData>(
          { pc, chainId, inputAmount: params.amount },
          options
        )
      );
    },
    [chainId, pc, queryClient]
  );
};
