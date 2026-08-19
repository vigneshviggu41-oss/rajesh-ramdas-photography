"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { photographer } from "@/data/photographer";

const servicePhotos: Record<string, string> = {
  Weddings: "/portfolio/nature/paddy-sunset-portrait.jpg",
  Portraits: "/portfolio/profile/rajesh-ramdas.jpg",
  Events: "/portfolio/travel/night-sky-silhouette.jpg",
  "Wildlife & Nature": "/portfolio/nature/flower-and-sunrise.jpg",
  "Corporate / Industrial": "/portfolio/nature/river-at-dusk.jpg",
};

export default function ServicesList() {
  const [hoveredService, setHoveredService] = useState<string | null>(null);

  return (
    <section className="border-t border-white/10 bg-ink px-6 py-28 md:px-12 md:py-40">
      <div className="grid lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Title & Floating Preview */}
        <div className="lg:col-span-5 flex flex-col justify-between h-full">
          <div>
            <p className="editorial-label">Photographic Disciplines</p>
            <h2 className="mt-4 font-serif text-5xl md:text-7xl font-normal tracking-tight text-paper">
              Services & Commissions
            </h2>
            <p className="mt-6 max-w-sm text-xs leading-relaxed text-muted uppercase tracking-[0.16em]">
              Commissions undertaken with patience, observational honesty, and technical discipline.
            </p>
          </div>

          {/* Dynamic Interactive Preview on Hover */}
          <div className="hidden lg:block mt-12 relative aspect-[4/3] w-full max-w-sm overflow-hidden bg-ink-soft border border-white/10">
            <AnimatePresence mode="wait">
              {hoveredService && servicePhotos[hoveredService] ? (
                <motion.div
                  key={hoveredService}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={servicePhotos[hoveredService]}
                    alt={hoveredService}
                    fill
                    sizes="400px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-left">
                    <p className="text-[8px] uppercase tracking-[0.2em] text-accent">
                      {hoveredService}
                    </p>
                    <p className="font-serif text-base italic text-paper mt-1">
                      {photographer.serviceDescriptions[
                        hoveredService as keyof typeof photographer.serviceDescriptions
                      ] || ""}
                    </p>
                  </div>
                </motion.div>
              ) : (
                <div className="absolute inset-0 grid place-items-center p-8 text-center border border-dashed border-white/10">
                  <p className="text-[8.5px] uppercase tracking-[0.22em] text-muted">
                    Hover a discipline to reveal focus
                  </p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Column: Typographic Service Rows */}
        <div className="lg:col-span-7 border-t border-white/20">
          {photographer.services.map((service, index) => {
            const isHovered = hoveredService === service;
            const description =
              photographer.serviceDescriptions[
                service as keyof typeof photographer.serviceDescriptions
              ];

            return (
              <div
                key={service}
                onMouseEnter={() => setHoveredService(service)}
                onMouseLeave={() => setHoveredService(null)}
                className="group border-b border-white/15 py-8 md:py-10 transition-colors hover:border-accent/40"
                data-cursor="INQUIRE"
              >
                <div className="grid grid-cols-[3rem_1fr_auto] md:grid-cols-[4.5rem_1fr_auto] items-baseline gap-4">
                  <span className="text-[9px] font-mono tracking-widest text-muted group-hover:text-accent transition-colors">
                    0{index + 1}
                  </span>

                  <div>
                    <h3 className="font-serif text-4xl md:text-6xl font-normal text-paper tracking-tight transition-transform duration-500 group-hover:translate-x-2 group-hover:text-accent">
                      {service}
                    </h3>
                    <p className="mt-3 max-w-lg text-xs leading-relaxed text-muted">
                      {description}
                    </p>
                  </div>

                  <a
                    href="#contact"
                    className="grid h-10 w-10 place-items-center border border-white/15 text-muted transition-all duration-300 group-hover:border-accent group-hover:text-accent group-hover:rotate-45"
                    aria-label={`Enquire about ${service}`}
                  >
                    <ArrowUpRight size={17} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
