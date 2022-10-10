// 暴露给别人的，初始化metaMaskConnector
import { initializeConnector } from '@connector/core';
import { MetaMask } from '@connector/metaMaskConnector';

export const [metaMask, hooks] = initializeConnector<MetaMask>(
  actions => new MetaMask(actions, true, undefined),
  Object.keys(URLS).map(chainId => Number(chainId))
);
