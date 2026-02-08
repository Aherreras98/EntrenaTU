import rutinaImg from '../../img/rutinamedida.png';
import seguimientoImg from '../../img/seguimiento.png';

export default function Features() {
  return (
    <section className="py-20 px-10 bg-neutral-700">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-black mb-16 uppercase tracking-widest text-white">
          Lo que <span className="text-primary-orange">ofrecemos</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          {/* Característica 1 */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4">
            <img src={rutinaImg} alt="Rutinas a medida" className="w-48 mb-4" />
            <h3 className="text-xl font-bold text-white uppercase">Rutinas a Medida</h3>
            <p className="text-neutral-100 opacity-80 max-w-sm">
              Crea y sigue tus rutinas personalizadas. Analiza tu progreso y tu superación con nosotros.
            </p>
          </div>

          {/* Característica 2 */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4">
            <img src={seguimientoImg} alt="Seguimiento de progreso" className="w-64 mb-4" />
            <h3 className="text-xl font-bold text-white uppercase">Seguimiento de Progreso</h3>
            <p className="text-neutral-100 opacity-80 max-w-sm">
              Seguimiento de rutinas personalizadas. Analiza tu progreso y supera tus límites.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}