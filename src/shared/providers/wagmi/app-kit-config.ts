import { AppKitNetwork, sepolia, mainnet } from "@reown/appkit/networks";
import { createAppKit } from "@reown/appkit/react";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";

const networks: [AppKitNetwork, ...AppKitNetwork[]] = [sepolia, mainnet];

const projectId = "47daa50416effcf4b1f3d7bc76013da9";

const metadata = {
  name: "BentoApp",
  description: "Bento App",
  url: "https://bento-app-fe.pages.dev",
  icons: ["https://avatars.githubusercontent.com/u/179229932"],
};

const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: false,
});

createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  defaultNetwork: sepolia,
  debug: true,
  allowUnsupportedChain: true,
  metadata,
  features: {
    socials: false,
    email: false,
    analytics: false, // Optional - defaults to your Cloud configuration
  },
});

export type Config = typeof wagmiAdapter.wagmiConfig;
export const config = wagmiAdapter.wagmiConfig;
