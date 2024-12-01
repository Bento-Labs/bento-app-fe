import { ComponentProps, PropsWithChildren } from "react";
import { Control, useFormContext, useWatch } from "react-hook-form";

import { parseUnits } from "viem";
import { useAccount, useChainId } from "wagmi";

import {
  useAllowancesQueries,
  useERC20ApproveMutation,
} from "entities/currency";
import { AppKitConnectWalletButton } from "features/connect-wallet";
import { MintBasketModeFormType } from "pages/mint/types";
import { bentoVaultCoreConfig } from "shared/config";
import { Button } from "shared/ui/button";

type Props = ComponentProps<typeof Button> & {
  control: Control<MintBasketModeFormType>;
};

export const SubmitButton = (props: PropsWithChildren<Props>) => {
  const { children, className, currencies, control, ...rest } = props;
  const { isConnected, chain } = useAccount();
  const chainId = useChainId();
  const { trigger } = useFormContext<MintBasketModeFormType>();

  const collaterals = useWatch<MintBasketModeFormType, "collaterals">({
    name: "collaterals",
    control,
  });

  const allowancesQueries = useAllowancesQueries({
    currencyAddresses: collaterals.map((c) => c.currency.address),
    contractAddress: bentoVaultCoreConfig[chainId],
  });

  const approveMutation = useERC20ApproveMutation();

  const needApproves = collaterals
    .map((collateral, index) => {
      const allowanceQuery = allowancesQueries[index];
      const value = parseUnits(collateral.value, collateral.currency.decimals);

      if (!allowanceQuery.isSuccess) return;
      if (value > allowanceQuery.data) {
        return collateral;
      }
    })
    .filter(
      (
        collateral
      ): collateral is MintBasketModeFormType["collaterals"][number] =>
        Boolean(collateral)
    );

  const handleApprove = () => {
    const { currency } = needApproves[0];

    approveMutation.mutate(
      {
        contractAddress: bentoVaultCoreConfig[chainId],
        currency,
      },
      {
        onSuccess: async () => {
          trigger();
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
      {children ?? "Mint bentoUSD"}
    </Button>
  );
};
