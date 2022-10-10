export enum SupportedChainId {
  MAINNET = 1,
  BSC = 56,
  MATIC = 137,
  ARBITRUM = 42161,
}

export enum SupportedChainId16 {
  '0x1' = 1,
  '0x38' = 56,
  '0x89' = 137,
  '0xa4b1' = 42161,
}

export const NETWORK_LABEL: { [chainId in SupportedChainId]: string } = {
  [SupportedChainId.MAINNET]: 'Ethereum',
  [SupportedChainId.BSC]: 'Binance Smart Chain',
  [SupportedChainId.MATIC]: 'Polygon',
  [SupportedChainId.ARBITRUM]: 'Arbitrum',
};

export const ALL_SUPPORTED_CHAIN_IDS = Object.values(SupportedChainId);

// 和types里面的东西重复了，像这些标准的东西完全可以写到私仓里面去
export interface ChainInfoItem {
  chainId: string;
  chainName: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number; // 18
  };
  rpcUrls: string[];
  blockExplorerUrls?: string[];
  iconUrls?: string[];
}

export type ChainInfo = { readonly [chainId in SupportedChainId]: ChainInfoItem };
