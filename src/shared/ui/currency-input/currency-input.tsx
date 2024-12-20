import type {
  CurrencyInputOnChangeValues,
  CurrencyInputProps,
} from "react-currency-input-field";

import { forwardRef, type FocusEventHandler } from "react";
import CurrencyInput from "react-currency-input-field";

import { twMerge } from "tailwind-merge";

type CustomProps = {
  className?: string;
  disabled?: boolean;
  placeholder?: string;
  id?: string;
  name?: string;
  value: string;
  decimals: number;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onChange: (
    value: string,
    name?: string,
    values?: CurrencyInputOnChangeValues
  ) => void;
};

export type Props = CustomProps & Omit<CurrencyInputProps, keyof CustomProps>;

export const Component = forwardRef<HTMLInputElement, Props>((props, ref) => {
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

    ...rest
  } = props;

  return (
    <CurrencyInput
      {...rest}
      ref={ref}
      id={id}
      disabled={disabled}
      name={name}
      value={value}
      onBlur={onBlur}
      allowNegativeValue={false}
      autoComplete="currency"
      className={twMerge(
        "flex w-full shrink border-none bg-transparent text-[32px] font-bold leading-[44px] text-white outline-none",
        className
      )}
      decimalSeparator="."
      decimalsLimit={decimals}
      formatValueOnBlur={false}
      disableAbbreviations
      disableGroupSeparators
      onValueChange={(value, ...args) => {
        const val = value ?? "";
        onChange(val, ...args);
      }}
      // pattern="\d*"
      placeholder={placeholder}
      transformRawValue={(str) => (str === "-" ? "" : str)}
    />
  );
});
