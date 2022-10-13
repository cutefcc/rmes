import type { EventEmitter } from 'node:events';
import type { StoreApi } from 'zustand';

export interface Web3ReactState {
  accounts: string[] | undefined; // 当前账户
  chainId: number | undefined; // 链id
  active: boolean; // 是否正在激活
  error: Error | undefined; // 错误
}
export type Web3ReactStore = StoreApi<Web3ReactState>;

export type Web3ReactStateUpdate =
  | {
      chainId: number;
      accounts: string[];
    }
  | {
      chainId: number;
      accounts?: never;
    }
  | {
      chainId?: never;
      accounts: string[];
    };
export interface Web3ReactActions {
  startAction: () => () => void;
  update: (stateUpdate: Web3ReactStateUpdate) => void;
  reportError: (error: Error | undefined) => void;
}

// per EIP-1193
export interface Provider extends EventEmitter {
  request(args: RequestArguments): Promise<unknown>;
}

// per EIP-1193
export interface RequestArguments {
  method: string;
  params?: unknown[] | Record<string, unknown>;
}

// per EIP-1193
export interface ProviderConnectInfo {
  readonly chainId: string;
}

// per EIP-747
export interface WatchAssetParameters {
  address: string; // The address of the token is at.
  symbol: string; // A ticker symbol or shorthand, up to 5 chars.
  decimals: number; // The number of decimals in the token.
  image: string; // A string url of the token logo
}

// per EIP-1193
export interface ProviderRpcError extends Error {
  message: string;
  code: number;
  data?: unknown;
}

// per EIP-3085 (https://eips.ethereum.org/EIPS/eip-3085)
export interface AddEthereumChainParameter {
  chainId: number;
  chainName: string;
  nativeCurrency: {
    name: string;
    symbol: string; // 2-6 characters long
    decimals: 18;
  };
  rpcUrls: string[];
  blockExplorerUrls?: string[];
  iconUrls?: string[]; // Currently ignored.
}

// eip 1193: https://eips.ethereum.org/EIPS/eip-1193  https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1193.md
// eip 1102: https://eips.ethereum.org/EIPS/eip-1102  https://github.com/etherrum/EIPs/blob/master/EIPS/eip-1102.md
// eip 3085: https://eips.ethereum.org/EIPS/eip-3085  https://github.com/ethereum/EIPs/blob/master/EIPS/eip-3085.md
export abstract class Connector {
  public provider?: Provider | undefined;

  // 1193 bridge 自定义provider
  public customProvider?: unknown | undefined;

  protected readonly actions: Web3ReactActions;

  constructor(actions: Web3ReactActions) {
    this.actions = actions;
  }

  protected get serverSide(): boolean {
    return typeof window === 'undefined';
  }
  // 自动连接钱包
  public connectEarly?(...args: unknown[]): Promise<void> | void;
  // 必须重写掉 用户激活钱包 操作钱包 切链切用户
  public abstract activate(...args: unknown[]): Promise<void> | void;
  // 断开钱包链接

  public deactivate(...args: unknown[]): Promise<void> | void {
    this.actions.reportError(undefined);
  }
  // 添加资产，添加一个额外的token
  public watchAsset?(params: WatchAssetParameters): Promise<true>;
}
