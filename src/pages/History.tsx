import HistoryTable from "../components/common/HistoryTable";

export default function History() {
    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex justify-between items-end border-b border-white/10 pb-4">
                <div>
                    <h1 className="text-3xl font-bold text-primary uppercase tracking-wider">
                        Historial
                    </h1>
                    <p className="text-text-muted mt-1 font-open-sans">
                        Consulta tus entrenamientos pasados y analiza tu rendimiento.
                    </p>
                </div>
            </div>

            {/*  Tabla */}
            <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                <HistoryTable />
            </section>
        </div>
    );
}