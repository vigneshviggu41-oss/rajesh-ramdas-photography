"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { photographer } from "@/data/photographer";

interface GiftExperienceProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GiftExperience({ isOpen, onClose }: GiftExperienceProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !photographer.giftMessage.showGiftMessage) return null;

  return (
    <AnimatePresence>
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label="World Photography Day Message"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 z-[130] flex items-center justify-center overflow-y-auto bg-ink px-6 py-20"
      >
        {/* Background Quiet Photograph with gentle breathing fade */}
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 0.18, scale: 1 }}
          transition={{ duration: 2.2, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image
            src={photographer.giftMessage.backgroundPhoto}
            alt=""
            fill
            sizes="100vw"
            className="object-cover grayscale brightness-90"
            priority
          />
        </motion.div>

        {/* Ambient Dark Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/90 via-ink/80 to-ink/95" />

        {/* Close Button */}
        <button
          type="button"
          aria-label="Close message"
          onClick={onClose}
          className="absolute right-6 top-6 z-20 grid h-11 w-11 place-items-center border border-white/20 text-paper transition-colors hover:border-accent hover:text-accent focus-visible:outline-accent"
        >
          <X size={18} />
        </button>

        {/* Cinematic Tribute Content */}
        <div className="relative z-10 mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-10 inline-block border-b border-accent/40 pb-2 text-[8px] uppercase tracking-[0.28em] text-accent"
          >
            For the Photographer · Tribute
          </motion.div>

          <div className="space-y-8">
            <motion.p
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={{ clipPath: "inset(0 0% 0 0)" }}
              transition={{ duration: 1.1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif text-3xl md:text-5xl font-normal leading-tight text-paper"
            >
              {photographer.giftMessage.lines[0]}
            </motion.p>

            <motion.p
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={{ clipPath: "inset(0 0% 0 0)" }}
              transition={{ duration: 1.1, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif text-3xl md:text-5xl italic font-normal leading-tight text-accent"
            >
              {photographer.giftMessage.lines[1]}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 2.8, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto max-w-lg text-sm md:text-base leading-relaxed text-paper/75 whitespace-pre-line pt-4"
            >
              {photographer.giftMessage.lines[2]}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 4.2, ease: [0.22, 1, 0.36, 1] }}
              className="pt-8"
            >
              <h2 className="font-serif text-4xl md:text-6xl font-normal tracking-tight text-paper">
                {photographer.giftMessage.lines[3]}
              </h2>

              <p className="mt-8 text-[9px] uppercase tracking-[0.24em] text-muted">
                {photographer.giftMessage.signoff}
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
