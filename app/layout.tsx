import type { Metadata, Viewport } from "next";
import { Cinzel, Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { photographer } from "@/data/photographer";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.rajeshramdas.com"),
  title: {
    default: "Rajesh Ramdas — Luxury Wedding & Fine Art Photographer · Kakinada",
    template: "%s — Rajesh Ramdas Fine Art Photography",
  },
  description:
    "Award-winning luxury wedding, portrait, wildlife, and fine-art photography by Sri T. Rajesh Ramdas based in Kakinada, Andhra Pradesh. Specializing in royal destination weddings, intimate candid moments, and visual storytelling.",
  keywords: [
    "Luxury Wedding Photographer Kakinada",
    "Best Wedding Photographer Andhra Pradesh",
    "Destination Wedding Photography India",
    "Rajesh Ramdas Photography",
    "Fine Art Photographer Kakinada",
    "Sri T. Rajesh Ramdas",
    "South Indian Wedding Photography",
    "Wildlife Photographer India",
  ],
  authors: [{ name: "Rajesh Ramdas" }],
  creator: "Rajesh Ramdas",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Rajesh Ramdas — Luxury Wedding & Fine Art Photographer",
    description: "The moment passes. The frame remains. Royal Weddings · Portraits · Wildlife · Fine Art.",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/portfolio/luxury/wedding-palace-couple.jpg",
        width: 1920,
        height: 1080,
        alt: "Royal Indian Wedding Couple at Sunset by Rajesh Ramdas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rajesh Ramdas — Luxury Wedding & Fine Art Photographer",
    description: "The moment passes. The frame remains.",
    images: ["/portfolio/luxury/wedding-palace-couple.jpg"],
  },
  icons: {
    icon: "/portfolio/profile/rajesh-ramdas.jpg",
    apple: "/portfolio/profile/rajesh-ramdas.jpg",
  },
};

export const viewport: Viewport = {
  themeColor: "#090909",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: photographer.name,
    alternateName: photographer.displayName,
    jobTitle: photographer.role,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kakinada",
      addressRegion: "Andhra Pradesh",
      addressCountry: "IN",
    },
    url: "https://www.rajeshramdas.com",
    sameAs: [photographer.social.facebook, photographer.social.shutterstock],
  };

  const businessJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Rajesh Ramdas Photography",
    image: "https://www.rajeshramdas.com/portfolio/luxury/wedding-palace-couple.jpg",
    priceRange: "₹₹₹₹",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kakinada",
      addressRegion: "Andhra Pradesh",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 16.9891,
      longitude: 82.2475,
    },
    url: "https://www.rajeshramdas.com",
  };

  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${cormorant.variable} ${plusJakarta.variable} bg-ink`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }}
        />
      </head>
      <body className="bg-ink text-paper font-sans antialiased selection:bg-accent selection:text-ink min-h-screen">
        {children}
      </body>
    </html>
  );
}
