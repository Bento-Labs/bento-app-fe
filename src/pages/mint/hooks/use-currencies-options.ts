import { useMemo } from "react";

import { useChainId } from "wagmi";

import { currenciesList } from "features/select-currency";

export const useCurrenciesOptions = () => {
  const chainId = useChainId();

  return useMemo(() => {
    return currenciesList.filter((c) => {
      return c.chainId === chainId;
    });
  }, [chainId]);
};
