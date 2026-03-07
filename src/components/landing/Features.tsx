import FeatureImage from "../../img/seguimiento.png";
import { ChartBarIcon, ClipboardDocumentListIcon, TrophyIcon } from "@heroicons/react/24/solid";

export default function Features() {
  return (
    /* bg-surface suele ser oscuro, así que añadimos bg-white para el modo claro */
    <section className="py-24 bg-white dark:bg-zinc-950 relative transition-colors duration-300">
      <div className="container mx-auto px-4">

        <div className="text-center mb-16">
          <h2 className="text-primary text-sm font-bold tracking-widest uppercase mb-2">
            Lo que ofrecemos
          </h2>
          {/* TÍTULO PRINCIPAL: Negro en claro / Blanco en oscuro */}
          <h3 className="text-4xl font-bold text-zinc-900 dark:text-white transition-colors">
            Todo lo que necesitas para evolucionar
          </h3>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 relative group">
            <img
              src={FeatureImage}
              alt="Seguimiento de progreso"
              className="relative rounded-2xl shadow-2xl border border-zinc-200 dark:border-white/10 max-w-sm mx-auto transform transition hover:scale-[1.02] duration-500"
            />
          </div>

          <div className="order-1 lg:order-2 space-y-8">
            {/* CARACTERÍSTICA 1 */}
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                <ClipboardDocumentListIcon className="w-6 h-6" />
              </div>
              <div>
                {/* Título de Card: Negro en claro / Blanco en oscuro */}
                <h4 className="text-xl font-bold text-zinc-800 dark:text-white mb-2 transition-colors">
                  Rutinas Personalizadas
                </h4>
                {/* Párrafo: Gris oscuro en claro / Gris claro en oscuro */}
                <p className="text-zinc-600 dark:text-gray-400 leading-relaxed transition-colors">
                  Crea y gestiona tus propios planes de entrenamiento o elige entre nuestras plantillas predefinidas.
                </p>
              </div>
            </div>

            {/* CARACTERÍSTICA 2 */}
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                <ChartBarIcon className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-zinc-800 dark:text-white mb-2 transition-colors">
                  Seguimiento Detallado
                </h4>
                <p className="text-zinc-600 dark:text-gray-400 leading-relaxed transition-colors">
                  Visualiza tu progreso con gráficas intuitivas de peso, repeticiones y volumen total.
                </p>
              </div>
            </div>

            {/* CARACTERÍSTICA 3 */}
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                <TrophyIcon className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-zinc-800 dark:text-white mb-2 transition-colors">
                  Historial Completo
                </h4>
                <p className="text-zinc-600 dark:text-gray-400 leading-relaxed transition-colors">
                  Accede a cada sesión pasada para analizar tu rendimiento y superar tus marcas personales.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}