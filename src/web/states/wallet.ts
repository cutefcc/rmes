import { Connector } from '@connector/types';
import { ExternalProvider, Web3Provider } from '@ethersproject/providers';
import { immer } from 'zustand/middleware/immer';
import { atom } from 'jotai';
import createStore from 'zustand/vanilla';

type GlobalWalletType = {
  chainId: number | undefined;
  account: string;
  accounts: string[];
  library: Web3Provider | undefined;
  provider: ExternalProvider | undefined;
  errMsg: Error | undefined;
  connector: Connector;
  isActive: boolean;
  active: boolean;
};
const DEFAULT_STATE = {} as GlobalWalletType;
const walletTypeStore = createStore(
  immer<GlobalWalletType>(() => ({
    ...DEFAULT_STATE,
  }))
);
//代表了下拉列表当前的 钱包类型
const walletTypeAtom = atom(1);
export { walletTypeAtom, walletTypeStore };
