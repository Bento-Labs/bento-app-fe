import {
  AppKitConnectWalletButton,
  // ConnectWalletButton,
} from "features/connect-wallet";

export const Header = () => {
  return (
    <nav className="mx-10 mt-6 flex items-center">
      <img className="w-[113px]" src="/logo.png" alt="log" />

      <AppKitConnectWalletButton className="ml-auto" />

      {/* <ConnectWalletButton className="ml-auto" /> */}
    </nav>
  );
};
