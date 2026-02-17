import { useRef, useState } from "react";
import { motion } from "framer-motion";
import PageWrapper from "@/components/PageWrapper";
import { Button } from "@/components/ui/button";

export default function Question() {
  const [noBtnPosition, setNoBtnPosition] = useState({ x: 0, y: 0 });
  const [clickCount, setClickCount] = useState(0);
  const [showLove, setShowLove] = useState(false);
  const noBtnRef = useRef<HTMLDivElement | null>(null);
  const [glowId, setGlowId] = useState<number | null>(null);

  const [hasMoved, setHasMoved] = useState(false);

  const moveButton = () => {
    const margin = 24;
    const w = window.innerWidth;
    const h = window.innerHeight;
    const el = noBtnRef.current;
    const bw = el ? el.offsetWidth : 220;
    const bh = el ? el.offsetHeight : 80;
    const maxX = Math.max(margin, w - bw - margin);
    const maxY = Math.max(margin, h - bh - margin);
    const randomX = Math.floor(margin + Math.random() * maxX);
    const randomY = Math.floor(margin + Math.random() * maxY);
    setNoBtnPosition({ x: randomX, y: randomY });
    setHasMoved(true);
    setClickCount(prev => prev + 1);
  };

  const handleYes = () => {
    setShowLove(true);
  };

  const sources = [
    "https://i.pinimg.com/736x/77/88/83/778883bd6a7d46b0d54c1989e1fd710b.jpg",
    "https://i.pinimg.com/originals/9d/70/4d/9d704d2b16c93d4b18529c1a15bc0c09.gif",
    "https://i.pinimg.com/1200x/23/96/6e/23966eeeaa5272d91be56de3f650434c.jpg",
    "https://i.pinimg.com/originals/bc/e8/7e/bce87e7cad2c6fad2c0d874db7063d2e.gif",
    "https://i.pinimg.com/1200x/be/41/47/be4147c1ee40c590835aff34b62a7d66.jpg",
    "https://media1.tenor.com/m/8XmbFSOd5rgAAAAd/вот-тебе-наказание.gif",
    "https://i.pinimg.com/1200x/28/61/78/286178bc66faa9e7a352b341538a9f1b.jpg",
    "https://i.pinimg.com/736x/b0/f2/2b/b0f22b2b4419d57108d8efabad50b543.jpg",
    "https://i.pinimg.com/736x/a6/c9/0b/a6c90b88f51b0c171e1c3d2cabcc64ab.jpg",
    "https://i.pinimg.com/1200x/b0/cf/34/b0cf34a2698302b7e0770413f5747ca9.jpg",
  ];

  return (
    <PageWrapper prev="/thermometer" next="/memories">
      {!showLove ? (
        <div className="flex flex-col items-center justify-center space-y-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="bg-white p-8 rounded-[2rem] shadow-xl border-4 border-primary/20 max-w-xs text-center relative"
          >
            <div className="text-6xl mb-4">🥺</div>
            <h2 className="text-4xl font-serif text-primary font-bold">
              ¿Me amas?
            </h2>
          </motion.div>

          <div className="flex flex-row justify-center items-center gap-8 mt-10">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button 
                size="lg" 
                className="px-16 py-10 text-3xl font-serif bg-primary hover:bg-primary/90 rounded-full shadow-lg shadow-primary/30"
              onClick={handleYes}
              >
                ¡SÍ! ❤️
              </Button>
            </motion.div>

            <motion.div
              ref={noBtnRef}
              animate={hasMoved ? noBtnPosition : { x: 0, y: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              onHoverStart={moveButton}
              onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); moveButton(); }}
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); moveButton(); }}
              style={hasMoved ? { position: "fixed", left: 0, top: 0 } : {}}
            >
              <Button 
                variant="outline"
                size="lg" 
                className="px-16 py-10 text-3xl font-serif rounded-full border-2 bg-white"
              >
                {clickCount > 3 ? "¡Imposible!" : "No"}
              </Button>
            </motion.div>
          </div>

          {clickCount > 5 && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-primary font-hand text-xl"
            >
              Deja de intentarlo, ¡sabes que me amas! 😈
            </motion.p>
          )}
        </div>
      ) : (
        <div className="fixed inset-0 flex flex-col items-center justify-start bg-[#fff7f2]">
          <h2 className="text-5xl sm:text-6xl font-hand italic font-bold text-primary mt-10">
            Te Amo Corazón ❤️‍🩹
          </h2>
          <div className="w-full h-[42vh] sm:h-[50vh] overflow-hidden flex items-center justify-center relative" style={{ perspective: "1200px" }}>
            <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-b from-[#2f2f2f] to-[#00000022] rounded-b-md shadow-md" />
            <motion.div
              className="flex items-center gap-6 sm:gap-10"
              style={{ width: "max-content" }}
              animate={{ x: ["-50%", "0%"] }}
              transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
            >
              {[...Array(2)].flatMap((_, pass) =>
                sources.map((src, i) => ({ src, i, key: `${pass}-${i}` }))
              ).map(({ src, i, key }) => {
                const center = (sources.length - 1) / 2;
                const offset = i - center;
                const rotateY = offset * 6;
                const depth = -Math.abs(offset) * 30;
                const delay = i * 0.08;
                return (
                  <motion.div
                    key={key}
                    className="relative flex items-center justify-center"
                    initial={{ opacity: 0, rotate: 0 }}
                    animate={{ opacity: 1, rotate: [0, 7, -5, 3, 0] }}
                    transition={{
                      rotate: { duration: 2.8, ease: "easeOut", delay },
                      opacity: { duration: 0.6, ease: "easeOut", delay }
                    }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <div
                      className="absolute left-1/2 -translate-x-1/2 w-[2px] bg-black/40"
                      style={{ top: "-30vh", height: "30vh" }}
                    />
                    <div
                      className="rounded-xl shadow-xl bg-gradient-to-br from-[#f5d08d] to-[#caa155] p-1"
                      style={{ transform: `translateZ(${depth}px) rotateY(${rotateY}deg)` }}
                    >
                      <div className="bg-[#f7f2e4] p-2 rounded-lg">
                        <div className="w-36 h-24 sm:w-56 sm:h-36 md:w-64 md:h-40 overflow-hidden rounded-md shadow-inner">
                          <img src={src} className="w-full h-full object-cover" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
          <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-6 px-6">
            {[
              { id: 1, label: "Link al Sito 1", href: "https://bryan7077.github.io/para_mi_hermosa/" },
              { id: 2, label: "Link al Sito 2", href: "https://bryan7077.github.io/Mi-Vida-3/" }
            ].map((link) => (
              <motion.button
                key={link.id}
                className="relative bg-[#fff6e6] border-2 border-[#a88b4a] rounded-lg px-5 py-3 text-base sm:text-lg font-serif text-[#5b3e1d] shadow-md w-[260px] sm:w-auto"
                onClick={() => {
                  setGlowId(link.id);
                  setTimeout(() => {
                    window.open(link.href, "_blank", "noopener,noreferrer");
                    setGlowId(null);
                  }, 500);
                }}
                animate={glowId === link.id ? { boxShadow: "0 0 30px rgba(255, 209, 102, 0.9)" } : { boxShadow: "0 0 0px rgba(0,0,0,0)" }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  className="w-36 sm:w-48 md:w-56 aspect-[4/3]"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg viewBox="0 0 200 140" className="w-full h-full">
                    <rect x="10" y="20" width="180" height="110" rx="12" fill="#e9e9ea" stroke="#cfcfd2" />
                    <path d="M10 20 L100 90 L190 20 Z" fill="#d7d7da" />
                    <path d="M10 130 L100 70 L190 130 Z" fill="#efefef" />
                    <path d="M100 80 C100 62 120 58 130 72 C140 86 126 100 100 118 C74 100 60 86 70 72 C80 58 100 62 100 80 Z" fill="#e54545" stroke="#c73333" strokeWidth="2" />
                  </svg>
                </motion.div>
                <div className="text-lg opacity-80 mt-2 font-hand italic">
                  {link.id === 1 ? "Para Mi Hermosa" : "Mi Vida"}
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      )}
    </PageWrapper>
  );
}
