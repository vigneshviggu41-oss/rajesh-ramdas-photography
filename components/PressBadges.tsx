import { Award, ShieldCheck, Camera, Globe } from "lucide-react";

const pressItems = [
  {
    name: "WeddingSutra",
    label: "Featured Luxury Artist",
    icon: Award,
  },
  {
    name: "WedMeGood",
    label: "Top Rated 5-Star Photographer",
    icon: ShieldCheck,
  },
  {
    name: "Fearless Collective",
    label: "Artistic Vision & Candids",
    icon: Camera,
  },
  {
    name: "Shutterstock",
    label: "Global Contributor Portfolio",
    icon: Globe,
  },
];

export default function PressBadges() {
  return (
    <section className="border-y border-white/10 bg-[#080808] px-6 py-12 md:px-12">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 items-center">
        {pressItems.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.name}
              className="flex flex-col items-center text-center p-4 border border-white/5 bg-ink/40"
            >
              <Icon size={20} className="text-accent mb-3" />
              <p className="font-cinzel text-xs md:text-sm tracking-[0.2em] uppercase text-paper font-semibold">
                {item.name}
              </p>
              <p className="mt-1 text-[7.5px] md:text-[8px] uppercase tracking-[0.2em] text-muted">
                {item.label}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
