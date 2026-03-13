import { useState, useEffect } from "react";
import Button from "../ui/Button";
import { Modal } from "../ui/Modal"; 
import { supabase } from "../../database/supabase/client";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";


interface HistoryEntry {
    id: string;
    rutina_id: string; 
    nombre_rutina_historico: string;
    fecha_realizacion: string;
    estado: string;
}


interface ExerciseDetail {
    id: number;
    orden: number;
    series: number | null;
    repeticiones: string | null;
    kilos: number | null;
    duracion_minutos: number | null;
    intensidad: string | null;
    ejercicios: {
        nombre: string;
        tipo: string;
        image_url: string | null;
    };
}

export default function HistoryTable() {
    const { t } = useTranslation();
    const [historyData, setHistoryData] = useState<HistoryEntry[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRoutineName, setSelectedRoutineName] = useState("");
    const [routineDetails, setRoutineDetails] = useState<ExerciseDetail[]>([]);
    const [isLoadingDetails, setIsLoadingDetails] = useState(false);

    useEffect(() => {
        const fetchHistory = async () => {
            setIsLoading(true);
            const { data, error } = await supabase
                .from("historial_rutinas")
                .select("*")
                .order("fecha_realizacion", { ascending: false });

            if (error) {
                console.error("Error al cargar el historial:", error);
            } else if (data) {
                setHistoryData(data);
            }
            setIsLoading(false);
        };

        fetchHistory();
    }, []);

    const formatDate = (isoString: string) => {
        const date = new Date(isoString);
        return date.toLocaleDateString("es-ES", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    };

    // MODAL DETALLES
    const handleViewDetails = async (row: HistoryEntry) => {
        setSelectedRoutineName(row.nombre_rutina_historico);
        setIsModalOpen(true);
        setIsLoadingDetails(true);

        try {
            const { data, error } = await supabase
                .from("rutina_ejercicios")
                .select(`
                    id,
                    orden,
                    series,
                    repeticiones,
                    kilos,
                    duracion_minutos,
                    intensidad,
                    ejercicios (
                        nombre,
                        tipo,
                        image_url
                    )
                `)
                .eq("rutina_id", row.rutina_id)
                .order("orden", { ascending: true });

            if (error) throw error;
            
            setRoutineDetails(data as unknown as ExerciseDetail[]);
        } catch (error) {
            console.error("Error al cargar los detalles:", error);
            toast.error("No se pudieron cargar los detalles de la rutina.");
        } finally {
            setIsLoadingDetails(false);
        }
    };

    if (isLoading) {
        return <div className="p-8 text-center text-text-muted">{t('historyTable.loading')}</div>;
    }

    if (historyData.length === 0) {
        return (
            <div className="p-8 text-center bg-surface border border-zinc-200 dark:border-zinc-800 rounded-2xl">
                <p className="text-text-muted">{t('historyTable.empty')}</p>
                <p className="text-sm mt-2">{t('historyTable.emptyHint')}</p>
            </div>
        );
    }

    return (
        <div className="w-full overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-surface shadow-sm transition-all duration-300">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-separate border-spacing-0">
                    <thead>
                        <tr className="bg-zinc-50 dark:bg-zinc-800/40 text-text-muted">
                            <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest border-b border-zinc-200 dark:border-zinc-800">{t('historyTable.colRoutine')}</th>
                            <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest border-b border-zinc-200 dark:border-zinc-800">{t('historyTable.colDate')}</th>
                            <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest border-b border-zinc-200 dark:border-zinc-800 text-right">{t('historyTable.colAction')}</th>
                        </tr>
                    </thead>
                    
                    <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                        {historyData.map((row) => (
                            <tr key={row.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-all duration-200 group">
                                <td className="px-8 py-6">
                                    <span className="font-bold text-text-main group-hover:text-primary transition-colors duration-300 text-lg">
                                        {row.nombre_rutina_historico}
                                    </span>
                                </td>
                                <td className="px-8 py-6">
                                    <div className="flex flex-col">
                                        <span className="text-text-main font-medium capitalize">
                                            {formatDate(row.fecha_realizacion)}
                                        </span>
                                        <span className="text-[10px] text-green-600 dark:text-green-500 uppercase font-bold tracking-tighter mt-1">
                                            {row.estado}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-8 py-6 text-right">
                                    {}
                                    <Button 
                                        variant="secondary" 
                                        className="text-[10px] py-2 px-4 uppercase font-bold hover:bg-primary hover:text-white transition-all border border-zinc-200 dark:border-transparent"
                                        onClick={() => handleViewDetails(row)}
                                    >
                                        {t('historyTable.viewDetails')}
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* MODAL DE DETALLES */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={`Detalles: ${selectedRoutineName}`}
            >
                {isLoadingDetails ? (
                    <div className="flex justify-center p-8">
                        <p className="text-zinc-400 animate-pulse">Cargando ejercicios...</p>
                    </div>
                ) : routineDetails.length === 0 ? (
                    <div className="text-center p-8 text-zinc-500">
                        No se han encontrado los ejercicios (es posible que la rutina fuera eliminada).
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        {routineDetails.map((detalle) => (
                            <div key={detalle.id} className="flex items-center gap-4 bg-zinc-800/30 border border-zinc-700/50 p-4 rounded-xl">
                                
                                <div className="w-16 h-16 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center overflow-hidden shrink-0">
                                    {detalle.ejercicios.image_url ? (
                                        <img src={detalle.ejercicios.image_url} alt={detalle.ejercicios.nombre} className="w-full h-full object-cover" />
                                    ) : (
                                        <svg className="w-6 h-6 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    )}
                                </div>

                                <div className="flex-1">
                                    <h4 className="text-zinc-100 font-bold text-lg mb-1">
                                        <span className="text-primary mr-2">{detalle.orden}.</span>
                                        {detalle.ejercicios.nombre}
                                    </h4>
                                    
                                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-zinc-400">
                                        {detalle.ejercicios.tipo === "gym" ? (
                                            <>
                                                <span className="flex items-center gap-1">
                                                    <strong className="text-zinc-300">Series:</strong> {detalle.series}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <strong className="text-zinc-300">Reps:</strong> {detalle.repeticiones}
                                                </span>
                                                {detalle.kilos && (
                                                    <span className="flex items-center gap-1 bg-zinc-800 px-2 py-0.5 rounded text-zinc-300">
                                                        {detalle.kilos} kg
                                                    </span>
                                                )}
                                            </>
                                        ) : (
                                            <>
                                                <span className="flex items-center gap-1">
                                                    <strong className="text-zinc-300">Tiempo:</strong> {detalle.duracion_minutos} min
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <strong className="text-zinc-300">Intensidad:</strong> <span className="capitalize">{detalle.intensidad}</span>
                                                </span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </Modal>
        </div>
    );
}