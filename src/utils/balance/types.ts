export interface TokenPrice {
  currency: string;
  value: string;
  lastUpdatedAt: string;
}

export interface TokenMetadata {
  symbol: string | null;
  decimals: number | null;
  name: string | null;
  logo: string | null;
}

export interface Token {
  address: string;
  network: string;
  tokenAddress: string | null;
  tokenBalance: string;
  tokenMetadata: TokenMetadata;
  tokenPrices: TokenPrice[];
}

export interface TokensByAddressApiResponse {
  data: {
    tokens: Token[];
    pageKey: string | null;
  };
}
