import { Address } from "viem";

import { Currency } from "entities/currency";

export type Option = {
  symbol: string;
  icon: string;
  address: Address;
  chainId: number | string;
} & Currency;
