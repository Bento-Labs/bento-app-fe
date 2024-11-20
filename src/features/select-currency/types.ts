import { Address } from "viem";

export type Option = {
  symbol: string;
  icon: string;
  address: Address;
  chainId: number | string;
  // value: string;
  // usdValue: string;
};
