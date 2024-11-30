import { useMemo } from "react";
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";

import { useDebounceCallback } from "usehooks-ts";
import { formatUnits } from "viem";
import { useAccount, useChainId } from "wagmi";

import {
  CurrencyLabel,
  useAllowanceQuery,
  useBalanceQuery,
  useLatestPricesQuery,
} from "entities/currency";
import { useCurrenciesOptions } from "pages/mint/hooks/use-currencies-options";
import { useFetchGetOutputLTAmountsQuery } from "pages/mint/hooks/use-get-output-lt-amounts-query";
import { RedeemBasketModeFormType } from "pages/mint/types";
import { bentoUSDConfig, bentoVaultCoreConfig } from "shared/config";

import { useWeightsQuery } from "../../hooks/use-weights-query";
import { validateCurrency } from "../../utils/validations";
import { Input } from "../input";
import { Collateral } from "./collateral";
import { SubmitButton } from "./submit-button";

export const RedeemBasketModeForm = () => {
  const { isConnected } = useAccount();
  const weightsQuery = useWeightsQuery();

  const chainId = useChainId();
  const options = useCurrenciesOptions();
  const latestPricesQuery = useLatestPricesQuery();
  const bento = bentoUSDConfig[chainId];
  const bentoVaultCoreAddress = bentoVaultCoreConfig[chainId];

  const balanceQuery = useBalanceQuery(bento.address, {
    select: (data) => {
      return {
        balance: data,
        formattedBalance: formatUnits(data, bento.decimals),
      };
    },
  });

  const allowanceQuery = useAllowanceQuery({
    contractAddress: bentoVaultCoreAddress,
    currencyAddress: bento.address,
  });

  const collaterals: RedeemBasketModeFormType["collaterals"] = useMemo(() => {
    return options.map((op) => {
      return {
        currency: op,
        value: "",
      };
    });
  }, [options]);

  const form = useForm<RedeemBasketModeFormType>({
    values: { payValue: "", collaterals },
    mode: "onChange",
  });

  const { handleSubmit, control, setValue } = form;

  const fetchOutputAmounts = useFetchGetOutputLTAmountsQuery();

  const debouncedCb = useDebounceCallback(async (amount: string) => {
    const result = await fetchOutputAmounts({ amount });

    result.map((value, index) => {
      const collateral = collaterals[index];
      setValue(
        `collaterals.${index}.value`,
        formatUnits(value, collateral.currency.decimals)
      );
    });
  }, 1000);

  const fieldArray = useFieldArray({
    control,
    name: "collaterals",
  });

  const handleSuccess: SubmitHandler<RedeemBasketModeFormType> = () => {
    //
  };

  const handleError: SubmitErrorHandler<RedeemBasketModeFormType> = () => {};

  const handleChangeValue = (value: string) => {
    setValue("payValue", value);

    debouncedCb(value);
  };

  return (
    <FormProvider {...form}>
      <form
        className="mt-2"
        onSubmit={handleSubmit(handleSuccess, handleError)}
      >
        <Input
          control={control}
          disabled={!isConnected}
          name="payValue"
          decimals={bento.decimals}
          label="You Give"
          onMaxClick={() => {
            if (!balanceQuery.data?.formattedBalance) return;
            handleChangeValue(balanceQuery.data?.formattedBalance);
          }}
          slot={<CurrencyLabel symbol={bento.symbol} icon={bento.logoURI} />}
          bottomLabel="balance"
          bottomValue={balanceQuery.data?.formattedBalance}
          onChange={handleChangeValue}
          rules={{
            validate: validateCurrency({
              allowance: allowanceQuery.data,
              balance: balanceQuery.data?.balance,
              currency: bento,
            }),
          }}
        />

        <div className="mt-3 flex flex-col rounded-lg bg-mirage pt-5">
          <span className="mb-3 inline-flex px-6 text-sm text-bluishGrey">
            Collaterals
          </span>
          {fieldArray.fields.map((field, index) => {
            return (
              <Collateral
                weights={weightsQuery.data}
                prices={latestPricesQuery.data}
                currency={field.currency}
                index={index}
                key={field.id}
              />
            );
          })}
        </div>

        <SubmitButton
          control={control}
          className="mt-6 w-full rounded-xl py-4 text-lg"
        />
      </form>
    </FormProvider>
  );
};
