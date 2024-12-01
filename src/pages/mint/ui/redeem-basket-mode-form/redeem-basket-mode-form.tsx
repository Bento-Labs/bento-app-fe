import { useMemo } from "react";
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useFieldArray,
  useForm,
  useWatch,
} from "react-hook-form";

import { useDebounceCallback } from "usehooks-ts";
import { formatUnits } from "viem";
import { useAccount, useChainId } from "wagmi";

import {
  CurrencyLabel,
  useAllowanceQuery,
  useBalanceQuery,
} from "entities/currency";
import { useCurrencies } from "pages/mint/hooks/use-currencies-options";
import { useFetchGetOutputLTAmountsQuery } from "pages/mint/hooks/use-get-output-lt-amounts-query";
import { RedeemBasketModeFormType } from "pages/mint/types";
import { bentoUSDConfig, bentoVaultCoreConfig } from "shared/config";

import { validateCurrency } from "../../utils/validations";
import { BentoPrice } from "../bento-price";
import { CollateralInput } from "../collateral-input";
import { Input } from "../input";
import { SubmitButton } from "../submit-button";

export const RedeemBasketModeForm = () => {
  const { isConnected } = useAccount();

  const chainId = useChainId();
  const currencies = useCurrencies();
  const bento = bentoUSDConfig[chainId];
  const bentoVaultCoreAddress = bentoVaultCoreConfig[chainId];

  const balanceQuery = useBalanceQuery({ currency: bento });
  const allowanceQuery = useAllowanceQuery({
    contractAddress: bentoVaultCoreAddress,
    currencyAddress: bento.address,
  });

  const values = useMemo(() => {
    return {
      payValue: "",
      collaterals: currencies.map((op) => {
        return {
          currency: op,
          value: "",
        };
      }),
    };
  }, [currencies]);

  const form = useForm<RedeemBasketModeFormType>({
    values: values,
    mode: "onChange",
  });
  const { handleSubmit, control, setValue, trigger } = form;

  const collaterals = useWatch<RedeemBasketModeFormType, "collaterals">({
    control,
    name: "collaterals",
  });

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
          label="You Send"
          onMaxClick={() => {
            if (!balanceQuery.data?.formatted) return;
            handleChangeValue(balanceQuery.data?.formatted);
          }}
          slot={<CurrencyLabel symbol={bento.symbol} icon={bento.logoURI} />}
          bottomLabel="balance"
          bottomValue={balanceQuery.data?.formatted}
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
            You Receive
          </span>
          {fieldArray.fields.map(({ currency, id }, index) => {
            return (
              <CollateralInput
                key={id}
                disabled={!isConnected}
                address={currency.address}
                control={control}
                logoURI={currency.logoURI}
                name={`collaterals.${index}.value`}
                symbol={currency.symbol}
                decimals={currency.decimals}
              />
            );
          })}
        </div>

        <BentoPrice className="mt-8" />

        <SubmitButton
          className="mt-6 w-full rounded-xl py-4 text-lg"
          approvalCurrencies={collaterals}
          onApproveSuccess={() => {
            trigger();
          }}
        />
      </form>
    </FormProvider>
  );
};
