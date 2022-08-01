import { useTexture, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { ModelsHost } from '@constants/ModelsConfig';
import { useLayoutEffect } from 'react';

const SkyBox = () => {
  // 加载textures
  const texture = useTexture(`${ModelsHost}textures/galaxy.jpg`);

  useLayoutEffect(() => {
    texture.wrapS = texture.wrapT = THREE.MirroredRepeatWrapping;
    texture.repeat.set(1.9, 1.9);
  }, [texture]);

  return (
    <>
      <Stars radius={30} depth={20} count={20000} factor={4} saturation={0} fade speed={2} />
      <mesh>
        <sphereGeometry attach="geometry" args={[100, 100, 100]} />
        {/* 带自发光的天空盒 */}
        <meshPhongMaterial
          attach="material"
          emissive={new THREE.Color(0xff2190)}
          emissiveIntensity={0.1}
          side={THREE.BackSide}
          map={texture}
        />
      </mesh>
    </>
  );
};
export default SkyBox;
