export type ProjectCategory = "Weddings" | "Wildlife" | "Wild" | "Places" | "People" | "Travel";

export type ProjectFrame = {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  orientation?: "landscape" | "portrait" | "square";
};

export type Project = {
  slug: string;
  title: string;
  subtitle?: string;
  category: ProjectCategory;
  year?: string;
  location?: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  imageAlt: string;
  intro: string;
  note: string;
  frames: ProjectFrame[];
};

export const projects: Project[] = [
  {
    slug: "royal-palace-union",
    title: "The Royal Heritage Union",
    subtitle: "A Regal Celebration of Love & Vows",
    category: "Weddings",
    year: "2024",
    location: "Heritage Palace · Rajasthan & Kakinada",
    image: "/portfolio/luxury/wedding-palace-couple.jpg",
    imageWidth: 1920,
    imageHeight: 1080,
    imageAlt: "Royal Indian wedding couple holding hands in heritage palace courtyard at sunset",
    intro: "An extraordinary journey through sacred Vedic rituals, vibrant Haldi euphoric laughter, and timeless couple portraits under golden palace arches.",
    note: "Great wedding photography is about feeling the atmosphere before it changes. The sacred fire, the glance between families, the quiet weight of Kanchipuram silk — preserved for generations.",
    frames: [
      {
        src: "/portfolio/luxury/wedding-palace-couple.jpg",
        width: 1920,
        height: 1080,
        alt: "Royal couple in heritage courtyard at golden hour sunset",
        caption: "Sunset Courtyard / Royal Union",
        orientation: "landscape",
      },
      {
        src: "/portfolio/luxury/wedding-royal-bride.jpg",
        width: 1080,
        height: 1440,
        alt: "South Indian bride in crimson and gold Kanchipuram silk with temple jewelry",
        caption: "Bride in Kanchipuram Silk & Antique Gold",
        orientation: "portrait",
      },
      {
        src: "/portfolio/luxury/wedding-mandap-ceremony.jpg",
        width: 1920,
        height: 1080,
        alt: "Sacred wedding rituals under grand floral mandap with holy fire",
        caption: "The Sacred Vows & Holy Fire",
        orientation: "landscape",
      },
      {
        src: "/portfolio/luxury/wedding-haldi-joy.jpg",
        width: 1440,
        height: 1080,
        alt: "Candid laughter and yellow marigold petals in Haldi celebration",
        caption: "Joyous Haldi & Flying Marigolds",
        orientation: "landscape",
      },
    ],
  },
  {
    slug: "sovereign-of-the-wild",
    title: "Sovereign of the Wild",
    subtitle: "Silent Encounters Across Forest Canopies",
    category: "Wildlife",
    year: "2023",
    location: "Central & Southern Reserves",
    image: "/portfolio/luxury/wildlife-tiger-dawn.jpg",
    imageWidth: 1920,
    imageHeight: 1080,
    imageAlt: "Royal Bengal Tiger walking silently through morning misty jungle in sunbeams",
    intro: "Hours of silent waiting rewarded by singular moments: a tiger emerging from misty shadows, a kingfisher breaking the tranquil stream surface.",
    note: "In the wild, there are no second chances. You do not direct the subject. You breathe with the forest and press the shutter only when everything aligns.",
    frames: [
      {
        src: "/portfolio/luxury/wildlife-tiger-dawn.jpg",
        width: 1920,
        height: 1080,
        alt: "Royal Bengal tiger pacing through misty sunrise forest",
        caption: "Sovereign of the Sal Forest / Dawn Mist",
        orientation: "landscape",
      },
      {
        src: "/portfolio/luxury/wildlife-kingfisher.jpg",
        width: 1440,
        height: 1080,
        alt: "Electric blue kingfisher perched on mossy branch above stream",
        caption: "Electric Blue Kingfisher / Still Waters",
        orientation: "landscape",
      },
      {
        src: "/portfolio/nature/water-drop-reflection.jpg",
        width: 1024,
        height: 768,
        alt: "Two water drops suspended beneath a twig holding inverted reflections",
        caption: "Inverted Worlds / Dew Reflections",
        orientation: "landscape",
      },
    ],
  },
  {
    slug: "before-the-light-moves",
    title: "Before the Light Moves",
    subtitle: "Studies in Dawn & Wild Flora",
    category: "Wild",
    year: "2021",
    location: "Kakinada, Andhra Pradesh",
    image: "/portfolio/nature/flower-and-sunrise.jpg",
    imageWidth: 1024,
    imageHeight: 768,
    imageAlt: "Pink wildflowers rising in sharp focus against a golden sunrise over green fields",
    intro: "A fleeting alignment of wild blossom, morning mist, and low horizon sun — captured in the precise seconds before the sun climbed higher.",
    note: "The frame exists because the photographer waited. A minute later, the relationship between the petals and the light was already gone.",
    frames: [
      {
        src: "/portfolio/nature/flower-and-sunrise.jpg",
        width: 1024,
        height: 768,
        alt: "Pink wildflowers held against a low sunrise",
        caption: "Wildflower / first light",
        orientation: "landscape",
      },
      {
        src: "/portfolio/nature/paddy-field-sunrise.jpg",
        width: 1024,
        height: 768,
        alt: "Flooded paddy field reflecting morning sun and tree canopies",
        caption: "Flooded ground / sun reflection",
        orientation: "landscape",
      },
      {
        src: "/portfolio/nature/flower-in-focus.jpg",
        width: 1024,
        height: 768,
        alt: "Wildflower close-up in morning dawn",
        caption: "Light through wild thorns",
        orientation: "landscape",
      },
    ],
  },
  {
    slug: "palmyra-line",
    title: "Palmyra Line",
    subtitle: "Coastal Horizons of Godavari",
    category: "Places",
    year: "2021",
    location: "East Godavari",
    image: "/portfolio/nature/palmyra-field.jpg",
    imageWidth: 1024,
    imageHeight: 768,
    imageAlt: "Palmyra palm trees standing silhouetted across a sunlit emerald field",
    intro: "The distinctive geometry of Andhra's coastal plains: low horizons, standing palms, flooded paddy, and morning warmth.",
    note: "These photographs are rooted in the visual identity of the landscape — open fields, working irrigation water, and the unmistakable graphic line of palmyra trees.",
    frames: [
      {
        src: "/portfolio/nature/palmyra-field.jpg",
        width: 1024,
        height: 768,
        alt: "Palmyra trees spaced across a sunlit field",
        caption: "Palmyra silhouettes / dawn",
        orientation: "landscape",
      },
      {
        src: "/portfolio/nature/paddy-sunset-portrait.jpg",
        width: 768,
        height: 1024,
        alt: "Vertical framing of sunset through tree branches over flooded rice field",
        caption: "Paddy water reflecting twilight",
        orientation: "portrait",
      },
      {
        src: "/portfolio/nature/paddy-twilight-wide.jpg",
        width: 1024,
        height: 768,
        alt: "Expansive green fields under golden evening cloud formations",
        caption: "Twilight over the fields",
        orientation: "landscape",
      },
    ],
  },
  {
    slug: "under-the-same-sky",
    title: "Under the Same Sky",
    subtitle: "Scale, Stillness & Night Observations",
    category: "Travel",
    year: "2021",
    image: "/portfolio/travel/night-sky-silhouette.jpg",
    imageWidth: 768,
    imageHeight: 1024,
    imageAlt: "A solitary human figure standing beneath the galactic core of the Milky Way",
    intro: "A human presence beneath a cosmic expanse too vast to measure — a study in stillness, perspective, and looking upward.",
    note: "At night the landscape sheds its boundaries. The human figure provides the sky its scale and anchors the silence.",
    frames: [
      {
        src: "/portfolio/travel/night-sky-silhouette.jpg",
        width: 768,
        height: 1024,
        alt: "Solitary figure standing beneath the Milky Way and starry sky",
        caption: "Under the galactic arc",
        orientation: "portrait",
      },
      {
        src: "/portfolio/profile/rajesh-mountain.jpg",
        width: 1079,
        height: 1072,
        alt: "Rajesh Ramdas seated on a mountain summit overlooking layered green peaks",
        caption: "Summit observation / Eastern Ghats",
        orientation: "square",
      },
    ],
  },
];
