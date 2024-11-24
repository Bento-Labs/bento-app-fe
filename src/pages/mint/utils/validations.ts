import { parseUnits } from "viem";

export const checkBalance = (
  amount: string | undefined,
  balance: bigint | undefined,
  decimals: number,
  symbol: string
) => {
  if (!balance) return "Unknown balance" as const;
  if (!amount) return "Value is empty" as const;

  if (balance < parseUnits(amount, decimals))
    return `You don't have enough ${symbol}` as const;

  return true;
};
