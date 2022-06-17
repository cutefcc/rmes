// import {
//   getState,
//   setState,
//   subscribe,
//   destroy,
//   changeState,
//   store,
// } from "@store/testZustand";
import { useImmer } from '@mmfcc/hooks';
import { memo, useState } from 'react';
function Home() {
  // const [a, setA] = useImmer({ a: 1 });
  const [a, setA] = useState({ a: 1 });
  console.log('home render');
  console.log(process.env.DB_HOST);
  return (
    <div>
      <h2>Home</h2>
      {/* <h2>{getState().name}</h2> */}
      <p
        onClick={() => {
          setA({ a: 1 });
          // setA((draft) => {
          //   draft.a = 1;
          // });
        }}
      >
        a: {a.a}
      </p>
    </div>
  );
}
Home.whyDidYouRender = true;
export default memo(Home);
