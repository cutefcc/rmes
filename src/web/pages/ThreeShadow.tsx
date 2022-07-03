import * as THREE from 'three';
import { Mesh } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import gsap from 'gsap';
import { memo, useEffect } from 'react';

// 相机： 视角、宽高比、近裁剪面、远裁剪面
// fov — Camera frustum vertical field of view. Default value is 50.
// aspect — Camera frustum aspect ratio. Default value is 1.
// near — Camera frustum near plane. Default value is 0.1.
// far — Camera frustum far plane. Default value is 2000.
// zNear 和 zFar 是近裁剪面和远裁剪面的距离，这两个值越小，就越接近真实世界，越大，就越远离真实世界。
// 如果 zNear 和 zFar 的值相同，那么相机就是一个正交相机。就没有近大远小的效果了
// zNear 和 zFar之间的距离就是相机的视角。
// zFar 一定要大于 zNear，否则会出现渲染问题。

let mixer: THREE.AnimationMixer;

const createLight = scene => {
  const light = new THREE.DirectionalLight();
  light.castShadow = true;
  light.shadow.mapSize.width = 512;
  light.shadow.mapSize.height = 512;
  light.shadow.camera.near = 0.5;
  light.shadow.camera.far = 100;
  scene.add(light);

  //const helper = new THREE.DirectionalLightHelper(light);
  const helper = new THREE.CameraHelper(light.shadow.camera);
  scene.add(helper);
};

const createGround = scene => {
  const planeGeometry = new THREE.PlaneGeometry(100, 20);
  const plane = new THREE.Mesh(planeGeometry, new THREE.MeshPhongMaterial());
  plane.rotateX(-Math.PI / 2);
  plane.position.y = -1.75;
  plane.receiveShadow = true;
  scene.add(plane);
};

const addBox = scene => {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
  cube.castShadow = true; //  消费投影
  cube.receiveShadow = true; //default
  cube.position.y = 3.5;
  gsap.to(cube.rotation, {
    duration: 3,
    y: Math.PI * 2,
    repeat: -1,
    yoyo: true,
    ease: 'linear',
  });

  return cube;
};

function ThreeShadow() {
  useEffect(() => {
    const canvas = document.querySelector<HTMLCanvasElement>('#canvas')!;
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true }); // antialias 扛锯齿
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    // renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
    const scene = new THREE.Scene();
    scene.add(camera);
    // document.body.appendChild(renderer.domElement);
    const controls = new OrbitControls(camera, renderer.domElement);
    camera.position.z = 3;

    createLight(scene);

    createGround(scene);
    addBox(scene);
    // 理解为轨道相机
    controls.update();
    const clock = new THREE.Clock();
    function animate() {
      requestAnimationFrame(animate);
      controls.update();
      // 更新动画
      mixer?.update(clock.getDelta());
      renderer.render(scene, camera);
    }

    animate();
  }, []);

  return (
    <>
      <canvas id="canvas" className="w-full h-full"></canvas>
    </>
  );
}
export default memo(ThreeShadow);
