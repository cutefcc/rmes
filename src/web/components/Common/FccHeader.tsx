import { atom, useAtom } from 'jotai';
import { FC, memo, useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const textAtom = atom('hello');
const FccHeader: FC = () => {
  const [uppercase] = useAtom(textAtom);
  const [num, setNum] = useState(0);
  // const init = useCallback(() => {}, []);
  console.log('header - render');
  // console.log('组件初始化🐻...', Math.random());
  //复杂一点 GC
  // useEffect(() => {
  // const init = () => {
  //wasm 计算一个值回来
  // console.log("🐻🍎...", Math.random());
  // };
  // init();
  // }, []);
  return (
    <>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/courses">Courses</Link>
            </li>
            <li>
              <Link to="/nothing-here">Nothing Here</Link>
            </li>
            <li>
              <Link to="/testJotai">testJotai</Link>
            </li>
            <li>
              <Link to="/testReactUse">testReactUse</Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};
export default FccHeader;
