import { formatValue } from "react-currency-input-field";

type Options = Parameters<typeof formatValue>[0];

export const formatCurrency = (
  value: string | undefined,
  options?: Partial<Options>
) => {
  return formatValue({
    value,
    decimalSeparator: ".",
    ...options,
  });
};
