import FeatureImage from "../../img/seguimiento.png";
import { ChartBarIcon, ClipboardDocumentListIcon, TrophyIcon } from "@heroicons/react/24/solid";

export default function Features() {
  return (
    <section className="py-24 bg-surface/50 relative">
      <div className="container mx-auto px-4">

        <div className="text-center mb-16">
          <h2 className="text-primary text-sm font-bold tracking-widest uppercase mb-2">
            Lo que ofrecemos
          </h2>
          <h3 className="text-4xl font-bold text-white">
            Todo lo que necesitas para evolucionar
          </h3>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary to-orange-600 rounded-2xl opacity-20 group-hover:opacity-30 blur-lg transition duration-500" />
            <img
              src={FeatureImage}
              alt="Seguimiento de progreso"
              className="relative rounded-2xl shadow-2xl border border-white/10 w-full transform transition hover:scale-[1.02] duration-500"
            />
          </div>

          <div className="order-1 lg:order-2 space-y-8">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                <ClipboardDocumentListIcon className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-white mb-2">Rutinas Personalizadas</h4>
                <p className="text-gray-400 leading-relaxed">
                  Crea y gestiona tus propios planes de entrenamiento o elige entre nuestras plantillas predefinidas.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                <ChartBarIcon className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-white mb-2">Seguimiento Detallado</h4>
                <p className="text-gray-400 leading-relaxed">
                  Visualiza tu progreso con gráficas intuitivas de peso, repeticiones y volumen total.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                <TrophyIcon className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-white mb-2">Historial Completo</h4>
                <p className="text-gray-400 leading-relaxed">
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