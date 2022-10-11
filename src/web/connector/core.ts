import { useEffect, useMemo, useState } from 'react';
import type { UseBoundStore } from 'zustand';
import create from 'zustand';
import { Connector, Web3ReactActions, Web3ReactStore, Web3ReactState } from '@connector/types';
import { createWeb3ReactStoreAndActions } from '@connector/store';

const ACCOUNTS = ({ accounts }: Web3ReactState): Web3ReactState['accounts'] => accounts;
const CHAIN_ID = ({ chainId }: Web3ReactState): Web3ReactState['chainId'] => chainId;
const ACTIVE = ({ active }: Web3ReactState): Web3ReactState['active'] => active;
const ERROR = ({ error }: Web3ReactState): Web3ReactState['error'] => error;

const ACCOUNTS_EQUALITY_CHECKER = (
  oldAccounts: Web3ReactState['accounts'],
  newAccounts: Web3ReactState['accounts']
): boolean => {
  if (oldAccounts === newAccounts) {
    return true;
  }
  if (oldAccounts === undefined || newAccounts === undefined) {
    return false;
  }
  if (oldAccounts.length !== newAccounts.length) {
    return false;
  }
  for (let i = 0; i < oldAccounts.length; i++) {
    if (oldAccounts[i] !== newAccounts[i]) {
      return false;
    }
  }
  return true;
};
/* UseBoundStore 解析
declare type ExtractState<S> = S extends {
    getState: () => infer T;
} ? T : never;
export declare type UseBoundStore<S extends WithReact<StoreApi<unknown>>> = {
    (): ExtractState<S>;
    <U>(selector: (state: ExtractState<S>) => U, equals?: (a: U, b: U) => boolean): U;
} & S;
表示 useStore 是一个函数，可以不传递参数，也可以传递 selector 和 equals
当不传递任何参数时：useStore() 返回 ExtractState<S> 类型 也就是 Web3ReactState 类型，这也就解释了为何可以这样写 const [accounts, chainId, active, error] = useStore();
当传递一个参数时：useStore(selector) 返回 selector 的返回值，这也就解释了为何可以这样写 const accounts = useStore(ACCOUNTS); 用U联系起来，U就是 selector 的返回值，也是useStore(ACCOUNTS)返回值，也就是 Web3ReactState['accounts'] 类型
第二个参数equals比较是什么作用？ 没搞清楚
*/
function getStateHooks(useStore: UseBoundStore<Web3ReactStore>) {
  function useAccounts(): Web3ReactState['accounts'] {
    return useStore(ACCOUNTS, ACCOUNTS_EQUALITY_CHECKER);
  }
  function useChainId(): Web3ReactState['chainId'] {
    return useStore(CHAIN_ID);
  }
  function useActive(): Web3ReactState['active'] {
    return useStore(ACTIVE);
  }
  function useError(): Web3ReactState['error'] {
    return useStore(ERROR);
  }
  return { useAccounts, useChainId, useActive, useError };
}

export function initializeConnector<T extends Connector>(
  f: (actions: Web3ReactActions) => T,
  allowedChainIds: number[]
) {
  const [store, actions] = createWeb3ReactStoreAndActions(allowedChainIds);
  // new MetaMask(actions)
  const connector = f(actions);
  // 组件外状态 + react 结合起来
  const useStore = create(store);
  const stateHooks = getStateHooks(useStore);
  return [connector, stateHooks];
}
