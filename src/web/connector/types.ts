import type { StoreApi } from 'zustand';

export interface Web3ReactState {
  accounts: string[] | undefined;
  chainId: number | undefined;
  active: boolean;
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
export interface Web3ReactActions {
  startAction: () => () => void;
  update: (stateUpdate: Web3ReactStateUpdate) => void;
  reportError: (error: Error | undefined) => void;
}

// eip 1193: https://eips.ethereum.org/EIPS/eip-1193  https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1193.md
// eip 1102: https://eips.ethereum.org/EIPS/eip-1102  https://github.com/etherrum/EIPs/blob/master/EIPS/eip-1102.md
// eip 3085: https://eips.ethereum.org/EIPS/eip-3085  https://github.com/ethereum/EIPs/blob/master/EIPS/eip-3085.md
export abstract class Connector {
  public provider: Provider | undefined;
}
