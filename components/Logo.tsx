import Link from "next/link";

interface LogoProps {
  variant?: "full" | "mark" | "compact";
  className?: string;
}

export default function Logo({ variant = "full", className = "" }: LogoProps) {
  return (
    <Link
      href="/#top"
      className={`group inline-flex items-center gap-3.5 focus-visible:outline-accent transition-opacity hover:opacity-90 ${className}`}
      aria-label="Rajesh Ramdas Photography Home"
    >
      {/* Artisan Vector Luxury Monogram Seal */}
      <div className="relative flex-shrink-0 h-10 w-10 md:h-11 md:w-11">
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full transition-transform duration-700 ease-editorial group-hover:scale-105"
        >
          {/* Outer Fine Ring */}
          <circle
            cx="50"
            cy="50"
            r="47"
            stroke="currentColor"
            strokeWidth="0.8"
            className="text-accent/60"
          />
          {/* Inner Concentric Ring */}
          <circle
            cx="50"
            cy="50"
            r="44"
            stroke="currentColor"
            strokeWidth="0.4"
            strokeDasharray="2 2"
            className="text-paper/40"
          />

          {/* Compass & Optical Diamond Accents */}
          <circle cx="50" cy="3" r="1.5" fill="currentColor" className="text-accent" />
          <circle cx="50" cy="97" r="1.5" fill="currentColor" className="text-accent" />
          <circle cx="3" cy="50" r="1.5" fill="currentColor" className="text-accent" />
          <circle cx="97" cy="50" r="1.5" fill="currentColor" className="text-accent" />

          {/* Intertwined Luxury 'RR' Monogram Paths */}
          {/* Left R */}
          <path
            d="M32 30V70M32 30H46C51.5 30 55 33.5 55 38.5C55 43.5 51.5 47 46 47H32M44 47L56 70"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-paper"
          />
          {/* Right Interlocking Shadow R */}
          <path
            d="M48 30V70M48 30H62C67.5 30 71 33.5 71 38.5C71 43.5 67.5 47 62 47H48M60 47L72 70"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-accent"
          />
        </svg>
      </div>

      {variant !== "mark" && (
        <div className="flex flex-col">
          <span className="font-serif text-sm md:text-base font-normal tracking-[0.24em] text-paper uppercase leading-tight">
            RAJESH RAMDAS
          </span>
          <span className="text-[7px] md:text-[7.5px] uppercase tracking-[0.32em] text-accent/90 font-medium">
            FINE ART PHOTOGRAPHY · KAKINADA
          </span>
        </div>
      )}
    </Link>
  );
}
