import type { State, StoreApi } from 'zustand';

export interface Web3ReactState extends State {
  accounts: string[] | undefined;
  chainId: number | undefined;
  active: boolean;
  error: Error | undefined;
}
export type Web3ReactStore = State & StoreApi<Web3ReactState>;
