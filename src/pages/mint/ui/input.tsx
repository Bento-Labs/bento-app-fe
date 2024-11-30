import { ReactNode } from "react";
import {
  Control,
  FieldValues,
  Path,
  useController,
  UseControllerProps,
} from "react-hook-form";

import { twJoin, twMerge } from "tailwind-merge";

import { Button } from "shared/ui/button";
import { CurrencyInput } from "shared/ui/currency-input";
import { formatCurrency } from "shared/web3/utils";

type Props<T extends FieldValues, N extends Path<T>> = {
  disabled?: boolean;
  control: Control<T>;
  name: N;
  label: ReactNode;
  className?: string;
  decimals: number;
  slot?: ReactNode;
  usdValue?: string;
  bottomValue?: string;
  bottomLabel?: string;
  rules?: UseControllerProps<T, N>["rules"];
  errorMessage?: string;
  onMaxClick?: () => void;
  onChange?: (value: string) => void;
};

export const Input = <T extends FieldValues, N extends Path<T>>(
  props: Props<T, N>
) => {
  const {
    disabled,
    control,
    name,
    className,
    label,
    decimals,
    slot,
    usdValue,
    bottomLabel = "Balance",
    bottomValue,
    rules,
    errorMessage,
    onChange,
    onMaxClick,
  } = props;

  const { field, fieldState } = useController({
    disabled,
    control,
    name,
    rules,
  });

  const error = errorMessage ?? fieldState.error?.message;

  return (
    <>
      <div
        className={twMerge(
          "relative flex flex-col rounded-lg bg-mirage px-7 py-2",
          error && "inner-border inner-border-darkCoral",
          className
        )}
      >
        {label && <div className="mb-1 text-sm text-bluishGrey">{label}</div>}

        <div className="flex items-center justify-between gap-x-1.5">
          <CurrencyInput
            autoComplete="inputCurrency"
            disabled={field.disabled}
            onBlur={field.onBlur}
            name={field.name}
            value={field.value}
            ref={field.ref}
            onChange={(value) => {
              field.onChange(value);
              onChange?.(value);
            }}
            className={twJoin(error && "text-darkCoral")}
            decimals={decimals}
            placeholder="0"
          />
          {slot}
        </div>
        <div className="mt-2 flex items-center">
          <span className="mr-auto inline-flex text-sm text-bluishGrey">
            {usdValue
              ? formatCurrency(usdValue, { prefix: "$", decimalScale: 2 })
              : " "}
          </span>

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
      {error && <span className="mt-1 text-xs text-darkCoral">{error}</span>}
    </>
  );
};
