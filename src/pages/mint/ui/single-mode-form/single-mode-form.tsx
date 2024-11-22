import {
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
  useWatch,
} from "react-hook-form";

import { formatUnits } from "viem";

import { CurrencyLabel, useBalanceQuery } from "entities/currency";
import { useCurrenciesOptions } from "pages/mint/hooks/use-currencies-options";
import { Button } from "shared/ui/button";

import { SingleModeFormType } from "../../types";
import { BentoPlusToggle } from "../bento-plus-toggle";
import { Input } from "../input";
import { SelectNetwork } from "../select-network";
import { SelectCurrency } from "./select-currency";

export const SingleModeForm = () => {
  const options = useCurrenciesOptions();

  const { handleSubmit, control } = useForm<SingleModeFormType>({
    values: {
      currency: options[0],
      payValue: "",
      receiveValue: "",
    },
  });

  const currency = useWatch({ control, name: "currency" });

  const balanceQuery = useBalanceQuery(currency.address, {
    select: (data) => formatUnits(data, currency.decimals),
  });

  console.log(
    balanceQuery.data,
    balanceQuery.error,
    balanceQuery.status,
    balanceQuery.fetchStatus
  );

  const handleSuccess: SubmitHandler<SingleModeFormType> = () => {
    //
  };

  const handleError: SubmitErrorHandler<SingleModeFormType> = () => {};

  return (
    <form onSubmit={handleSubmit(handleSuccess, handleError)}>
      <Input
        control={control}
        name="payValue"
        label="You Give"
        className="mt-2"
        slot={<SelectCurrency control={control} />}
        usdValue="0"
        balance={balanceQuery.data}
        decimals={6}
        onMaxClick={() => {
          console.log("hello world");
          //
        }}
      />
      <Input
        control={control}
        name="receiveValue"
        label="You Receive"
        className="mt-3"
        slot={<CurrencyLabel symbol="bentoUSD" />}
        usdValue="0"
        decimals={6}
      />

      <SelectNetwork className="mt-5" />

      <BentoPlusToggle className="mt-4" checked={false} onChange={() => {}} />

      <Button type="submit" className="mt-6 w-full rounded-xl py-4 text-lg">
        Mint BentoUSD
      </Button>
    </form>
  );
};
