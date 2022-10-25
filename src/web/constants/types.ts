import type { StoreApi } from 'zustand';
import type { EventEmitter } from 'node:events';

export interface Web3ReactState {
  chainId: number | undefined;
  accounts: string[] | undefined;
  activating: boolean;
  error: Error | undefined;
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

export interface Actions {
  startActivation: () => () => void;
  update: (stateUpdate: Web3ReactStateUpdate) => void;
  reportError: (error: Error | undefined) => void;
}
// per EIP-1193
export interface Provider extends EventEmitter {
  request(args: RequestArguments): Promise<unknown>;
}
// per EIP-1193
export interface RequestArguments {
  readonly method: string;
  readonly params?: readonly unknown[] | object;
}
// per EIP-747
export interface WatchAssetParameters {
  address: string; // The address that the token is at.
  symbol: string; // A ticker symbol or shorthand, up to 5 chars.
  decimals: number; // The number of decimals in the token
  image: string; // A string url of the token logo
}

// per EIP-3085
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
// per EIP-1193
export interface ProviderRpcError extends Error {
  message: string;
  code: number;
  data?: unknown;
}
// per EIP-1193
export interface ProviderConnectInfo {
  readonly chainId: string;
}
export abstract class Connector {
  /**
   * An
   * EIP-1193 ({@link https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1193.md}) and
   * EIP-1102 ({@link https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1102.md}) compliant provider.
   * May also comply with EIP-3085 ({@link https://github.com/ethereum/EIPs/blob/master/EIPS/eip-3085.md}).
   * This property must be defined while the connector is active, unless a customProvider is provided.
   */
  public provider?: Provider | undefined;

  /**
   * An optional property meant to allow ethers providers to be used directly rather than via the experimental
   * 1193 bridge. If desired, this property must be defined while the connector is active, in which case it will
   * be preferred over provider.
   */
  public customProvider: unknown | undefined;

  protected readonly actions: Actions;

  constructor(actions: Actions) {
    this.actions = actions;
  }

  protected get serverSide() {
    return typeof window === 'undefined';
  }

  //自动链接钱包
  public connectEagerly?(...args: unknown[]): Promise<void> | void;
  //必须重写掉 用户激活钱包的 操作钱包 切链切用户
  public abstract activate(...args: unknown[]): Promise<void> | void;
  //断开钱包链接
  public deactivate(...args: unknown[]): Promise<void> | void {
    this.actions.reportError(undefined);
  }
  //添加资产 添加一个额外的token
  public watchAsset?(params: WatchAssetParameters): Promise<true>;
}

export interface BasicChainInformation {
  urls: string[];
  name: string;
}

export interface ExtendedChainInformation extends BasicChainInformation {
  nativeCurrency: AddEthereumChainParameter['nativeCurrency'];
  blockExplorerUrls: AddEthereumChainParameter['blockExplorerUrls'];
}
