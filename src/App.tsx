import React, { useRef, useEffect } from 'react';
import * as BABYLON from '@babylonjs/core';
import * as GUI from '@babylonjs/gui'
const BabylonCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // 创建 Babylon.js 引擎
    const engine = new BABYLON.Engine(canvasRef.current, true);
    // 创建 Babylon.js 场景
    const scene = createScene(engine);

    // 运行渲染循环
    engine.runRenderLoop(() => {
      scene.render();
    });

    // 添加 resize 监听器
    window.addEventListener('resize', engine.resize);

    // 组件卸载时清理资源
    return () => {
      engine.dispose();
      scene.dispose();
      window.removeEventListener('resize', engine.resize);
    };
  }, []);
  // const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("myUI", false );
  // const advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("myUI");
  // it can also be changed on the go:
      // advancedTexture.isForeground = false;
  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />;
};

const createScene = (engine) => {
  const scene = new BABYLON.Scene(engine);
  const camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
  camera.setTarget(BABYLON.Vector3.Zero());
  const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
  light.intensity = 0.7;
  const sphere = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 2, segments: 32 }, scene);
  sphere.position.y = 1;
  const ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 6, height: 6 }, scene);
  return scene;
};

export default BabylonCanvas;