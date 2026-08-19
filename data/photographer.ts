export type ExperienceItem = {
  role: string;
  meta: string;
  desc: string;
  url?: string;
};

export type Testimonial = {
  couple: string;
  quote: string;
  location: string;
  event: string;
};

export const photographer = {
  name: "Sri T. Rajesh Ramdas",
  displayName: "RAJESH RAMDAS",
  role: "Fine Art & Luxury Wedding Photographer · Visual Storyteller",
  location: "Kakinada, Andhra Pradesh, India",
  shortLocation: "Kakinada · India",
  philosophy: "The moment passes. The frame remains.",
  coreIdea: "The moment before it disappears.",
  disciplines: ["Weddings", "Portraits", "Wildlife", "Fine Art", "Films"],
  services: [
    "Luxury Weddings",
    "Pre-Wedding & Portraits",
    "Celebrations & Events",
    "Wildlife & Fine Art",
    "Corporate & Industrial",
  ],
  serviceDescriptions: {
    "Luxury Weddings": "Cinematic royal coverage, sacred Vedic rituals, and timeless romantic frames.",
    "Pre-Wedding & Portraits": "Editorial high-fashion portraits, presence, and genuine romantic chemistry.",
    "Celebrations & Events": "Unobtrusive documentary storytelling capturing vibrant laughter and rituals.",
    "Wildlife & Fine Art": "Patience, stillness, and masterclass observation of tigers, rare birds, and landscapes.",
    "Corporate & Industrial": "Precise, disciplined documentation for industrial operations and corporate facilities.",
  },
  contact: {
    phone: "",
    email: "",
    whatsapp: "",
  },
  social: {
    facebook: "https://www.facebook.com/rajeshteamworks.in/",
    shutterstock: "https://www.shutterstock.com/g/R+Ramadasu+Timmaraju",
  },
  press: [
    { name: "WeddingSutra Featured", label: "Editorial Feature" },
    { name: "WedMeGood", label: "Top Rated Luxury Artist" },
    { name: "Fearless Photographers", label: "Artistic Excellence" },
    { name: "Shutterstock Global", label: "Contributing Artist" },
  ],
  testimonials: [
    {
      couple: "Pooja & Abhinav",
      location: "Heritage Destination Wedding",
      event: "Palace Wedding & Reception",
      quote: "Rajesh Ramdas and his team were pure magic. Looking through our wedding album felt like reliving a luxury cinematic film. They captured the most intimate, tearful, and joyful moments with effortless elegance.",
    },
    {
      couple: "Sneha & Karthik",
      location: "Hyderabad · Grand Mandap",
      event: "Traditional Vedic Ceremony",
      quote: "The rich Kanchipuram silk tones, the sacred fire glow, the raw laughter during Haldi — Rajesh documented everything with breathtaking artistry. The photographs look straight out of a luxury editorial magazine.",
    },
    {
      couple: "Divya & Vikram",
      location: "Coastal Andhra & Vizag",
      event: "Coastal Wedding & Pre-Wedding",
      quote: "We were mesmerized by his calm presence and unique eye for framing. He never forced a pose, yet every candid shot is museum-worthy. Truly a master visual storyteller.",
    },
  ] as Testimonial[],
  bio: `Rajesh Ramdas is a celebrated fine-art and wedding photographer based in Kakinada, Andhra Pradesh, whose vision spans luxury royal weddings, emotional portraits, untamed wildlife, and industrial documentation.

His philosophy is rooted in observational truth — allowing genuine moments to unfold and capturing them with cinematic reverence and luminous framing.

His journey encompasses high-profile wedding commissions across India, wildlife expeditions, and industrial documentation associated with ONGC, alongside an acclaimed international Shutterstock contributor collection.`,
  experience: [
    {
      role: "Luxury Wedding & Fine Art",
      meta: "Kakinada · Hyderabad · Destination Weddings",
      desc: "Royal weddings, sacred ceremonies, high-fashion bride & groom portraits.",
    },
    {
      role: "Corporate / Industrial Photography",
      meta: "Professional experience associated with ONGC",
      desc: "Industrial environment documentation, operations, and facility storytelling.",
    },
    {
      role: "Stock & Wildlife Contributor",
      meta: "Shutterstock Contributor Portfolio",
      desc: "Global licensing of high-resolution nature and wildlife photographs.",
      url: "https://www.shutterstock.com/g/R+Ramadasu+Timmaraju",
    },
  ] as ExperienceItem[],
  giftMessage: {
    showGiftMessage: true,
    lines: [
      "Some people see a moment.",
      "You see the frame inside it.",
      "From celebrations filled with people\nto the quiet patience of the wild,\nyou have spent your life preserving moments\nthat would otherwise disappear.",
      "Happy World Photography Day, Annayya. ❤️",
    ],
    signoff: "— With love, your brother",
    backgroundPhoto: "/portfolio/profile/rajesh-mountain.jpg",
  },
};

export type Photographer = typeof photographer;
