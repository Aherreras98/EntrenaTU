import { useState, useEffect } from "react";
import Button from "../components/ui/Button";
import { supabase } from "../database/supabase/client";

interface Routine {
    id: string;
    nombre: string;
    nivel_dificultad: string;
}

export default function Home() {
    const [routines, setRoutines] = useState<Routine[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [executingId, setExecutingId] = useState<string | null>(null);

    // Cargar las rutinas al entrar a la página
    useEffect(() => {
        const fetchRoutines = async () => {
            setIsLoading(true);
            const { data, error } = await supabase
                .from("rutinas")
                .select("id, nombre, nivel_dificultad")
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

    // Función para registrar que se ha completado una rutina
    const handleExecuteRoutine = async (routine: Routine) => {
        setExecutingId(routine.id);
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error("Debes iniciar sesión para registrar un entrenamiento.");

            const { error } = await supabase
                .from("historial_rutinas")
                .insert([{
                    user_id: user.id,
                    rutina_id: routine.id,
                    nombre_rutina_historico: routine.nombre,
                    estado: "finalizado"
                }]);

            if (error) throw error;

            alert(`¡Excelente trabajo! Has completado la rutina: ${routine.nombre} 💪`);
        } catch (error: any) {
            console.error("Error al guardar en el historial:", error);
            alert(error.message || "Hubo un error al registrar el entrenamiento.");
        } finally {
            setExecutingId(null);
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex justify-between items-end border-b border-white/10 pb-4">
                <div>
                    <h1 className="text-3xl font-bold text-primary uppercase tracking-wider">
                        Tu Panel
                    </h1>
                    <p className="text-text-muted mt-1 font-open-sans">
                        Selecciona una de tus rutinas y empieza a entrenar.
                    </p>
                </div>
            </div>

            <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                {isLoading ? (
                    <p className="text-text-muted">Cargando tus rutinas...</p>
                ) : routines.length === 0 ? (
                    <div className="p-8 text-center bg-surface border border-zinc-200 dark:border-zinc-800 rounded-2xl">
                        <p className="text-text-muted">Aún no has creado ninguna rutina.</p>
                        <p className="text-sm mt-2">Ve a la sección "Rutinas" para armar tu primer plan de entrenamiento.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {routines.map((routine) => (
                            <div key={routine.id} className="flex flex-col justify-between p-6 bg-surface border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm hover:border-primary/50 transition-colors">
                                <div>
                                    <h3 className="text-xl font-bold text-text-main mb-2">{routine.nombre}</h3>
                                    <span className="inline-block px-3 py-1 bg-zinc-100 dark:bg-zinc-800 text-xs font-bold uppercase tracking-wider rounded-full text-text-muted mb-6">
                                        Nivel: {routine.nivel_dificultad || 'No definido'}
                                    </span>
                                </div>
                                
                                <Button 
                                    onClick={() => handleExecuteRoutine(routine)}
                                    disabled={executingId === routine.id}
                                    className="w-full justify-center"
                                >
                                    {executingId === routine.id ? "Registrando..." : "Completar Rutina"}
                                </Button>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}