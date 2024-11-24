import { ComponentProps, ReactNode } from "react";

import { useAppKit, useAppKitState, useDisconnect } from "@reown/appkit/react";
import { twMerge } from "tailwind-merge";
import { useAccount, useChainId, useSwitchChain } from "wagmi";

import { Button, ButtonProps } from "shared/ui/button";
import { catchError } from "shared/ui/toast";
import { shortAddress } from "shared/web3/utils";

type Props = {
  connectContent?: ReactNode;
  switchChainContent?: ReactNode;
  className?: string;
} & ButtonProps;

export function ConnectButton({
  className,
  connectContent = "Connect Wallet",
  switchChainContent = "Switch Chain",
  ...props
}: Props) {
  const { address, isDisconnected, chain, connector, isConnecting } =
    useAccount();
  const chainId = useChainId();
  const { switchChain, isPending: isSwitchChainPending } = useSwitchChain();
  const { open } = useAppKit();
  const { loading } = useAppKitState();

  const { disconnect } = useDisconnect();

  const handleConnect = async () => {
    open({ view: "Connect" });
  };

  const btnProps: ComponentProps<typeof Button> = {
    className: twMerge("gap-x-1.5 whitespace-nowrap", className),
    isLoading: isSwitchChainPending || loading || isConnecting,
    ...props,
  };

  if (isDisconnected || loading) {
    return (
      <Button {...btnProps} onClick={handleConnect}>
        {connectContent}
      </Button>
    );
  }

  if (!chain) {
    return (
      <Button
        {...btnProps}
        onClick={() => {
          switchChain(
            { connector: connector, chainId },
            {
              onError: (error) => {
                catchError(error);
              },
            }
          );
        }}
      >
        {switchChainContent}
      </Button>
    );
  }

  return (
    <Button {...btnProps} onClick={() => disconnect()}>
      {shortAddress(address, 4, 4)}
    </Button>
  );
}
