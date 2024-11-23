import { useChainId } from "wagmi";

import { collateralsConfig } from "../const";

export const useCollaterals = () => {
  const chainId = useChainId();

  return collateralsConfig[chainId];
};
