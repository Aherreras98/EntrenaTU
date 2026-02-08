import logoImg from '../../img/LogoEntrenaTu.png'; 

export default function Steps() {
  const steps = [
    "REGÍSTRATE",
    "DISEÑA TU RUTINA",
    "ENTRENA Y REGISTRA",
    "ANALIZA TU ÉXITO"
  ];

  return (
    <section className="py-20 px-10 bg-neutral-700">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-16">
        
        <div className="flex-1 space-y-8">
          <h2 className="text-3xl font-black mb-10 uppercase tracking-widest text-white">
            Cómo <span className="text-primary-orange">funciona</span>
          </h2>
          <ol className="space-y-6">
            {steps.map((step, index) => (
              <li key={index} className="flex items-center gap-4 text-2xl font-bold text-white uppercase italic">
                <span className="text-primary-orange not-italic">{index + 1}.</span>
                {step}
              </li>
            ))}
          </ol>
        </div>

        {/* Logo */}
        <div className="flex-1 flex justify-center">
          <img 
            src={logoImg} 
            alt="Logo" 
            className="w-80 drop-shadow-[0_0_30px_rgba(255,146,0,0.4)]"
          />
        </div>
      </div>
    </section>
  );
}