// import { Provider } from './types';
// 具体业务代码
import detectEthereumProvider from '@metamask/detect-provider';
import {
  Provider,
  Web3ReactActions,
  Connector,
  ProviderConnectInfo,
  WatchAssetParameters,
  AddEthereumChainParameter,
} from '@connector/types';
// import type { Provider } from 'web3-react/types';

type MetaMaskProvider = Provider & {
  isMetaMask?: boolean;
  isConnected?: () => boolean;
  providers?: MetaMaskProvider[];
};

export class NoMetaMaskError extends Error {
  constructor() {
    super('MetaMask is not installed');
    this.name = 'NoMetaMaskError';
    Object.setPrototypeOf(this, NoMetaMaskError.prototype);
  }
}

function parseChainId(chainId: string) {
  return Number.parseInt(chainId, 16);
}

// proxy 适配所有钱包，写法保持一致
export class MetaMask extends Connector {
  public provider?: MetaMaskProvider;

  private eagerConnection(): Promise<void> {} // web3-react 的源码的早期链接是只能链接eth，不符合我们的需求，所有我们重写了

  private readonly options?: Parameters<typeof detectEthereumProvider>[0]; // 把detectEthereumProvider参数挖出来

  constructor(
    actions: Web3ReactActions,
    connectEarly: false,
    options: Parameters<typeof detectEthereumProvider>[0]
  ) {
    super(actions);
    if (connectEarly && typeof window === 'undefined') {
      throw new Error('connectEarly = true is invalid for ssr');
    }
    this.options = options;
    // 自动尽早的链接钱包
    if (connectEarly) {
      this.connectEagerly();
    }
  }

  public async connectEagerly(): Promise<void> {
    console.log('早期调用🍎');
    const cancelActivation = this.actions.startAction();
    // 注入this.provider
    await this.isomorphicInitialize();
    const { provider } = this;
    // no provider
    if (!provider) {
      this.actions.reportError(new NoMetaMaskError());
      return cancelActivation();
    }
    // get chainId & accounts
    return Promise.all([
      provider.request({ method: 'eth_chainId' }) as Promise<string>,
      provider.request({ method: 'eth_accounts' }) as Promise<string[]>,
    ])
      .then(async ([chainId, accounts]) => {
        if (accounts.length) {
          // 用户上次没有主动断开链接，再次打开网页会给自动链接上
          this.actions.update({ chainId: parseChainId(chainId), accounts });
        } else {
          cancelActivation();
          // 获取余额，主动调出metamask，当多有用户都被断开了链接，再次刷新会主动调出metamask（还没有去链接）
          // 这是一个产品提的需求，我们和官网不一样的地方，为什么要重写web3-react ？ 肯定是它自带的一些东西不能完全满足我们需求的时候
          await provider.request({ method: 'eth_requestAccounts' });
          // 官方没有做到的，就直接throw error了
          // throw new Error('No accounts returned');
        }
      })
      .catch(error => {
        console.log('Could not connect eagerly', error);
        // we should be able to use `cancelActivation` here, but on mobile, metamask emits a 'connect'
        // event, meaning that chainId is updated, and cancelActivation doesn't work because an intermediary
        // update has occurred, so we reset state instead
        // this.actions.reportError(undefined);

        cancelActivation();
      });
  }

  private async isomorphicInitialize(): Promise<void> {
    // 已经定义过了，就不需要再次定义了
    if (this.eagerConnection) return this.eagerConnection;
    // 未定义，就定义
    return (this.eagerConnection = import('@metamask/detect-provider').then(async m => {
      const provider = await m.default(this.options);
      if (provider) {
        this.provider = provider as MetaMaskProvider; // 这里as是有理有据的,  <MetaMaskProvider>provoder

        // handle the case when e.g. metamask and coinbase wallet are both installed
        if (this.provider.providers?.length) {
          // 确保是metamask
          this.provider =
            this.provider.providers.find(p => p.isMetaMask) ?? this.provider.providers[0];
        }

        this.provider.on('connect', ({ chainId }: ProviderConnectInfo): void => {
          this.actions.update({ chainId: parseChainId(chainId) });
        });

        this.provider.on('disconnect', (): void => {
          this.actions.reportError(undefined);
          // this.activate();
        });

        this.provider.on('chainChanged', (chainId: string): void => {
          this.actions.update({ chainId: parseChainId(chainId) });
        });

        this.provider.on('accountsChanged', (accounts: string[]): void => {
          if (accounts.length === 0) {
            // handle this edge case by disconnecting
            this.actions.reportError(undefined);
          } else {
            this.actions.update({ accounts });
            // this.activate();
          }
        });
      }
    }));
  }

  /**
   * Initiates a connection.
   *
   * @param desiredChainIdOrChainParameters - If defined, indicates the desired chain to connect to. If the user is
   * already connected to this chain, no additional steps will be taken. Otherwise, the user will be prompted to switch
   * to the chain, if one of two conditions is met: either they already have it added in their extension, or the
   * argument is of type AddEthereumChainParameter, in which case the user will be prompted to add the chain with the
   * specified parameters first, before being prompted to switch.
   */
  public async activate(
    desiredChainIdOrChainParameters?: number | AddEthereumChainParameter
  ): Promise<void> {
    let cancelActivation: () => void;
    if (!this.provider?.isConnected?.()) cancelActivation = this.actions.startActivation();

    return this.isomorphicInitialize()
      .then(async () => {
        if (!this.provider) throw new NoMetaMaskError();

        return Promise.all([
          this.provider.request({ method: 'eth_chainId' }) as Promise<string>,
          this.provider.request({ method: 'eth_requestAccounts' }) as Promise<string[]>,
        ]).then(([chainId, accounts]) => {
          const receivedChainId = parseChainId(chainId);
          const desiredChainId =
            typeof desiredChainIdOrChainParameters === 'number'
              ? desiredChainIdOrChainParameters
              : desiredChainIdOrChainParameters?.chainId;

          // if there's no desired chain, or it's equal to the received, update
          if (!desiredChainId || receivedChainId === desiredChainId)
            return this.actions.update({ chainId: receivedChainId, accounts });

          const desiredChainIdHex = `0x${desiredChainId.toString(16)}`;

          // if we're here, we can try to switch networks
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          return this.provider!.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: desiredChainIdHex }],
          })
            .catch((error: ProviderRpcError) => {
              if (error.code === 4902 && typeof desiredChainIdOrChainParameters !== 'number') {
                // if we're here, we can try to add a new network
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                return this.provider!.request({
                  method: 'wallet_addEthereumChain',
                  params: [{ ...desiredChainIdOrChainParameters, chainId: desiredChainIdHex }],
                });
              }

              throw error;
            })
            .then(() => this.activate(desiredChainId));
        });
      })
      .catch(error => {
        cancelActivation?.();
        throw error;
      });
  }

  public async watchAsset({
    address,
    symbol,
    decimals,
    image,
  }: WatchAssetParameters): Promise<true> {
    if (!this.provider) throw new Error('No provider');

    return this.provider
      .request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20', // Initially only supports ERC20, but eventually more!
          options: {
            address, // The address that the token is at.
            symbol, // A ticker symbol or shorthand, up to 5 chars.
            decimals, // The number of decimals in the token
            image, // A string url of the token logo
          },
        },
      })
      .then(success => {
        if (!success) throw new Error('Rejected');
        return true;
      });
  }
}
