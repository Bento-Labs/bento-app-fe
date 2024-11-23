import { Decimal } from "decimal.js";
export const mul = (
  a: Decimal.Value | undefined,
  b: Decimal.Value | undefined
) => {
  if (!a || !b) return undefined;

  return new Decimal(a).mul(b);
};
