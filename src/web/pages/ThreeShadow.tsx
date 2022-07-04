import * as THREE from 'three';
import { Mesh } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import gsap from 'gsap';
import { memo, useEffect } from 'react';
import { LightConstants } from '@babylonjs/core/Lights/lightConstants';

// 相机： 视角、宽高比、近裁剪面、远裁剪面
// fov — Camera frustum vertical field of view. Default value is 50.
// aspect — Camera frustum aspect ratio. Default value is 1.
// near — Camera frustum near plane. Default value is 0.1.
// far — Camera frustum far plane. Default value is 2000.
// zNear 和 zFar 是近裁剪面和远裁剪面的距离，这两个值越小，就越接近真实世界，越大，就越远离真实世界。
// 如果 zNear 和 zFar 的值相同，那么相机就是一个正交相机。就没有近大远小的效果了
// zNear 和 zFar之间的距离就是相机的视角。
// zFar 一定要大于 zNear，否则会出现渲染问题。
let clickNum = 0;
const raycaster = new THREE.Raycaster();
let pointer = new THREE.Vector2();
let mixer: THREE.AnimationMixer;
function bindEvent<T extends THREE.Object3D>(
  renderer,
  scene: THREE.Scene,
  target: T,
  type: string,
  callback: (intersect: THREE.Intersection<T>[]) => void
) {
  renderer?.domElement.addEventListener(type, () => {
    // 单个 判断射线是否与我们的mesh相交
    // const intersects = this.raycaster.intersectObject<T>(target);
    // 多个
    const intersects = raycaster.intersectObjects<T>(scene.children);
    // scene.children 是一个数组，里面存放的是所有的mesh
    if (intersects.length > 0) {
      callback(intersects);
    }
  });
}

function ThreeShadow() {
  const createLight = (scene: THREE.Scene) => {
    scene.add(new THREE.AmbientLight(0xffffff, 0.5)); // 环境光，颜色，强度
    const light = new THREE.DirectionalLight(0xffffff, 3); // 平行光，颜色，强度
    light.position.set(3, 0, 3);
    light.castShadow = true; // 平行光设置 投影

    light.shadow.mapSize.width = 512; // 平行光投影 的 宽度
    light.shadow.mapSize.height = 512; // 平行光投影 的 长度
    light.shadow.radius = 2;

    light.shadow.camera.near = 0.5;
    light.shadow.camera.far = 30;

    light.shadow.camera.visible = true;
    // 添加灯光到场景
    scene.add(light);
    // 灯光helper
    // const helper = new THREE.DirectionalLightHelper(light);
    // scene.add(helper);
    // // camerraHeaper
    // const cameraHelper = new THREE.CameraHelper(light.shadow.camera);
    // scene.add(cameraHelper);
  };

  const createGround = (scene: THREE.Scene) => {
    const planeGeometry = new THREE.PlaneGeometry(10, 10);
    const plane = new THREE.Mesh(planeGeometry, new THREE.MeshPhongMaterial());
    plane.position.y = 0;
    plane.receiveShadow = true;
    scene.add(plane);
  };
  const addBox = (scene: THREE.Scene, renderer) => {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    cube.castShadow = true; //  消费投影
    cube.position.z = 1.5;
    gsap.to(cube.rotation, {
      duration: 3,
      z: Math.PI * 2,
      repeat: -1,
      yoyo: true,
      ease: 'linear',
    });

    // 绑定click 事件
    bindEvent(renderer, scene, cube, 'click', intersect => {
      clickNum++;
      console.log('cube click', intersect, clickNum);
      if (intersect.length > 0) {
        intersect.forEach(item => {
          // 可以根据这个id去判断是点击的哪一个mesh
          if (item.object.id === 16) {
            if (clickNum % 2 === 0) {
              item.object.material.color.set(0x00ff00);
            } else {
              item.object.material.color.set(0xff0000);
            }
          } else {
            if (clickNum % 2 === 0) {
              item.object.material.color.set(0x0000ff);
            } else {
              item.object.material.color.set(0xff6000);
            }
          }
        });
      }
    });
    scene.add(cube);
  };

  useEffect(() => {
    const canvas = document.querySelector<HTMLCanvasElement>('#canvas')!;
    // 相机
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true }); // antialias 扛锯齿
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    // 场景
    const scene = new THREE.Scene();

    scene.add(camera);
    const controls = new OrbitControls(camera, renderer.domElement);
    camera.position.z = 3;
    // 将灯光添加到场景
    createLight(scene);
    // 添加地面
    createGround(scene);
    // 添加立方体
    addBox(scene, renderer);
    // 理解为轨道相机
    controls.update();
    const clock = new THREE.Clock();

    renderer.domElement.addEventListener('pointermove', event => {
      // 计算一个 -1 到 1的值，pointer 就能实时取到我们光标的位置
      pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
    });
    function animate() {
      requestAnimationFrame(animate);
      // 更新射线 发射射线
      raycaster.setFromCamera(pointer, camera);
      controls.update();
      // 更新动画
      mixer?.update(clock.getDelta());
      renderer.render(scene, camera);
    }

    animate();
  }, []);

  return <canvas id="canvas" className="w-full h-full"></canvas>;
}
export default memo(ThreeShadow);
