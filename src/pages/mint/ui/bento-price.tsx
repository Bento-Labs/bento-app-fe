import { useMemo } from "react";

import Decimal from "decimal.js";
import { twMerge } from "tailwind-merge";
import { useChainId } from "wagmi";

import { useLatestPricesQuery } from "entities/currency";
import { bentoUSDConfig } from "shared/config";
import { Icon } from "shared/ui/icon";
import { div, mul, pow } from "shared/utils";

import { useCurrenciesOptions } from "../hooks/use-currencies-options";
import { useWeightsQuery } from "../hooks/use-weights-query";

type Props = {
  className?: string;
};

export const BentoPrice = (props: Props) => {
  const currencies = useCurrenciesOptions();
  const { className } = props;
  const latestPricesQuery = useLatestPricesQuery();
  const weightsQuery = useWeightsQuery();
  const chainId = useChainId();
  const bento = bentoUSDConfig[chainId];

  const price = useMemo(() => {
    if (!weightsQuery.data || !latestPricesQuery.data) return;

    const result = weightsQuery.data.reduce((acc, item, index) => {
      const currency = currencies[index];
      const { price, decimals } = latestPricesQuery.data[currency.symbol];
      acc = acc.plus(
        mul(div(item, 100), div(price.toString(), pow(10, decimals)))
      );
      return acc;
    }, new Decimal(0));

    return result;
  }, [weightsQuery.data, latestPricesQuery.data, currencies]);

  return (
    <div className={twMerge("flex justify-between font-medium", className)}>
      <span>
        1 {bento.symbol} = ${price?.toDecimalPlaces(3).toString()}
      </span>

      <span className="flex gap-x-1">
        <Icon name="gasoline" className="size-5" />
        Estimated gas cost: N/A
      </span>
    </div>
  );
};
