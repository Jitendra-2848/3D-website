"use client";

import { useRef, useEffect } from "react";
import * as THREE from "three";

const Page = () => {
  const boxRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: "red" });
    const clock = new THREE.Clock();
    const Timer = new THREE.Timer();
    const obj = new THREE.Mesh(geometry, material);
    scene.add(obj);
    if(!boxRef.current) return;

    const camera = new THREE.PerspectiveCamera(
      100,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );

    camera.position.z = 3;

    const renderer = new THREE.WebGLRenderer({
      canvas: boxRef.current,
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    
    function animate() {
      const delta = clock.getElapsedTime();
      Timer.update();
      const TimerDelta = Timer.getDelta(); 
      obj.rotation.x += TimerDelta;
      obj.rotation.y = delta * 2;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }

    animate();
    
    return () => {
      renderer.dispose();
    };
  }, []);





  return <canvas className="h-screen" ref={boxRef}></canvas>;
};

export default Page;