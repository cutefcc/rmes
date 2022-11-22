import { walletTypeAtom } from '@states/wallet';
import { Web3ReactHooks } from '@connector/core';
import { hooks as metaMaskHooks, metaMask } from '@connector/metaMask';
import { MetaMask } from '@connector/metaMaskConnector';
import { Web3ReactProvider } from '@connector/provider';
import { useAtom } from 'jotai';
import { ReactNode } from 'react';
import React from 'react';

const connectors: [MetaMask, Web3ReactHooks][] = [[metaMask, metaMaskHooks]];
export default function WalletProvider({ children }: { children: ReactNode }): JSX.Element {
  const [wallettype] = useAtom(walletTypeAtom);
  const connectorOverride = connectors[wallettype - 1][0];
  return (
    <Web3ReactProvider connectors={connectors} connectorOverride={connectorOverride}>
      {children}
    </Web3ReactProvider>
  );
}
