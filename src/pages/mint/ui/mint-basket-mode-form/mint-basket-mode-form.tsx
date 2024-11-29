import { useMemo } from "react";
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";

import { useAccount, useChainId } from "wagmi";

import { CurrencyLabel, useLatestPricesQuery } from "entities/currency";
import { useCurrenciesOptions } from "pages/mint/hooks/use-currencies-options";
import { useMintBasketMutation } from "pages/mint/hooks/use-mint-basket-mutation";
import { MintBasketModeFormType } from "pages/mint/types";
import { calcCollateralsValues } from "pages/mint/utils/calculations";
// import { calcCollateralValue } from "pages/mint/utils/calculations";
import { bentoUSDConfig } from "shared/config";

import { useWeightsQuery } from "../../hooks/use-weights-query";
import { Input } from "../input";
import { Collateral } from "./collateral";
import { SubmitButton } from "./submit-button";

export const MintBasketModeForm = () => {
  const { isConnected } = useAccount();
  const weightsQuery = useWeightsQuery();

  const chainId = useChainId();
  const options = useCurrenciesOptions();
  const bento = bentoUSDConfig[chainId];

  const latestPricesQuery = useLatestPricesQuery();

  const collaterals: MintBasketModeFormType["collaterals"] = useMemo(() => {
    return options.map((op) => {
      return {
        currency: op,
        value: "",
      };
    });
  }, [options]);

  const form = useForm<MintBasketModeFormType>({
    values: { receiveValue: "", collaterals },
    mode: "onChange",
  });

  const { handleSubmit, control, getValues, setValue } = form;

  const fieldArray = useFieldArray({
    control,
    name: "collaterals",
  });

  const mintBasketMutation = useMintBasketMutation();

  const handleSuccess: SubmitHandler<MintBasketModeFormType> = (data) => {
    mintBasketMutation.mutate({ amount: data.receiveValue, slippage: "0.1" });
  };

  const handleError: SubmitErrorHandler<MintBasketModeFormType> = () => {};

  const handleChangeReceiveValue = (value: string) => {
    if (!weightsQuery.data || !latestPricesQuery.data) return;
    const { collaterals } = getValues();

    if (!value) {
      collaterals.map((_, index) => {
        setValue(`collaterals.${index}.value`, "", {
          shouldDirty: true,
          shouldTouch: true,
          shouldValidate: true,
        });
      });

      return;
    }

    const weights = weightsQuery.data;
    const prices = latestPricesQuery.data;

    const values = calcCollateralsValues({
      weights,
      prices,
      collaterals: collaterals.map((c) => c.currency),
      receiveValue: value,
    });

    values.map((value, index) => {
      const collateral = collaterals[index];
      setValue(
        `collaterals.${index}.value`,
        value
          .toDecimalPlaces(collateral.currency.decimals + 1)
          .toSignificantDigits(collateral.currency.decimals)
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
    <FormProvider {...form}>
      <form
        className="mt-2"
        onSubmit={handleSubmit(handleSuccess, handleError)}
      >
        <Input
          control={control}
          disabled={!isConnected}
          name="receiveValue"
          decimals={bento.decimals}
          label="You Recieve"
          // usdValue="21.90"
          onMaxClick={() => {
            //
          }}
          slot={<CurrencyLabel symbol={bento.symbol} icon={bento.logoURI} />}
          bottomLabel="Available to Mint"
          bottomValue="20"
          onChange={handleChangeReceiveValue}
        />

        <div className="mt-3 flex flex-col rounded-lg bg-mirage pt-5">
          <span className="mb-3 inline-flex px-6 text-sm text-bluishGrey">
            Deposit basket
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

        {/* <SelectNetwork className="mt-5" /> */}
        {/* <BentoPlusToggle className="mt-4" checked={false} onChange={() => {}} /> */}

        {/* <SubmitButton className="mt-6 w-full rounded-xl py-4 text-lg" /> */}

        <SubmitButton
          control={control}
          className="mt-6 w-full rounded-xl py-4 text-lg"
        />
      </form>
    </FormProvider>
  );
};
