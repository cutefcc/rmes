// 具体业务代码
import detectEthereumProvider from '@metamask/detect-provider';
import { Web3ReactActions, Connector } from '@connector/types';

export class NoMetaMaskError extends Error {
  constructor() {
    super('MetaMask is not installed');
    this.name = 'NoMetaMaskError';
    Object.setPrototypeOf(this, NoMetaMaskError.prototype);
  }
}

// proxy 适配所有钱包，写法保持一致
export class MetaMask extends Connector {
  // web3-react 的源码的早期链接是只能链接eth，不符合我们的需求，所有我们重写了
  private earlyConnect(): Promise<void> {}

  constructor(actions: Web3ReactActions, connectEarly: false) {
    super(actions);
    if (connectEarly && typeof window === 'undefined') {
      throw new Error('connectEarly = true is invalid for ssr');
    }
    // 自动尽早的链接钱包
    if (connectEarly) {
      this.connectEarly();
    }
  }

  public async connectEarly(): Promise<void> {
    console.log('早起调用🍎');
    const cancelActivation = this.actions.startAction();
  }

  public activate(...args: unknown[]): void | Promise<void> {
    throw new Error('Method not implemented.');
  }
}
