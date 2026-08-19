"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { GalleryImage } from "@/data/gallery";

interface LightboxProps {
  images: GalleryImage[];
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function Lightbox({
  images,
  currentIndex,
  onClose,
  onNavigate,
}: LightboxProps) {
  const isOpen = currentIndex !== null && currentIndex >= 0 && currentIndex < images.length;
  const currentImage = isOpen ? images[currentIndex] : null;

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onNavigate((currentIndex - 1 + images.length) % images.length);
      if (e.key === "ArrowRight") onNavigate((currentIndex + 1) % images.length);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, currentIndex, images.length, onClose, onNavigate]);

  if (!isOpen || !currentImage) return null;

  return (
    <AnimatePresence>
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label="Fullscreen photograph"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 z-[120] flex flex-col justify-between bg-[#050505] p-4 md:p-8"
      >
        {/* Top Controls Bar */}
        <div className="flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <span className="editorial-label !text-accent">
              {currentImage.category}
            </span>
            {currentImage.location && (
              <>
                <span className="text-white/20">·</span>
                <span className="text-[9px] uppercase tracking-[0.2em] text-muted">
                  {currentImage.location}
                </span>
              </>
            )}
          </div>

          <button
            type="button"
            aria-label="Close fullscreen viewer"
            onClick={onClose}
            className="grid h-11 w-11 place-items-center border border-white/20 text-paper transition-colors hover:border-accent hover:text-accent focus-visible:outline-accent"
          >
            <X size={18} />
          </button>
        </div>

        {/* Image Display Area with Drag / Swipe */}
        <div className="relative flex-1 flex items-center justify-center overflow-hidden my-4">
          <motion.div
            key={currentImage.id}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (info.offset.x > 60) {
                onNavigate((currentIndex - 1 + images.length) % images.length);
              } else if (info.offset.x < -60) {
                onNavigate((currentIndex + 1) % images.length);
              }
            }}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-full w-full max-w-6xl max-h-[78vh]"
          >
            <Image
              src={currentImage.src}
              alt={currentImage.alt}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </motion.div>
        </div>

        {/* Bottom Navigation & Caption Bar */}
        <div className="flex items-end justify-between z-10 border-t border-white/10 pt-4">
          <button
            type="button"
            aria-label="Previous photograph"
            onClick={() => onNavigate((currentIndex - 1 + images.length) % images.length)}
            className="flex items-center gap-2 text-[9px] uppercase tracking-[0.22em] text-muted hover:text-paper transition-colors"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">Prev</span>
          </button>

          <div className="text-center max-w-xl mx-4">
            <p className="font-serif text-lg md:text-xl italic text-paper">
              {currentImage.caption}
            </p>
            <p className="mt-1 text-[8px] font-mono tracking-widest text-muted">
              {String(currentIndex + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
            </p>
          </div>

          <button
            type="button"
            aria-label="Next photograph"
            onClick={() => onNavigate((currentIndex + 1) % images.length)}
            className="flex items-center gap-2 text-[9px] uppercase tracking-[0.22em] text-muted hover:text-paper transition-colors"
          >
            <span className="hidden sm:inline">Next</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
