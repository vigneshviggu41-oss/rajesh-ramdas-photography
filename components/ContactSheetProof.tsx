"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Maximize2 } from "lucide-react";
import { gallery, GalleryImage } from "@/data/gallery";

interface ContactSheetProofProps {
  onOpenLightbox: (index: number) => void;
}

export default function ContactSheetProof({ onOpenLightbox }: ContactSheetProofProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage: GalleryImage = gallery[activeIndex];

  return (
    <section className="border-y border-white/10 bg-[#0c0c0c] px-6 py-28 md:px-12 md:py-40">
      {/* Editorial Section Header */}
      <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between border-t border-white/20 pt-6 gap-6">
        <div>
          <p className="editorial-label">Photographer’s Contact Sheet · Proof 01</p>
          <h2 className="mt-4 font-serif text-5xl md:text-7xl font-normal tracking-tight text-paper">
            Select a frame
          </h2>
        </div>
        <p className="max-w-xs text-left md:text-right text-[10px] leading-relaxed text-muted uppercase tracking-[0.16em]">
          One frame comes forward.<br className="hidden md:inline" /> The remainder wait in sequence.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-12 items-start">
        {/* Dominant Selected Proof Frame */}
        <div className="lg:col-span-8 flex flex-col">
          <div
            className="relative min-h-[55vh] md:min-h-[72vh] w-full overflow-hidden bg-[#141414] group cursor-pointer"
            onClick={() => onOpenLightbox(activeIndex)}
            data-cursor="EXPAND"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeImage.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.01 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 flex items-center justify-center p-4 md:p-8"
              >
                <div className="relative h-full w-full">
                  <Image
                    src={activeImage.src}
                    alt={activeImage.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 65vw"
                    className="object-contain"
                    priority
                  />
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Proof Metadata Bar */}
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 text-left">
              <div>
                <p className="editorial-label !text-accent">
                  {activeImage.category} · {activeImage.year || "2021"}
                  {activeImage.location ? ` · ${activeImage.location}` : ""}
                </p>
                <h3 className="mt-2 font-serif text-2xl md:text-3xl italic text-paper">
                  {activeImage.caption}
                </h3>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[10px] uppercase tracking-[0.2em] text-muted">
                  Frame {String(activeIndex + 1).padStart(2, "0")} / {String(gallery.length).padStart(2, "0")}
                </span>
                <span className="hidden sm:grid h-9 w-9 place-items-center border border-white/20 text-paper transition-colors group-hover:border-accent group-hover:text-accent">
                  <Maximize2 size={14} />
                </span>
              </div>
            </div>
          </div>

          {/* Deep link into story */}
          {activeImage.project && (
            <div className="mt-5 flex justify-end">
              <Link
                href={`/stories/${activeImage.project}`}
                className="group flex items-center gap-2.5 text-[9px] uppercase tracking-[0.22em] text-accent transition-colors hover:text-accent-hover"
                data-cursor="STORY"
              >
                <span>Read Full Story</span>
                <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          )}
        </div>

        {/* Thumbnail Proof Strip */}
        <div className="lg:col-span-4 flex flex-col">
          <div className="mb-3 text-[8.5px] uppercase tracking-[0.2em] text-muted hidden lg:block">
            Index Proofs
          </div>
          <div className="proof-strip flex gap-3 overflow-x-auto pb-4 lg:grid lg:grid-cols-2 lg:overflow-visible lg:gap-3">
            {gallery.map((img, idx) => {
              const isSelected = activeIndex === idx;
              return (
                <button
                  type="button"
                  key={img.id}
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`Select frame ${idx + 1}: ${img.caption}`}
                  aria-pressed={isSelected}
                  className={`group relative aspect-[4/3] min-w-32 flex-shrink-0 lg:min-w-0 overflow-hidden bg-ink-elevated border transition-all duration-300 ${
                    isSelected
                      ? "border-accent ring-1 ring-accent opacity-100 scale-[1.02]"
                      : "border-white/10 opacity-45 hover:opacity-80"
                  }`}
                  data-cursor="SELECT"
                >
                  <Image
                    src={img.src}
                    alt={img.caption}
                    fill
                    sizes="(max-width: 1024px) 160px, 180px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                  <span className="absolute left-2 top-2 bg-black/60 px-1.5 py-0.5 text-[7.5px] font-mono tracking-widest text-paper">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
