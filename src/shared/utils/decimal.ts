import { Decimal } from "decimal.js";

export const setupDecimal = () => {
  Decimal.set({ precision: 19, rounding: Decimal.ROUND_HALF_UP });
};

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

export const pow = (a: Decimal.Value, b: Decimal.Value) => {
  return new Decimal(a).pow(b);
};
