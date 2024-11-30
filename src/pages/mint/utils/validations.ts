import { parseUnits } from "viem";

import { Currency } from "shared/config";

type CheckBalanceValidatorParams = {
  amount: string | undefined;
  balance: bigint | undefined;
  decimals: number;
  symbol: string;
};

export const checkBalance = (params: CheckBalanceValidatorParams) => {
  const { balance, amount, symbol, decimals } = params;
  if (!balance || !amount) return true;

  if (balance < parseUnits(amount, decimals))
    throw new Error(`You don't have enough ${symbol}`);

  return true;
};

type CheckAllowanceValidatorParams = {
  amount: string | undefined;
  allowance: bigint | undefined;
  decimals: number;
  symbol: string;
};
export const checkAllowance = (params: CheckAllowanceValidatorParams) => {
  const { amount, allowance, symbol, decimals } = params;

  if (!amount || typeof allowance === "undefined") return true;

  if (parseUnits(amount, decimals) > allowance)
    throw new Error(`Approve ${symbol} spending`);

  return true;
};

type ValidateParams = {
  allowance: bigint | undefined;
  balance: bigint | undefined;
  currency: Pick<Currency, "decimals" | "symbol">;
};
export const validateCurrency = (params: ValidateParams) => (value: string) => {
  const { allowance, balance, currency } = params;
  try {
    checkAllowance({
      allowance,
      amount: value,
      ...currency,
    });
    checkBalance({
      amount: value,
      balance,
      ...currency,
    });
  } catch (error) {
    const err = error as Error;
    return err.message;
  }
};
