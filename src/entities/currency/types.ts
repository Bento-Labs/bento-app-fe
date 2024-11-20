import { Address } from "viem";

export type Currency = {
  icon: string;
  decimals: number;
  chainId: number;
  address: Address;
  symbol: string;
  name: string;
};
