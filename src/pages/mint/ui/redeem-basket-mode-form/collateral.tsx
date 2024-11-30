import { useFormContext } from "react-hook-form";

import { twMerge } from "tailwind-merge";
import { useAccount } from "wagmi";

import { UseLatestPricesQueryResult } from "entities/currency";
import { Weights } from "pages/mint/hooks/use-weights-query";
import { Currency } from "shared/config";

import { RedeemBasketModeFormType } from "../../types";
import { CollateralInput } from "../collateral-input";

type Props = {
  currency: Currency;
  index: number;
  weights?: Weights;
  prices?: UseLatestPricesQueryResult;
};

export const Collateral = (props: Props) => {
  const { isConnected } = useAccount();
  const { control } = useFormContext<RedeemBasketModeFormType>();
  const { currency, index } = props;

  return (
    <CollateralInput
      disabled={!isConnected}
      address={currency.address}
      className={twMerge(
        "border-b border-b-charcoalGrey px-6 py-3 last:border-b-0"
      )}
      control={control}
      logoURI={currency.logoURI}
      name={`collaterals.${index}.value`}
      symbol={currency.symbol}
      decimals={currency.decimals}
      onChange={() => {
        //
      }}
    />
  );
};
