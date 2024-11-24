import { ComponentProps, PropsWithChildren } from "react";

import { useAccount } from "wagmi";

import { AppKitConnectWalletButton } from "features/connect-wallet";
import { Button } from "shared/ui/button";

type Props = ComponentProps<typeof Button>;

export const SubmitButton = (props: PropsWithChildren<Props>) => {
  const { children, className, ...rest } = props;
  const { isConnected, chain } = useAccount();

  if (!isConnected || !chain) {
    return <AppKitConnectWalletButton className={className} />;
  }

  return (
    <Button {...rest} type="submit" className={className}>
      {children ?? "Mint BentoUSD"}
    </Button>
  );
};
