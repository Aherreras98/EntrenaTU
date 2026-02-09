import Button from "../components/ui/Button";

export default function Routines() {
    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10 pb-4">
                <div>
                    <h1 className="text-3xl font-bold text-primary uppercase tracking-wider">
                        Mis Rutinas
                    </h1>
                    <p className="text-text-muted mt-1">
                        Diseña y organiza tus planes de entrenamiento.
                    </p>
                </div>
                <Button variant="primary" className="shadow-lg shadow-primary/20">
                    + Nueva Rutina
                </Button>
            </div>

            {/* Grid de Rutinas (Placeholder) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Ejemplo de tarjeta de rutina */}
                <div className="bg-surface hover:bg-surface-hover p-6 rounded-xl border border-white/5 hover:border-primary transition-all cursor-pointer group">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-bold text-text-main group-hover:text-primary transition-colors">
                            Full Body A
                        </h3>
                        <span className="text-xs font-bold px-2 py-1 rounded bg-primary/10 text-primary uppercase">
                            Fuerza
                        </span>
                    </div>
                    <p className="text-text-muted text-sm mb-4">
                        Rutina enfocada en ejercicios compuestos básicos.
                    </p>
                    <div className="flex items-center gap-2 text-xs text-text-muted">
                        <span>📅 3 días/sem</span>
                        <span>•</span>
                        <span>⏱️ 60 min</span>
                    </div>
                </div>

                {/* Tarjeta de "Crear Nueva" */}
                <div className="bg-surface/30 p-6 rounded-xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center text-center hover:bg-surface hover:border-primary/50 transition-all cursor-pointer min-h-[160px]">
                    <span className="text-4xl text-text-muted mb-2">+</span>
                    <span className="font-bold text-text-muted">Crear Rutina Personalizada</span>
                </div>
            </div>
        </div>
    );
}