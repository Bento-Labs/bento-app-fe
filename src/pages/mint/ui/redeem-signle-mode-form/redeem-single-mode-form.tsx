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
import { bentoUSDConfig } from "shared/config";
import { mul } from "shared/utils";

import { useCurrenciesOptions } from "../../hooks/use-currencies-options";
import { RedeemSingleModeFormType } from "../../types";
import { checkBalance } from "../../utils/validations";
import { Input } from "../input";
import { SubmitButton } from "../submit-button";
import { SelectCurrency } from "./select-currency";

export const RedeemSingleModeForm = () => {
  const chainId = useChainId();
  const bento = bentoUSDConfig[chainId];
  const options = useCurrenciesOptions();

  const form = useForm<RedeemSingleModeFormType>({
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

  const handleSuccess: SubmitHandler<RedeemSingleModeFormType> = () => {
    //
  };

  const handleError: SubmitErrorHandler<RedeemSingleModeFormType> = () => {};

  const usdValue = mul(latestPrice?.formatted, payValue)?.toString() ?? "0";

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(handleSuccess, handleError)}>
        <Input
          control={control}
          name="receiveValue"
          label="You Give"
          className="mt-2"
          slot={<CurrencyLabel symbol={bento.symbol} icon={bento.logoURI} />}
          usdValue="0"
          decimals={bento.decimals}
        />
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
          label="You Receive"
          className="mt-3"
          slot={<SelectCurrency control={control} />}
          usdValue={usdValue}
          bottomValue={balanceQuery.data?.formattedBalance}
          decimals={currency.decimals}
          onMaxClick={() => {
            setValue("payValue", balanceQuery.data?.formattedBalance || "");
          }}
        />

        <SubmitButton
          disabled={!payValue || !isValid}
          className="mt-6 w-full rounded-xl py-4 text-lg"
        />
      </form>
    </FormProvider>
  );
};
