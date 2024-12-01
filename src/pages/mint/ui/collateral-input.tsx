import {
  Control,
  FieldValues,
  Path,
  useController,
  UseControllerProps,
} from "react-hook-form";

import { twMerge } from "tailwind-merge";
import { Address } from "viem";

import { useBalanceQuery } from "entities/currency";
import { CurrencyInput } from "shared/ui/currency-input";
import { Img } from "shared/ui/img";
import { formatCurrency } from "shared/web3/utils";

type Props<T extends FieldValues, Name extends Path<T>> = {
  disabled?: boolean;
  control: Control<T>;
  name: Name;
  symbol: string;
  address: Address;
  logoURI: string;
  className?: string;
  decimals: number;
  onChange?: (value: string) => void;
  rules?: UseControllerProps<T, Name>["rules"];
};

export const CollateralInput = <T extends FieldValues, Name extends Path<T>>(
  props: Props<T, Name>
) => {
  const {
    disabled,
    control,
    address,
    name,
    className,
    symbol,
    logoURI,
    decimals,
    rules,
    onChange,
  } = props;

  const balanceQuery = useBalanceQuery({ currency: { address, decimals } });

  const { field, fieldState } = useController({ control, name, rules });

  const errorMsg = fieldState.error?.message;

  return (
    <div
      className={twMerge(
        "flex items-end border-b border-b-charcoalGrey px-6 py-3 last:border-b-0",
        className
      )}
    >
      <div className="flex items-center gap-x-4">
        <Img className="size-[38px]" src={logoURI} alt={symbol} />
        <div className="flex flex-col">
          <span className="inline-flex text-xl text-battleshipGrey">
            {symbol}
          </span>
          <CurrencyInput
            disabled={disabled}
            value={field.value}
            className={twMerge("mt-2 leading-4", errorMsg && "text-darkCoral")}
            decimals={decimals}
            onChange={(value) => {
              onChange?.(value);
              field.onChange(value);
            }}
          />
        </div>
      </div>

      <div className="ml-1 flex flex-col gap-x-1 text-white">
        <div className="flex">
          <span className="mr-1 text-bluishGrey">Balance:</span>{" "}
          {balanceQuery.data
            ? formatCurrency(balanceQuery.data?.formatted, { decimalScale: 2 })
            : "0"}
        </div>
      </div>
    </div>
  );
};
