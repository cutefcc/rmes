import { useEffect, useState, startTransition } from "react";

let externalState = { counter: 0 };
let listeners: any[] = [];

function dispatch(action: { type: any }) {
  if (action.type === "increment") {
    externalState = { counter: externalState.counter + 1 };
  } else {
    throw Error("Unknown action");
  }
  listeners.forEach((fn) => fn());
}

function subscribe(fn: () => void) {
  listeners = [...listeners, fn];
  return () => {
    listeners = listeners.filter((f) => f !== fn);
  };
}

function useExternalData() {
  const [state, setState] = useState(externalState);
  useEffect(() => {
    const handleChange = () => setState(externalState);
    const unsubscribe = subscribe(handleChange);
    return unsubscribe;
  }, []);
  return state;
}

setInterval(() => {
  dispatch({ type: "increment" });
}, 50);

export default function Tearing() {
  const [show, setShow] = useState(false);
  return (
    <div className="App">
      <button
        onClick={() => {
          // 这里不是普通的setShow，这里startTransition，当我点击时有的组件已经排在fiber task里面渲染完了，有的还没有渲染完
          startTransition(() => {
            setShow(!show);
          });
        }}
      >
        toggle content
      </button>
      {show && (
        <>
          <SlowComponent />
          <SlowComponent />
          <SlowComponent />
          <SlowComponent />
          <SlowComponent />
        </>
      )}
    </div>
  );
}

function SlowComponent() {
  let now = performance.now();
  while (performance.now() - now < 200) {
    // do nothing
  }
  const state = useExternalData();
  return <h3>Counter: {state.counter}</h3>;
}
