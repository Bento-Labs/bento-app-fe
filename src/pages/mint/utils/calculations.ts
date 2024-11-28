import Decimal from "decimal.js";

import { UseLatestPricesQueryResult } from "entities/currency";
import { Currency } from "shared/config";
import { div, mul, pow } from "shared/utils";

import { Weights } from "../hooks/use-weights-query";

type CalcCollateralsValuesParams = {
  collaterals: Currency[];
  receiveValue: string;
  weights: Weights;
  prices: UseLatestPricesQueryResult;
};
export const calcCollateralsValues = (params: CalcCollateralsValuesParams) => {
  const { receiveValue, weights, prices, collaterals } = params;
  const currentWeight = weights[0];

  const denominator = weights.reduce((acc, weight, index) => {
    const collateral = collaterals[index];
    const price = prices[collateral.symbol];
    const normalizedWeight = div(currentWeight, weight);
    const usdPrice = div(price.price.toString(), pow(10, price.decimals));

    const value = mul(normalizedWeight, usdPrice);

    return acc.plus(value);
  }, new Decimal(0));

  const value = div(receiveValue, denominator);

  const collateralsValue = collaterals.map((_collateral, index) => {
    const weight = weights[index];
    const normalizedWeight = div(currentWeight, weight);
    return mul(value, normalizedWeight).toDecimalPlaces();
  });

  return collateralsValue;
};

type CalcBentoValueParams = {
  currentValue: string;
  inputCurrency: Currency;
  collaterals: Currency[];
  weights: Weights;
  prices: UseLatestPricesQueryResult;
};
export const calcReceiveValue = (params: CalcBentoValueParams) => {
  const { inputCurrency, currentValue, collaterals, weights, prices } = params;

  const currentIndex = collaterals.findIndex((c) => {
    return c.symbol === inputCurrency.symbol;
  });
  const currentWeight = weights[currentIndex];

  const values = weights.map((w, index) => {
    const collateral = collaterals[index];
    const price = prices[collateral.symbol];
    const usdPrice = div(price.price.toString(), pow(10, price.decimals));
    const normalizedWeight = div(w, currentWeight);
    const collateralValue = div(currentValue, normalizedWeight);
    const usdValue = mul(collateralValue, usdPrice);

    return { usdValue, collateralValue };
  });

  const receiveValue = values.reduce((acc, item) => {
    acc = acc.plus(item.usdValue);
    return acc;
  }, new Decimal(0));

  return { collateralsValues: values, receiveValue };
};
