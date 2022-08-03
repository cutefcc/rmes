import { useTexture, Plane } from '@react-three/drei';
import * as THREE from 'three';
import { ModelsHost } from '@constants/ModelsConfig';
import { PLANE_SIZE } from '@constants/SpaceShip';
import { usePlane } from '@react-three/cannon';
import { useLayoutEffect } from 'react';
const planeColor = new THREE.Color(0x000000);
const TEXTURE_SIZE = PLANE_SIZE * 0.5;
const Ground = () => {
  const texture = useTexture(`${ModelsHost}/textures/grid-pink.png`);
  useLayoutEffect(() => {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(TEXTURE_SIZE, TEXTURE_SIZE); // x y 都是 100 * 0.5 = 50 个texture
  }, [texture]);
  // 给plane加上物理效果
  // 远处的ground
  const [ground1] = usePlane<THREE.Mesh>(() => ({
    mass: 0,
    rotation: [-Math.PI / 2, 0, 0],
    // position 可以设置plane的位置
    position: [0, 0, -PLANE_SIZE],
  }));
  // 近处的ground
  const [ground2] = usePlane<THREE.Mesh>(() => ({
    mass: 0,
    rotation: [-Math.PI / 2, 0, 0],
    // position 可以设置plane的位置
    position: [0, 0, 0],
  }));

  return (
    <>
      <mesh ref={ground1}>
        <planeBufferGeometry attach="geometry" args={[PLANE_SIZE, PLANE_SIZE]} />
        <meshStandardMaterial
          emissive={planeColor.set(0xffffff)}
          // emissive={new THREE.Color(0xffffff)}
          color={planeColor}
          map={texture}
          emissiveMap={texture}
          emissiveIntensity={1}
          attach="material"
          // 粗糙度 0-1 之间 0为完全粗糙 1为完全光滑
          roughness={1}
          // 材质的光泽度 0-1 之间 0为完全没有光泽 1为完全有光泽
          metalness={0}
        />
      </mesh>
      <mesh ref={ground2}>
        <planeBufferGeometry attach="geometry" args={[PLANE_SIZE, PLANE_SIZE]} />
        <meshStandardMaterial
          emissive={planeColor.set(0xffffff)}
          // emissive={new THREE.Color(0xffffff)}
          color={planeColor}
          map={texture}
          emissiveMap={texture}
          emissiveIntensity={1}
          attach="material"
          // 粗糙度 0-1 之间 0为完全粗糙 1为完全光滑
          roughness={1}
          // 材质的光泽度 0-1 之间 0为完全没有光泽 1为完全有光泽
          metalness={0}
        />
      </mesh>
    </>
  );
};
export default Ground;
