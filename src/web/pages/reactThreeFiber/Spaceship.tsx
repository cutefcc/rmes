import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Html, useProgress, useGLTF } from '@react-three/drei';
import { Physics, usePlane, useBox } from '@react-three/cannon';
import { Suspense } from 'react';
import SkyBox from '@components/ReactThreeFiber/SkyBox';

// 涉及到shadow cannon 循环组件 click 事件[原生three绑定事件很麻烦，在react-three中没有这个问题]

function App() {
  return (
    <Canvas shadows={true}>
      <PerspectiveCamera makeDefault position={[-8, 12, 32]} />
      <OrbitControls />
      <ambientLight />
      <directionalLight position={[10, 10, 10]} intensity={0.9} castShadow />
      {/* <Physics></Physics> */}
      <SkyBox />
    </Canvas>
  );
}

export default App;
