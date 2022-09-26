// 暴露给别人的，初始化metaMaskConnector
import { initializeConnector } from './core';

export const [metaMask, hooks] = initializeConnector;
