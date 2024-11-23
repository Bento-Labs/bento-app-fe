import { useMemo } from "react";

import { useCollaterals } from "shared/config";

export const useCurrenciesOptions = () => {
  const collaterals = useCollaterals();

  return useMemo(() => {
    return Object.values(collaterals);
  }, [collaterals]);
};
