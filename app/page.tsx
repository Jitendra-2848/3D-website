import Link from "next/link";
import { shapeOptions } from "./shape/shapes";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#08090d] text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-8 sm:px-10 lg:px-16">
        <header className="flex items-center justify-between">
          <Link href="/" className="text-sm font-semibold tracking-[0.2em]">
            FORM / 3D
          </Link>
          <span className="text-xs tracking-[0.18em] text-white/45">
            INTERACTIVE SHAPE COLLECTION
          </span>
        </header>

        <section className="flex flex-1 flex-col justify-center py-16">
          <p className="mb-5 text-sm font-medium tracking-[0.22em] text-cyan-300">
            SELECT A FORM
          </p>
          <h1 className="max-w-3xl text-5xl font-semibold leading-[1.05] tracking-tight sm:text-7xl">
            Explore shapes
            <span className="text-white/40"> in 3D.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-white/55">
            Choose a shape to open its own interactive page.
          </p>

          <nav
            aria-label="Choose a 3D shape"
            className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
          >
            {shapeOptions.map((option, index) => (
              <Link
                key={option.slug}
                href={`/shape/${option.slug}`}
                className="group flex min-h-44 flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:-translate-y-1 hover:border-cyan-300/50 hover:bg-white/[0.06] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300"
              >
                <span className="text-xs tracking-[0.18em] text-white/40">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>
                  <span className="block text-2xl font-medium tracking-tight">
                    {option.label}
                    <span className="ml-2 inline-block text-cyan-300 transition-transform group-hover:translate-x-1">
                      &rarr;
                    </span>
                  </span>
                  <span className="mt-2 block text-sm text-white/45">
                    {option.description}
                  </span>
                </span>
              </Link>
            ))}
          </nav>
        </section>

        <footer className="flex items-center justify-between border-t border-white/10 pt-5 text-xs tracking-wide text-white/35">
          <span>Built for curious minds.</span>
          <span>{shapeOptions.length} SHAPES</span>
        </footer>
      </div>
    </main>
  );
}
