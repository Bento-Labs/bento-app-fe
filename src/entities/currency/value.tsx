import { formatCurrency } from "shared/web3/utils";

import { Label } from "./label";

type Props = {
  value: string | number;
  symbol: string;
  icon?: string;
};

export const Value = ({ value, symbol, icon }: Props) => {
  const formattedValue = formatCurrency(value.toString(), {
    decimalSeparator: ".",
    groupSeparator: "",
  });

  return (
    <div className="flex gap-x-9">
      <span className="text-[42px] font-semibold text-white">
        {formattedValue}
      </span>
      <Label symbol={symbol} icon={icon} />
    </div>
  );
};
