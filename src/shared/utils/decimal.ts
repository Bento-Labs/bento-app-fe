import { Decimal } from "decimal.js";
export const mul = <
  T extends Decimal.Value | undefined,
  U extends Decimal.Value | undefined,
>(
  a: T,
  b: U
): T extends undefined
  ? undefined
  : U extends undefined
    ? undefined
    : U extends undefined
      ? undefined
      : Decimal => {
  if (!a || !b)
    return undefined as T extends undefined
      ? undefined
      : U extends undefined
        ? undefined
        : U extends undefined
          ? undefined
          : Decimal;

  return new Decimal(a).mul(b) as T extends undefined
    ? undefined
    : U extends undefined
      ? undefined
      : U extends undefined
        ? undefined
        : Decimal;
};
