import create from 'zustand/vanilla';
import { immer } from 'zustand/middleware/immer';
import { Web3ReactState } from './types';

// zustand/vanilla 不依赖react
const DEFAULT_STORE = {
  accounts: undefined,
  chainId: undefined,
  active: false,
  error: undefined,
};

export function createWeb3ReactStoreAndActions() {
  // 引入zustand/middleware/immer 解决 Re-render 问题
  const store = create(immer<Web3ReactState>(() => DEFAULT_STORE));
  const { getState, setState, subscribe, destroy } = store;

  function changeState() {
    console.log('changeState');
    // setState({
    //   name: "cutefcc-new" + Math.random(),
    // });
    // bad case: 会触发Re-render 引入zustand/middleware/immer 就可以解决这个问题
    // setState({ name: "cutefcc", age: 31 });
    // good case
    setState(draft => {
      // immer 的好处，⬇️这样写 只会render 一次
      draft.name = 'cutefcc';
      draft.age = 31;
      // 数组也是 zustand 的一个坑，这样会Re-render
      // draft.arr = [1234];
    });
  }
  return { getState, setState, subscribe, destroy, store };
}
