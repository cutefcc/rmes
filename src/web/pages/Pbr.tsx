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
    await BABYLON.SceneLoader.ImportMeshAsync(
      '',
      `${ModelsHost}robot_steampunk_3d-coat_4.5_pbr/`,
      'gltf_to_glb.glb'
    ).then(result => {
      // 缩放
      result.meshes[0].scaling = new BABYLON.Vector3(0.02, 0.02, 0.02);
      // 移动
      //   result.meshes[0].position.x = 5;
      //   result.meshes[0].position.y = 5;
      //   result.meshes[0].position.z = 5;
    });
  }
}

function Pbr() {
  useEffect(() => {
    createEngine().then(engine => {
      // create scene
      const scene = new GameScene(engine);
      //   scene.debugLayer.show({
      //     embedMode: true,
      //   });

      const ground = BABYLON.MeshBuilder.CreateGround('ground', { width: 20, height: 20 }, scene);

      const pbr = new BABYLON.PBRMaterial('prb', this);

      pbr.albedoTexture = new BABYLON.Texture(
        `${ModelsHost}pbr/assets/texture/TexturesCom_Metal_TreadplateBare_1K_albedo.jpg`
      );
      pbr.ambientTexture = new BABYLON.Texture(
        `${ModelsHost}pbr/assets/texture/TexturesCom_Metal_TreadplateBare_1K_ao.jpg`
      );
      pbr.metallicTexture = new BABYLON.Texture(
        `${ModelsHost}pbr/assets/texture/TexturesCom_Metal_TreadplateBare_1K_metallic.jpg`
      );
      pbr.bumpTexture = new BABYLON.Texture(
        `${ModelsHost}pbr/assets/texture/TexturesCom_Metal_TreadplateBare_1K_normal.jpg`
      );
      pbr.microSurfaceTexture = new BABYLON.Texture(
        `${ModelsHost}pbr/assets/texture/TexturesCom_Metal_TreadplateBare_1K_roughness.jpg`
      );
      pbr.useParallax = true; // 是否使用视差效果  视差贴
      pbr.useParallaxOcclusion = true; // 是否使用视差遮盖

      ground.material = pbr;
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
export default memo(Pbr);
