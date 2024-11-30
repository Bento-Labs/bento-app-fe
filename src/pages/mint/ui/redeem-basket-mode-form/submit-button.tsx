import { ComponentProps, PropsWithChildren } from "react";
import { Control, useFormContext, useWatch } from "react-hook-form";

import { parseUnits } from "viem";
import { useAccount, useChainId } from "wagmi";

import { useAllowanceQuery, useERC20ApproveMutation } from "entities/currency";
import { AppKitConnectWalletButton } from "features/connect-wallet";
import { RedeemBasketModeFormType } from "pages/mint/types";
import { bentoUSDConfig, bentoVaultCoreConfig } from "shared/config";
import { Button } from "shared/ui/button";

type Props = ComponentProps<typeof Button> & {
  control: Control<RedeemBasketModeFormType>;
};

export const SubmitButton = (props: PropsWithChildren<Props>) => {
  const { children, className, currencies, control, ...rest } = props;
  const { isConnected, chain } = useAccount();
  const chainId = useChainId();
  const { trigger } = useFormContext<RedeemBasketModeFormType>();

  const bento = bentoUSDConfig[chainId];
  const bentoVaultCoreAddress = bentoVaultCoreConfig[chainId];

  const payValue = useWatch({ control, name: "payValue" });
  const allowanceQuery = useAllowanceQuery({
    contractAddress: bentoVaultCoreAddress,
    currencyAddress: bento.address,
  });

  const isApprovalNeeded = Boolean(
    payValue &&
      allowanceQuery.isSuccess &&
      parseUnits(payValue, bento.decimals) > allowanceQuery.data
  );

  const approveMutation = useERC20ApproveMutation();

  const handleApprove = () => {
    approveMutation.mutate(
      {
        contractAddress: bentoVaultCoreConfig[chainId],
        currency: bento,
      },
      {
        onSuccess: async () => {
          trigger("collaterals");
        },
      }
    );
  };

  const isLoading = approveMutation.isPending;

  if (isApprovalNeeded) {
    return (
      <Button
        {...rest}
        isLoading={isLoading}
        className={className}
        onClick={handleApprove}
      >
        Approve spending {bento.symbol}
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
      {children ?? "Redeem LTs"}
    </Button>
  );
};
