import { ModelsHost } from '@constants/ModelsConfig';
import { useGLTF } from '@react-three/drei';

const Ship = () => {
  const { scene } = useGLTF(`${ModelsHost}bull_dog/scene.gltf`);
  return <primitive object={scene} />;
};
export default Ship;
