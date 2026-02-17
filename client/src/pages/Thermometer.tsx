import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PageWrapper from "@/components/PageWrapper";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ThermometerSun } from "lucide-react";
import confetti from "canvas-confetti";

export default function Thermometer() {
  const [progress, setProgress] = useState(0);
  const [showError, setShowError] = useState(false);
  const [broken, setBroken] = useState(false);
  const [shatter, setShatter] = useState(false);

  useEffect(() => {
    // Start filling up
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 110) { // Go past 100% visually
          clearInterval(interval);
          setShowError(true);
          setBroken(true);
          setShatter(true);
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#ff0000', '#ff69b4', '#ffffff']
          });
          return 110;
        }
        return prev + 1; // Speed of fill
      });
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <PageWrapper prev="/" next="/question">
      <div className="w-full max-w-sm flex flex-col items-center space-y-8">
        <h2 className="text-4xl font-hand italic font-bold uppercase text-primary mb-4 text-center">
          MEDIDOR DE AMOR
        </h2>

        <motion.div 
          className={`relative w-28 h-[26rem] bg-white/60 rounded-full border-4 border-primary/30 p-2 shadow-xl mx-auto`}
          animate={broken ? { rotate: [0, 1.2, -1.2, 0], scale: [1, 1.01, 0.99, 1] } : {}}
          transition={{ duration: 0.6, ease: "easeInOut", repeat: broken ? Infinity : 0 }}
        >
          {!broken && <div className="absolute top-4 right-4 w-4 h-20 bg-white/40 rounded-full z-20 blur-[2px]" />}
          
          <div className="absolute inset-1 rounded-full overflow-hidden z-5">
            <motion.div 
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-red-600 to-pink-500 w-full"
              initial={{ height: "0%" }}
              animate={{ height: `${Math.min(progress, 100)}%` }}
              transition={{ type: "tween", ease: "linear", duration: 0 }}
            />
            <motion.div 
              animate={{ y: [0, -200] }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              className="absolute bottom-2 left-1/2 w-2 h-2 bg-white/50 rounded-full"
            />
            <motion.div 
              animate={{ y: [0, -250] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "linear", delay: 1 }}
              className="absolute bottom-6 left-1/3 w-3 h-3 bg-white/30 rounded-full"
            />
          </div>

          {/* Markers */}
          <div className="absolute inset-0 flex flex-col justify-between py-8 px-4 pointer-events-none z-10">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-full h-[2px] bg-primary/20" />
            ))}
          </div>
          
          {/* Crack overlay */}
          {broken && (
            <motion.svg
              className="absolute inset-0 z-30 pointer-events-none"
              viewBox="0 0 96 384"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {Array.from({ length: 22 }).map((_, i) => {
                const cx = 48; // center x
                const cy = 192; // center y
                const segs = 8 + Math.floor(Math.random() * 6);
                const jitter = 8 + Math.random() * 12;
                const angle = (i / 22) * Math.PI * 2;
                const radius = 160;
                const pts: Array<{ x: number; y: number }> = [];
                for (let s = 0; s <= segs; s++) {
                  const t = s / segs;
                  const r = radius * t;
                  const baseX = cx + Math.cos(angle) * r;
                  const baseY = cy + Math.sin(angle) * r;
                  const jx = (Math.random() - 0.5) * jitter * (1 + t);
                  const jy = (Math.random() - 0.5) * jitter * (1 + t);
                  pts.push({ x: baseX + jx, y: baseY + jy });
                }
                const d = `M ${pts[0].x} ${pts[0].y}` + pts.slice(1).map(p => ` L ${p.x} ${p.y}`).join("");
                const w = 1.6 + Math.random() * 2.4;
                const delay = 0.05 * i;
                return (
                  <motion.path
                    key={`crack-${i}`}
                    d={d}
                    stroke="#000"
                    strokeWidth={w}
                    fill="none"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.9, ease: "easeInOut", delay }}
                  />
                );
              })}
              {Array.from({ length: 30 }).map((_, j) => {
                const cx = 48;
                const cy = 192;
                const angle = Math.random() * Math.PI * 2;
                const radius = 70 + Math.random() * 120;
                const segs = 4 + Math.floor(Math.random() * 4);
                const jitter = 6 + Math.random() * 10;
                const pts: Array<{ x: number; y: number }> = [];
                for (let s = 0; s <= segs; s++) {
                  const t = s / segs;
                  const r = radius * t;
                  const baseX = cx + Math.cos(angle) * r;
                  const baseY = cy + Math.sin(angle) * r;
                  const jx = (Math.random() - 0.5) * jitter * (1 + t);
                  const jy = (Math.random() - 0.5) * jitter * (1 + t);
                  pts.push({ x: baseX + jx, y: baseY + jy });
                }
                const d = `M ${pts[0].x} ${pts[0].y}` + pts.slice(1).map(p => ` L ${p.x} ${p.y}`).join("");
                const w = 1.2 + Math.random() * 1.4;
                const delay = 0.4 + 0.02 * j;
                return (
                  <motion.path
                    key={`branch-${j}`}
                    d={d}
                    stroke="#000"
                    strokeWidth={w}
                    fill="none"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.7, ease: "easeInOut", delay }}
                  />
                );
              })}
            </motion.svg>
          )}

          {/* Shatter pieces */}
          {shatter && (
            <>
              {Array.from({ length: 100 }).map((_, i) => {
                const w = 3 + Math.random() * 10;
                const h = 3 + Math.random() * 12;
                const rot = Math.random() * 720;
                const dx = (Math.random() - 0.5) * 160;
                const dy = (Math.random() - 0.5) * 160;
                const dur = 0.9 + Math.random() * 1.5;
                return (
                  <motion.div
                    key={i}
                    className="absolute z-40"
                    style={{ width: w, height: h, background: "#fff", border: "1px solid rgba(0,0,0,0.5)", borderRadius: 2, boxShadow: "0 0 6px rgba(0,0,0,0.15)" }}
                    initial={{ top: "50%", left: "50%", opacity: 1 }}
                    animate={{ 
                      top: `calc(50% + ${dy}%)`, 
                      left: `calc(50% + ${dx}%)`, 
                      rotate: rot,
                      opacity: 0 
                    }}
                    transition={{ duration: dur, ease: "easeOut" }}
                  />
                );
              })}
            </>
          )}
        </motion.div>

        <div className="font-mono text-3xl font-bold text-primary">
          {Math.floor(progress * 10)}%
        </div>

        <div className="bg-white/80 p-4 rounded-lg shadow-sm border border-primary/10 rotate-1 max-w-xs">
          <p className="font-hand text-2xl text-center">
            Midiendo cuánto te amo...
          </p>
        </div>

        <Dialog open={showError} onOpenChange={setShowError}>
          <DialogContent className="border-red-500 border-2 bg-red-50">
            <DialogHeader>
              <DialogTitle className="text-red-600 text-2xl flex items-center gap-2">
                <ThermometerSun className="animate-pulse" />
                ❤️‍🩹♾️¡Nuestro amor rompió el sistema! ¡TE AMOOO!♾️❤️‍🩹
              </DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <motion.p 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: [1, 1.04, 1], opacity: 1 }}
                transition={{ duration: 0.8, repeat: 2 }}
                className="text-lg font-medium text-foreground text-center"
              >
                Superó el límite máximo. Se detectó un amor descontrolado. ♾️❤️‍🩹
                <br/><br/>
                Para resolver el error del sistema: abracitos y besitos obligatorios.
              </motion.p>
            </div>
            <div className="flex justify-end">
              <Button onClick={() => setShowError(false)} variant="destructive">
                Aceptar
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </PageWrapper>
  );
}
