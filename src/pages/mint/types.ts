import { Currency } from "shared/config";

export type TabType = "mint" | "redeem";

export type Mode = "basket" | "single";

export type MintSingleModeFormType = {
  currency: Currency;
  payValue: string | undefined;
  receiveValue: string | undefined;
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
  payValue: string | undefined;
  receiveValue: string | undefined;
};

export type RedeemBasketModeFormType = {
  receiveValue: string;
  collaterals: {
    currency: Currency;
    value: string;
  }[];
};
