import { useImmer } from '@mmfcc/hooks';
import { memo, useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { store } from '@store/jotaiStore/testJotai';

import { recoilState } from '@store/recoilStore';
import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue } from 'recoil';

import {
  getState,
  setState,
  subscribe,
  destroy,
  changeState,
  store as zustandStore,
} from '@store/zustandStore/testZustand';
import create from 'zustand';
const useStore = create(zustandStore);
function TestStore() {
  const [obj, setObj] = useAtom(store);
  const [data, setData] = useImmer({ owner_list: [] });
  const [a, setA] = useState({ a: 1 });
  const { name, arr, age } = useStore();
  const [recoilVal, setRecoilVal] = useRecoilState(recoilState);
  console.log('home render');
  useEffect(() => {
    // fetch('https://my-app.cutefcc.workers.dev/api/ent/project/has_position')
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log('data', data);
    //     setData(data.data);
    //   });
  }, []);
  return (
    <div>
      {/* <h2>Home</h2>
      <h2>{getState().name}</h2>
      <p
        onClick={() => {
          setA((draft) => {
            draft.a = 1;
          });
        }}
      >
        a: {a.a}
      </p>
      <p>fetch 接口 test</p>
      {data.owner_list.map((item, index) => {
        return (
          <div key={index}>
            <p>{item.name}</p>
          </div>
        );
      })} */}
      <p>test jotai: {obj.str}</p>
      <p>
        test zustand: name: {name}, arr: {arr}, age: {age}
      </p>
      <p>test recoil: value: {recoilVal}</p>
    </div>
  );
}
TestStore.whyDidYouRender = true;
export default memo(TestStore);
