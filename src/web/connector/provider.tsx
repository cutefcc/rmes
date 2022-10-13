import React, { ReactNode, useContext, Context } from 'react';
import { createContext } from 'react';
import type { BaseProvider, Web3Provider } from '@ethersproject/providers';
import { Connector, Web3ReactStore } from './types';
import type { Networkish } from '@ethersproject/networks';
import { Web3ReactHooks, getPriorityConnector, Web3ReactPriorityHooks } from './core';

export type Web3ContextType<T extends BaseProvider = Web3Provider> = {
  connector: Connector;
  chainId: ReturnType<Web3ReactPriorityHooks['useSelectedChainId']>;
  accounts: ReturnType<Web3ReactPriorityHooks['useSelectedAccounts']>;
  active: ReturnType<Web3ReactPriorityHooks['useSelectedActive']>;
  error: ReturnType<Web3ReactPriorityHooks['useSelectedError']>;
  account: ReturnType<Web3ReactPriorityHooks['useSelectedAccount']>;
  isActive: ReturnType<Web3ReactPriorityHooks['useSelectedIsActive']>;
  provider: T | undefined;
  // ENSNames: ReturnType<Web3ReactPriorityHooks['useSelectedENSNames']>;
  // ENSName: ReturnType<Web3ReactPriorityHooks['useSelectedENSName']>;
  hooks: ReturnType<typeof getPriorityConnector>;
};

const Web3Context = createContext<Web3ContextType | undefined>(undefined);

export interface Web3ReactProviderProps {
  children: ReactNode;
  connectors: [Connector, Web3ReactHooks][] | [Connector, Web3ReactHooks, Web3ReactStore][];
  connectorOverride?: Connector;
  network?: Networkish;
  lookupENS?: boolean;
}

export function Web3ReactProvider({
  children,
  connectors,
  connectorOverride,
  network,
  lookupENS = true,
}: Web3ReactProviderProps) {
  const hooks = getPriorityConnector(...connectors);
  const {
    usePriorityConnector,
    useSelectedChainId,
    useSelectedAccounts,
    useSelectedActive,
    useSelectedAccount,
    useSelectedIsActive,
    useSelectedProvider,
    useSelectedError,
    // useSelectedENSNames,
    // useSelectedENSName,
  } = hooks;
  const priorityConnector = usePriorityConnector();
  const connector = connectorOverride ?? priorityConnector;

  const chainId = useSelectedChainId(connector);
  const accounts = useSelectedAccounts(connector);
  const isActive = useSelectedIsActive(connector);
  const account = useSelectedAccount(connector);
  const error = useSelectedError(connector);
  const active = useSelectedActive(connector);
  // note that we've omitted a <T extends BaseProvider = Web3Provider> generic type
  // in Web3ReactProvider, and thus can't pass T through to useSelectedProvider below.
  // this is because if we did so, the type of provider would include T, but that would
  // conflict because Web3Context can't take a generic. however, this isn't particularly
  // important, because useWeb3React (below) is manually typed
  const provider = useSelectedProvider(connector, network);
  // const ENSNames = useSelectedENSNames(connector, lookupENS ? provider : undefined)
  // const ENSName = useSelectedENSName(connector, lookupENS ? provider : undefined)
  return (
    <Web3Context.Provider
      value={{
        connector,
        chainId,
        accounts,
        active,
        error,
        account,
        isActive,
        provider,
        hooks,
        // ENSNames,
        // ENSName,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
}

export function useWeb3React<T extends BaseProvider = Web3Provider>(): Web3ContextType<T> {
  const context = useContext(Web3Context as Context<Web3ContextType<T> | undefined>);
  if (!context) throw Error('useWeb3React can only be used within the Web3ReactProvider component');
  return context;
}
