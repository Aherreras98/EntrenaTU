import { useState, useEffect } from "react";
import Button from "../components/ui/Button";
import { Modal } from "../components/ui/Modal";
import { supabase } from "../database/supabase/client";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";

interface Routine {
    id: string;
    nombre: string;
    nivel_dificultad: string;
    user_id: string | null; 
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

export default function Home() {
    const { t } = useTranslation();
    const [routines, setRoutines] = useState<Routine[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [executingId, setExecutingId] = useState<string | null>(null);

    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRoutine, setSelectedRoutine] = useState<Routine | null>(null);
    const [routineDetails, setRoutineDetails] = useState<ExerciseDetail[]>([]);
    const [isLoadingDetails, setIsLoadingDetails] = useState(false);

    useEffect(() => {
        const fetchRoutines = async () => {
            setIsLoading(true);
            const { data, error } = await supabase
                .from("rutinas")
                .select("id, nombre, nivel_dificultad, user_id")
                .order("created_at", { ascending: false });

            if (error) {
                console.error("Error al cargar rutinas:", error);
            } else if (data) {
                setRoutines(data);
            }
            setIsLoading(false);
        };

        fetchRoutines();
    }, []);

    const handleExecuteRoutine = async (routine: Routine) => {
        setExecutingId(routine.id);
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error(t('home.alertLogin'));

            const { error } = await supabase
                .from("historial_rutinas")
                .insert([{
                    user_id: user.id,
                    rutina_id: routine.id,
                    nombre_rutina_historico: routine.nombre,
                    estado: "finalizado"
                }]);

            if (error) throw error;

            toast.success(t('home.alertSuccess', { name: routine.nombre }));
        } catch (error: any) {
            console.error("Error al guardar en el historial:", error);
            toast.error(error.message === t('home.alertLogin') ? error.message : t('home.alertError'));
        } finally {
            setExecutingId(null);
        }
    };

    const handleViewDetails = async (routine: Routine) => {
        setSelectedRoutine(routine);
        setIsModalOpen(true);
        setIsLoadingDetails(true);

        try {
            const { data, error } = await supabase
                .from("rutina_ejercicios")
                .select(`
                    id, orden, series, repeticiones, kilos, duracion_minutos, intensidad,
                    ejercicios (nombre, tipo, image_url)
                `)
                .eq("rutina_id", routine.id)
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

    
    const handleDeleteRoutine = async () => {
        if (!selectedRoutine) return;

        
        try {
            const { error } = await supabase
                .from("rutinas")
                .delete()
                .eq("id", selectedRoutine.id);
            
            if (error) throw error;

            
            toast.success("Rutina eliminada");
            setIsModalOpen(false);
            setRoutines(routines.filter(r => r.id !== selectedRoutine.id));
            
        } catch (error: any) {
            console.error("Error al eliminar la rutina:", error);
            toast.error("Hubo un error al eliminar la rutina.");
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex justify-between items-end border-b border-white/10 pb-4">
                <div>
                    <h1 className="text-3xl font-bold text-primary uppercase tracking-wider">
                        {t('home.title')}
                    </h1>
                    <p className="text-text-muted mt-1 font-open-sans">
                        {t('home.subtitle')}
                    </p>
                </div>
            </div>

            <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                {isLoading ? (
                    <p className="text-text-muted">{t('home.loading')}</p>
                ) : routines.length === 0 ? (
                    <div className="p-8 text-center bg-surface border border-zinc-200 dark:border-zinc-800 rounded-2xl">
                        <p className="text-text-muted">{t('home.empty')}</p>
                        <p className="text-sm mt-2">{t('home.emptyHint')}</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {routines.map((routine) => (
                            <div key={routine.id} className="flex flex-col justify-between p-6 bg-surface border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm hover:border-primary/50 transition-colors">
                                <div>
                                    <h3 className="text-xl font-bold text-text-main mb-2">{routine.nombre}</h3>
                                    <span className="inline-block px-3 py-1 bg-zinc-100 dark:bg-zinc-800 text-xs font-bold uppercase tracking-wider rounded-full text-text-muted mb-6">
                                        {t('home.level')}: {routine.nivel_dificultad || t('home.noLevel')}
                                    </span>
                                </div>
                                
                                <div className="flex gap-2 mt-auto">
                                    <Button onClick={() => handleViewDetails(routine)} variant="secondary" className="w-1/2 justify-center text-xs px-2">
                                        Ver detalles
                                    </Button>

                                    <Button onClick={() => handleExecuteRoutine(routine)} disabled={executingId === routine.id} className="w-1/2 justify-center text-xs px-2">
                                        {executingId === routine.id ? t('home.executing') : "Completar"}
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={`Detalles: ${selectedRoutine?.nombre || ''}`}
            >
                {/* BOTON ELIMINAR SI LA RUTINA TIENE ID*/}
                {!isLoadingDetails && selectedRoutine?.user_id !== null && (
                    <div className="flex justify-end mb-4">
                        <Button 
                            onClick={handleDeleteRoutine} 
                            variant="secondary" 
                            className="text-red-500 border-red-500 hover:bg-red-500/10 hover:border-red-600 hover:text-red-600 text-xs py-1.5 px-3"
                        >
                            Eliminar mi Rutina
                        </Button>
                    </div>
                )}

                {isLoadingDetails ? (
                    <div className="flex justify-center p-8">
                        <p className="text-zinc-400 animate-pulse">Cargando ejercicios...</p>
                    </div>
                ) : routineDetails.length === 0 ? (
                    <div className="text-center p-8 text-zinc-500">
                        Esta rutina aún no tiene ejercicios asignados.
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