import { useChainId } from "wagmi";

import { busd } from "../const";

export const useBento = () => {
  const chainId = useChainId();

  return busd[chainId];
};
