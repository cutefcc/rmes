import { memo, useState } from 'react';
import { atom, useAtom } from 'jotai';
import { atomWithImmer, useImmerAtom } from 'jotai/immer';

const store = atomWithImmer({ str: 'init str' });
// const store = atom({ str: "init str" });

function TestJotai() {
  // const [obj, setObj] = useImmerAtom(store);
  const [obj, setObj] = useAtom(store);

  // const [obj, setObj] = useState({ str: "init str" });
  console.log('TestJotai -- render', obj.str);
  //   const [obj, setObj] = useAtom(store);

  const changeFn = () => {
    //jotai 👇这样写还是会重复渲染
    // setObj({ str: "init str new" });
    // write like this, why immer not working
    setObj(draft => {
      draft.str = 'init str new';
    });
  };
  return (
    <div>
      <h2>TestJotai</h2>
      <p>str: {obj.str}</p>
      <button onClick={changeFn}>changeState</button>
    </div>
  );
}
TestJotai.whyDidYouRender = true;
export default memo(TestJotai);
