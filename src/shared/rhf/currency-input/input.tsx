import {
  FieldValues,
  Path,
  useController,
  UseControllerProps,
} from "react-hook-form";

import { CurrencyInput, CurrencyInputProps } from "shared/ui/currency-input";

import { extractControllerProps } from "../utils";

type CustomProps = {
  onChange?: CurrencyInputProps["onChange"];
  value?: CurrencyInputProps["value"];
};

type Props<T extends FieldValues, N extends Path<T>> = Omit<
  CurrencyInputProps,
  keyof CustomProps
> &
  CustomProps &
  UseControllerProps<T, N>;

export const Input = <T extends FieldValues, N extends Path<T>>(
  props: Props<T, N>
) => {
  const { controllerProps, restProps } = extractControllerProps<
    T,
    N,
    Props<T, N>
  >(props);

  const { field } = useController(controllerProps);

  return (
    <CurrencyInput
      {...restProps}
      value={field.value}
      onBlur={field.onBlur}
      disabled={field.disabled}
      name={field.name}
      ref={field.ref}
      onChange={field.onChange}
    />
  );
};