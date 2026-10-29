import Link from "next/link";
import { notFound } from "next/navigation";
import Shape from "../Shape";
import { shapeOptions } from "../shapes";

interface ShapePageProps {
  params: Promise<{ shape: string }>;
}

export function generateStaticParams() {
  return shapeOptions.map(({ slug }) => ({ shape: slug }));
}

export default async function ShapePage({ params }: ShapePageProps) {
  const { shape: slug } = await params;
  const selectedShape = shapeOptions.find((option) => option.slug === slug);

  if (!selectedShape) {
    notFound();
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#08090d] text-white">
      <div className="absolute inset-0">
        <Shape shape={selectedShape.shape} color="#67e8f9" />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/65" />

      <header className="pointer-events-none relative z-10 flex items-center justify-between px-6 py-7 sm:px-10 lg:px-16">
        <Link
          href="/"
          className="pointer-events-auto rounded-full border border-white/20 px-4 py-2 text-sm text-white/75 transition hover:border-cyan-300/60 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300"
        >
          &larr; All shapes
        </Link>
        <span className="text-xs tracking-[0.18em] text-white/45">
          3D SHAPE STUDY
        </span>
      </header>

      <section className="pointer-events-none relative z-10 flex min-h-[calc(100vh-88px)] items-end px-6 pb-12 sm:px-10 sm:pb-16 lg:px-16">
        <div>
          <p className="mb-3 text-sm tracking-[0.2em] text-cyan-300">
            INTERACTIVE FORM
          </p>
          <h1 className="text-6xl font-semibold tracking-tight sm:text-8xl">
            {selectedShape.label}
          </h1>
          <p className="mt-4 max-w-md text-base text-white/60">
            {selectedShape.description}
          </p>
          <p className="mt-3 text-sm text-white/40">
            Drag to orbit · scroll to zoom
          </p>
        </div>
      </section>
    </main>
  );
}
