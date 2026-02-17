import { motion } from "framer-motion";
import PageWrapper from "@/components/PageWrapper";
import { Card } from "@/components/ui/card";
import { useState } from "react";

// Placeholder data - user can fill this in
const memories = [
  { 
    id: 1, 
    text: "Mi primer RealLove", 
    date: "7 Ottobre 2025", 
    rotation: -5,
    img: "https://i.postimg.cc/kgFknNbR/Whats_App_Image_2026_02_14_at_00_37_09.jpg"
  },
  { 
    id: 2, 
    text: "Aquel viaje a la playa", 
    date: "25 Luglio 2025", 
    rotation: 3,
    img: "https://i.postimg.cc/RZQjM1HW/Whats_App_Image_2026_02_14_at_00_35_56.jpg"
  },
  { 
    id: 3, 
    text: "En las buenas y enlas malas", 
    date: "9 gennaio 2025", 
    rotation: -2,
    img: "https://i.postimg.cc/vZLpQ7Vg/Whats_App_Image_2026_02_14_at_02_30_02.jpg"
  },
  { 
    id: 4, 
    text: "Tú y yo, siempre", 
    date: "♾️❤️‍🩹", 
    rotation: 6,
    img: "https://i.postimg.cc/dVmzqRyD/Whats_App_Image_2026_02_14_at_02_48_51.jpg"
  },
];

function MemoryItem({ memory, idx }: { memory: typeof memories[number]; idx: number }) {
  const [burst, setBurst] = useState<
    Array<{ id: number; dx: number; dy: number; rot: number; delay: number }>
  >([]);
  const [portrait, setPortrait] = useState<boolean | null>(null);
  const handleClick = () => {
    const arr = Array.from({ length: 26 }).map((_, i) => ({
      id: i,
      dx: (Math.random() - 0.5) * 180,
      dy: (Math.random() - 0.5) * 180,
      rot: (Math.random() - 0.5) * 60,
      delay: Math.random() * 0.15,
    }));
    setBurst(arr);
    setTimeout(() => setBurst([]), 2500);
  };
  const aspectClass = portrait === null ? "aspect-[3/4]" : portrait ? "aspect-[3/4]" : "aspect-[4/3]";
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, rotate: memory.rotation }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", damping: 14, stiffness: 140, delay: idx * 0.15 }}
      className="relative w-full"
    >
      <Card
        onClick={handleClick}
        className="bg-[#fffdf0] border-none shadow-md p-5 md:p-6 transform transition-transform hover:scale-105 hover:z-20 cursor-pointer"
      >
        <div className="flex flex-col items-center text-center relative">
          <div className="w-28 h-7 bg-white/40 absolute -top-3 left-1/2 -translate-x-1/2 rotate-1 shadow-sm backdrop-blur-[1px]" />
          <div className={`w-full ${aspectClass} bg-muted mb-4 rounded-md border border-black/5 overflow-hidden`}>
            <img 
              src={memory.img} 
              alt={memory.text} 
              className="w-full h-full object-cover object-center"
              loading="lazy"
              onLoad={(e) => {
                const img = e.currentTarget as HTMLImageElement;
                setPortrait(img.naturalHeight >= img.naturalWidth);
              }}
            />
          </div>
          <p className="font-hand text-2xl text-foreground mb-1">{memory.text}</p>
          <span className="text-xs font-serif text-muted-foreground uppercase tracking-widest">
            {memory.date}
          </span>
          <div className="pointer-events-none absolute inset-0">
            {burst.map((b) => (
              <motion.span
                key={b.id}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl text-red-500"
                initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 1 }}
                animate={{ x: b.dx, y: b.dy, opacity: 0, rotate: b.rot, scale: 1.3 }}
                transition={{ duration: 2.5, ease: "easeOut", delay: b.delay }}
              >
                ♥
              </motion.span>
            ))}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

export default function Memories() {
  return (
    <PageWrapper prev="/question" next="/surprise">
      <div className="w-full max-w-4xl mx-auto">
        <h2 className="text-4xl font-hand italic text-primary mb-8 text-center drop-shadow-sm">
          Nuestros Momentos
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {memories.map((m, i) => (
            <MemoryItem key={m.id} memory={m} idx={i} />
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}
