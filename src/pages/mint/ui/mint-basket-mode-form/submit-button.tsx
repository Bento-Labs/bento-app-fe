import { ComponentProps, PropsWithChildren } from "react";
import { Control, useFormContext, useWatch } from "react-hook-form";

import { parseUnits } from "viem";
import { useAccount, useChainId } from "wagmi";

import {
  useAllowancesQueries,
  useERC20ApproveMutation,
} from "entities/currency";
import { AppKitConnectWalletButton } from "features/connect-wallet";
import { BasketModeFormType } from "pages/mint/types";
import { bentoVaultCoreConfig } from "shared/config";
import { Button } from "shared/ui/button";

type Props = ComponentProps<typeof Button> & {
  control: Control<BasketModeFormType>;
};

export const SubmitButton = (props: PropsWithChildren<Props>) => {
  const { children, className, currencies, control, ...rest } = props;
  const { isConnected, chain } = useAccount();
  const chainId = useChainId();
  const { trigger } = useFormContext<BasketModeFormType>();
  // const { formState } = useFormContext<BasketModeFormType>();

  const collaterals = useWatch<BasketModeFormType, "collaterals">({
    name: "collaterals",
    control,
  });

  const allowancesQuery = useAllowancesQueries({
    currencyAddresses: collaterals.map((c) => c.currency.address),
    contractAddress: bentoVaultCoreConfig[chainId],
  });

  const approveMutation = useERC20ApproveMutation();

  const needApproves = collaterals
    .map((collateral, index) => {
      const value = parseUnits(collateral.value, collateral.currency.decimals);
      const allowance = allowancesQuery.data?.[index];
      const result = allowance?.result;

      if (typeof result === "undefined") return;
      if (value > BigInt(result)) {
        return collateral;
      }
    })
    .filter(
      (collateral): collateral is BasketModeFormType["collaterals"][number] =>
        Boolean(collateral)
    );

  const handleApprove = () => {
    const { currency, value } = needApproves[0];

    const amount = parseUnits(value, currency.decimals);

    approveMutation.mutate(
      {
        amount,
        contractAddress: bentoVaultCoreConfig[chainId],
        currencyAddress: currency.address,
      },
      {
        onSuccess: async () => {
          await allowancesQuery.refetch();
          trigger("collaterals");
        },
      }
    );
  };

  const isLoading = approveMutation.isPending;

  if (needApproves.length > 0) {
    return (
      <Button
        {...rest}
        isLoading={isLoading}
        className={className}
        onClick={handleApprove}
      >
        Approve spending {needApproves[0].currency.symbol}
      </Button>
    );
  }

  if (!isConnected || !chain) {
    return (
      <AppKitConnectWalletButton isLoading={isLoading} className={className} />
    );
  }

  return (
    <Button {...rest} type="submit" isLoading={isLoading} className={className}>
      {children ?? "Mint BentoUSD"}
    </Button>
  );
};
