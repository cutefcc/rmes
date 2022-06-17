import { useEffect, useState } from "react";
import { atom, useAtom } from "jotai";
const textAtom = atom("hello");

const JotaiTearing = () => {
  console.log("页面渲染了 - JotaiTearing");
  const [count, setCount] = useState(0);
  const [text, setText] = useAtom(textAtom);
  useEffect(() => {}, []);
  return (
    <div className="tearing">
      test Tearing
      <div>
        <div>count:{count}</div>
        <div>text:{text}</div>

        <button onClick={() => setCount(Math.random())}>change count</button>
        <button onClick={() => setText(Math.random().toString())}>
          change text
        </button>
      </div>
    </div>
  );
};
export default JotaiTearing;
