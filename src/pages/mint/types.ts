import { Currency } from "shared/config";

export type TabType = "mint" | "redeem";

export type Mode = "basket" | "single";

export type MintSingleModeFormType = {
  currency: Currency;
  payValue: string;
  receiveValue: string;
};

export type MintBasketModeFormType = {
  receiveValue: string;
  collaterals: {
    currency: Currency;
    value: string;
  }[];
};

export type RedeemSingleModeFormType = {
  currency: Currency;
  payValue: string;
  receiveValue: string;
};

export type RedeemBasketModeFormType = {
  payValue: string;
  collaterals: {
    currency: Currency;
    value: string;
  }[];
};
