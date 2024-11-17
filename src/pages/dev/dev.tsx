import { AppKitConnectWalletButton } from "features/connect-wallet";
import { Button } from "shared/ui/button";

export const Dev = () => {
  return (
    <div>
      DEV PAGE
      <AppKitConnectWalletButton />
      <Button>HEllo world</Button>
      <Button disabled>world</Button>
      <Button isLoading>world</Button>
    </div>
  );
};
