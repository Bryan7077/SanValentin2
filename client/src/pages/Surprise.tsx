import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageWrapper from "@/components/PageWrapper";
import { Button } from "@/components/ui/button";
import { Gift } from "lucide-react";
import confetti from "canvas-confetti";

export default function Surprise() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    
    // Rose rain effect
    // We create a custom shape for confetti using the rose petal image
    // Note: Since we can't easily pass image data to canvas-confetti in this environment efficiently without creating a shape,
    // we'll use red circles and custom shapes if possible, or just focus on the visual effect.
    // For simplicity and reliability in this preview, we'll use deep red 'confetti' that looks like petals.
    
    const duration = 5000;
    const animationEnd = Date.now() + duration;
    
    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      confetti({
        particleCount,
        startVelocity: 30,
        spread: 360,
        origin: {
          x: Math.random(),
          // since they fall down, start a bit higher than random
          y: Math.random() - 0.2
        },
        colors: ['#D00000', '#990000', '#FF0000', '#800000'],
        shapes: ['circle'],
        scalar: 1.2,
        drift: 0,
        ticks: 200 // slow fall
      });
    }, 250);
  };

  return (
    <PageWrapper prev="/memories">
      {/* Blackout Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black z-40 flex items-center justify-center p-6"
          >
            <div className="text-center relative z-50">
              <motion.h1 
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="text-5xl md:text-7xl font-hand text-white mb-8"
              >
                Te amo muchooo ❤️‍🩹
              </motion.h1>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="text-white/80 font-serif text-xl max-w-lg mx-auto leading-relaxed"
              >
                "Eres el hoy que disfruto y el mañana que sueño. Contigo empecé desde cero y contigo quiero cumplir todas las promesas que nos hicimos. Siempre serás tú."
                <br />
                <br />
                <span className="text-sm uppercase tracking-[0.2em] opacity-60">
                  Feliz San Valentin 2026
                </span>
              </motion.div>
            </div>
            
            {/* CSS Particles for Falling Images (mixed) */}
            {Array.from({ length: 60 }).map((_, i) => {
              const src = Math.random() < 0.5 
                ? "https://i.pinimg.com/736x/a9/8c/66/a98c66a10b0379f7fbc8f9c58a9ba971.jpg" 
                : "https://i.pinimg.com/736x/7f/44/84/7f4484888ffdf4340cb993b1610cd161.jpg";
              const col = (i / 60) * 100; // stratified distribution across width
              const jitter = (Math.random() - 0.5) * 16; // ±8% jitter
              const size = 24 + Math.random() * 24; // 24–48px
              const delay = Math.random() * 0.5; // small offsets; they fall roughly together
              const driftX = (Math.random() - 0.5) * 120;
              const rot = 180 + Math.random() * 360;
              const dur = 6 + Math.random() * 6; // 6–12s
              return (
                <motion.img
                  key={i}
                  src={src}
                  className="absolute opacity-85 z-50"
                  style={{ width: size, height: size }}
                  initial={{
                    top: -60,
                    left: `${Math.min(100, Math.max(0, col + jitter))}%`,
                    rotate: 0,
                  }}
                  animate={{
                    top: "110%",
                    rotate: rot,
                    x: driftX,
                  }}
                  transition={{
                    duration: dur,
                    repeat: Infinity,
                    delay,
                    ease: "linear",
                  }}
                />
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <h2 className="text-3xl font-serif text-primary mb-12 text-center">
          Una última sorpresa...
        </h2>
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            size="lg"
            className="h-auto py-8 px-10 rounded-full bg-gradient-to-r from-primary to-pink-600 shadow-xl shadow-pink-500/30 border-4 border-white/20 text-2xl font-hand"
            onClick={handleOpen}
          >
            <Gift className="mr-4 w-8 h-8" />
            Obten tu regalo
          </Button>
        </motion.div>
      </div>
    </PageWrapper>
  );
}
