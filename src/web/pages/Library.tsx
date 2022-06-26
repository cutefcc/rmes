import * as BABYLON from '@babylonjs/core';
import '@babylonjs/loaders';
import '@babylonjs/inspector';
import gsap from 'gsap';
import * as earcut from 'earcut';
import { BabylonFileLoaderConfiguration } from '@babylonjs/core';
import { memo, useEffect } from 'react';
import { createEngine } from '@utils/babylonEngine';
import { ModelsHost } from '@constants/ModelsConfig';
(window as any).earcut = earcut;

class GameScene extends BABYLON.Scene {
  constructor(engine: BABYLON.Engine) {
    super(engine);
    this.createCamera();
    this.createLight();
    this.loadModel();
  }

  createCamera() {
    const camera = new BABYLON.ArcRotateCamera(
      'camera',
      (Math.PI / 2) * 0.5,
      Math.PI / 4,
      16,
      BABYLON.Vector3.Zero(),
      this
    );
    camera.attachControl(this.getEngine().getRenderingCanvas());
  }

  createLight() {
    // 环境光，没有阴影
    const light = new BABYLON.HemisphericLight(
      'light',
      // 从+y打下来的光
      new BABYLON.Vector3(0, 1, 0),
      this
    );
    light.intensity = 1;
    // 平行光，让有阴影效果，或者pbr材质显示其效果
    const light2 = new BABYLON.DirectionalLight(
      'light2',
      // 从+z打下来的光
      new BABYLON.Vector3(1, 1, 1),
      this
    );
    light2.intensity = 3;
    light2.diffuse = new BABYLON.Color3(211 / 255, 111 / 255, 111 / 255);
    light2.position = new BABYLON.Vector3(6, 6, 6);
  }

  async loadModel() {
    await BABYLON.SceneLoader.ImportMeshAsync('', `${ModelsHost}`, 'library.glb').then(result => {
      // 缩放
      //   result.meshes[0].scaling = new BABYLON.Vector3(0.02, 0.02, 0.02);
      // 移动
      //   result.meshes[0].position.x = 5;
      //   result.meshes[0].position.y = 5;
      // result.meshes[0].position.z = 5;
      //   result.meshes.forEach(item => {
      //     item.rotation = new BABYLON.Vector3(0, 0, 0);
      //     gsap.to(item.rotation, {
      //       y: Math.PI * 2,
      //       duration: 10,
      //       repeat: -1,
      //       ease: 'linear',
      //       yoyo: true,
      //     });
      //   });
    });
  }
}

function Library() {
  useEffect(() => {
    createEngine().then(engine => {
      // create scene
      const scene = new GameScene(engine);
      engine.runRenderLoop(() => {
        scene.render();
      });
    });
  }, []);

  return (
    <>
      <canvas className="w-full h-full" id="canvas"></canvas>
    </>
  );
}
export default memo(Library);
