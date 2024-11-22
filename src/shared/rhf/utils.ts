import { FieldValues, Path, UseControllerProps } from "react-hook-form";

export const extractControllerProps = <
  T extends FieldValues,
  N extends Path<T>,
  Obj extends UseControllerProps<T, N>,
>(
  object: Obj
) => {
  const {
    name,
    control,
    defaultValue,
    disabled,
    rules,
    shouldUnregister,
    ...rest
  } = object;

  return {
    controllerProps: {
      name,
      control,
      defaultValue,
      disabled,
      rules,
      shouldUnregister,
    },
    restProps: rest,
  };
};
