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
