import { Address } from "viem";
import { mainnet, sepolia } from "viem/chains";

export type Currency = {
  logoURI: string;
  chainId: number;
  symbol: string;
  decimals: number;
  address: Address;
  name: string;
};

export const chainLinkAggregatorsAddresses: Record<
  number,
  Record<string, Address>
> = {
  [mainnet.id]: {
    USDT: "0x3E7d1eAB13ad0104d2750B8863b489D65364e32D",
    USDC: "0x8fFfFfd4AfB6115b954Bd326cbe7B4BA576818f6",
    DAI: "0xAed0c38402a5d19df6E4c03F4E2DceD6e29c1ee9",
    TUSD: "0xec746eCF986E2927Abd291a2A1716c940100f8Ba",
  },
  [sepolia.id]: {
    // BTC / USD
    USDT: "0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43",

    // USDC / USD
    USDC: "0xA2F78ab2355fe2f984D808B5CeE7FD0A93D5270E",

    // ETH / USD
    DAI: "0x694AA1769357215DE4FAC081bf1f309aDC325306",
  },
};

export const collateralsConfig: Record<number, Record<string, Currency>> = {
  [mainnet.id]: {
    USDT: {
      logoURI: "/tokens/usdt-logo.svg",
      chainId: 1,
      symbol: "USDT",
      decimals: 6,
      address: "0xdAC17F958D2ee523a2206206994597C13D831ec7" as Address,
      name: "Tether USD",
    },
    USDC: {
      logoURI: "/tokens/usdc-logo.svg",
      chainId: 1,
      address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
      decimals: 6,
      symbol: "USDC",
      name: "USD Coin",
    },
    DAI: {
      logoURI: "/tokens/dai-logo.svg",
      symbol: "DAI",
      decimals: 18,
      chainId: 1,
      address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
      name: "Dai Stablecoin",
    },
    TUSD: {
      logoURI: "/tokens/tusd-logo.svg",
      symbol: "TUSD",
      decimals: 18,
      address: "0x0000000000085d4780B73119b644AE5ecd22b376",
      name: "TrueUSD",
      chainId: 1,
    },
  },
  [sepolia.id]: {
    USDT: {
      logoURI:
        "https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png",
      chainId: 11155111,
      symbol: "USDT",
      decimals: 6,
      address: "0xaA8E23Fb1079EA71e0a56F48a2aA51851D8433D0" as Address,
      name: "USDT (USDT)",
    },
    USDC: {
      logoURI:
        "https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png",
      chainId: 11155111,
      decimals: 6,
      symbol: "USDC",
      address: "0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8" as Address,
      name: "USDC (USDC)",
    },

    DAI: {
      logoURI:
        "https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x6B175474E89094C44Da98b954EedeAC495271d0F/logo.png",
      chainId: 11155111,
      decimals: 6,
      symbol: "DAI",
      address: "0x68194a729C2450ad26072b3D33ADaCbcef39D574" as Address,
      name: "DAI (DAI)",
    },
  },
};

export const busdConfig: Record<number, Currency> = {
  [mainnet.id]: {
    logoURI: "/bento-token.png",
    chainId: 1,
    address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    decimals: 6,
    symbol: "BUSD (USDC)",
    name: "USD Coin",
  },
  [sepolia.id]: {
    chainId: 11155111,
    address: "0x6ae08082387AaBcA74830054B1f3ba8a0571F9c6",
    name: "BentoUSD",
    symbol: "BUSD",
    decimals: 18,
    logoURI: "/bento-token.png",
  },
};
