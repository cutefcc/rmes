import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';

function App() {
  const Floor = () => (
    <mesh position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry attach="geometry" args={[10, 10]} />
      <meshStandardMaterial attach="material" color="blue" />
    </mesh>
  );
  return (
    <Canvas shadows={true}>
      <PerspectiveCamera makeDefault position={[-2, 3, 8]} />
      <OrbitControls />
      <ambientLight />
      {/* <pointLight position={[10, 10, 10]} /> */}
      <directionalLight position={[10, 10, 10]} intensity={0.9} castShadow />
      <mesh castShadow>
        <boxGeometry attach="geometry" args={[1, 1, 1]} />
        <meshStandardMaterial attach="material" color="hotpink" />
      </mesh>
      <Floor />
    </Canvas>
  );
}

export default App;
