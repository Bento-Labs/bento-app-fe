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
import { BasketModeFormType } from "pages/mint/types";
import { bentoUSDConfig } from "shared/config";

import { useWeightsQuery } from "../../hooks/use-weights-query";
import { Input } from "../input";
import { SubmitButton } from "../submit-button";
import { Collateral } from "./collateral";

export const BasketModeForm = () => {
  const { isConnected } = useAccount();
  const weightsQuery = useWeightsQuery();

  const chainId = useChainId();
  const options = useCurrenciesOptions();
  const bento = bentoUSDConfig[chainId];

  const latestPricesQuery = useLatestPricesQuery();

  const collaterals: BasketModeFormType["collaterals"] = useMemo(() => {
    return options.map((op) => {
      return {
        currency: op,
        value: "",
      };
    });
  }, [options]);

  const form = useForm<BasketModeFormType>({
    values: { receiveValue: "", collaterals },
    mode: "onChange",
  });

  const { handleSubmit, control } = form;

  const fieldArray = useFieldArray({
    control,
    name: "collaterals",
  });

  const handleSuccess: SubmitHandler<BasketModeFormType> = () => {
    //
  };

  const handleError: SubmitErrorHandler<BasketModeFormType> = () => {};

  return (
    <FormProvider {...form}>
      <form
        className="mt-2"
        onSubmit={handleSubmit(handleSuccess, handleError)}
      >
        <Input
          disabled={!isConnected}
          name="receiveValue"
          decimals={6}
          label="You Recieve"
          // usdValue="21.90"
          onMaxClick={() => {
            //
          }}
          slot={<CurrencyLabel symbol={bento.symbol} icon={bento.logoURI} />}
          bottomLabel="Available to Mint"
          bottomValue="20"
          control={control}
        />

        <div className="mt-3 flex flex-col rounded-lg bg-mirage pt-5">
          <span className="mb-3 inline-flex px-6 text-sm text-bluishGrey">
            Available Collateral
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
        <SubmitButton className="mt-6 w-full rounded-xl py-4 text-lg" />
      </form>
    </FormProvider>
  );
};
