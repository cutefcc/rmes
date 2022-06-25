import * as BABYLON from '@babylonjs/core';
import '@babylonjs/loaders';
import '@babylonjs/inspector';
import gsap from 'gsap';
import * as earcut from 'earcut';
(window as any).earcut = earcut;

const IsSupportGPU: () => boolean = () => 'gpu' in navigator;
export const createEngine = async () => {
  const isSupportGPU = IsSupportGPU();
  console.log('isSupportGPU', isSupportGPU);
  const canvas = document.querySelector<HTMLCanvasElement>('#canvas')!;
  let engine;
  if (!isSupportGPU) {
    engine = new BABYLON.Engine(canvas, true);
    return engine;
  } else {
    engine = new BABYLON.WebGPUEngine(canvas);
    await engine.initAsync();
    return engine;
  }
};
