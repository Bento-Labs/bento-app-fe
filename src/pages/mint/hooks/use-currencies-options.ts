import { useMemo } from "react";

import { useChainId } from "wagmi";

import { collateralsConfig } from "shared/config/const";

export const useCurrencies = () => {
  const chainId = useChainId();
  const collaterals = collateralsConfig[chainId];

  return useMemo(() => {
    return Object.values(collaterals);
  }, [collaterals]);
};
