// import {
//   getState,
//   setState,
//   subscribe,
//   destroy,
//   changeState,
//   store,
// } from "@store/testZustand";
import { useImmer } from '@mmfcc/hooks';
import { memo, useEffect, useState } from 'react';
function Home() {
  const [data, setData] = useImmer({ owner_list: [] });
  const [a, setA] = useState({ a: 1 });
  console.log('home render');
  console.log(process.env.DB_HOST);
  useEffect(() => {
    fetch('https://my-app.cutefcc.workers.dev/api/ent/project/has_position')
      .then(response => response.json())
      .then(data => {
        console.log('data', data);
        setData(data.data);
      });
  }, []);
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
      <p>fetch 接口 test</p>
      {data.owner_list.map((item, index) => {
        return (
          <div key={index}>
            <p>{item.name}</p>
          </div>
        );
      })}
    </div>
  );
}
Home.whyDidYouRender = true;
export default memo(Home);
