import { ConnectWalletButton } from "features/connect-wallet";

export const Header = () => {
  return (
    <nav className="flex">
      <img src="/log.png" alt="log" />

      <ConnectWalletButton />
    </nav>
  );
};
