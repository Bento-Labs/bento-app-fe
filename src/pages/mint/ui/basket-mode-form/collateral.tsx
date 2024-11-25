import { useFormContext } from "react-hook-form";

import Decimal from "decimal.js";
import { twMerge } from "tailwind-merge";
import { formatUnits } from "viem";
import { useAccount, useChainId } from "wagmi";

import { useBalanceQuery, UseLatestPricesQueryResult } from "entities/currency";
import { Weights } from "pages/mint/hooks/use-weights-query";
import { bentoUSDConfig, Currency } from "shared/config";
import { div, mul } from "shared/utils";

import { BasketModeFormType } from "../../types";
import { checkBalance } from "../../utils/validations";
import { CollateralInput } from "../collateral-input";

type Props = {
  currency: Currency;
  index: number;
  weights?: Weights;
  prices?: UseLatestPricesQueryResult;
};

export const Collateral = (props: Props) => {
  const { isConnected } = useAccount();
  const { control, setValue, getValues } = useFormContext<BasketModeFormType>();
  const { currency, index, weights, prices } = props;
  const chainId = useChainId();
  const bentoUSD = bentoUSDConfig[chainId];

  const balanceQuery = useBalanceQuery(currency.address, {
    select: (balance) => {
      return {
        formatted: formatUnits(balance, currency.decimals),
        balance,
      };
    },
  });

  const handleChangeCollateralValue = (value: string, index: number) => {
    if (!weights || !prices) return;
    const { collaterals } = getValues();

    if (!value) {
      setValue("receiveValue", "");
      collaterals.forEach((_, idx) => {
        setValue(`collaterals.${idx}.value`, "");
      });
      return;
    }

    const currentCollateralWeight = weights[index];

    const values = weights.map((w, index) => {
      const collateral = collaterals[index];
      const usdPrice = prices[collateral.currency.symbol].formatted;
      const normalizedWeight = div(w, currentCollateralWeight);
      const collateralValue = div(value, normalizedWeight)
        .toDecimalPlaces(18, 1)
        .toSignificantDigits();
      const usdValue = mul(collateralValue, usdPrice);

      setValue(`collaterals.${index}.value`, collateralValue.toString(), {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });

      return { usdValue, collateralValue };
    });

    const usdValuesSum = values.reduce((acc, item) => {
      acc = acc.plus(item.usdValue);
      return acc;
    }, new Decimal(0));

    const receiveValue = usdValuesSum;

    setValue(
      "receiveValue",
      receiveValue
        .toDecimalPlaces(bentoUSD.decimals, 1)
        .toSignificantDigits()
        .toString()
    );
  };

  return (
    <CollateralInput
      disabled={!isConnected}
      rules={{
        validate: (value) => {
          const balanceMsg = checkBalance(
            value,
            balanceQuery.data?.balance,
            currency.decimals,
            currency.symbol
          );

          if (
            balanceMsg === true ||
            balanceMsg === "Unknown balance" ||
            balanceMsg === "Value is empty"
          )
            return true;

          return balanceMsg;
        },
      }}
      address={currency.address}
      className={twMerge(
        "border-b border-b-charcoalGrey px-6 py-3 last:border-b-0"
      )}
      control={control}
      logoURI={currency.logoURI}
      name={`collaterals.${index}.value`}
      symbol={currency.symbol}
      decimals={currency.decimals}
      onChange={(value) => handleChangeCollateralValue(value, index)}
    />
  );
};
