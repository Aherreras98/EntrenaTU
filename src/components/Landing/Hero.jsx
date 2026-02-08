import mainImage from '../../img/LogoEntrenaTu.png';


export default function Hero() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between px-10 py-20 max-w-7xl mx-auto gap-12">
      <div className="flex-1 space-y-6">
        <h1 className="text-5xl md:text-7xl font-black leading-none uppercase text-white">
          Alcanza tu <br />
          <span className="text-[#FF8904]">máximo potencial</span>
        </h1>
        <p className="text-neutral-100 text-lg max-w-md leading-relaxed opacity-90">
          Crea y sigue tus rutinas personalizadas. Analiza tu progreso y supera tus límites.
        </p>
        {}
       <button className="bg-primary-orange hover:bg-primary-hover text-neutral-900 font-black py-4 px-10 rounded-full transition-all uppercase tracking-widest shadow-xl">
        Únete a la revolución
       </button>
      </div>

      <div className="flex-1 flex justify-center">
        <img 
          src={mainImage} 
          alt="Logo" 
          className="w-full max-w-md drop-shadow-[0_20px_50px_rgba(255,137,4,0.3)]"
        />
      </div>
    </section>
  );
}