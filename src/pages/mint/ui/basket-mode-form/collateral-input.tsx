import { Control, Path } from "react-hook-form";

import { twMerge } from "tailwind-merge";

import { BasketModeFormType } from "pages/mint/types";
import { RHFCurrencyInput } from "shared/rhf/currency-input";
import { Img } from "shared/ui/img";

type Props = {
  control: Control<BasketModeFormType>;
  name: Path<BasketModeFormType>;
  symbol: string;
  logoURI: string;
  className?: string;
  decimals: number;
  requiredValue: string;
};

export const CollateralInput = (props: Props) => {
  const { control, name, className, symbol, logoURI, decimals, requiredValue } =
    props;

  return (
    <div className={twMerge("flex items-end", className)}>
      <div className="flex items-center gap-x-4">
        <Img className="size-[38px]" src={logoURI} alt={symbol} />
        <div className="flex flex-col">
          <span className="inline-flex text-xl text-battleshipGrey">
            {symbol}
          </span>
          <RHFCurrencyInput
            control={control}
            name={name}
            decimals={decimals}
            className="mt-2 leading-4"
          />
        </div>
      </div>

      <div className="flex gap-x-1 text-white">
        <span className="text-bluishGrey">Required:</span> {requiredValue}
      </div>
    </div>
  );
};
