import { Decimal } from "decimal.js";

type Result<
  T extends Decimal.Value | undefined,
  U extends Decimal.Value | undefined,
> = T extends undefined
  ? undefined
  : U extends undefined
    ? undefined
    : U extends undefined
      ? undefined
      : Decimal;

export const mul = <
  T extends Decimal.Value | undefined,
  U extends Decimal.Value | undefined,
>(
  a: T,
  b: U
): Result<T, U> => {
  if (!a || !b) return undefined as Result<T, U>;

  return new Decimal(a).mul(b) as Result<T, U>;
};

export const div = <
  T extends Decimal.Value | undefined,
  U extends Decimal.Value | undefined,
>(
  numenator: T,
  denumenator: U
) => {
  if (!numenator || !denumenator) return undefined as Result<T, U>;
  return new Decimal(numenator).div(denumenator) as Result<T, U>;
};
