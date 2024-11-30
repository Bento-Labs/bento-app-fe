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
  useAllowanceQuery,
  useBalanceQuery,
  useLatestPricesQuery,
} from "entities/currency";
import { bentoUSDConfig, bentoVaultCoreConfig } from "shared/config";
import { mul } from "shared/utils";

import { useCurrenciesOptions } from "../../hooks/use-currencies-options";
import { RedeemSingleModeFormType } from "../../types";
import { validateCurrency } from "../../utils/validations";
import { BentoPrice } from "../bento-price";
import { Input } from "../input";
import { SubmitButton } from "../submit-button";
import { SelectCurrency } from "./select-currency";

export const RedeemSingleModeForm = () => {
  const chainId = useChainId();
  const bento = bentoUSDConfig[chainId];
  const bentoVaultCoreAddress = bentoVaultCoreConfig[chainId];
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

  const allowanceQuery = useAllowanceQuery({
    contractAddress: bentoVaultCoreAddress,
    currencyAddress: bento.address,
  });

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
            validate: validateCurrency({
              allowance: allowanceQuery.data,
              balance: balanceQuery.data?.balance,
              currency: bento,
            }),
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

        <BentoPrice className="mt-8" />

        <SubmitButton
          disabled={!payValue || !isValid}
          className="mt-6 w-full rounded-xl py-4 text-lg"
        />
      </form>
    </FormProvider>
  );
};
