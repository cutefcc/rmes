// 具体业务代码
import detectEthereumProvider from '@metamask/detect-provider';
import { Connector } from './types';

export class NoMetaMaskError extends Error {
  constructor() {
    super('MetaMask is not installed');
    this.name = 'NoMetaMaskError';
    Object.setPrototypeOf(this, NoMetaMaskError.prototype);
  }
}

// proxy 适配所有钱包，写法保持一致
export class MetaMask extends Connector {
  public activate(...args: unknown[]): void | Promise<void> {
    throw new Error('Method not implemented.');
  }
}
