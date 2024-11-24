import { queryOptions, useQuery } from "@tanstack/react-query";
import invariant from "tiny-invariant";
import { Address, formatUnits, getContract, PublicClient } from "viem";
import { useAccount, useChainId, usePublicClient } from "wagmi";

import { chainLinkAggregatorConfig } from "shared/config";
import { chainlinkAggregatorV3ABI } from "shared/config/abi";
import { QueryOptions } from "shared/types";

type Data = readonly [
  roundId: bigint,
  answer: bigint,
  startedAt: bigint,
  updatedAt: bigint,
  answeredInRound: bigint,
];

type FetchLatestPriceParams = {
  client: PublicClient;
  address: Address;
  chainId: number;
  account: Address;
};

type FetchLatestPriceResult = {
  decimals: number;
  data: Data;
};

const fetchLatestPriceQuery = async (
  params: FetchLatestPriceParams
): Promise<FetchLatestPriceResult> => {
  const { client, address } = params;

  const contract = getContract({
    abi: chainlinkAggregatorV3ABI,
    address,
    client,
  });

  const decimalsPromise = contract.read.decimals();
  const latestRoundDataPromise = contract.read.latestRoundData();

  const [decimals, latestRoundData] = await Promise.all([
    decimalsPromise,
    latestRoundDataPromise,
  ]);

  return {
    decimals,
    data: latestRoundData,
  };
};

type Params = {
  client: PublicClient | undefined;
  address: Address;
  chainId: number;
  account: Address | undefined;
};

const getLatestPriceQueryKey = (params: Omit<Params, "client">) => {
  return ["latest-price", params.account, params.address, params.chainId];
};

const withFormatted = ({ decimals, data }: FetchLatestPriceResult) => {
  const price = data[1];
  const formatted = formatUnits(price, decimals);

  return {
    formatted: formatted,
    price,
    decimals,
    raw: { decimals, data },
  };
};

type Result = ReturnType<typeof withFormatted>;

const getQueryOptions = <TData = Result>(
  params: Params,
  options?: QueryOptions<Result, unknown, TData>
) => {
  const { client, account } = params;
  return queryOptions({
    queryKey: getLatestPriceQueryKey(params),
    queryFn: async () => {
      invariant(client, "useLatestPriceQuery. client is undefined");
      invariant(account, "useLatestPriceQuery. account is undefined");
      const data = await fetchLatestPriceQuery({ ...params, client, account });

      return withFormatted(data);
    },
    staleTime: 1000 * 5,
    enabled: Boolean(account && client),
    ...options,
  });
};

export const useLatestPriceQuery = <TData = Result>(
  symbol: string,
  options?: QueryOptions<Result, unknown, TData>
) => {
  const { address: accountAddress } = useAccount();
  const chainId = useChainId();
  const pc = usePublicClient({ chainId });

  return useQuery(
    getQueryOptions<TData>(
      {
        address: chainLinkAggregatorConfig[chainId][symbol],
        account: accountAddress,
        chainId,
        client: pc,
      },
      options
    )
  );
};
