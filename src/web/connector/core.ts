import { useEffect, useMemo, useState } from 'react';
import type { UseBoundStore } from 'zustand';
import create from 'zustand';
import { Connector, Web3ReactActions, Web3ReactStore, Web3ReactState } from '@connector/types';
import { createWeb3ReactStoreAndActions } from '@connector/store';
import type { BaseProvider, Web3Provider } from '@ethersproject/providers';
import type { Networkish } from '@ethersproject/networks';

let DynamicProvider: typeof Web3Provider | null | undefined;

async function importProvider(): Promise<void> {
  if (DynamicProvider === undefined) {
    try {
      const { Web3Provider } = await import('@ethersproject/providers');
      DynamicProvider = Web3Provider;
    } catch {
      console.debug('@ethersproject/providers not available');
      DynamicProvider = null;
    }
  }
}

export type Web3ReactHooks = ReturnType<typeof getStateHooks> &
  ReturnType<typeof getDerivedHooks> &
  ReturnType<typeof getAugmentedHooks>;

export type Web3ReactPriorityHooks = ReturnType<typeof getPriorityConnector>;

const ACCOUNTS = ({ accounts }: Web3ReactState): Web3ReactState['accounts'] => accounts;
const CHAIN_ID = ({ chainId }: Web3ReactState): Web3ReactState['chainId'] => chainId;
const ACTIVE = ({ active }: Web3ReactState): Web3ReactState['active'] => active;
const ERROR = ({ error }: Web3ReactState): Web3ReactState['error'] => error;

// wallet 是否 被正确链接上
function computeIsActive({ chainId, accounts, active, error }: Web3ReactState) {
  return Boolean(chainId && accounts && !active && !error);
}

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
// 派生基础的hooks
function getDerivedHooks({
  useAccounts,
  useChainId,
  useActive,
  useError,
}: ReturnType<typeof getStateHooks>) {
  function useAccount(): string | undefined {
    const accounts = useAccounts();
    return accounts?.[0];
  }
  // 是否链接状态
  function useIsActive(): boolean {
    const accounts = useAccounts();
    const chainId = useChainId();
    const active = useActive();
    const error = useError();
    return computeIsActive({ chainId, accounts, active, error });
  }
  return { useAccount, useIsActive };
}
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

function getAugmentedHooks<T extends Connector>(
  connector: T,
  { useAccounts, useChainId }: ReturnType<typeof getStateHooks>,
  { useAccount, useIsActive }: ReturnType<typeof getDerivedHooks>
) {
  function useProvider<R extends BaseProvider = Web3Provider>(
    network?: Networkish,
    enabled = true
  ): R | undefined {
    const isActive = useIsActive();
    // const chainId = useChainId();
    // ensure that Provider is going to be available when loaded if @ethersproject/providers is installed
    const [loaded, setLoaded] = useState(DynamicProvider !== undefined);
    useEffect(() => {
      if (loaded) return;
      let stale = false;
      void importProvider().then(() => {
        if (stale) return;
        setLoaded(true);
      });
      return () => {
        stale = true;
      };
    }, [loaded]);
    return useMemo(() => {
      // 如果没有链接上，返回 undefined
      if (!isActive) {
        return undefined;
      }
      if (isActive && enabled) {
        if (connector.customProvider) {
          return connector.customProvider as R;
        } else if (DynamicProvider && connector.provider) {
          // 对 provider 进行封装
          const library = new DynamicProvider(connector.provider, network) as unknown as R;
          library.detectNetwork().then(net => {
            console.log('provider update success', net);
          });
          return library;
        }
      }
    }, [enabled, isActive, network]);
  }
  return { useProvider };
}

