"use client";

import { motion } from "framer-motion";
import FeatureImage from "../../img/seguimiento.png";
import { ChartBarIcon, ClipboardDocumentListIcon, TrophyIcon } from "@heroicons/react/24/solid";

const iconVariants = {
  initial: { scale: 1, rotate: 0 },
  hover: { 
    scale: 1.3, 
    rotate: [0, -15, 15, -15, 0], 
    transition: { duration: 0.5 } 
  }
};

export default function Features() {
  return (
    <section className="py-24 bg-white dark:bg-black relative transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-primary text-sm font-bold tracking-widest uppercase mb-2">
            Lo que ofrecemos
          </h2>
          <h3 className="text-4xl font-black text-zinc-900 dark:text-orange-50 transition-colors uppercase italic">
            Todo lo que necesitas para evolucionar
          </h3>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 relative group">
            <img
              src={FeatureImage}
              alt="Seguimiento de progreso"
              className="relative rounded-2xl shadow-2xl border border-zinc-200 dark:border-primary/20 max-w-sm mx-auto 
                         transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] 
                         hover:scale-110 hover:rotate-2"
            />
          </div>

          <div className="order-1 lg:order-2 space-y-8">
            {[
              { id: 1, Icon: ClipboardDocumentListIcon, title: "Rutinas Personalizadas", desc: "Crea y gestiona tus propios planes de entrenamiento o elige entre nuestras plantillas predefinidas." },
              { id: 2, Icon: ChartBarIcon, title: "Seguimiento Detallado", desc: "Visualiza tu progreso con gráficas intuitivas de peso, repeticiones y volumen total." },
              { id: 3, Icon: TrophyIcon, title: "Historial Completo", desc: "Accede a cada sesión pasada para analizar tu rendimiento y superar tus marcas personales." }
            ].map((item) => (
              <motion.div 
                key={item.id}
                className="flex gap-4 group cursor-pointer"
                whileHover="hover"
                initial="initial"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary transition-colors group-hover:bg-primary/20">
                  <motion.div variants={iconVariants}>
                    <item.Icon className="w-7 h-7" />
                  </motion.div>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-zinc-800 dark:text-orange-100 mb-2 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-zinc-600 dark:text-orange-200/60 leading-relaxed transition-colors">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}