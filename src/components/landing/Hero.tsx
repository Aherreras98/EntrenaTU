import Button from "../ui/Button";


export default function Hero() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between px-6 py-20 max-w-7xl mx-auto gap-12 bg-background">
      <div className="flex-1 space-y-8 text-center md:text-left">
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight text-text-main uppercase">
          Alcanza tu <br />
          <span className="text-primary">máximo potencial</span>
        </h1>
        <p className="text-text-muted text-lg max-w-md mx-auto md:mx-0 font-open-sans">
          Crea y sigue tus rutinas personalizadas. Analiza tu progreso y supera tus límites con EntrenaTÚ.
        </p>
        <Button className="px-10 py-4 text-lg uppercase tracking-widest">
          Únete a la revolución
        </Button>
      </div>
      <div className="flex-1 flex justify-center">
        <img 
 
          alt="EntrenaTÚ Logo" 
          className="w-full max-w-lg drop-shadow-[0_0_35px_rgba(249,115,22,0.3)]" 
        />
      </div>
    </section>
  );
}