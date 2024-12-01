import { ComponentProps, PropsWithChildren } from "react";

import { parseUnits } from "viem";
import { useAccount, useChainId } from "wagmi";

import {
  useAllowancesQueries,
  useERC20ApproveMutation,
} from "entities/currency";
import { AppKitConnectWalletButton } from "features/connect-wallet";
import { bentoVaultCoreConfig, Currency } from "shared/config";
import { Button } from "shared/ui/button";

type Props = ComponentProps<typeof Button> & {
  approvalCurrencies: { currency: Currency; value: string }[];
  onApproveSuccess: (params: { currency: Currency }) => void;
};

export const SubmitButton = (props: PropsWithChildren<Props>) => {
  const { children, className, approvalCurrencies, onApproveSuccess, ...rest } =
    props;

  const { isConnected, chain } = useAccount();
  const chainId = useChainId();

  const approveMutation = useERC20ApproveMutation();

  const allowancesQueries = useAllowancesQueries({
    currencyAddresses: approvalCurrencies.map(({ currency }) => {
      return currency.address;
    }),
    contractAddress: bentoVaultCoreConfig[chainId],
  });

  const index = approvalCurrencies.findIndex(({ currency, value }, index) => {
    const allowanceQuery = allowancesQueries[index];
    if (!allowanceQuery.isSuccess) return false;

    const amount = parseUnits(value, currency.decimals);

    return allowanceQuery.data < amount;
  });

  const approvalCurrency = index >= 0 ? approvalCurrencies[index] : undefined;

  const handleApproveClick = (currency: Currency) => {
    approveMutation.mutate(
      {
        contractAddress: bentoVaultCoreConfig[chainId],
        currency,
      },
      {
        onSuccess: (_, variables) => {
          onApproveSuccess(variables);
        },
      }
    );
  };

  if (approvalCurrency) {
    return (
      <Button
        className={className}
        isLoading={approveMutation.isPending}
        onClick={() => handleApproveClick(approvalCurrency.currency)}
      >
        Approve spending {approvalCurrency.currency.symbol}
      </Button>
    );
  }

  if (!isConnected || !chain) {
    return <AppKitConnectWalletButton className={className} />;
  }

  return (
    <Button {...rest} type="submit" className={className}>
      {children ?? "Mint bentoUSD"}
    </Button>
  );
};
