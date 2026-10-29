"use client";

import { useRef, useEffect } from "react";
import * as THREE from "three";
export const geometryMap = {
  Box: THREE.BoxGeometry,
  Sphere: THREE.SphereGeometry,
  Cylinder: THREE.CylinderGeometry,
  Cone: THREE.ConeGeometry,
  Torus: THREE.TorusGeometry,
  TorusKnot: THREE.TorusKnotGeometry
} as const;

export type ShapeType = keyof typeof geometryMap;

export interface ShapeProps {
  shape: ShapeType;
  color?: string;
}

export default function Shape({ shape, color }: ShapeProps) {
  const boxRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = boxRef.current;
    if (!canvas) return;

    let width = canvas.clientWidth || window.innerWidth;
    let height = canvas.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("white")
    const GeometryClass = geometryMap[shape] || THREE.CylinderGeometry;
    const geometry = new GeometryClass(1, 1, 1);

    const material = new THREE.MeshStandardMaterial({
      color,
      roughness: 0.5,
      metalness: 0,
    });
    const obj = new THREE.Mesh(geometry, material);
    obj.castShadow = true;
    obj.receiveShadow = true;
    const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);
    scene.add(obj);

    const camera = new THREE.PerspectiveCamera(
      75,
      width / height,
      0.1,
      100
    );

    camera.position.z = 3;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
    });

    renderer.setSize(width, height);

    const clock = new THREE.Clock();
    let animationId = 0;

    function animate() {
      const delta = clock.getDelta();

      obj.rotation.x += delta;
      obj.rotation.y += delta * 2;

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    }

    animate();

    function handleResize() {
      if (!canvas) return;
      width = canvas.clientWidth || window.innerWidth;
      height = canvas.clientHeight || window.innerHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);

      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [shape, color]);

  return <canvas ref={boxRef} className="block h-full w-full" />;
}
