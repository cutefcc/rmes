import { ArbitrumICON, BscIcon, MainnetIcon, MaticIcon } from '@connector/configure/misc';

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
    decimals: 18; // 18
  };
  rpcUrls: string[];
  blockExplorerUrls?: string[];
  iconUrls?: string[];
}

export type ChainInfo = { readonly [chainId in SupportedChainId]: ChainInfoItem };

// 如何去查询：eth rpc node url   polygon rpc node url
export const CHAIN_INFO: ChainInfo = {
  [SupportedChainId.MAINNET]: {
    chainId: SupportedChainId16[SupportedChainId.MAINNET],
    chainName: 'Ethereum',
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: ['https://mainnet.infura.io/v3/你的密钥'],
    blockExplorerUrls: ['https://etherscan.com'],
    iconUrls: [MainnetIcon],
  },
  [SupportedChainId.BSC]: {
    chainId: SupportedChainId16[SupportedChainId.BSC],
    chainName: 'BSC',
    nativeCurrency: {
      name: 'BSC',
      symbol: 'BNB',
      decimals: 18,
    },
    rpcUrls: ['https://bsc-dataseed.binance.org/'],
    blockExplorerUrls: ['https://bscscan.com/'],
    iconUrls: [BscIcon],
  },
  [SupportedChainId.MATIC]: {
    chainId: SupportedChainId16[SupportedChainId.MATIC],
    chainName: 'Matic',
    nativeCurrency: {
      name: 'Matic',
      symbol: 'MATIC',
      decimals: 18,
    },
    rpcUrls: [
      'https://polygon-rpc.com/',
      'https://rpc-mainnet.matic.network',
      'https://rpc-mainnet.maticvigil.com',
      'https://matic-mainnet.chainstacklabs.com',
      'https://rpc-mainnet.matic.quiknode.pro',
      'https://matic-mainnet-full-rpc.bwarelabs.com',
    ],
    blockExplorerUrls: ['https:/explorer-mainnet.maticvigil.com/'],
    iconUrls: [MaticIcon],
  },
  [SupportedChainId.ARBITRUM]: {
    chainId: SupportedChainId16[SupportedChainId.ARBITRUM],
    chainName: 'Arbitrum',
    nativeCurrency: {
      name: 'Arbitrum',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: ['https://arb1.arbitrum.io/rpc'],
    blockExplorerUrls: ['https://arbiscan.io/'],
    iconUrls: [ArbitrumICON],
  },
};

export const URLS: { [chainId: number]: string[] } = Object.keys(CHAIN_INFO).reduce<{
  [chainId: number]: string[];
}>((accumulator, cId) => {
  const chainId = Number(cId) as SupportedChainId;
  const validURLs = CHAIN_INFO[chainId].rpcUrls || [];
  if (validURLs.length) {
    accumulator[chainId] = validURLs;
  }
  return accumulator;
}, {});
