import React, { ReactNode } from 'react';
import { createContext, useContext } from 'react';
import type { BaseProvider, Web3Provider } from '@ethersproject/providers';
import { Connector } from './types';
import type { Networkish } from '@ethersproject/networks';

export type Web3ContextType<T extends BaseProvider = Web3Provider> = {
  connector: Connector;
  chainId: ReturnType<Web3ReactPriorityHooks['useSelectedChainId']>;
  account: ReturnType<Web3ReactPriorityHooks['useSelectedAccount']>;
  isActivating: ReturnType<Web3ReactPriorityHooks['useSelectedIsActivating']>;
  error: ReturnType<Web3ReactPriorityHooks['useSelectedError']>;
  account: ReturnType<Web3ReactPriorityHooks['useSelectedAccount']>;
  isActive: ReturnType<Web3ReactPriorityHooks['useSelectedIsActive']>;
  provider: T | undefined;
  ENSNames: ReturnType<Web3ReactPriorityHooks['useSelectedENSNames']>;
  ENSName: ReturnType<Web3ReactPriorityHooks['useSelectedENSName']>;
  hooks: RetureType<typeof getPriorityConnector>;
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
  return <Web3Context.Provider value={{}}>{children}</Web3Context.Provider>;
}
