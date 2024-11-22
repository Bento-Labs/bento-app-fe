import { useMemo } from "react";
import {
  SubmitErrorHandler,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";

import { CurrencyLabel, useBento } from "entities/currency";
import { useCurrenciesOptions } from "pages/mint/hooks/use-currencies-options";
import { BasketModeFormType } from "pages/mint/types";
import { Button } from "shared/ui/button";

import { BentoPlusToggle } from "../bento-plus-toggle";
import { Input } from "../input";
import { SelectNetwork } from "../select-network";
import { CollateralInput } from "./collateral-input";

export const BasketModeForm = () => {
  const options = useCurrenciesOptions();
  const bento = useBento();

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
        <span className="mb-1 inline-flex px-6 text-sm text-bluishGrey">
          Available Collateral
        </span>
        {fieldArray.fields.map((field, index) => {
          return (
            <CollateralInput
              className="border-b border-b-charcoalGrey px-6 py-5 last:border-b-0"
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

      <SelectNetwork className="mt-5" />
      <BentoPlusToggle className="mt-4" checked={false} onChange={() => {}} />
      <Button type="submit" className="mt-6 w-full rounded-xl py-4 text-lg">
        Mint BentoUSD
      </Button>
    </form>
  );
};
