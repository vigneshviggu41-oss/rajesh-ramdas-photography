"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, Sparkles } from "lucide-react";
import { gallery, GalleryCategory, GalleryImage } from "@/data/gallery";

interface FilterableGalleryProps {
  onOpenLightbox: (index: number) => void;
}

const categories: GalleryCategory[] = [
  "All",
  "Weddings",
  "Portraits",
  "Wildlife",
  "Nature",
  "Travel",
];

export default function FilterableGallery({ onOpenLightbox }: FilterableGalleryProps) {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("All");

  const filteredImages =
    activeCategory === "All"
      ? gallery
      : gallery.filter((img) => img.category === activeCategory);

  return (
    <section id="portfolio" className="border-t border-white/10 bg-ink px-6 py-28 md:px-12 md:py-40">
      {/* Header */}
      <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between border-t border-white/20 pt-6 gap-6">
        <div>
          <div className="flex items-center gap-2 text-[9px] uppercase tracking-[0.26em] text-accent mb-2">
            <Sparkles size={13} />
            <span>Curated Galleries</span>
          </div>
          <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl font-normal tracking-tight text-paper">
            Featured Portfolio
          </h2>
        </div>
        <p className="max-w-md text-xs leading-relaxed text-muted uppercase tracking-[0.16em]">
          Moments captured across sacred rituals, human intimacy, and the untamed stillness of nature.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="mb-14 flex flex-wrap gap-2 md:gap-4 border-b border-white/15 pb-4">
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              type="button"
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`relative px-4 py-2 text-[9px] md:text-[10px] uppercase tracking-[0.24em] font-medium transition-all ${
                isActive ? "text-accent" : "text-muted hover:text-paper"
              }`}
            >
              <span>{cat}</span>
              {isActive && (
                <motion.div
                  layoutId="activeFilterTab"
                  className="absolute bottom-[-17px] left-0 right-0 h-[2px] bg-accent"
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Masonry / Grid */}
      <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 items-start">
        <AnimatePresence>
          {filteredImages.map((image) => {
            const originalIndex = gallery.findIndex((g) => g.id === image.id);
            return (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="group relative cursor-pointer overflow-hidden bg-ink-elevated border border-white/10"
                onClick={() => onOpenLightbox(originalIndex)}
                data-cursor="EXPAND"
              >
                <div
                  className="relative w-full overflow-hidden"
                  style={{
                    aspectRatio:
                      image.aspectRatio === "16/9"
                        ? "16/9"
                        : image.aspectRatio === "3/4"
                        ? "3/4"
                        : image.aspectRatio === "1/1"
                        ? "1/1"
                        : "4/3",
                  }}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-1000 ease-editorial group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                  {/* Top Badge */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                    <span className="bg-black/60 backdrop-blur-md px-2.5 py-1 text-[8px] uppercase tracking-[0.2em] text-accent border border-accent/30">
                      {image.category}
                    </span>
                    <span className="grid h-8 w-8 place-items-center bg-black/60 border border-white/20 text-paper/70 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Maximize2 size={13} />
                    </span>
                  </div>

                  {/* Bottom Caption Overlay */}
                  <div className="absolute bottom-0 inset-x-0 p-5 text-left z-10">
                    <p className="font-serif text-xl md:text-2xl font-normal italic text-paper group-hover:text-accent transition-colors">
                      {image.caption}
                    </p>
                    {image.subtitle && (
                      <p className="mt-1 text-[8.5px] uppercase tracking-[0.18em] text-muted">
                        {image.subtitle}
                      </p>
                    )}
                    {image.location && (
                      <p className="mt-1 text-[8px] uppercase tracking-[0.2em] text-white/40">
                        {image.location} · {image.year || "2024"}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
