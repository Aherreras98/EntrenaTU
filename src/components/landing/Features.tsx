
export default function Features() {
  const features = [
    {
      title: "RUTINAS A MEDIDA",
      desc: "Diseña tus propios entrenamientos o elige entre los creados por la comunidad.",
     
    },
    {
      title: "SEGUIMIENTO TOTAL",
      desc: "Visualiza tu evolución con gráficas detalladas de tus levantamientos y peso.",
      
    }
  ];

  return (
    <section className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-16 text-text-main uppercase tracking-widest">
          Lo que <span className="text-primary">ofrecemos</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          {features.map((f, i) => (
            <div key={i} className="flex flex-col items-center md:items-start text-center md:text-left space-y-6 p-4">
              <img src={""} alt={f.title} className="h-40 object-contain mb-4" />
              <h3 className="text-2xl font-black text-primary uppercase italic">{f.title}</h3>
              <p className="text-text-muted text-lg font-open-sans leading-relaxed max-w-md">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}