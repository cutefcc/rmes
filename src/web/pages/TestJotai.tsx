import { memo } from 'react';
import { useAtom } from 'jotai';
import { store } from '@store/jotaiStore/testJotai';
const str = 'bg-indigo-500 px-10 py-5 rounded text-white';
function TestJotai() {
  // const [obj, setObj] = useImmerAtom(store);
  const [obj, setObj] = useAtom(store);

  // const [obj, setObj] = useState({ str: "init str" });
  console.log('TestJotai -- render', obj.str);
  //   const [obj, setObj] = useAtom(store);

  const changeFn = () => {
    //jotai 👇这样写还是会重复渲染  避免这种写法
    // setObj({ str: 'init str new' });
    // write like this,  immer working
    setObj(draft => {
      draft.str = 'init str new';
    });
  };
  return (
    <div>
      <h2>TestJotai-3</h2>
      <p>str: {obj.str}</p>
      <button onClick={changeFn} className={str}>
        changeState
      </button>
      <input />
    </div>
  );
}
TestJotai.whyDidYouRender = true;
export default memo(TestJotai);
