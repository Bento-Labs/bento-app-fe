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

export const chainLinkAggregatorConfig: Record<
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
    USDT: "0x55ec7c3ed0d7CB5DF4d3d8bfEd2ecaf28b4638fb",
    USDC: "0xA2F78ab2355fe2f984D808B5CeE7FD0A93D5270E",
    DAI: "0x14866185B1962B63C3Ea9E03Bc1da838bab34C19",
    USDe: "0x6f7be09227d98Ce1Df812d5Bc745c0c775507E92",
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
      logoURI: "/tokens/usdt-logo.svg",
      chainId: 11155111,
      symbol: "USDT",
      decimals: 18,
      address: "0x5Fd341Ba92C4F6e6B7778Ba303D8B1EBd36A9cA0" as Address,
      name: "USDT (USDT)",
    },
    USDC: {
      logoURI: "/tokens/usdc-logo.svg",
      chainId: 11155111,
      decimals: 18,
      symbol: "USDC",
      address: "0xC98F51755976811c1D71d895DA2A73b46Dfbc918" as Address,
      name: "USDC (USDC)",
    },
    DAI: {
      logoURI: "/tokens/dai-logo.svg",
      chainId: 11155111,
      decimals: 18,
      symbol: "DAI",
      address: "0x4F12d4e3FE59Ad54f7e9704B71467eB368b2F498" as Address,
      name: "DAI (DAI)",
    },
    USDe: {
      logoURI: "/tokens/usde-logo.svg",
      chainId: 11155111,
      decimals: 18,
      symbol: "USDe",
      address: "0x63c9C938be90E0692840E310e917aF1De40e314B" as Address,
      name: "test USDe",
    },
  },
};

export const bentoUSDConfig: Record<number, Currency> = {
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
    name: "bentoUSD",
    symbol: "bentoUSD",
    decimals: 18,
    logoURI: "/bento-token.png",
  },
};

export const bentoVaultCoreConfig: Record<number, Address> = {
  [sepolia.id]: "0x8FDE145B1289a99C6B15f363309d3cc9276c0b16",
};
