import { queryOptions, useQuery } from "@tanstack/react-query";
import invariant from "tiny-invariant";
import {
  Address,
  formatUnits,
  getContract,
  parseUnits,
  PublicClient,
} from "viem";
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
  addresses: Record<string, Address>;
  chainId: number;
  account: Address | undefined;
};

const getLatestPriceQueryKey = (params: Omit<Params, "client">) => {
  return ["latest-price", params.account, params.addresses, params.chainId];
};

const withFormatted = ({ decimals, data }: FetchLatestPriceResult) => {
  const oneValue = parseUnits("1", decimals);
  const price = data[1] > oneValue ? oneValue : data[1];
  const formatted = formatUnits(price, decimals);

  return {
    formatted: formatted,
    price,
    decimals,
    raw: { decimals, data },
  };
};

type WithFormatted = ReturnType<typeof withFormatted>;
export type Result = Record<string, WithFormatted>;

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

      const promises = Object.entries(params.addresses).map(([_, address]) => {
        return fetchLatestPriceQuery({ ...params, address, client, account });
      });

      const symbols = Object.keys(params.addresses);

      const response = await Promise.all(promises);

      const result = symbols.reduce(
        (acc, symbol, index) => {
          acc[symbol] = withFormatted(response[index]);
          return acc;
        },
        {} as Record<string, WithFormatted>
      );

      console.log(result);

      return result;
    },
    staleTime: 1000 * 5,
    enabled: Boolean(account && client),
    ...options,
  });
};

export const useLatestPricesQuery = <TData = Result>(
  options?: QueryOptions<Result, unknown, TData>
) => {
  const { address: accountAddress } = useAccount();
  const chainId = useChainId();
  const pc = usePublicClient({ chainId });

  const query = useQuery(
    getQueryOptions<TData>(
      {
        addresses: chainLinkAggregatorConfig[chainId],
        account: accountAddress,
        chainId,
        client: pc,
      },
      options
    )
  );

  return query;
};
