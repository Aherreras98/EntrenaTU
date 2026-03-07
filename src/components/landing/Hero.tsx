import { Link } from "react-router-dom";
import Button from "../ui/Button";
import HeroImage from "../../img/rutinamedida.png";
import ColorBends from "../animations/ColorBends";

export default function Hero() {
  return (

    <section className="relative pt-20 pb-32 overflow-hidden bg-white dark:bg-zinc-950 border-b border-zinc-100 dark:border-zinc-800/50 transition-colors duration-300">
      
      <div className="container mx-auto px-4 max-w-7xl flex flex-col lg:flex-row items-center gap-12 relative z-10">

    <section className="relative pt-20 pb-32 overflow-hidden">
      
      {/* FONDO ANIMADO (ColorBends) */}
      <div className="absolute inset-0 -z-10">
        <ColorBends 
          colors={["#FF5733", "#FB923C", "#000000"]} 
          speed={0.15}            
          rotation={45}           
          scale={1.2}             
          warpStrength={1.5}      
          mouseInfluence={1.0}    
          noise={0.1}             
        />
  
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1 text-center lg:text-left z-10">
          <h2 className="text-5xl lg:text-7xl font-black text-zinc-900 dark:text-white mb-6 leading-tight uppercase italic transition-colors">
            Alcanza tu <br/>
            <span className="text-primary">Máximo Nivel</span>
          </h2>

          <p className="text-xl text-zinc-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto lg:mx-0 font-light">
            EntrenaTu es la plataforma definitiva para gestionar tus rutinas, 
            monitorear tu progreso y superar tus límites cada día.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link to="/signup">
            <Button className="text-lg px-8 py-4 w-full sm:w-auto shadow-lg shadow-primary/20">
              Comenzar Ahora
            </Button>

            </Link>
            <Link to="/login">
              <Button variant="secondary" className="text-lg px-8 py-4 w-full sm:w-auto border-zinc-900 text-zinc-900 dark:border-white dark:text-white hover:bg-zinc-100 dark:hover:bg-white/5">
                Ya tengo cuenta
              </Button>
            </Link>
          </div>
        </div>

        {/* IMG con animación */}
        <div className="flex-1 relative w-full max-w-lg lg:max-w-xl group">
          <img 
            src={HeroImage} 
            alt="Aplicación EntrenaTU en móvil" 
            className="relative z-10 w-full animate-in fade-in slide-in-from-bottom-10 duration-1000 transition-all duration-500 ease-out hover:scale-110 hover:-translate-y-4 cursor-pointer"
          />
        </div>
      </div>
    </section>
  );
}