import { recoilState } from '@store/recoilStore';
import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue } from 'recoil';

const str = 'bg-indigo-500 px-10 py-5 rounded text-white';

function TestRecoil() {
  const [state, setState] = useRecoilState(recoilState);

  return (
    <div>
      <h2>test recoil</h2>
      <p>value: {state}</p>
      <button onClick={() => setState(state + 'a')} className={str}>
        change recoil State
      </button>
    </div>
  );
}

export default TestRecoil;
