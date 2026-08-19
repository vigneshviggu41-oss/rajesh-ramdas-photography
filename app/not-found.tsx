import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return <main className="relative flex min-h-screen items-end overflow-hidden bg-ink px-6 py-10 text-paper md:px-10">
    <Image src="/portfolio/nature/river-sky.jpg" alt="Evening sky above a quiet river" fill priority sizes="100vw" className="object-cover" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/20" />
    <div className="relative z-10 grid w-full gap-12 border-t border-white/40 pt-5 md:grid-cols-[1fr_auto] md:items-end">
      <div><p className="eyebrow">Frame not found / 404</p><h1 className="mt-6 font-display text-6xl leading-[.84] md:text-9xl">The moment<br /><i>has moved on.</i></h1></div>
      <Link href="/" className="flex items-center gap-3 text-[9px] font-bold uppercase tracking-[.2em]"><ArrowLeft size={15} /> Return to the archive</Link>
    </div>
  </main>;
}
