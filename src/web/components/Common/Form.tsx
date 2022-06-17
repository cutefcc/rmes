import { ChangeEvent, ChangeEventHandler, useEffect, useRef } from 'react';
interface AppProps {
  //BAD 没有考虑到数组
  children1: JSX.Element;
  //BAD 不能接受stribg
  children2: JSX.Element[];
  //BAD 不是类型 具体方法
  children3: React.ReactChildren;
  //better 接受类型
  children4: React.ReactNode;
  children5: React.ReactNode[];
  //给组件一些样式
  children6: React.CSSProperties;
  props: React.ComponentPropsWithoutRef<'button'>;
}
export type { AppProps };

/**
 * React所有的表单事件
 * 1.AnimationEvent CSS动画
 * 2.ChangeEvent input select
 * 3.ClipboardEvent
 * 4.CompositionEvent 组合事件 间接输入文本
 * 5.DragEvent
 * 6.FocusEvent
 * 7.FormEvent 表单提交的时候
 * 8.InvalidEvent 无效事件
 * 9.KeyboardEvent
 * 10.MouseEvent
 * 11.PointerEvent
 * 12.TouchEvent
 * 13.TransitionEvent
 * 14.UIEvent 综合事件
 * 15.WheelEvent
 * 16.SyntheticEvent
 */
// routes -> mui

// MouseEvent + React.MouseEvent(React.createElement('div'));
const App = (): JSX.Element => {
  const divRef = useRef<HTMLInputElement | null>(null!);
  const fn: ChangeEventHandler<HTMLInputElement> = e => {
    return e.target.value + '$';
  };
  const fn2 = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  useEffect(() => {}, []);
  return (
    <>
      loading...
      <hr />
      <input ref={divRef} onChange={fn} />
      <input
        type="text"
        onChange={e => {
          fn2(e);
        }}
      />
    </>
  );
};

interface IProps {
  msg: string;
}
const defaultProps = {
  age: 25,
};

const GreetComponent = ({ msg, age }: IProps & typeof defaultProps) => (
  <div>{`Hello, my name is ${msg}, ${age}`}</div>
);
GreetComponent.defaultProps = defaultProps;
//bad case
// const TestComponent = (props: ComponentProps<typeof GreetComponent>) => {
//   return <h1>{props.msg}</h1>;
// };

type ComponentProps<T> = T extends React.ComponentType<infer P> | React.Component<infer P>
  ? JSX.LibraryManagedAttributes<T, P>
  : never;

const TestComponent = (props: ComponentProps<typeof GreetComponent>) => {
  return <h1>{props.msg}</h1>;
};

const App2 = () => {
  return <TestComponent msg="hello" />;
};
export { App2 };
export default App;
