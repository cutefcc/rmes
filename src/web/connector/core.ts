import { useEffect, useMemo, useState } from 'react';
import type { UseBoundStore } from 'zustand';
import create from 'zustand';
import { Connector, Web3ReactActions, Web3ReactStore, Web3ReactState } from '@connector/types';
import { createWeb3ReactStoreAndActions } from '@connector/store';

const ACCOUNTS = ({ accounts }: Web3ReactState) => accounts;
const CHAIN_ID = ({ chainId }: Web3ReactState) => chainId;
const ACTIVE = ({ active }: Web3ReactState) => active;
const ERROR = ({ error }: Web3ReactState) => error;

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
