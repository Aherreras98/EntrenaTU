import { Link } from "react-router-dom";
import Button from "../ui/Button";
import HeroImage from "../../img/rutinamedida.png";
import ColorBends from "../animations/ColorBends";

export default function Hero() {
 return (
    <section className="relative pt-20 pb-32 overflow-hidden bg-zinc-950 min-h-[90vh] flex items-center transition-colors duration-300">
      
      {/* --- CAPA DE LA ANIMACIÓN (ColorBends) --- */}
      <div className="absolute inset-0 z-0">
        <ColorBends 
          colors={["#FF5733", "#FB923C", "#000000"]} 
          speed={1.0}             // Velocidad base muy alta
          warpStrength={3.0}      // Distorsión extrema (crea más movimiento visual)
          frequency={1.0}         // Más ondas en pantalla = sensación de más rapidez
          scale={1.2}             // Menos zoom para ver más "caos" de ondas
          mouseInfluence={2.0}    // El ratón agita la animación violentamente
        />
       
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-zinc-950" />
      </div>

      {/* --- CONTENIDO --- */}
      <div className="container mx-auto px-4 max-w-7xl flex flex-col lg:flex-row items-center gap-12 relative z-10">
        
        {/* TEXTO Y ACCIONES */}
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-5xl lg:text-7xl font-black text-white mb-6 leading-tight uppercase italic">
            Alcanza tu <br/>
            <span className="text-primary">Máximo Nivel</span>
          </h1>

          <p className="text-xl text-zinc-400 mb-8 max-w-2xl mx-auto lg:mx-0 font-light">
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
            <Button 
              variant="secondary" 
              className="text-lg px-8 py-4 w-full sm:w-auto 
                        border-zinc-800 text-zinc-500 
                        hover:border-zinc-600 hover:bg-zinc-900/40 hover:text-zinc-300
                        transition-all duration-300"
            >
              Ya tengo cuenta
            </Button>
          </Link>
          </div>
        </div>

        {/* IMAGEN DEL MÓVIL */}
        <div className="flex-1 relative w-full max-w-lg lg:max-w-xl group">
          <img 
            src={HeroImage} 
            alt="Aplicación EntrenaTU en móvil" 
            className="relative z-10 w-full animate-in fade-in slide-in-from-bottom-10 duration-1000 transition-all duration-500 ease-out hover:scale-105 hover:-translate-y-4 cursor-pointer drop-shadow-[0_20px_50px_rgba(255,87,51,0.3)]"
          />
        </div>

      </div>
    </section>
  );
}