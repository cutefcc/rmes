import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Html, useProgress, useGLTF } from '@react-three/drei';
import { Physics, usePlane, useBox } from '@react-three/cannon';
import { Suspense } from 'react';
import SkyBox from '@components/ReactThreeFiber/SkyBox';
import Ground from '@components/ReactThreeFiber/Ground';

// 涉及到shadow cannon 循环组件 click 事件[原生three绑定事件很麻烦，在react-three中没有这个问题]

function App() {
  return (
    <div className="contentRoot">
      <Canvas shadows={true} camera={{ fov: 75, near: 0.01, far: 1200 }}>
        {/* <Canvas shadows={true} dpr={[1,2]}>  在高清显示器上可能会糊*/}
        <PerspectiveCamera makeDefault position={[-8, 12, 32]} />
        <OrbitControls />
        <ambientLight />
        <directionalLight position={[10, 10, 10]} intensity={0.9} castShadow />

        <SkyBox />
        {/* 想要有物理特性，需要用Physics包起来，只需要把需要的包进去 */}
        <Physics gravity={[0, -9.18, 0]} allowSleep>
          <Ground />
        </Physics>
      </Canvas>
    </div>
  );
}

export default App;
