"use client";

import { useRef, useEffect } from "react";
import * as THREE from "three";
import Shape from "./shape/Shape";
import TorusKnot from "./shape/TorusKnot";

const Page = () => {
  const boxRef = useRef<HTMLCanvasElement | null>(null);


  useEffect(() => {
    if(!boxRef.current) return;
    const size = {
      width: boxRef.current.clientWidth || window.innerWidth,
      height: boxRef.current.clientHeight || window.innerHeight,
    };
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("white")
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshMatcapMaterial({ color: "red",fog  : true });
    const clock = new THREE.Clock();
    const obj = new THREE.Mesh(geometry, material);
    
    scene.add(obj);

    if (!boxRef.current) return;

    const camera = new THREE.PerspectiveCamera(
      50,
      size.width / size.height,
      0.1,
      100
    );

    camera.position.z = 3;

    const renderer = new THREE.WebGLRenderer({
      canvas: boxRef.current,
      antialias: true,
    });

    renderer.setSize(size.width, size.height);

    let animationId = 0;

    function animate() {
      const delta = clock.getDelta();
      obj.rotation.x += delta;
      obj.rotation.y += delta * 2;
      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      if(!boxRef.current) return;
      size.width = boxRef.current.clientWidth || window.innerWidth;
      size.height = boxRef.current.clientHeight ||window.innerHeight;

      camera.aspect = size.width / size.height;
      camera.updateProjectionMatrix();
      renderer.setSize(size.width, size.height);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="flex h-screen w-full flex-row">
      <div className="grid w-full grid-rows-3 gap-4">
        <canvas ref={boxRef} className="" />
        <Shape shape="Cylinder" color="orange" />
        <TorusKnot color="red" />
      </div>
    </div>
  );
};

export default Page;