export default function Home() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Encabezado */}
            <div>
                <h1 className="text-3xl font-bold text-primary uppercase tracking-wider">
                    Panel Principal
                </h1>
                <p className="text-text-muted mt-2">
                    Resumen de tu actividad reciente.
                </p>
            </div>

            {/* Tarjetas de Resumen (Ejemplo de Dashboard) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Tarjeta 1 */}
                <div className="bg-surface p-6 rounded-xl border border-white/5 hover:border-primary/50 transition-colors">
                    <h3 className="text-lg font-bold text-text-main mb-2">Entrenamientos</h3>
                    <p className="text-3xl font-bold text-primary">12</p>
                    <p className="text-xs text-text-muted mt-1">Este mes</p>
                </div>

                {/* Tarjeta 2 */}
                <div className="bg-surface p-6 rounded-xl border border-white/5 hover:border-primary/50 transition-colors">
                    <h3 className="text-lg font-bold text-text-main mb-2">Tiempo Total</h3>
                    <p className="text-3xl font-bold text-primary">8h 45m</p>
                    <p className="text-xs text-text-muted mt-1">Acumulado</p>
                </div>

                {/* Tarjeta 3 */}
                <div className="bg-surface p-6 rounded-xl border border-white/5 hover:border-primary/50 transition-colors">
                    <h3 className="text-lg font-bold text-text-main mb-2">Racha Actual</h3>
                    <p className="text-3xl font-bold text-primary">3 Días</p>
                    <p className="text-xs text-text-muted mt-1">¡Sigue así!</p>
                </div>
            </div>
        </div>
    );
}