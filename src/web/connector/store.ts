import create from 'zustand/vanilla';
import { immer } from 'zustand/middleware/immer';
import { Web3ReactState, Web3ReactStore, Web3ReactActions, Web3ReactStateUpdate } from './types';
import { utils } from 'ethers';
import { isEqual } from 'lodash-es';

const { getAddress } = utils;
// 这里我们选用了组件外状态，什么时候用组件外状态，什么时候用组件内状态？ 当我们有很多业务逻辑 if 判断时 函数时，一部分状态修改我们不想让其反应到页面，这是我们选择组件外状态所考虑的
// zustand 我们可以完全不和react相关，使用zustand/vanilla，完全的组件外状态（所有状态不反应在react页面） 当我们想让一些状态反应在页面时需要用到import create from 'zustand' 把我们创建的状态给包一下;
export const MAX_SAFE_CHAIN_ID = 4503599627370476; //floor((2 ** 53 - 39) / 2);
export class ChainIdNotAllowError extends Error {
  public readonly chainId: number;

  public constructor(chainId: number, allowedChainIds: number[]) {
    super('this network is not supported');
    this.chainId = chainId;
    this.name = ChainIdNotAllowError.name;
    Object.setPrototypeOf(this, ChainIdNotAllowError.prototype);
  }
}
function ensureChainIdIsAllowed(
  chainId: number,
  allowedChainIds: number[]
): ChainIdNotAllowError | undefined {
  return allowedChainIds.some(allowedChainId => allowedChainId === chainId)
    ? undefined
    : new ChainIdNotAllowError(chainId, allowedChainIds);
}
function validateChainId(chainId: number) {
  if (!Number.isInteger(chainId) || chainId < 0 || chainId > MAX_SAFE_CHAIN_ID) {
    throw new Error(`Invalid chainId: ${chainId}`);
  }
}
function validateAccount(account: string): string {
  return getAddress(account);
}
// zustand/vanilla 不依赖react
const DEFAULT_STORE = {
  accounts: undefined, // 当前账户
  chainId: undefined, // 当前网络
  active: false, // 是否正在连接
  error: undefined, // 错误
};

// https://github.com/Uniswap/web3-react/blob/main/packages/store/src/index.ts
// return [Web3ReactStore, Web3ReactActions] -> web3-react-hoooks 钱包的具体操作
export function createWeb3ReactStoreAndActions(
  allowedChainIds: number[]
): [Web3ReactStore, Web3ReactActions] {
  // 引入zustand/middleware/immer 解决 Re-render 问题
  const store = create(immer<Web3ReactState>(() => DEFAULT_STORE));
  const { getState, setState, subscribe, destroy } = store;

  // 哨兵变量
  let nullifier = 0;
  function startAction(): () => void {
    const nullifierCached = ++nullifier;
    // 官网是这样写的，直接裂开
    // setState({...DEFAULT_STORE, active: true});
    setState(draft => {
      draft.active = true;
    });
    // cancelActivation
    return () => {
      if (nullifier === nullifierCached) {
        setState(draft => {
          draft.active = false;
        });
      }
    };
  }
  function update(stateUpdate: Web3ReactStateUpdate): void {
    // 切了链
    if (stateUpdate.chainId !== undefined) {
      validateChainId(stateUpdate.chainId);
    }
    // 切了账户
    if (stateUpdate.accounts !== undefined) {
      Object.defineProperties(stateUpdate, {
        accounts: {
          value: [...stateUpdate.accounts],
          writable: true,
        },
      });
      for (let i = 0; i < stateUpdate.accounts.length; i++) {
        stateUpdate.accounts[i] = validateAccount(stateUpdate.accounts[i]);
      }
    }
    // 锁cancel
    nullifier++;
    setState(draft => {
      const chainId = stateUpdate.chainId ?? draft.chainId;
      const accounts = stateUpdate.accounts ?? draft.accounts;
      let active = draft.active;
      let error = draft.error;
      if (chainId && allowedChainIds) {
        const chainIdError = ensureChainIdIsAllowed(chainId, allowedChainIds);
        if (chainIdError && error) {
          if (!(error instanceof ChainIdNotAllowError) || error.chainId !== chainIdError.chainId) {
            console.debug(`${error.name} is being clobbered by ${chainIdError.name}`);
          }
        }
        error = chainIdError;
      }
      // error clear
      if (error && !(error instanceof ChainIdNotAllowError) && chainId && accounts) {
        error = undefined;
      }
      if (active && (error || (chainId && accounts))) {
        active = false;
      }
      draft.chainId = chainId;
      // avoid re-render
      if (!isEqual(draft.accounts, accounts)) {
        draft.accounts = accounts;
      }
      draft.accounts = accounts;
      draft.error = error;
      draft.active = active;
    });
  }
  function reportError(error: Error | undefined): void {
    nullifier++;
    if (error === undefined) {
      setState(() => ({
        ...DEFAULT_STORE,
        error,
      }));
    } else {
      setState(draft => {
        draft.error = error;
      });
    }
  }

  return [store, { startAction, update, reportError }];
}
