import { useChainId } from "wagmi";

import { chainLinkAggregatorsAddresses } from "../const";

export const useChainlinkAggregatorAddress = (symbol: string) => {
  const chainId = useChainId();
  return chainLinkAggregatorsAddresses[chainId][symbol];
};
