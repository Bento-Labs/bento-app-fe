import { Currency } from "entities/currency";

export type TabType = "mint" | "redeem";

export type Mode = "basket" | "single";

export type SingleModeFormType = {
  currency: Currency;
  payValue: string | undefined;
  receiveValue: string | undefined;
};

export type BasketModeFormType = {
  receiveValue: string | undefined;
  collaterals: {
    currency: Currency;
    value: string | undefined;
  }[];
};
