import {
  AddEthereumChainParameter,
  BasicChainInformation,
  ExtendedChainInformation,
} from '@connector/types';
import { ArbitrumICON, BscIcon, MainnetIcon, MaticIcon } from './misc';
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
  //[SupportedChainId.RINKEBY]: 'Rinkeby',
  [SupportedChainId.MATIC]: 'Polygon (Matic)',
  //[SupportedChainId.MATIC_TESTNET]: 'Polygon Testnet',
  [SupportedChainId.BSC]: 'BSC',
  //[SupportedChainId.BSC_TESTNET]: 'BSC Testnet',
  [SupportedChainId.ARBITRUM]: 'Arbitrum',
  //[SupportedChainId.ARBITRUM_TESTNET]: 'Arbitrum Testnet',
};

export const ALL_SUPPORTED_CHAIN_IDS = [
  SupportedChainId.MAINNET,
  //SupportedChainId.RINKEBY,
  SupportedChainId.BSC,
  //SupportedChainId.BSC_TESTNET,
  SupportedChainId.MATIC,
  //SupportedChainId.MATIC_TESTNET,
  SupportedChainId.ARBITRUM,
];
// per EIP-3085
export interface ChainInfoItem {
  chainId: string; // A 0x-prefixed hexadecimal string
  chainName: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: 18;
  };
  rpcUrls?: string[];
  blockExplorerUrls?: string[];
  iconUrls?: string[]; // Currently ignored.
}

export type ChainInfo = { readonly [chainId in SupportedChainId]: ChainInfoItem };

export const CHAIN_INFO: ChainInfo = {
  [SupportedChainId.MAINNET]: {
    chainId: SupportedChainId16[SupportedChainId.MAINNET],
    chainName: 'Ethereum',
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: [`https://mainnet.infura.io/v3/你的秘钥`],
    blockExplorerUrls: ['https://etherscan.com'],
    iconUrls: [MainnetIcon],
  },
  [SupportedChainId.BSC]: {
    chainId: SupportedChainId16[SupportedChainId.BSC],
    chainName: 'BSC',
    nativeCurrency: {
      name: 'Binance Coin',
      symbol: 'BNB',
      decimals: 18,
    },
    rpcUrls: ['https://bsc-dataseed.binance.org'],
    blockExplorerUrls: ['https://bscscan.com'],
    iconUrls: [BscIcon],
  },
  [SupportedChainId.MATIC]: {
    chainId: SupportedChainId16[SupportedChainId.MATIC],
    chainName: 'Polygon (Matic)',
    nativeCurrency: {
      name: 'Matic',
      symbol: 'MATIC',
      decimals: 18,
    },
    rpcUrls: [
      'https://polygon-rpc.com/',
      'https://rpc-mainnet.matic.network',
      'https://rpc-mainnet.maticvigil.com',
      'https://matic-mainnet.chainstacklabs.com/',
      'https://rpc-mainnet.matic.quiknode.pro',
      'https://matic-mainnet-full-rpc.bwarelabs.com',
    ],
    blockExplorerUrls: ['https://explorer-mainnet.maticvigil.com'],
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
  const validURLs: string[] = CHAIN_INFO[chainId].rpcUrls || [];
  if (validURLs.length) {
    accumulator[chainId] = validURLs;
  }
  return accumulator;
}, {});

function isExtendedChainInformation(
  chainInformation: BasicChainInformation | ExtendedChainInformation
): chainInformation is ExtendedChainInformation {
  return !!(chainInformation as ExtendedChainInformation).nativeCurrency;
}
export function getAddChainParameters(chainId: number): AddEthereumChainParameter | number {
  if (!(chainId in CHAIN_INFO)) {
    return chainId;
  }
  const chainInformation = CHAIN_INFO[chainId];
  // const chainInformation = CHAINS[chainId];
  if (isExtendedChainInformation(chainInformation)) {
    return {
      chainId,
      chainName: chainInformation.name,
      nativeCurrency: chainInformation.nativeCurrency,
      rpcUrls: chainInformation.urls,
      blockExplorerUrls: chainInformation.blockExplorerUrls,
    };
  } else {
    return chainId;
  }
}
