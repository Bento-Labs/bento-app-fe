import { Address } from "viem";

import { Currency } from "entities/currency";

export const busd: Record<number, Currency> = {
  11155111: {
    chainId: 11155111,
    address: "0x6ae08082387AaBcA74830054B1f3ba8a0571F9c6",
    name: "BentoUSD",
    symbol: "BUSD",
    decimals: 18,
    logoURI: "/bento-token.png",
  },
};

export const currenciesList: Currency[] = [
  {
    address: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
    name: "Tether USD",
    symbol: "USDT",
    decimals: 6,
    chainId: 42161,
    logoURI:
      "https://assets-cdn.trustwallet.com/blockchains/arbitrum/assets/0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9/logo.png",
  },
  {
    logoURI:
      "https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png",
    chainId: 1,
    symbol: "USDT",
    decimals: 6,
    address: "0xdAC17F958D2ee523a2206206994597C13D831ec7" as Address,
    name: "Tether",
  },
  {
    logoURI:
      "https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png",
    chainId: 11155111,
    symbol: "USDT",
    decimals: 6,
    address: "0xaA8E23Fb1079EA71e0a56F48a2aA51851D8433D0" as Address,
    name: "USDT (USDT)",
  },
  {
    logoURI:
      "https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png",
    chainId: 11155111,
    decimals: 6,
    symbol: "USDC",
    address: "0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8" as Address,
    name: "USDC (USDC)",
  },
  {
    logoURI:
      "https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x6B175474E89094C44Da98b954EedeAC495271d0F/logo.png",
    chainId: 11155111,
    decimals: 6,
    symbol: "DAI",
    address: "0x68194a729C2450ad26072b3D33ADaCbcef39D574" as Address,
    name: "DAI (DAI)",
  },
];
