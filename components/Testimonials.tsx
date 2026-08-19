"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Heart, Star } from "lucide-react";
import { photographer } from "@/data/photographer";

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const reviews = photographer.testimonials;

  const prev = () => setIndex((i) => (i - 1 + reviews.length) % reviews.length);
  const next = () => setIndex((i) => (i + 1) % reviews.length);

  const current = reviews[index];

  return (
    <section className="border-t border-white/10 bg-ink-soft px-6 py-28 md:px-12 md:py-40">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-[9px] uppercase tracking-[0.28em] text-accent mb-4 border-b border-accent/30 pb-1">
            <Heart size={12} className="fill-accent text-accent" />
            <span>Words of Love & Praise</span>
          </div>
          <h2 className="font-serif text-5xl md:text-7xl font-normal tracking-tight text-paper">
            Real Couples · Real Emotions
          </h2>
        </div>

        {/* Testimonial Card Display */}
        <div className="relative border border-white/15 bg-ink p-8 md:p-16 text-center">
          {/* Star Rating Indicator */}
          <div className="flex justify-center gap-1.5 text-accent mb-8">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={15} className="fill-accent" />
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current.couple}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <blockquote className="font-serif text-2xl md:text-4xl lg:text-5xl font-normal italic leading-relaxed text-paper/90 max-w-4xl mx-auto">
                “{current.quote}”
              </blockquote>

              <div className="mt-10 border-t border-white/10 pt-6">
                <h3 className="font-serif text-2xl text-accent font-normal">
                  {current.couple}
                </h3>
                <p className="mt-1 text-[9px] uppercase tracking-[0.2em] text-muted">
                  {current.event} · {current.location}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <div className="mt-10 flex justify-center items-center gap-4">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous review"
              className="grid h-10 w-10 place-items-center border border-white/20 text-paper/70 hover:border-accent hover:text-accent transition-colors"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="text-[9px] font-mono tracking-widest text-muted">
              {String(index + 1).padStart(2, "0")} / {String(reviews.length).padStart(2, "0")}
            </span>
            <button
              type="button"
              onClick={next}
              aria-label="Next review"
              className="grid h-10 w-10 place-items-center border border-white/20 text-paper/70 hover:border-accent hover:text-accent transition-colors"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
