"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface FirstFrameIntroProps {
  onComplete?: () => void;
}

export default function FirstFrameIntro({ onComplete }: FirstFrameIntroProps) {
  const [show, setShow] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if user prefers reduced motion or already saw intro this session
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const hasSeen = sessionStorage.getItem("rr-intro-seen");

    if (hasSeen || mediaQuery.matches) {
      setShow(false);
      onComplete?.();
      return;
    }

    setShow(true);
    const timer = setTimeout(() => {
      setShow(false);
      sessionStorage.setItem("rr-intro-seen", "true");
      onComplete?.();
    }, 2200);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (show === false || show === null) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] grid place-items-center bg-ink overflow-hidden pointer-events-none"
        >
          {/* Faint photo emerging like exposure development */}
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.22, scale: 1 }}
            transition={{ duration: 1.8, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image
              src="/portfolio/nature/flower-and-sunrise.jpg"
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover grayscale"
            />
          </motion.div>

          <div className="relative z-10 text-center flex flex-col items-center">
            {/* Subtle optical focus reticle */}
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="optical-focus-mark mb-8"
            />

            <motion.h1
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={{ clipPath: "inset(0 0% 0 0)" }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="text-[11px] font-semibold uppercase tracking-[0.32em] text-paper"
            >
              RAJESH RAMDAS
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-3 text-[8.5px] uppercase tracking-[0.24em] text-muted"
            >
              PHOTOGRAPHER · KAKINADA
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
