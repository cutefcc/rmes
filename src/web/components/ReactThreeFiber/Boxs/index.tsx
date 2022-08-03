import { BOX_SIZE, BOX_COUNT, PLANE_SIZE } from '@constants/SpaceShip';
import { useBox, Triplet } from '@react-three/cannon';
import * as THREE from 'three';
import { randomRange } from '@utils/randomRange';
const args: Triplet = [BOX_SIZE, BOX_SIZE, BOX_SIZE];
const Boxs = () => {
  const [ref] = useBox<THREE.InstancedMesh>(() => ({
    mass: 1,
    args,
    // x y z 坐标
    position: [randomRange(-50, 50), 20, randomRange(-50, 0)],
  }));
  return (
    // 具有实例渲染支持的特殊版本的 Mesh。如果您必须渲染大量具有相同几何和材质但具有不同世界变换的对象，请使用 InstancedMesh。 InstancedMesh 的使用将帮助您减少绘制调用的数量，从而提高应用程序的整体渲染性能。
    // https://threejs.org/docs/#api/en/objects/InstancedMesh
    <instancedMesh ref={ref} args={[undefined, undefined, BOX_COUNT]}>
      <boxBufferGeometry attach="geometry" />
      <meshBasicMaterial attach="material" color="hotpink" />
    </instancedMesh>
  );
};
export default Boxs;
