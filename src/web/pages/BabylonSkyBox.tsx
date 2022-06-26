import { useImmer } from '@mmfcc/hooks';
import * as BABYLON from '@babylonjs/core';
import { memo, useEffect, useState } from 'react';
import gsap from 'gsap';
import { store } from '@store/jotaiStore/testJotai';
import { useAtom } from 'jotai';
import * as echarts from 'echarts';
import { ModelsHost } from '@constants/ModelsConfig';
import { createEngine } from '@utils/babylonEngine';

class GameScene extends BABYLON.Scene {
  constructor(engine: BABYLON.Engine) {
    super(engine);
    this.createCamera();
    this.createLight();
    this.createSkyBox();
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
    const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 0), this);
    light.intensity = 0.7;
  }
  // 私有属性、方法，v8对其做了很多优化

  createSkyBox() {
    const skyBox = BABYLON.MeshBuilder.CreateBox(
      'skyBox',
      { size: 50.0, sideOrientation: BABYLON.Mesh.BACKSIDE },
      this
    );
    // const meterial = new BABYLON.StandardMaterial("skyBox", this);
    const meterial = new BABYLON.BackgroundMaterial('skyBox', this);
    meterial.reflectionTexture = new BABYLON.CubeTexture(
      `${ModelsHost}images/skybox_img/bg`,
      this,
      ['_px', '_py', '_pz', '_nx', '_ny', '_nz'].map(i => `${i}.webp`)
    );
    meterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skyBox.material = meterial;
    gsap.to(skyBox.rotation, {
      y: Math.PI * 2,
      duration: 10,
      repeat: -1,
      ease: 'linear',
      yoyo: true,
    });
  }
}

function BabylonSkyBox() {
  useEffect(() => {
    createEngine().then(engine => {
      // create scene
      const scene = new GameScene(engine);
      // scene.debugLayer.show({
      //   embedMode: true,
      // });
      /*
      // create ground
      const ground = BABYLON.MeshBuilder.CreateGround('ground', { width: 20, height: 20 }, scene);
      // give ground color
      // let groundMaterial = new BABYLON.StandardMaterial("Ground Material", scene);
      const groundMat = new BABYLON.StandardMaterial('groundMat');
      groundMat.diffuseColor = new BABYLON.Color3(0, 10, 0);
      ground.material = groundMat; //Place the material property of the ground
      // ground.material = groundMaterial;
*/
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
export default memo(BabylonSkyBox);
