import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
  useFormState,
  useWatch,
} from "react-hook-form";

import { formatUnits } from "viem";
import { useChainId } from "wagmi";

import {
  CurrencyLabel,
  useBalanceQuery,
  useLatestPricesQuery,
} from "entities/currency";
import { useCurrenciesOptions } from "pages/mint/hooks/use-currencies-options";
import { checkBalance } from "pages/mint/utils/validations";
import { bentoUSDConfig } from "shared/config";
import { mul } from "shared/utils";

import { SingleModeFormType } from "../../types";
import { Input } from "../input";
import { SubmitButton } from "../submit-button";
import { SelectCurrency } from "./select-currency";

export const MintSingleModeForm = () => {
  const chainId = useChainId();
  const bento = bentoUSDConfig[chainId];
  const options = useCurrenciesOptions();

  const form = useForm<SingleModeFormType>({
    values: {
      currency: options[0],
      payValue: "",
      receiveValue: "",
    },
    mode: "onChange",
  });

  const { handleSubmit, control, setValue } = form;

  const { isValid } = useFormState({ control });

  const currency = useWatch({ control, name: "currency" });
  const payValue = useWatch({ control, name: "payValue" });

  const balanceQuery = useBalanceQuery(currency.address, {
    select: (data) => {
      return {
        balance: data,
        formattedBalance: formatUnits(data, currency.decimals),
      };
    },
  });

  const latestPricesQuery = useLatestPricesQuery();
  const latestPrice = latestPricesQuery.data?.[currency.symbol];

  const handleSuccess: SubmitHandler<SingleModeFormType> = () => {
    //
  };

  const handleError: SubmitErrorHandler<SingleModeFormType> = () => {};

  const usdValue = mul(latestPrice?.formatted, payValue)?.toString() ?? "0";

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(handleSuccess, handleError)}>
        <Input
          rules={{
            validate: (data) => {
              const balanceMsg = checkBalance(
                data,
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
          control={control}
          name="payValue"
          label="You Give"
          className="mt-2"
          slot={<SelectCurrency control={control} />}
          usdValue={usdValue}
          bottomValue={balanceQuery.data?.formattedBalance}
          decimals={currency.decimals}
          onMaxClick={() => {
            setValue("payValue", balanceQuery.data?.formattedBalance || "");
          }}
        />
        <Input
          control={control}
          name="receiveValue"
          label="You Receive"
          className="mt-3"
          slot={<CurrencyLabel symbol={bento.symbol} icon={bento.logoURI} />}
          usdValue="0"
          decimals={bento.decimals}
        />

        {/* <SelectNetwork className="mt-5" />

      <BentoPlusToggle className="mt-4" checked={false} onChange={() => {}} /> */}

        <SubmitButton
          disabled={!payValue || !isValid}
          className="mt-6 w-full rounded-xl py-4 text-lg"
        />
      </form>
    </FormProvider>
  );
};
