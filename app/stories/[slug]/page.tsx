import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};

  return {
    title: `${project.title} — Stories`,
    description: project.intro,
    alternates: { canonical: `/stories/${project.slug}` },
    openGraph: {
      title: `${project.title} — Rajesh Ramdas Photography`,
      description: project.intro,
      images: [
        {
          url: project.image,
          width: project.imageWidth,
          height: project.imageHeight,
          alt: project.imageAlt,
        },
      ],
    },
  };
}

export default async function StoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index < 0) notFound();

  const project = projects[index];
  const nextProject = projects[(index + 1) % projects.length];

  return (
    <main className="min-h-screen bg-ink text-paper selection:bg-accent selection:text-ink">
      {/* Header */}
      <header className="fixed inset-x-0 top-0 z-50 flex h-20 items-center justify-between border-b border-white/10 bg-ink/90 backdrop-blur-md px-6 md:px-12">
        <Link
          href="/#stories"
          className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.22em] text-muted hover:text-paper transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Selected Stories</span>
        </Link>

        <Link
          href="/"
          className="text-[10px] font-semibold uppercase tracking-[0.26em] text-paper"
        >
          RAJESH RAMDAS
        </Link>

        <span className="text-[8.5px] font-mono tracking-widest text-muted">
          0{index + 1} / 0{projects.length}
        </span>
      </header>

      {/* Story Hero */}
      <section className="pt-28 lg:pt-36 border-b border-white/10">
        <div className="grid lg:grid-cols-12 min-h-[80svh]">
          {/* Left Metadata & Title */}
          <div className="flex flex-col justify-between border-b border-white/10 p-6 md:p-12 lg:col-span-5 lg:border-b-0 lg:border-r">
            <div className="flex items-center justify-between border-t border-white/20 pt-4">
              <span className="editorial-label !text-accent">{project.category}</span>
              {project.location && (
                <span className="editorial-label">{project.location}</span>
              )}
            </div>

            <div className="my-16">
              <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-normal leading-[0.88] tracking-tight text-paper">
                {project.title}
              </h1>
              {project.subtitle && (
                <p className="mt-3 font-serif text-2xl italic text-muted">
                  {project.subtitle}
                </p>
              )}
            </div>

            <div className="border-t border-white/20 pt-6">
              <p className="editorial-label mb-2">Introduction</p>
              <p className="text-sm md:text-base leading-relaxed text-paper/75">
                {project.intro}
              </p>
            </div>
          </div>

          {/* Right Hero Cover Image */}
          <div className="relative min-h-[55svh] lg:min-h-full lg:col-span-7 bg-[#101010] flex items-center justify-center p-6 md:p-12">
            <div className="relative h-full w-full max-h-[75svh]">
              <Image
                src={project.image}
                alt={project.imageAlt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Photographer's Note */}
      <section className="border-b border-white/10 bg-ink-soft px-6 py-24 md:px-12 md:py-36">
        <div className="mx-auto max-w-5xl grid lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4">
            <p className="editorial-label">Photographer’s Note</p>
          </div>
          <div className="lg:col-span-8">
            <blockquote className="font-serif text-2xl md:text-4xl lg:text-5xl font-normal italic leading-relaxed text-paper/90">
              “{project.note}”
            </blockquote>
            <p className="mt-6 text-[9px] uppercase tracking-[0.2em] text-accent">
              — Rajesh Ramdas · Kakinada
            </p>
          </div>
        </div>
      </section>

      {/* Frames Sequence */}
      <section className="px-6 py-28 md:px-12 md:py-44">
        <div className="mx-auto max-w-6xl">
          <div className="mb-24 flex items-end justify-between border-t border-white/20 pt-6">
            <div>
              <p className="editorial-label">
                Story Sequence · {String(project.frames.length).padStart(2, "0")} Frames
              </p>
              <h2 className="mt-4 font-serif text-4xl md:text-6xl font-normal text-paper">
                In the order <i className="italic text-accent">the light occurred.</i>
              </h2>
            </div>
          </div>

          {/* Sequential Frames */}
          <div className="space-y-32 md:space-y-44">
            {project.frames.map((frame, frameIdx) => {
              const isEven = frameIdx % 2 === 0;
              return (
                <figure key={frame.src} className="grid lg:grid-cols-12 gap-8 items-end">
                  <div
                    className={`overflow-hidden bg-[#111111] p-3 md:p-6 ${isEven ? "lg:col-span-9" : "lg:col-span-9 lg:col-start-4"
                      }`}
                  >
                    <div className="relative aspect-[4/3] w-full">
                      <Image
                        src={frame.src}
                        alt={frame.alt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 75vw"
                        className="object-contain"
                      />
                    </div>
                  </div>

                  <figcaption
                    className={`border-t border-white/20 pt-4 flex flex-col justify-between ${isEven ? "lg:col-span-3" : "lg:col-span-3 lg:row-start-1"
                      }`}
                  >
                    <span className="text-[9px] font-mono tracking-widest text-muted">
                      Frame {String(frameIdx + 1).padStart(2, "0")}
                    </span>
                    <p className="mt-4 font-serif text-xl md:text-2xl italic text-paper">
                      {frame.caption}
                    </p>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </div>
      </section>

      {/* Next Story Navigation */}
      <section className="border-t border-white/10 bg-ink">
        <div className="grid lg:grid-cols-12">
          <div className="flex flex-col justify-between p-6 md:p-12 lg:col-span-5">
            <div>
              <p className="editorial-label">
                Next Story / 0{(index + 1) % projects.length + 1}
              </p>
              <h2 className="mt-6 font-serif text-5xl md:text-7xl font-normal leading-[0.88] text-paper">
                {nextProject.title}
              </h2>
              {nextProject.subtitle && (
                <p className="mt-2 font-serif text-xl italic text-muted">
                  {nextProject.subtitle}
                </p>
              )}
            </div>

            <Link
              href={`/stories/${nextProject.slug}`}
              className="mt-12 inline-flex items-center gap-3 border-b border-accent pb-2 text-[9px] uppercase tracking-[0.24em] text-accent hover:text-accent-hover transition-colors w-fit"
            >
              <span>Continue Into Story</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <Link
            href={`/stories/${nextProject.slug}`}
            className="group relative min-h-[55svh] lg:min-h-[70svh] overflow-hidden bg-[#101010] lg:col-span-7"
            aria-label={`Next Story: ${nextProject.title}`}
          >
            <Image
              src={nextProject.image}
              alt={nextProject.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover transition-transform duration-[1200ms] ease-editorial group-hover:scale-[1.025]"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
            <span className="absolute right-6 top-6 grid h-11 w-11 place-items-center border border-white/30 text-paper group-hover:border-accent group-hover:text-accent transition-colors">
              <ArrowUpRight size={16} />
            </span>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-ink px-6 py-10 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6 text-[8.5px] uppercase tracking-[0.2em] text-muted">
        <div>
          <span className="text-paper font-semibold">Sri T. Rajesh Ramdas</span>
          <span className="ml-3">Kakinada · India</span>
        </div>
        <Link href="/#contact" className="text-accent hover:text-accent-hover transition-colors">
          Start a Conversation →
        </Link>
      </footer>
    </main>
  );
}
