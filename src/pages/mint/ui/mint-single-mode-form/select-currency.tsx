import { Control, useFormContext, useWatch } from "react-hook-form";

import {
  Option,
  SelectCurrency as SelectCurrencyComponent,
} from "features/select-currency";

import { useCurrenciesOptions } from "../../hooks/use-currencies-options";
import { MintSingleModeFormType } from "../../types";

type Props = {
  control: Control<MintSingleModeFormType>;
  onChange?: (option: Option) => void;
};

export const SelectCurrency = ({ control }: Props) => {
  const { reset } = useFormContext<MintSingleModeFormType>();
  const options = useCurrenciesOptions();

  const currency = useWatch({ control, name: "currency" });

  return (
    <SelectCurrencyComponent
      logoURI={currency.logoURI}
      symbol={currency.symbol}
      options={options}
      onChange={(option) => {
        reset({ currency: option, payValue: "", receiveValue: "" });
      }}
    />
  );
};