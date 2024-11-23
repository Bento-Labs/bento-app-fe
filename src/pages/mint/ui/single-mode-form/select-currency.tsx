import { Control, useController } from "react-hook-form";

import { SelectCurrency as SelectCurrencyComponent } from "features/select-currency";

import { useCurrenciesOptions } from "../../hooks/use-currencies-options";
import { SingleModeFormType } from "../../types";

type Props = {
  control: Control<SingleModeFormType>;
};

export const SelectCurrency = ({ control }: Props) => {
  const options = useCurrenciesOptions();
  const currencyController = useController<SingleModeFormType, "currency">({
    name: "currency",
    control: control,
    defaultValue: options[0],
  });

  return (
    <SelectCurrencyComponent
      logoURI={currencyController.field.value.logoURI}
      symbol={currencyController.field.value.symbol}
      options={options}
      onChange={currencyController.field.onChange}
    />
  );
};
