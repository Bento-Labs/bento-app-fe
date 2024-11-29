import { useFormContext } from "react-hook-form";

import { twMerge } from "tailwind-merge";
import { formatUnits, parseUnits } from "viem";
import { useAccount, useChainId } from "wagmi";

import {
  useAllowancesQueries,
  useBalanceQuery,
  UseLatestPricesQueryResult,
} from "entities/currency";
import { Weights } from "pages/mint/hooks/use-weights-query";
import { bentoUSDConfig, bentoVaultCoreConfig, Currency } from "shared/config";

import { MintBasketModeFormType } from "../../types";
import { calcReceiveValue } from "../../utils/calculations";
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
  const { control, setValue, getValues } =
    useFormContext<MintBasketModeFormType>();
  const { currency, index, weights, prices } = props;
  const chainId = useChainId();
  const bentoUSD = bentoUSDConfig[chainId];

  const allowancesQuery = useAllowancesQueries({
    currencyAddresses: getValues().collaterals.map((c) => c.currency.address),
    contractAddress: bentoVaultCoreConfig[chainId],
  });

  const currentAllowance = allowancesQuery.data?.[index].result;

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

    const { collateralsValues, receiveValue } = calcReceiveValue({
      collaterals: collaterals.map((c) => c.currency),
      currentValue: value,
      inputCurrency: collaterals[index].currency,
      prices,
      weights,
    });

    setValue(
      "receiveValue",
      receiveValue
        .toDecimalPlaces(bentoUSD.decimals + 1)
        .toSignificantDigits(bentoUSD.decimals)
        .toString()
    );

    collateralsValues.forEach(({ collateralValue }, index) => {
      const { currency } = collaterals[index];

      setValue(
        `collaterals.${index}.value`,
        collateralValue
          .toDecimalPlaces(currency.decimals)
          .toSignificantDigits()
          .toString(),
        {
          shouldDirty: true,
          shouldTouch: true,
          shouldValidate: true,
        }
      );
    });
  };

  return (
    <CollateralInput
      disabled={!isConnected}
      rules={{
        validate: (value) => {
          if (
            typeof currentAllowance !== "undefined" &&
            parseUnits(value, currency.decimals) > BigInt(currentAllowance)
          ) {
            return `Approve ${currency.symbol} spending`;
          }

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
