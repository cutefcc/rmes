import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Physics, usePlane, useBox } from '@react-three/cannon';

// 涉及到shadow cannon 循环组件 click 事件

type BoxProps = {
  key: number;
  position: [x: number, y: number, z: number];
};
function App() {
  const Floor = () => {
    // 用了这种方式，rotation position 只能在里面设置，不能写在mesh上（不生效）
    const [plane] = usePlane<THREE.Mesh>(() => ({
      mass: 0,
      rotation: [-Math.PI / 2, 0, 0],
      position: [0, -0.5, 0],
    }));
    return (
      <mesh ref={plane} receiveShadow>
        <planeGeometry attach="geometry" args={[40, 40]} />
        <meshStandardMaterial attach="material" color="blue" />
      </mesh>
    );
  };
  const Box = (props: BoxProps) => {
    const [ref, api] = useBox<THREE.Mesh<THREE.BoxGeometry, THREE.MeshStandardMaterial>>(() => ({
      mass: 1,
      position: props.position,
    }));
    return (
      <mesh
        ref={ref}
        castShadow
        onClick={e => {
          // console.log('click', e);
          ref.current?.material.color.set('green');
        }}
      >
        <boxGeometry attach="geometry" args={[1, 1, 1]} />
        <meshStandardMaterial attach="material" color="hotpink" />
      </mesh>
    );
  };
  const renderBox = () => {
    {
      /* 创建几个个Box */
    }
    return Array.from({ length: 30 }, (_, i) => i).map((_, i) => {
      let x = 0,
        y = 0,
        z = 0;
      if (i === 0) {
        x = 4;
        y = 15;
        z = 0;
      } else if (i === 1) {
        x = 0;
        y = 15;
        z = 4;
      } else if (i === 2) {
        x = -4;
        y = 15;
        z = 0;
      } else if (i === 3) {
        x = 0;
        y = 15;
        z = -4;
      } else {
        x = Math.random() * 10 - 5;
        y = Math.random() * 10;
        z = Math.random() * 10 - 5;
      }

      return <Box key={i} position={[x, y, z]} />;
    });
  };
  return (
    <Canvas shadows={true}>
      {/* 可以改变position来调整camera的距离，起到场景放大缩小功能 */}
      <PerspectiveCamera makeDefault position={[-8, 12, 32]} />
      <OrbitControls />
      <ambientLight />
      {/* <pointLight position={[10, 10, 10]} /> */}
      <directionalLight position={[10, 10, 10]} intensity={0.9} castShadow />
      <Physics>
        {renderBox()}
        <Floor />
      </Physics>
    </Canvas>
  );
}

export default App;
