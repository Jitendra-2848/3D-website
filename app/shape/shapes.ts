import type { ShapeType } from "./Shape";

export interface ShapeOption {
  shape: ShapeType;
  slug: string;
  label: string;
  description: string;
}

export const shapeOptions: ShapeOption[] = [
  {
    shape: "Box",
    slug: "box",
    label: "Box",
    description: "A classic six-sided solid with crisp, flat faces.",
  },
  {
    shape: "Capsule",
    slug: "capsule",
    label: "Capsule",
    description: "A cylinder softened with rounded ends.",
  },
  {
    shape: "Circle",
    slug: "circle",
    label: "Circle",
    description: "A simple flat disc viewed in three dimensions.",
  },
  {
    shape: "Cone",
    slug: "cone",
    label: "Cone",
    description: "A circular base that narrows to a single point.",
  },
  {
    shape: "Cylinder",
    slug: "cylinder",
    label: "Cylinder",
    description: "A curved surface connecting two circular ends.",
  },
  {
    shape: "Dodecahedron",
    slug: "dodecahedron",
    label: "Dodecahedron",
    description: "A solid made from twelve pentagonal faces.",
  },
  {
    shape: "Edges",
    slug: "edges",
    label: "Edges",
    description: "The crisp outline segments of a box.",
  },
  {
    shape: "Extrude",
    slug: "extrude",
    label: "Extrude",
    description: "A star profile given depth and beveled edges.",
  },
  {
    shape: "Icosahedron",
    slug: "icosahedron",
    label: "Icosahedron",
    description: "A faceted solid with twenty triangular faces.",
  },
  {
    shape: "Lathe",
    slug: "lathe",
    label: "Lathe",
    description: "A profile revolved around a central axis.",
  },
  {
    shape: "Octahedron",
    slug: "octahedron",
    label: "Octahedron",
    description: "A geometric solid with eight triangular faces.",
  },
  {
    shape: "Plane",
    slug: "plane",
    label: "Plane",
    description: "A flat two-dimensional surface.",
  },
  {
    shape: "Polyhedron",
    slug: "polyhedron",
    label: "Polyhedron",
    description: "A custom solid built from connected polygon faces.",
  },
  {
    shape: "Ring",
    slug: "ring",
    label: "Ring",
    description: "A flat band with a circular opening.",
  },
  {
    shape: "Shape",
    slug: "shape",
    label: "Shape",
    description: "A flat star drawn from a custom outline.",
  },
  {
    shape: "Sphere",
    slug: "sphere",
    label: "Sphere",
    description: "A smooth, round surface with no edges.",
  },
  {
    shape: "Tetrahedron",
    slug: "tetrahedron",
    label: "Tetrahedron",
    description: "A triangular pyramid with four faces.",
  },
  {
    shape: "Torus",
    slug: "torus",
    label: "Torus",
    description: "A continuous loop with a rounded surface.",
  },
  {
    shape: "TorusKnot",
    slug: "torus-knot",
    label: "Torus Knot",
    description: "A looping curve woven around itself.",
  },
  {
    shape: "Tube",
    slug: "tube",
    label: "Tube",
    description: "A curved path wrapped in a tubular surface.",
  },
  {
    shape: "Wireframe",
    slug: "wireframe",
    label: "Wireframe",
    description: "The triangular framework of a faceted solid.",
  },
];
