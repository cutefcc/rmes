import { Canvas } from '@react-three/fiber';
import { ModelsHost } from '@constants/ModelsConfig';
import { OrbitControls, PerspectiveCamera, Html, useProgress, useGLTF } from '@react-three/drei';
import { Physics, usePlane, useBox } from '@react-three/cannon';
import { Suspense } from 'react';
import SkyBox from '@components/ReactThreeFiber/SkyBox';
import Ground from '@components/ReactThreeFiber/Ground';
import Boxs from '@components/ReactThreeFiber/Boxs';
import Ship from '@components/ReactThreeFiber/Ship';

// 涉及到shadow cannon 循环组件 click 事件[原生three绑定事件很麻烦，在react-three中没有这个问题]

function App() {
  return (
    <div className="contentRoot">
      <Canvas shadows={true} camera={{ fov: 75, near: 0.01, far: 1200 }}>
        {/* <Canvas shadows={true} dpr={[1,2]}>  在高清显示器上可能会糊*/}
        <PerspectiveCamera makeDefault position={[0, 10, 50]} />
        <OrbitControls />
        <ambientLight />
        <directionalLight position={[10, 10, 10]} intensity={0.9} castShadow />

        <SkyBox />
        {/* 想要有物理特性，需要用Physics包起来，只需要把需要的包进去 */}
        <Physics gravity={[0, -9.18, 0]} allowSleep>
          <Ground />
          <Boxs />
          <Ship />
        </Physics>
      </Canvas>
    </div>
  );
}

export default App;
