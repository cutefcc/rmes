import * as BABYLON from '@babylonjs/core';
import '@babylonjs/loaders';
import '@babylonjs/inspector';
import gsap from 'gsap';
import * as earcut from 'earcut';
import { BabylonFileLoaderConfiguration } from '@babylonjs/core';
import { memo, useEffect } from 'react';
import { createEngine } from '@utils/babylonEngine';
import { ModelsHost } from '@constants/ModelsConfig';
import GameScene from './PbrGameScene';
(window as any).earcut = earcut;

function Pbr() {
  useEffect(() => {
    createEngine().then(engine => {
      // create scene
      const scene = new GameScene(engine);
      //   scene.debugLayer.show({
      //     embedMode: true,
      //   });

      const ground = BABYLON.MeshBuilder.CreateGround('ground', { width: 20, height: 20 }, scene);

      const pbr = new BABYLON.PBRMaterial('prb', scene);

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
      gsap.to(ground.rotation, {
        y: Math.PI * 2,
        duration: 10,
        repeat: -1,
        ease: 'linear',
        yoyo: true,
      });
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
