import { Link } from "react-router-dom";
import Button from "../ui/Button";
import HeroImage from "../../img/rutinamedida.png";

export default function Hero() {
  return (
    <section className="relative pt-20 pb-32 overflow-hidden">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-12">
        
        <div className="flex-1 text-center lg:text-left z-10">
          <h1 className="text-5xl lg:text-7xl font-black text-white mb-6 leading-tight uppercase italic">
            Alcanza tu <br/>
            <span className="text-primary">Máximo Nivel</span>
          </h1>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto lg:mx-0 font-light">
            EntrenaTu es la plataforma definitiva para gestionar tus rutinas, 
            monitorear tu progreso y superar tus límites cada día.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link to="/register">
              <Button className="text-lg px-8 py-4 w-full sm:w-auto">
                Comenzar Ahora
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="secondary" className="text-lg px-8 py-4 w-full sm:w-auto">
                Ya tengo cuenta
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex-1 relative w-full max-w-lg lg:max-w-xl">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/20 blur-[100px] rounded-full -z-10" />
          
          <img 
            src={HeroImage} 
            alt="Aplicación EntrenaTU en móvil" 
            className="relative z-10 w-full drop-shadow-2xl animate-in fade-in slide-in-from-bottom-10 duration-1000"
          />
        </div>
      </div>
    </section>
  );
}