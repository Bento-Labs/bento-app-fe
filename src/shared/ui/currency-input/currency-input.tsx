import type { CurrencyInputProps } from "react-currency-input-field";

import type { FocusEventHandler } from "react";
import CurrencyInput from "react-currency-input-field";

import { twMerge } from "tailwind-merge";

interface Props {
  className?: string;
  disabled?: boolean;
  placeholder?: string;
  id?: string;
  name?: string;
  value: string | undefined;
  decimals: number;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onChange: CurrencyInputProps["onValueChange"];
}

export function Component(props: Props) {
  const {
    className,
    disabled = false,
    placeholder = "0.0",
    id,
    name,
    value,
    decimals,
    onBlur,
    onChange,
  } = props;

  return (
    <CurrencyInput
      id={id}
      disabled={disabled}
      name={name}
      value={value}
      onBlur={onBlur}
      allowNegativeValue={false}
      autoComplete="currency"
      className={twMerge(
        "flex w-full shrink border-none bg-transparent text-[42px] leading-[110%] text-white outline-none",
        className
      )}
      decimalSeparator="."
      decimalsLimit={decimals}
      disableAbbreviations
      disableGroupSeparators
      onValueChange={onChange}
      pattern="\d*"
      placeholder={placeholder}
      transformRawValue={(str) => (str === "-" ? "" : str)}
    />
  );
}