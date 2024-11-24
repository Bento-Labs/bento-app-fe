import { useMemo } from "react";
import {
  SubmitErrorHandler,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";

import { useChainId } from "wagmi";

import { CurrencyLabel } from "entities/currency";
import { useCurrenciesOptions } from "pages/mint/hooks/use-currencies-options";
import { useWeightsQuery } from "pages/mint/hooks/use-weights-query";
import { BasketModeFormType } from "pages/mint/types";
import { busdConfig } from "shared/config";

import { Input } from "../input";
import { SubmitButton } from "../submit-button";
import { CollateralInput } from "./collateral-input";

export const BasketModeForm = () => {
  const chainId = useChainId();
  const options = useCurrenciesOptions();
  const bento = busdConfig[chainId];
  const weightsQuery = useWeightsQuery();

  console.log(weightsQuery);

  const collaterals: BasketModeFormType["collaterals"] = useMemo(() => {
    return options.map((op) => {
      return {
        currency: op,
        value: "",
      };
    });
  }, [options]);

  const { handleSubmit, control } = useForm<BasketModeFormType>({
    values: { receiveValue: "", collaterals },
  });

  const fieldArray = useFieldArray({
    control,
    name: "collaterals",
  });

  const handleSuccess: SubmitHandler<BasketModeFormType> = () => {
    //
  };

  const handleError: SubmitErrorHandler<BasketModeFormType> = () => {};

  return (
    <form className="mt-2" onSubmit={handleSubmit(handleSuccess, handleError)}>
      <Input
        name="receiveValue"
        decimals={6}
        label="You Recieve"
        usdValue="21.90"
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
            <CollateralInput
              className="border-b border-b-charcoalGrey px-6 py-3 last:border-b-0"
              key={field.id}
              control={control}
              logoURI={field.currency.logoURI}
              name={`collaterals.${index}.value`}
              symbol={field.currency.symbol}
              decimals={field.currency.decimals}
              requiredValue={"2.00"}
            />
          );
        })}
      </div>

      {/* <SelectNetwork className="mt-5" /> */}
      {/* <BentoPlusToggle className="mt-4" checked={false} onChange={() => {}} /> */}
      <SubmitButton className="mt-6 w-full rounded-xl py-4 text-lg" />
    </form>
  );
};
