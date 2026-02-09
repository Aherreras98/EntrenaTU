export default function History() {
    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex justify-between items-end border-b border-white/10 pb-4">
                <div>
                    <h1 className="text-3xl font-bold text-primary uppercase tracking-wider">
                        Historial
                    </h1>
                    <p className="text-text-muted mt-1">
                        Revisa tus sesiones anteriores.
                    </p>
                </div>
            </div>

            {/* (Placeholder) */}
            <div className="flex flex-col items-center justify-center py-20 bg-surface/50 rounded-xl border border-dashed border-white/10 text-center">
                <div className="bg-background p-4 rounded-full mb-4">
                    <svg className="w-8 h-8 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h3 className="text-lg font-bold text-text-main">No hay historial reciente</h3>
                <p className="text-text-muted max-w-xs mt-2">
                    Cuando completes tu primera rutina, aparecerá aquí.
                </p>
            </div>
        </div>
    );
}