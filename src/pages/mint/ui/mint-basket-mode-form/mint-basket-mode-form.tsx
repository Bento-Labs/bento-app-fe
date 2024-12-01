import { useMemo } from "react";
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useFieldArray,
  useForm,
  useWatch,
} from "react-hook-form";

import { useAccount, useChainId } from "wagmi";

import {
  CurrencyLabel,
  useAllowancesQueries,
  useBalancesQueries,
  useLatestPricesQuery,
} from "entities/currency";
import { useCurrencies } from "pages/mint/hooks/use-currencies-options";
import { useMintBasketMutation } from "pages/mint/hooks/use-mint-basket-mutation";
import { MintBasketModeFormType } from "pages/mint/types";
import { validateCurrency } from "pages/mint/utils/validations";
import { bentoUSDConfig, bentoVaultCoreConfig } from "shared/config";

import { useWeightsQuery } from "../../hooks/use-weights-query";
import {
  calcCollateralsValues,
  calcReceiveValue,
} from "../../utils/calculations";
import { BentoPrice } from "../bento-price";
import { CollateralInput } from "../collateral-input";
import { Input } from "../input";
import { SubmitButton } from "../submit-button";

export const MintBasketModeForm = () => {
  const { isConnected } = useAccount();
  const chainId = useChainId();
  const currencies = useCurrencies();
  const bento = bentoUSDConfig[chainId];

  const values = useMemo(() => {
    return {
      receiveValue: "",
      collaterals: currencies.map((op) => {
        return {
          currency: op,
          value: "",
        };
      }),
    } as MintBasketModeFormType;
  }, [currencies]);
  const form = useForm<MintBasketModeFormType>({
    values: values,
    mode: "onChange",
  });

  const { handleSubmit, control, getValues, setValue, trigger } = form;

  const collaterals = useWatch<MintBasketModeFormType, "collaterals">({
    control,
    name: "collaterals",
  });

  const latestPricesQuery = useLatestPricesQuery();
  const allowancesQueries = useAllowancesQueries({
    currencyAddresses: collaterals.map(({ currency: { address } }) => address),
    contractAddress: bentoVaultCoreConfig[chainId],
  });
  const balancesQueries = useBalancesQueries({ currencies });
  const weightsQuery = useWeightsQuery();

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
      // const collateral = collaterals[index];
      setValue(
        `collaterals.${index}.value`,
        value
          .toDecimalPlaces(2)
          // .toDecimalPlaces(collateral.currency.decimals + 1)
          .toSignificantDigits()
          .toString(),
        {
          shouldDirty: true,
          shouldTouch: true,
          shouldValidate: true,
        }
      );
    });
  };

  const handleChangeCollateralValue = (value: string, index: number) => {
    const weights = weightsQuery.data;
    const prices = latestPricesQuery.data;
    if (!weights || !prices) return;
    const { collaterals } = getValues();

    if (!value) {
      setValue("receiveValue", "");
      collaterals.forEach((_, idx) => {
        setValue(`collaterals.${idx}.value`, "");
      });
      return;
    }

    const { collateralsValues, receiveValue } = calcReceiveValue({
      collaterals: collaterals.map((c) => c.currency),
      currentValue: value,
      inputCurrency: collaterals[index].currency,
      prices,
      weights,
    });

    setValue(
      "receiveValue",
      receiveValue
        .toDecimalPlaces(bento.decimals + 1)
        .toSignificantDigits(bento.decimals)
        .toString()
    );

    collateralsValues.forEach(({ collateralValue }, index) => {
      const { currency } = collaterals[index];

      setValue(
        `collaterals.${index}.value`,
        collateralValue
          .toDecimalPlaces(currency.decimals)
          .toSignificantDigits()
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
            You Deposit
          </span>
          {fieldArray.fields.map(({ currency, id }, index) => {
            const allowanceQuery = allowancesQueries[index];
            const balanceQuery = balancesQueries[index];
            return (
              <CollateralInput
                key={id}
                disabled={!isConnected}
                rules={{
                  validate: validateCurrency({
                    allowance: allowanceQuery.data,
                    balance: balanceQuery.data?.balance,
                    currency,
                  }),
                }}
                address={currency.address}
                control={control}
                logoURI={currency.logoURI}
                name={`collaterals.${index}.value`}
                symbol={currency.symbol}
                decimals={currency.decimals}
                onChange={(value) => handleChangeCollateralValue(value, index)}
              />
            );
          })}
        </div>

        {/* <SelectNetwork className="mt-5" /> */}
        {/* <BentoPlusToggle className="mt-4" checked={false} onChange={() => {}} /> */}

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
