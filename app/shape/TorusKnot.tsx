
"use client";

import { useRef, useEffect } from "react";
import * as THREE from "three";

interface TorusKnotProps {
  color: string;
}

export default function TorusKnot({ color }: TorusKnotProps) {
  const boxRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = boxRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#fff");

    const geometry = new THREE.TorusKnotGeometry(6, 1.8, 160, 24);

    const material = new THREE.MeshStandardMaterial({
      color,
      roughness: 0.3,
      metalness: 0.4,
      side: THREE.DoubleSide,
    });

    const obj = new THREE.Mesh(geometry, material);
    scene.add(obj);

    const keyLight = new THREE.DirectionalLight(0xffffff, 4);
    keyLight.position.set(8, 10, 12);
    scene.add(keyLight);

    const fillLight = new THREE.PointLight(0x66aaff, 30);
    fillLight.position.set(-8, -3, 8);
    scene.add(fillLight);

    scene.add(new THREE.AmbientLight(0xffffff, 1));

    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0, 40);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(
      canvas.clientWidth || 400,
      canvas.clientHeight || 400
    );

    const clock = new THREE.Clock();
    let animationId = 0;
    let disposed = false;

    function resize() {
        if(!canvas) return;
      const width = canvas.clientWidth || 400;
      const height = canvas.clientHeight || 400;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    }

    function animate() {
      if (disposed) return;

      animationId = requestAnimationFrame(animate);

      const delta = Math.min(clock.getDelta(), 0.05);
      obj.rotation.x += delta * 0.5;
      obj.rotation.y += delta;

      renderer.render(scene, camera);
    }

    window.addEventListener("resize", resize);
    resize();
    animate();

    return () => {
      disposed = true;
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);

      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [color]);

  return <canvas ref={boxRef} className="block h-full w-full" />;
}
