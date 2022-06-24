import { getState, setState, subscribe, destroy, changeState, store } from '@store/testZustand';

import create from 'zustand';
// const useStore = create(store);
const useStore = create(store);
function Courses() {
  const { name, arr } = useStore();
  console.log('courses render', name);
  const changeFn = () => {
    console.log('12345');
    if (true) {
      console.log('54321');
      changeState();
    }
  };
  return (
    <div>
      <h2>test zustand</h2>
      <button onClick={changeFn}>changeZustandState</button>
      name: {name}
      <p>arr: {arr}</p>
    </div>
  );
}

export default Courses;
