"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export type ShapeType =
  | "Box"
  | "Capsule"
  | "Circle"
  | "Cone"
  | "Cylinder"
  | "Dodecahedron"
  | "Edges"
  | "Extrude"
  | "Icosahedron"
  | "Lathe"
  | "Octahedron"
  | "Plane"
  | "Polyhedron"
  | "Ring"
  | "Shape"
  | "Sphere"
  | "Tetrahedron"
  | "Torus"
  | "TorusKnot"
  | "Tube"
  | "Wireframe";

export interface ShapeProps {
  shape: ShapeType;
  color?: string;
}

function createStarShape() {
  const shape = new THREE.Shape();
  for (let point = 0; point < 10; point += 1) {
    const radius = point % 2 === 0 ? 1 : 0.45;
    const angle = (point / 10) * Math.PI * 2 - Math.PI / 2;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;

    if (point === 0) {
      shape.moveTo(x, y);
    } else {
      shape.lineTo(x, y);
    }
  }
  shape.closePath();
  return shape;
}

export default function Shape({ shape, color = "#ffffff" }: ShapeProps) {
  const boxRef = useRef<HTMLCanvasElement | null>(null);
  const isRotatingRef = useRef(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isRotating, setIsRotating] = useState(false);

  useEffect(() => {
    const canvas = boxRef.current;
    if (!canvas) return;

    setIsLoading(true);

    let width = canvas.clientWidth || window.innerWidth;
    let height = canvas.clientHeight || window.innerHeight;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("black");

    let geometry: THREE.BufferGeometry;
    let supportingGeometry: THREE.BufferGeometry | undefined;
    let isLineGeometry = false;
    switch (shape) {
      case "Box":
        geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
        break;
      case "Capsule":
        geometry = new THREE.CapsuleGeometry(0.65, 0.8, 8, 16);
        break;
      case "Circle":
        geometry = new THREE.CircleGeometry(1, 48);
        break;
      case "Cone":
        geometry = new THREE.ConeGeometry(1, 2, 32);
        break;
      case "Cylinder":
        geometry = new THREE.CylinderGeometry(1, 1, 2, 32);
        break;
      case "Dodecahedron":
        geometry = new THREE.DodecahedronGeometry(1.2);
        break;
      case "Edges":
        supportingGeometry = new THREE.BoxGeometry(1.7, 1.7, 1.7);
        geometry = new THREE.EdgesGeometry(supportingGeometry);
        isLineGeometry = true;
        break;
      case "Extrude":
        geometry = new THREE.ExtrudeGeometry(createStarShape(), {
          depth: 0.5,
          bevelEnabled: true,
          bevelSegments: 2,
          bevelSize: 0.06,
          bevelThickness: 0.06,
        });
        geometry.translate(0, 0, -0.25);
        break;
      case "Icosahedron":
        geometry = new THREE.IcosahedronGeometry(1.2);
        break;
      case "Lathe":
        geometry = new THREE.LatheGeometry(
          [
            new THREE.Vector2(0.35, -1),
            new THREE.Vector2(0.7, -0.7),
            new THREE.Vector2(0.55, 0),
            new THREE.Vector2(0.35, 0.7),
            new THREE.Vector2(0.2, 1),
          ],
          32
        );
        break;
      case "Octahedron":
        geometry = new THREE.OctahedronGeometry(1.2);
        break;
      case "Plane":
        geometry = new THREE.PlaneGeometry(2, 2);
        break;
      case "Polyhedron":
        geometry = new THREE.PolyhedronGeometry(
          [-1, -1, 1, 1, -1, 1, 1, 1, -1, -1, 1, -1],
          [2, 1, 0, 0, 3, 2, 1, 3, 0, 2, 3, 1],
          1.2,
          0
        );
        break;
      case "Ring":
        geometry = new THREE.RingGeometry(0.45, 1, 48);
        break;
      case "Shape":
        geometry = new THREE.ShapeGeometry(createStarShape());
        break;
      case "Sphere":
        geometry = new THREE.SphereGeometry(1.1, 32, 24);
        break;
      case "Tetrahedron":
        geometry = new THREE.TetrahedronGeometry(1.3);
        break;
      case "Torus":
        geometry = new THREE.TorusGeometry(0.8, 0.3, 16, 64);
        break;
      case "TorusKnot":
        geometry = new THREE.TorusKnotGeometry(0.75, 0.25, 100, 16);
        break;
      case "Tube": {
        const curve = new THREE.CatmullRomCurve3([
          new THREE.Vector3(-1, -0.7, 0),
          new THREE.Vector3(-0.5, 0.7, 0),
          new THREE.Vector3(0.5, -0.7, 0),
          new THREE.Vector3(1, 0.7, 0),
        ]);
        geometry = new THREE.TubeGeometry(curve, 64, 0.12, 12, false);
        break;
      }
      case "Wireframe":
        supportingGeometry = new THREE.IcosahedronGeometry(1.2);
        geometry = new THREE.WireframeGeometry(supportingGeometry);
        isLineGeometry = true;
        break;
    }

    let material: THREE.Material;
    let object: THREE.Object3D;
    if (isLineGeometry) {
      const lineMaterial = new THREE.LineBasicMaterial({ color });
      material = lineMaterial;
      object = new THREE.LineSegments(geometry, lineMaterial);
    } else {
      const meshMaterial = new THREE.MeshBasicMaterial({
        color,
        wireframe: true,
      });
      material = meshMaterial;
      object = new THREE.Mesh(geometry, meshMaterial);
    }
    scene.add(object);

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.set(0, 0, 3);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;
    controls.minDistance = 2;
    controls.maxDistance = 10;

    const Timer = new THREE.Timer();
    let rotationTime = 0;
    let previousTime = 0;
    let animationId = 0;
    function animate() {
      animationId = requestAnimationFrame(animate);
      const now = performance.now() / 1000;
      const delta = previousTime === 0 ? 0 : Math.min(now - previousTime, 0.05);
      previousTime = now;
      if (isRotatingRef.current) {
        rotationTime += delta;
        object.rotation.x = rotationTime;
        object.rotation.y = rotationTime * 2;
      }
      controls.update();
      renderer.render(scene, camera);
    }

    function handleResize() {
      if (!canvas) return;
      width = canvas.clientWidth || window.innerWidth;
      height = canvas.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    }

    window.addEventListener("resize", handleResize);
    animate();
    setIsLoading(false);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
      controls.dispose();
      geometry.dispose();
      supportingGeometry?.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [shape, color]);

  return (
    <div className="relative block h-full w-full">
      <canvas ref={boxRef} className="block h-full w-full" />
      <button
        type="button"
        aria-pressed={isRotating}
        onClick={() => {
          const nextIsRotating = !isRotating;
          isRotatingRef.current = nextIsRotating;
          setIsRotating(nextIsRotating);
        }}
        className="absolute right-6 top-24 z-20 rounded-full border border-white/20 bg-black/60 px-4 py-2 text-sm text-white transition hover:border-white "
      >
        {isRotating ? "Stop rotation" : "Start rotation"}
      </button>
      {isLoading && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black text-sm text-white/70"
          role="status"
          aria-live="polite"
        >
          <span className="size-8 animate-spin rounded-full border-2 border-white/20 border-t-cyan-300" />
          <span>Loading {shape}...</span>
        </div>
      )}
    </div>
  );
}
