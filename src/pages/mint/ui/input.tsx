import { ReactNode } from "react";
import { Control, FieldValues, Path } from "react-hook-form";

import { twMerge } from "tailwind-merge";

import { RHFCurrencyInput } from "shared/rhf/currency-input";
import { Button } from "shared/ui/button";
import { formatCurrency } from "shared/web3/utils";

type Props<T extends FieldValues, N extends Path<T>> = {
  control: Control<T>;
  name: N;
  label: ReactNode;
  className?: string;
  decimals: number;
  onMaxClick?: () => void;
  slot?: ReactNode;
  usdValue?: string;
  bottomValue?: string;
  bottomLabel?: string;
};

export const Input = <T extends FieldValues, N extends Path<T>>(
  props: Props<T, N>
) => {
  const {
    control,
    name,
    className,
    label,
    decimals,
    onMaxClick,
    slot,
    usdValue,
    bottomLabel = "Balance",
    bottomValue,
  } = props;

  return (
    <div
      className={twMerge(
        "flex flex-col rounded-lg bg-mirage px-7 py-2",
        className
      )}
    >
      {label && <div className="mb-1 text-sm text-bluishGrey">{label}</div>}

      <div className="flex items-center justify-between gap-x-1.5">
        <RHFCurrencyInput
          control={control}
          name={name}
          decimals={decimals}
          placeholder="0"
        />
        {slot}
      </div>
      <div className="mt-2 flex items-center">
        {usdValue && (
          <span className="mr-auto inline-flex text-sm text-bluishGrey">
            {formatCurrency(usdValue, { prefix: "$", decimalScale: 2 })}
          </span>
        )}

        {bottomValue && (
          <span className="mr-2 inline-flex text-sm text-bluishGrey">
            {bottomLabel}: {formatCurrency(bottomValue, { decimalScale: 2 })}
          </span>
        )}
        {onMaxClick && (
          <Button
            theme="mirage"
            className="bg-balticSea px-4 py-1 text-sm text-aquaHaze"
            onClick={onMaxClick}
          >
            Max
          </Button>
        )}
      </div>
    </div>
  );
};
