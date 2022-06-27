import {
  getState,
  setState,
  subscribe,
  destroy,
  changeState,
  handleAddZustandAge,
  store,
} from '@store/zustandStore/testZustand';
import create from 'zustand';
const useStore = create(store);
const str = 'bg-indigo-500 px-10 py-5 rounded text-white';

function TestZustand() {
  const { name, arr, age } = useStore();
  console.log('TestZustand render', name);
  const changeFn = () => {
    console.log('madify zustand store');
    changeState();
  };
  const handleAddAge = () => {
    handleAddZustandAge();
  };
  return (
    <div>
      <h2>test zustand</h2>
      <p>name: {name}</p>
      <p>arr: {arr}</p>
      <p>age: {age}</p>
      <button onClick={changeFn} className={str}>
        change Zustand State
      </button>
      <button onClick={handleAddAge} className={str}>
        add age
      </button>
    </div>
  );
}

export default TestZustand;
