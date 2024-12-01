import {
  AppKitConnectWalletButton,
  // ConnectWalletButton,
} from "features/connect-wallet";

export const Header = () => {
  return (
    <nav className="mx-10 mt-6 flex items-center">
      <img className="size-[64px]" src="/logo.svg" alt="log" />

      <AppKitConnectWalletButton className="ml-auto" />

      {/* <ConnectWalletButton className="ml-auto" /> */}
    </nav>
  );
};
