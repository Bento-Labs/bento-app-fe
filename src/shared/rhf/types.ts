import { FieldValues, Path, UseControllerProps } from "react-hook-form";

export type RHFProps<
  T extends FieldValues,
  Name extends Path<T>,
> = UseControllerProps<T, Name>;
