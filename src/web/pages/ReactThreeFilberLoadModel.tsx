import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Html, useProgress, useGLTF } from '@react-three/drei';
import { Physics, usePlane, useBox } from '@react-three/cannon';
import { Suspense } from 'react';
import { ModelsHost } from '@constants/ModelsConfig';
// import Loading from '@components/Loading';

// 涉及到 loading process

function App() {
  const Loader = () => {
    const { active, progress, errors, item, loaded, total } = useProgress();
    return <Html center>{progress} % loaded</Html>;
  };
  const LoadAsyncModel = () => {
    const glb = useGLTF(`${ModelsHost}library.glb`);
    return <primitive object={glb.scene}></primitive>;
  };
  return (
    <Canvas shadows={true}>
      {/* 可以改变position来调整camera的距离，起到场景放大缩小功能 */}
      <PerspectiveCamera makeDefault position={[-8, 12, 32]} />
      <OrbitControls />
      <ambientLight />
      {/* <pointLight position={[10, 10, 10]} /> */}
      {/* <directionalLight position={[10, 10, 10]} intensity={0.9} castShadow /> */}
      <Suspense fallback={<Loader />}>
        <LoadAsyncModel />
      </Suspense>
    </Canvas>
  );
}

export default App;
