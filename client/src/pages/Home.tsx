import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import PageWrapper from "@/components/PageWrapper";
import { Heart } from "lucide-react";

export default function Home() {
  const [showDedication, setShowDedication] = useState(false);

  useEffect(() => {
    // Delay showing the dedication to allow user to soak in the title
    const timer = setTimeout(() => {
      setShowDedication(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <PageWrapper next="/thermometer">
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <motion.div
          layout
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ 
            scale: showDedication ? 1 : 1.5, 
            opacity: 1,
            y: showDedication ? 0 : 10
          }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative mt-8 md:mt-4"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -top-12 -right-8 text-primary/20 rotate-12"
          >
            <Heart size={80} fill="currentColor" />
          </motion.div>
          
          <motion.h1
            className="text-6xl md:text-8xl font-serif text-primary drop-shadow-sm leading-tight mb-2"
            animate={showDedication ? { y: [0, -12, 0], scale: [1, 1.05, 1] } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Feliz <br/>
            <span className="text-5xl md:text-7xl block mt-2 text-foreground">San Valentin</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-2xl font-hand text-primary/80 mt-4"
          >
            Te amooo!!
          </motion.p>
        </motion.div>

        {showDedication && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="bg-white/70 backdrop-blur-sm p-8 md:p-10 rounded-2xl shadow-xl w-full max-w-md md:max-w-2xl border border-white/50 transform rotate-1"
          >
            <p className="font-hand text-3xl leading-relaxed text-foreground/90">
              "Eres lo mejor que me ha pasado en la vida. Gracias por hacerme tan feliz."
            </p>
            <p className="font-hand italic text-base sm:text-lg md:text-xl text-primary/80 mt-4 tracking-normal normal-case">
              Siempre soñé con una mujer como tú. Eres ese ángel que del cielo bajó, y con tu dulzura mi vida cambió. Contigo entendí que la mujer perfecta no se encuentra de la noche a la mañana, sino que se logra cuando mejoras a su lado y ella saca la mejor versión de ti mismo.
              <br/><br/>
              Hemos pasado por momentos bonitos y malos, pero te aseguro que, aunque el mundo se nos venga encima, mi amor por ti y la fuerza de Dios nos mantendrán de pie. A pesar del dolor o la tristeza que nos ha tocado vivir, mi lugar seguro sigue siendo a tu lado y con la de Dios.
              <br/><br/>
              Dios te puso en mi camino como un ángel para sacarme de la oscuridad y hacerme Entender lo que es el amor verdadero y el propósito que Dios tiene para nosotros ( anhelo cumplirlo a tu lado). Gracias por no soltarme y por seguir a mi lado. Ahora solo sueño con seguir progresando junto a ti, creciendo juntos y poder cumplir cada promesa que nos hicimos!!!. Con la ayuda de Dios, yo sé que lo vamos a lograr. No importa si el camino se pone difícil; si estamos juntos y con Dios de nuestro lado, ¡somos invencibles!
              <br/><br/>
              Te amo, mi amor. Te amaré hoy, mañana y siempre, hasta que el destino nos separe.
            </p>
          </motion.div>
        )}
      </div>
    </PageWrapper>
  );
}
