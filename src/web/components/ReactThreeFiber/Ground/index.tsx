import { useTexture, Plane } from '@react-three/drei';
import * as THREE from 'three';
import { ModelsHost } from '@constants/ModelsConfig';
import { PLANE_SIZE } from '@constants/SpaceShip';
const planeColor = new THREE.Color(0x000000);
const Ground = () => {
  return (
    <mesh>
      <planeBufferGeometry attach="geometry" args={[PLANE_SIZE, PLANE_SIZE]} />
      <meshStandardMaterial attach="material" color={planeColor} />
    </mesh>
  );
};
export default Ground;
