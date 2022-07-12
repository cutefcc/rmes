import { memo, useState } from 'react';

function Css2022() {
  const [show, setShow] = useState(false);
  return (
    <>
      <dialog open={show} className="border-2 rounded border-sky-600">
        <p>html 原生的 弹窗!</p>
        {/* <form method="dialog"> */}
        <div className="flex justify-between mt-10">
          <button
            onClick={() => {
              setShow(!show);
            }}
            className="bg-indigo-500 px-10 py-5 rounded text-white"
          >
            OK
          </button>
          <button
            onClick={() => {
              setShow(!show);
            }}
            className="bg-indigo-500 px-10 py-5 rounded text-white"
          >
            cancel
          </button>
        </div>
        {/* </form> */}
      </dialog>

      <button
        onClick={() => {
          setShow(!show);
        }}
        className="bg-indigo-500 px-10 py-5 rounded text-white"
      >
        {show ? 'hide dialog' : 'show dialog'}
      </button>
    </>
  );
}

export default memo(Css2022);
