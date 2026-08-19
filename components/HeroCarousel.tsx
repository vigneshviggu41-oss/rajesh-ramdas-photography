"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, ChevronLeft, ChevronRight } from "lucide-react";

interface Slide {
  id: string;
  image: string;
  category: string;
  title: string;
  subtitle: string;
  location: string;
}

const slides: Slide[] = [
  {
    id: "palace-wedding",
    image: "/portfolio/luxury/wedding-palace-couple.jpg",
    category: "Royal Destination Weddings",
    title: "Timeless Unions & Sacred Vows",
    subtitle: "Documenting raw emotions and royal elegance across India",
    location: "Heritage Palaces · Rajasthan & Kakinada",
  },
  {
    id: "royal-bride",
    image: "/portfolio/luxury/wedding-royal-bride.jpg",
    category: "Fine Art Bridal Portraits",
    title: "Grace in Pure Kanchipuram Silk",
    subtitle: "Intimate, luminous portraits of beauty and tradition",
    location: "Kakinada · Andhra Pradesh",
  },
  {
    id: "mandap-ceremony",
    image: "/portfolio/luxury/wedding-mandap-ceremony.jpg",
    category: "Sacred Ceremonies",
    title: "The Holy Fire & Eternal Promises",
    subtitle: "Grand floral mandaps, sacred Vedic rituals, and family tears",
    location: "Hyderabad · Grand Celebrations",
  },
  {
    id: "wildlife-tiger",
    image: "/portfolio/luxury/wildlife-tiger-dawn.jpg",
    category: "Wildlife & Nature Expeditions",
    title: "Sovereign of the Sal Forest",
    subtitle: "Patience and stillness capturing the wild heart of nature",
    location: "Kanha Reserve & Godavari Delta",
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, 6500);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  const activeSlide = slides[current];

  return (
    <section
      id="top"
      className="relative min-h-[100svh] flex flex-col justify-between overflow-hidden bg-ink pt-28 pb-10 px-6 md:px-14 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Images Crossfade */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide.id}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={activeSlide.image}
              alt={activeSlide.title}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
            {/* Cinematic Luxury Dark Gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-black/50" />
            <div className="absolute inset-0 bg-black/20" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Top Location & Category Bar */}
      <div className="relative z-10 flex items-center justify-between border-t border-white/20 pt-4 text-[9px] uppercase tracking-[0.26em] text-paper/85">
        <span className="text-accent flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
          {activeSlide.category}
        </span>
        <span className="hidden sm:inline text-paper/70">{activeSlide.location}</span>
      </div>

      {/* Main Center Typography */}
      <div className="relative z-10 my-auto py-10 md:py-16 max-w-5xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-cinzel text-xs md:text-sm tracking-[0.3em] uppercase text-accent mb-4">
              Sri T. Rajesh Ramdas
            </p>
            <h1 className="font-serif text-5xl md:text-8xl lg:text-9xl font-normal leading-[0.88] tracking-tight text-paper">
              {activeSlide.title}
            </h1>
            <p className="mt-6 font-serif text-xl md:text-3xl italic text-paper/85 max-w-2xl">
              {activeSlide.subtitle}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Carousel Controls & Indicators */}
      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-end justify-between border-b border-white/20 pb-6 gap-6">
        {/* Slide Progress Indicators */}
        <div className="flex items-center gap-3">
          {slides.map((s, idx) => (
            <button
              type="button"
              key={s.id}
              onClick={() => setCurrent(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className="group flex flex-col gap-1.5 text-left py-2"
            >
              <div className="flex items-center gap-2">
                <span className={`text-[8.5px] font-mono tracking-widest transition-colors ${current === idx ? "text-accent font-semibold" : "text-white/40 group-hover:text-white/70"}`}>
                  0{idx + 1}
                </span>
                <span className="hidden md:inline text-[7.5px] uppercase tracking-[0.2em] text-white/50 group-hover:text-white/80">
                  {s.category.split(" ")[0]}
                </span>
              </div>
              <div className="h-[2px] w-12 md:w-20 bg-white/20 overflow-hidden">
                {current === idx && (
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 6.5, ease: "linear" }}
                    className="h-full bg-accent"
                  />
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Carousel Arrow Navigation & Scroll Cue */}
        <div className="flex items-center gap-4 ml-auto sm:ml-0">
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous slide"
            className="grid h-10 w-10 place-items-center border border-white/20 text-paper/70 hover:border-accent hover:text-accent transition-colors"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next slide"
            className="grid h-10 w-10 place-items-center border border-white/20 text-paper/70 hover:border-accent hover:text-accent transition-colors"
          >
            <ChevronRight size={16} />
          </button>
          <a
            href="#portfolio"
            className="hidden md:inline-flex items-center gap-2 border border-accent/40 bg-ink/60 backdrop-blur-md px-5 py-2.5 text-[8.5px] uppercase tracking-[0.24em] text-accent hover:bg-accent hover:text-ink transition-all"
          >
            <span>Explore Portfolio</span>
            <ArrowDown size={13} />
          </a>
        </div>
      </div>
    </section>
  );
}
