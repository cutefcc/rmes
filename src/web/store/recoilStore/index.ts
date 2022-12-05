import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue } from 'recoil';
export const recoilState = atom({
  key: 'textState', // unique ID (with respect to other atoms/selectors)
  default: 'init recoil value', // default value (aka initial value)
});
