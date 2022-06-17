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
      <h2>Courses</h2>
      {/* <Outlet /> */}
      <button onClick={changeFn}>changeState1234</button>
      name: {name}
      <p>arr: {arr}</p>
    </div>
  );
}

export default Courses;
