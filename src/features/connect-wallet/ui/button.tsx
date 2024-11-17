import { ComponentProps, ReactNode } from "react";

import { twMerge } from "tailwind-merge";
import {
  ConnectorAlreadyConnectedError,
  useAccount,
  useChainId,
  useConnect,
  useDisconnect,
  useSwitchChain,
} from "wagmi";

import { Button, ButtonProps } from "shared/ui/button";
import { catchError } from "shared/ui/toast";
import { shortAddress } from "shared/web3/utils";

type Props = {
  connectContent?: ReactNode;
  installMetamaskContent?: ReactNode;
  switchChainContent?: ReactNode;
  className?: string;
} & ButtonProps;

export function ConnectButton({
  className,
  installMetamaskContent = "Install MetaMask",
  connectContent = "Connect Wallet",
  switchChainContent = "Switch Chain",
  ...props
}: Props) {
  const { address, isDisconnected, isConnecting, connector, chain } =
    useAccount();
  const chainId = useChainId();

  const { switchChain, isPending: isSwitchChainPending } = useSwitchChain();
  const { disconnect, isPending: isDisconnectPending } = useDisconnect();
  const { connectAsync, connectors } = useConnect();

  const handleConnect = async () => {
    const metamaskConnector = connectors.find(
      (connector) => connector.name === "MetaMask"
    );
    const flaskConnector = connectors.find((connector) => {
      return connector.name === "MetaMask Flask";
    });

    const connector = flaskConnector ?? metamaskConnector;

    try {
      if (!connector)
        throw new Error("Install MetaMask or MetaMask flask wallets");

      await connectAsync({ connector });
    } catch (error) {
      disconnect();
      if (!(error instanceof ConnectorAlreadyConnectedError)) {
        catchError(error);
      }
    }
  };

  const btnProps: ComponentProps<typeof Button> = {
    className: twMerge("w-[18.75rem] gap-x-1.5 whitespace-nowrap", className),
    isLoading: isConnecting,
    ...props,
  };

  if (
    !connectors.some(
      (connector) =>
        connector.name === "MetaMask" || connector.name === "MetaMask Flask"
    )
  ) {
    return (
      <Button
        as="a"
        href="https://metamask.io/download"
        target="_blank"
        {...btnProps}
      >
        {installMetamaskContent}
      </Button>
    );
  }

  if (isDisconnected || isConnecting) {
    return (
      <Button {...btnProps} isLoading={isConnecting} onClick={handleConnect}>
        {connectContent}
      </Button>
    );
  }

  if (!chain) {
    return (
      <Button
        {...btnProps}
        isLoading={isSwitchChainPending}
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
    <Button
      {...btnProps}
      isLoading={isDisconnectPending}
      onClick={() => disconnect()}
    >
      {shortAddress(address, 4, 4)}
    </Button>
  );
}
