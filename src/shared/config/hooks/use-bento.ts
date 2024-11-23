import { useChainId } from "wagmi";

import { busdConfig } from "../const";

export const useBento = () => {
  const chainId = useChainId();

  return busdConfig[chainId];
};
