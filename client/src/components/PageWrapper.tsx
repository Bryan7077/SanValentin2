import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { ArrowLeft, ArrowRight, Music } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PageWrapperProps {
  children: ReactNode;
  prev?: string;
  next?: string;
}

export default function PageWrapper({ children, prev, next }: PageWrapperProps) {
  const [location] = useLocation();

  return (
    <div 
      className="min-h-screen w-full flex flex-col items-center justify-center overflow-hidden relative bg-cover bg-center"
      style={{ 
        backgroundImage: `url(/images/romantic-bg.png)`,
        backgroundBlendMode: 'overlay',
        backgroundColor: 'hsl(var(--background))' 
      }}
    >
      {/* Navigation Arrows */}
      {prev ? (
        <Link
          href={prev}
          className="fixed top-6 left-6 z-50 p-2 text-rose-600 hover:text-rose-700 transition-transform hover:scale-110 active:scale-95 drop-shadow-lg animate-bounce"
        >
          <ArrowLeft className="w-8 h-8" />
        </Link>
      ) : null}
      
      {next ? (
        <Link
          href={next}
          className="fixed top-6 right-6 z-50 p-2 text-rose-600 hover:text-rose-700 transition-transform hover:scale-110 active:scale-95 drop-shadow-lg animate-bounce"
        >
          <ArrowRight className="w-8 h-8" />
        </Link>
      ) : null}

      {/* Main Content Area */}
      <AnimatePresence mode="wait">
        <motion.div
          key={location}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="relative z-10 w-full max-w-md mx-auto p-6 flex flex-col items-center text-center"
        >
          {children}
        </motion.div>
      </AnimatePresence>
      
      {/* Floating Hearts Background Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-primary/10 text-6xl"
            initial={{ 
              top: "100%", 
              left: `${Math.random() * 100}%`,
              scale: 0.5 + Math.random() * 0.5,
              rotate: 0 
            }}
            animate={{ 
              top: "-10%", 
              rotate: 360 
            }}
            transition={{ 
              duration: 10 + Math.random() * 10, 
              repeat: Infinity, 
              ease: "linear",
              delay: i * 2 
            }}
          >
            ♥
          </motion.div>
        ))}
      </div>
    </div>
  );
}