export function getSelectedConnector(
  ...initializedConnectors:
    | [Connector, Web3ReactHooks][]
    | [Connector, Web3ReactHooks, Web3ReactStore][]
) {
  function getIndex(connector: Connector) {
    const index = initializedConnectors.findIndex(
      ([initializedConnector]) => connector === initializedConnector
    );
    if (index === -1) throw new Error('Connector not found');
    return index;
  }

  function useSelectedStore(connector: Connector) {
    const store = initializedConnectors[getIndex(connector)][2];
    if (!store) throw new Error('Stores not passed');
    return store;
  }

  // the following code calls hooks in a map a lot, which violates the eslint rule.
  // this is ok, though, because initializedConnectors never changes, so the same hooks are called each time
  function useSelectedChainId(connector: Connector) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const values = initializedConnectors.map(([, { useChainId }]) => useChainId());
    return values[getIndex(connector)];
  }

  function useSelectedAccounts(connector: Connector) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const values = initializedConnectors.map(([, { useAccounts }]) => useAccounts());
    return values[getIndex(connector)];
  }

  function useSelectedError(connector: Connector) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const values = initializedConnectors.map(([, { useError }]) => useError());
    return values[getIndex(connector)];
  }

  function useSelectedActive(connector: Connector) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const values = initializedConnectors.map(([, { useActive }]) => useActive());
    return values[getIndex(connector)];
  }

  function useSelectedAccount(connector: Connector) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const values = initializedConnectors.map(([, { useAccount }]) => useAccount());
    return values[getIndex(connector)];
  }

  function useSelectedIsActive(connector: Connector) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const values = initializedConnectors.map(([, { useIsActive }]) => useIsActive());
    return values[getIndex(connector)];
  }

  /**
   * @typeParam T - A type argument must only be provided if one or more of the connectors passed to
   * getSelectedConnector is using `connector.customProvider`, in which case it must match every possible type of this
   * property, over all connectors.
   */
  function useSelectedProvider<T extends BaseProvider = Web3Provider>(
    connector: Connector,
    network?: Networkish
  ): T | undefined {
    const index = getIndex(connector);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const values = initializedConnectors.map(([, { useProvider }], i) =>
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useProvider<T>(network, i === index)
    );
    return values[index];
  }

  // function useSelectedENSNames(connector: Connector, provider?: BaseProvider) {
  //   const index = getIndex(connector);
  //   const values = initializedConnectors.map(([, { useENSNames }], i) =>
  //     // eslint-disable-next-line react-hooks/rules-of-hooks
  //     useENSNames(i === index ? provider : undefined)
  //   );
  //   return values[index];
  // }

  // function useSelectedENSName(connector: Connector, provider?: BaseProvider) {
  //   const index = getIndex(connector);
  //   // eslint-disable-next-line react-hooks/rules-of-hooks
  //   const values = initializedConnectors.map(([, { useENSName }], i) =>
  //     useENSName(i === index ? provider : undefined)
  //   );
  //   return values[index];
  // }

  return {
    useSelectedStore,
    useSelectedChainId,
    useSelectedAccounts,
    useSelectedActive,
    useSelectedAccount,
    useSelectedIsActive,
    useSelectedProvider,
    useSelectedError,
    // useSelectedENSNames,
    // useSelectedENSName,
  };
}

export function getPriorityConnector(
  ...initializedConnectors:
    | [Connector, Web3ReactHooks][]
    | [Connector, Web3ReactHooks, Web3ReactStore][]
) {
  const {
    useSelectedStore,
    useSelectedChainId,
    useSelectedAccounts,
    useSelectedActive,
    useSelectedAccount,
    useSelectedIsActive,
    useSelectedProvider,
    useSelectedError,
    // useSelectedENSNames,
    // useSelectedENSName,
  } = getSelectedConnector(...initializedConnectors);

  function usePriorityConnector() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const values = initializedConnectors.map(([, { useIsActive }]) => useIsActive());
    const index = values.findIndex(isActive => isActive);
    return initializedConnectors[index === -1 ? 0 : index][0];
  }

  function usePriorityStore() {
    return useSelectedStore(usePriorityConnector());
  }

  function usePriorityChainId() {
    return useSelectedChainId(usePriorityConnector());
  }

  function usePriorityAccounts() {
    return useSelectedAccounts(usePriorityConnector());
  }

  function usePriorityActive() {
    return useSelectedActive(usePriorityConnector());
  }

  function usePriorityAccount() {
    return useSelectedAccount(usePriorityConnector());
  }

  function usePriorityError() {
    return useSelectedError(usePriorityConnector());
  }

  function usePriorityIsActive() {
    return useSelectedIsActive(usePriorityConnector());
  }

  /**
   * @typeParam T - A type argument must only be provided if one or more of the connectors passed to
   * getPriorityConnector is using `connector.customProvider`, in which case it must match every possible type of this
   * property, over all connectors.
   */
  function usePriorityProvider<T extends BaseProvider = Web3Provider>(network?: Networkish) {
    return useSelectedProvider<T>(usePriorityConnector(), network);
  }

  // function usePriorityENSNames(provider?: BaseProvider) {
  //   return useSelectedENSNames(usePriorityConnector(), provider);
  // }

  // function usePriorityENSName(provider?: BaseProvider) {
  //   return useSelectedENSName(usePriorityConnector(), provider);
  // }

  return {
    useSelectedStore,
    useSelectedChainId,
    useSelectedAccounts,
    useSelectedActive,
    useSelectedAccount,
    useSelectedIsActive,
    useSelectedProvider,
    useSelectedError,
    // useSelectedENSNames,
    // useSelectedENSName,
    usePriorityConnector,
    usePriorityStore,
    usePriorityChainId,
    usePriorityAccounts,
    usePriorityActive,
    usePriorityAccount,
    usePriorityIsActive,
    usePriorityProvider,
    usePriorityError,
    // usePriorityENSNames,
    // usePriorityENSName,
  };
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
  const derivedHooks = getDerivedHooks(stateHooks);
  // 真正向外暴露的hooks
  const augmentedHooks = getAugmentedHooks<T>(connector, stateHooks, derivedHooks);
  return [connector, { ...stateHooks, ...derivedHooks, ...augmentedHooks }, store];
}
