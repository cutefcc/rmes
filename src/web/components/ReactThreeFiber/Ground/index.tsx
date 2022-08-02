import { useTexture, Plane } from '@react-three/drei';
import * as THREE from 'three';
import { ModelsHost } from '@constants/ModelsConfig';
import { PLANE_SIZE } from '@constants/SpaceShip';
import { usePlane } from '@react-three/cannon';
const planeColor = new THREE.Color(0x000000);
const Ground = () => {
  // 给plane加上物理效果
  const [ref] = usePlane<THREE.Mesh>(() => ({
    mass: 0,
    rotation: [-Math.PI / 2, 0, 0],
  }));
  return (
    <mesh ref={ref}>
      <planeBufferGeometry attach="geometry" args={[PLANE_SIZE, PLANE_SIZE]} />
      <meshStandardMaterial attach="material" color={planeColor} />
    </mesh>
  );
};
export default Ground;
