"use client";

import { useState, useRef, FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Compass,
  Sparkles,
} from "lucide-react";

import { photographer } from "@/data/photographer";
import { projects } from "@/data/projects";
import { gallery } from "@/data/gallery";

import FirstFrameIntro from "@/components/FirstFrameIntro";
import Navigation from "@/components/Navigation";
import Logo from "@/components/Logo";
import CustomCursor from "@/components/CustomCursor";
import HeroCarousel from "@/components/HeroCarousel";
import PressBadges from "@/components/PressBadges";
import FilterableGallery from "@/components/FilterableGallery";
import ContactSheetProof from "@/components/ContactSheetProof";
import Testimonials from "@/components/Testimonials";
import ServicesList from "@/components/ServicesList";
import Lightbox from "@/components/Lightbox";
import GiftExperience from "@/components/GiftExperience";

export default function HomePage() {
  const prefersReducedMotion = useReducedMotion();
  const wildRef = useRef<HTMLElement>(null);

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [giftOpen, setGiftOpen] = useState(false);
  const [enquiryStatus, setEnquiryStatus] = useState<"idle" | "sent" | "copied">("idle");

  const { scrollYProgress: wildScroll } = useScroll({
    target: wildRef,
    offset: ["start end", "center center"],
  });

  const wildImageScale = useTransform(
    wildScroll,
    [0, 1],
    [prefersReducedMotion ? 1 : 0.88, 1]
  );

  async function handleEnquirySubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const summary = [
      "Photography & Wedding Commission Enquiry — Sri T. Rajesh Ramdas",
      `Name: ${form.get("name") || "—"}`,
      `Phone: ${form.get("phone") || "—"}`,
      `Email: ${form.get("email") || "—"}`,
      `Requirement: ${form.get("requirement") || "—"}`,
      `Event Date: ${form.get("date") || "Flexible"}`,
      `Location/Venue: ${form.get("location") || "—"}`,
      `Message: ${form.get("message") || "—"}`,
    ].join("\n");

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: "Photography Enquiry for Rajesh Ramdas",
          text: summary,
        });
        setEnquiryStatus("sent");
        return;
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
      }
    }

    if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(summary);
      setEnquiryStatus("copied");
    }
  }

  return (
    <main className="cursor-surface bg-ink text-paper min-h-screen relative selection:bg-accent selection:text-ink">
      <CustomCursor />
      <FirstFrameIntro />
      <Navigation />

      {/* ========================================================================= */}
      {/* 01 — LUXURY CINEMATIC HERO CAROUSEL */}
      {/* ========================================================================= */}
      <HeroCarousel />

      {/* ========================================================================= */}
      {/* 02 — PRESS & ACCREDITATION BADGES */}
      {/* ========================================================================= */}
      <PressBadges />

      {/* ========================================================================= */}
      {/* 03 — EDITORIAL STATEMENT */}
      {/* ========================================================================= */}
      <section className="grid min-h-[70svh] items-center border-b border-white/10 bg-ink px-6 py-28 md:grid-cols-12 md:px-14 md:py-40">
        <div className="md:col-span-4">
          <p className="editorial-label">The Vision & Philosophy</p>
        </div>
        <div className="mt-12 md:col-span-8 md:mt-0">
          <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl font-normal leading-[0.95] tracking-tight text-paper">
            Some moments ask<br />
            <i className="italic text-accent">to be remembered.</i>
          </h2>
          <p className="mt-10 max-w-2xl text-sm md:text-base leading-relaxed text-paper/70 font-normal">
            Sri T. Rajesh Ramdas is a master photographer based in Kakinada, capturing royal wedding celebrations, intimate portraits, untamed wildlife, and industrial documentation across India with artistic poise.
          </p>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 04 — FILTERABLE LUXURY PORTFOLIO MASONRY */}
      {/* ========================================================================= */}
      <FilterableGallery onOpenLightbox={(idx) => setLightboxIndex(idx)} />

      {/* ========================================================================= */}
      {/* 05 — SIGNATURE STORIES */}
      {/* ========================================================================= */}
      <section id="stories" className="bg-ink px-6 py-28 md:px-14 md:py-44">
        <div className="mb-24 grid border-t border-white/20 pt-6 lg:grid-cols-12">
          <p className="editorial-label lg:col-span-4">Signature Stories · Master Works</p>
          <div className="mt-8 lg:col-span-8 lg:mt-0">
            <h2 className="font-serif text-6xl md:text-8xl lg:text-9xl font-normal leading-[0.9] tracking-tight text-paper">
              The moment<br />
              <i className="italic text-accent">before it disappears.</i>
            </h2>
          </div>
        </div>

        {/* Editorial Asymmetrical Layout */}
        <div className="space-y-32 md:space-y-44">
          {projects.map((project, index) => {
            const isEven = index % 2 === 0;
            return (
              <article key={project.slug} className="group">
                <Link
                  href={`/stories/${project.slug}`}
                  className="block"
                  data-cursor="OPEN STORY"
                >
                  <div className={`grid gap-10 lg:grid-cols-12 items-center ${isEven ? "" : "lg:flex-row-reverse"}`}>
                    {/* Image Column */}
                    <div className={`overflow-hidden bg-[#141414] ${isEven ? "lg:col-span-8" : "lg:col-span-8 lg:col-start-5"}`}>
                      <div className="relative aspect-[16/10] md:aspect-[16/9] w-full overflow-hidden">
                        <Image
                          src={project.image}
                          alt={project.imageAlt}
                          fill
                          sizes="(max-width: 1024px) 100vw, 70vw"
                          className="object-cover transition-transform duration-[1200ms] ease-editorial group-hover:scale-[1.03]"
                        />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                      </div>
                    </div>

                    {/* Metadata Column */}
                    <div className={`flex flex-col justify-center ${isEven ? "lg:col-span-4" : "lg:col-span-4 lg:row-start-1"}`}>
                      <div className="border-t border-white/20 pt-4 flex items-center justify-between">
                        <span className="text-[9px] font-mono tracking-widest text-muted">
                          0{index + 1}
                        </span>
                        <span className="editorial-label !text-accent">
                          {project.category} · {project.year || "2024"}
                        </span>
                      </div>

                      <h3 className="mt-4 font-serif text-4xl md:text-5xl font-normal leading-tight text-paper group-hover:text-accent transition-colors">
                        {project.title}
                      </h3>

                      {project.subtitle && (
                        <p className="mt-1.5 font-serif text-base italic text-muted">
                          {project.subtitle}
                        </p>
                      )}

                      <p className="mt-4 text-xs leading-relaxed text-paper/65 line-clamp-3">
                        {project.intro}
                      </p>

                      <div className="mt-6 inline-flex items-center gap-2 text-[9px] uppercase tracking-[0.2em] text-paper group-hover:text-accent transition-colors">
                        <span>Explore Full Story</span>
                        <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    </div>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 06 — PHOTOGRAPHER CONTACT SHEET PROOF */}
      {/* ========================================================================= */}
      <ContactSheetProof onOpenLightbox={(idx) => setLightboxIndex(idx)} />

      {/* ========================================================================= */}
      {/* 07 — CLIENT LOVE STORIES (TESTIMONIALS) */}
      {/* ========================================================================= */}
      <div id="experience">
        <Testimonials />
      </div>

      {/* ========================================================================= */}
      {/* 08 — INTO THE WILD (FIELD NOTES) */}
      {/* ========================================================================= */}
      <section ref={wildRef} className="overflow-hidden bg-ink px-6 py-28 md:px-14 md:py-44">
        <div className="mb-20 grid lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="editorial-label">Field Notes · Wildlife Expeditions</p>
          </div>
          <div className="mt-8 lg:col-span-8 lg:mt-0">
            <h2 className="font-serif text-6xl md:text-8xl lg:text-9xl font-normal leading-[0.85] tracking-tight text-paper">
              Into<br />
              <i className="italic text-accent">the wild.</i>
            </h2>
            <p className="mt-8 font-serif text-2xl md:text-4xl italic text-paper/85">
              Silence. Patience. One frame.
            </p>
          </div>
        </div>

        {/* Bengal Tiger Focus Frame */}
        <motion.div
          style={{ scale: wildImageScale }}
          className="relative mx-auto aspect-[16/9] w-full max-w-6xl origin-center overflow-hidden bg-[#141414] cursor-pointer"
          data-cursor="VIEW"
          onClick={() => setLightboxIndex(4)}
        >
          <Image
            src="/portfolio/luxury/wildlife-tiger-dawn.jpg"
            alt="Royal Bengal Tiger walking silently through morning misty forest"
            fill
            sizes="(max-width: 1024px) 100vw, 85vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-left">
            <div>
              <p className="editorial-label !text-accent">Sal Forest Sanctuary · Dawn</p>
              <p className="font-serif text-xl md:text-2xl italic text-paper mt-1">Sovereign of the Sal Forest</p>
            </div>
            <p className="text-[8px] font-mono tracking-widest text-muted hidden sm:block">
              OBSERVATION EXPEDITION / 2023
            </p>
          </div>
        </motion.div>
      </section>

      {/* ========================================================================= */}
      {/* 09 — BEHIND THE LENS (ABOUT) */}
      {/* ========================================================================= */}
      <section id="about" className="bg-ink px-6 py-28 md:px-14 md:py-44 border-t border-white/10">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Side Meta Column */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <p className="editorial-label">Behind the Lens</p>
              <div className="mt-12 hidden lg:block text-[8.5px] uppercase leading-relaxed tracking-[0.22em] text-muted space-y-4">
                <div>
                  <p className="text-paper font-semibold">Location</p>
                  <p>Kakinada · Andhra Pradesh · India</p>
                </div>
                <div>
                  <p className="text-paper font-semibold">Specialization</p>
                  <p>Royal Weddings / Fine Art / Wildlife</p>
                </div>
              </div>
            </div>

            <div className="hidden lg:block pt-12">
              <Compass className="text-accent/60 h-8 w-8" />
            </div>
          </div>

          {/* Main Editorial Content & Portrait */}
          <div className="lg:col-span-8">
            <h2 className="font-serif text-6xl md:text-8xl lg:text-9xl font-normal leading-[0.85] tracking-tight text-paper">
              RAJESH<br />
              <i className="italic text-accent">RAMDAS</i>
            </h2>

            <div className="mt-16 grid gap-12 md:grid-cols-12 items-start">
              {/* Authentic Portrait Image */}
              <div className="md:col-span-6 overflow-hidden bg-ink-elevated border border-white/10">
                <Image
                  src="/portfolio/profile/rajesh-ramdas.jpg"
                  alt="Sri T. Rajesh Ramdas, professional photographer in Kakinada"
                  width={447}
                  height={447}
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="h-auto w-full object-cover"
                />
                <div className="p-4 border-t border-white/10 text-[8px] uppercase tracking-[0.2em] text-muted flex items-center justify-between">
                  <span>Sri T. Rajesh Ramdas</span>
                  <span className="text-accent">Kakinada</span>
                </div>
              </div>

              {/* Factual Biography */}
              <div className="md:col-span-6 space-y-6 text-sm leading-relaxed text-paper/75">
                <p>
                  Rajesh Ramdas is a distinguished fine-art and wedding photographer based in Kakinada, Andhra Pradesh, whose vision spans luxury royal weddings, emotional human portraits, untamed wildlife, and industrial documentation.
                </p>
                <p>
                  His approach is centered on observational truth — allowing genuine moments to unfold and capturing them with cinematic reverence and luminous framing.
                </p>
                <p>
                  His professional journey also includes photography work associated with ONGC, alongside independent commissions and an international Shutterstock contributor portfolio.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 10 — EXPERIENCE & SERVICES */}
      {/* ========================================================================= */}
      <ServicesList />

      {/* ========================================================================= */}
      {/* 11 — SHUTTERSTOCK COLLECTION */}
      {/* ========================================================================= */}
      <section className="border-y border-white/10 bg-ink-soft px-6 py-24 md:px-14">
        <div className="grid lg:grid-cols-12 items-end gap-10">
          <div className="lg:col-span-4">
            <p className="editorial-label">Stock & Wildlife Collection</p>
          </div>
          <div className="lg:col-span-5">
            <p className="font-serif text-3xl md:text-5xl font-normal leading-tight text-paper">
              A wider collection of licensed wildlife and nature frames.
            </p>
          </div>
          <div className="lg:col-span-3 text-left lg:text-right">
            <a
              href={photographer.social.shutterstock}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border-b border-accent pb-2 text-[9px] uppercase tracking-[0.22em] text-accent hover:text-accent-hover transition-colors"
            >
              <span>View Shutterstock Portfolio</span>
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 12 — THE LAST FRAME */}
      {/* ========================================================================= */}
      <section
        className="relative min-h-[95svh] flex flex-col justify-end overflow-hidden bg-ink px-6 pb-16 md:px-14 md:pb-24 cursor-pointer"
        data-cursor="VIEW"
        onClick={() => setLightboxIndex(0)}
      >
        <Image
          src="/portfolio/luxury/wedding-palace-couple.jpg"
          alt="The Royal Union at Sunset by Rajesh Ramdas"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-black/30" />

        <div className="relative z-10 max-w-5xl">
          <p className="editorial-label !text-accent">The Last Frame</p>
          <h2 className="mt-4 font-serif text-5xl md:text-8xl lg:text-9xl font-normal leading-[0.88] tracking-tight text-paper">
            The moment passes.<br />
            <i className="italic text-accent">The frame remains.</i>
          </h2>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 13 — CONTACT & APPOINTMENT FORM */}
      {/* ========================================================================= */}
      <section id="contact" className="grid bg-ink lg:grid-cols-12 border-t border-white/10">
        {/* Left Editorial Prompt */}
        <div className="flex flex-col justify-between border-b border-white/10 p-6 md:p-14 lg:col-span-5 lg:border-b-0 lg:border-r">
          <div>
            <div className="flex items-center gap-2 text-[9px] uppercase tracking-[0.24em] text-accent mb-2">
              <Sparkles size={13} />
              <span>Commission Inquiries</span>
            </div>
            <h2 className="mt-4 font-serif text-5xl md:text-7xl lg:text-8xl font-normal leading-[0.9] tracking-tight text-paper">
              Reserve Your<br />
              <i className="italic text-accent">Date</i>
            </h2>
          </div>
          <div className="mt-16 space-y-4">
            <p className="max-w-sm text-xs leading-relaxed text-muted">
              We accept a limited number of luxury wedding and fine-art commissions each season to ensure obsessive creative focus on every frame.
            </p>
            <p className="text-[9px] uppercase tracking-[0.2em] text-paper/80">
              Studio Location: Kakinada, Andhra Pradesh, India
            </p>
          </div>
        </div>

        {/* Right Form */}
        <form onSubmit={handleEnquirySubmit} className="p-6 md:p-14 lg:col-span-7">
          <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
            <label className="editorial-field">
              <span>Full Name</span>
              <input name="name" required autoComplete="name" placeholder="Your full name" />
            </label>

            <label className="editorial-field">
              <span>Phone / WhatsApp</span>
              <input name="phone" type="tel" autoComplete="tel" placeholder="+91 / Mobile Number" />
            </label>

            <label className="editorial-field">
              <span>Email Address</span>
              <input name="email" type="email" required autoComplete="email" placeholder="name@example.com" />
            </label>

            <label className="editorial-field">
              <span>Service Requirement</span>
              <select name="requirement" required defaultValue="">
                <option value="" disabled>Select requirement</option>
                <option value="Luxury Wedding">Luxury Wedding</option>
                <option value="Pre-Wedding & Portraits">Pre-Wedding & Portraits</option>
                <option value="Celebrations & Events">Celebrations & Events</option>
                <option value="Wildlife & Fine Art">Wildlife & Fine Art</option>
                <option value="Corporate / Industrial">Corporate / Industrial</option>
                <option value="Other">Other</option>
              </select>
            </label>

            <label className="editorial-field">
              <span>Event / Shoot Date</span>
              <input name="date" placeholder="Fixed date or flexible" />
            </label>

            <label className="editorial-field">
              <span>Destination / Venue</span>
              <input name="location" required placeholder="City / Hotel / Venue" defaultValue="Kakinada" />
            </label>

            <label className="editorial-field sm:col-span-2">
              <span>Message & Vision</span>
              <textarea
                name="message"
                rows={4}
                required
                placeholder="Tell us about your wedding, ceremonies, dates, and the moments you wish to preserve forever..."
              />
            </label>
          </div>

          <button
            type="submit"
            className="mt-10 flex w-full items-center justify-between border border-accent bg-accent/10 px-8 py-4 text-[9.5px] font-semibold uppercase tracking-[0.24em] text-accent transition-all duration-300 hover:bg-accent hover:text-ink focus-visible:outline-accent"
          >
            <span>
              {enquiryStatus === "sent"
                ? "Enquiry Shared Successfully"
                : enquiryStatus === "copied"
                ? "Enquiry Copied to Clipboard"
                : "Submit Commission Inquiry"}
            </span>
            {enquiryStatus === "idle" ? <ArrowRight size={15} /> : <Check size={15} />}
          </button>
        </form>
      </section>

      {/* ========================================================================= */}
      {/* 14 — LUXURY FOOTER & WORLD PHOTOGRAPHY DAY TRIBUTE */}
      {/* ========================================================================= */}
      <footer className="border-t border-white/10 bg-ink px-6 py-14 md:px-14">
        <div className="grid gap-10 md:grid-cols-12 items-end">
          <div className="md:col-span-5">
            <Logo variant="full" />
            <p className="mt-4 text-[8.5px] uppercase tracking-[0.2em] text-muted max-w-sm">
              Fine Art & Luxury Wedding Photography based in Kakinada, Andhra Pradesh, India.
            </p>
          </div>

          <div className="md:col-span-4 flex flex-wrap gap-8 text-[9px] uppercase tracking-[0.22em] text-muted">
            <a
              href={photographer.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
            >
              Facebook ↗
            </a>
            <a
              href={photographer.social.shutterstock}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
            >
              Shutterstock ↗
            </a>
            {photographer.giftMessage.showGiftMessage && (
              <button
                type="button"
                onClick={() => setGiftOpen(true)}
                className="text-accent hover:text-accent-hover transition-colors font-semibold"
              >
                For the photographer
              </button>
            )}
          </div>

          <div className="md:col-span-3 text-left md:text-right text-[8px] uppercase tracking-[0.2em] text-white/40">
            <p>© {new Date().getFullYear()} Rajesh Ramdas.</p>
            <p className="mt-1">All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Fullscreen Lightbox Modal */}
      <Lightbox
        images={gallery}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(idx) => setLightboxIndex(idx)}
      />

      {/* World Photography Day Tribute Modal */}
      <GiftExperience isOpen={giftOpen} onClose={() => setGiftOpen(false)} />
    </main>
  );
}
