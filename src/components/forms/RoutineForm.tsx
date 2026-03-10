import { useState, useEffect, type FormEvent } from "react";
import { InputText, InputNumber } from "../common/Input";
import Select from "../common/Select";
import Button from "../ui/Button";
import { supabase } from "../../database/supabase/client";

interface EjercicioDB {
    id: string;
    nombre: string;
    tipo: string;
}

interface RoutineExercise {
    ejercicio_id: string;
    nombre: string;
    tipo: string;
    series: string;
    repeticiones: string;
    duracion_minutos: string;
    intensidad: string;
}

export default function RoutineForm() {
    const [nombreRutina, setNombreRutina] = useState("");
    const [nivelDificultad, setNivelDificultad] = useState("intermedio");
    
    const [ejerciciosDisponibles, setEjerciciosDisponibles] = useState<EjercicioDB[]>([]);
    const [ejercicioSeleccionado, setEjercicioSeleccionado] = useState<string>("");
    
    const [ejerciciosRutina, setEjerciciosRutina] = useState<RoutineExercise[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const niveles = [
        { value: "principiante", label: "Principiante" },
        { value: "intermedio", label: "Intermedio" },
        { value: "avanzado", label: "Avanzado" },
    ];

    useEffect(() => {
        const fetchEjercicios = async () => {
            const { data, error } = await supabase
                .from('ejercicios')
                .select('id, nombre, tipo')
                .order('nombre', { ascending: true });

            if (error) {
                console.error("Error cargando ejercicios:", error);
                return;
            }

            if (data && data.length > 0) {
                setEjerciciosDisponibles(data);
                setEjercicioSeleccionado(data[0].id);
            }
        };

        fetchEjercicios();
    }, []);

    const agregarEjercicio = () => {
        const ejBase = ejerciciosDisponibles.find(e => e.id === ejercicioSeleccionado);
        if (!ejBase) return;

        setEjerciciosRutina([...ejerciciosRutina, {
            ejercicio_id: ejBase.id,
            nombre: ejBase.nombre,
            tipo: ejBase.tipo,
            series: "3",
            repeticiones: "10",
            duracion_minutos: "30",
            intensidad: "media"
        }]);
    };

    const actualizarDetalleEjercicio = (index: number, campo: keyof RoutineExercise, valor: string) => {
        const nuevos = [...ejerciciosRutina];
        nuevos[index] = { ...nuevos[index], [campo]: valor };
        setEjerciciosRutina(nuevos);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!nombreRutina.trim()) return alert("Falta el nombre de la rutina");
        if (ejerciciosRutina.length === 0) return alert("Añade al menos un ejercicio");

        setIsLoading(true);

        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error("Debes iniciar sesión para crear rutinas");

            const { data: rutinaData, error: rutinaError } = await supabase
                .from('rutinas')
                .insert([{ 
                    nombre: nombreRutina, 
                    nivel_dificultad: nivelDificultad,
                    user_id: user.id 
                }])
                .select()
                .single();

            if (rutinaError) throw rutinaError;

            const ejerciciosAInsertar = ejerciciosRutina.map((ej, index) => ({
                rutina_id: rutinaData.id,
                ejercicio_id: ej.ejercicio_id,
                orden: index + 1,
                series: ej.tipo === "gym" ? parseInt(ej.series) : null,
                repeticiones: ej.tipo === "gym" ? ej.repeticiones : null,
                duracion_minutos: ej.tipo === "sport" ? parseInt(ej.duracion_minutos) : null,
                intensidad: ej.tipo === "sport" ? ej.intensidad : null,
            }));

            const { error: relError } = await supabase
                .from('rutina_ejercicios')
                .insert(ejerciciosAInsertar);

            if (relError) throw relError;

            alert("¡Rutina creada con éxito!");
            setNombreRutina("");
            setEjerciciosRutina([]);

        } catch (error: any) {
            console.error("Error al guardar la rutina:", error);
            alert(error.message || "Error desconocido al guardar");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-8 bg-surface rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800">
            <div className="border-b border-zinc-100 dark:border-zinc-800 pb-4 mb-2">
                <h2 className="text-xl font-bold text-text-main uppercase tracking-tight">Crear Nueva Rutina</h2>
                <p className="text-sm text-text-muted mt-1">Diseña tu plan agrupando ejercicios del catálogo</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <InputText label="Nombre de la Rutina" name="nombreRutina" placeholder="Ej: Push Day Supremo" value={nombreRutina} onChange={e => setNombreRutina(e.target.value)} />
                <Select label="Nivel" name="nivelDificultad" options={niveles} value={nivelDificultad} onChange={e => setNivelDificultad(e.target.value)} />
            </div>

            <div className="flex items-end gap-4 p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg border border-zinc-200 dark:border-zinc-700">
                <div className="flex-1">
                    <Select 
                        label="Seleccionar Ejercicio del Catálogo" 
                        name="ejercicio" 
                        options={ejerciciosDisponibles.map(e => ({ value: e.id, label: e.nombre }))} 
                        value={ejercicioSeleccionado} 
                        onChange={e => setEjercicioSeleccionado(e.target.value)} 
                        disabled={ejerciciosDisponibles.length === 0}
                    />
                </div>
                <Button type="button" onClick={agregarEjercicio} variant="secondary" disabled={ejerciciosDisponibles.length === 0}>
                    Añadir a Rutina
                </Button>
            </div>

            <div className="flex flex-col gap-4">
                {ejerciciosRutina.map((ej, index) => (
                    <div key={index} className="p-4 border border-zinc-200 dark:border-zinc-700 rounded-lg animate-in fade-in flex items-center gap-4 bg-white dark:bg-zinc-900 shadow-sm">
                        <div className="w-1/3 font-bold text-primary">{index + 1}. {ej.nombre}</div>
                        
                        <div className="flex-1 flex gap-2">
                            {ej.tipo === "gym" ? (
                                <>
                                    <InputNumber label="Series" name="series" value={ej.series} onChange={e => actualizarDetalleEjercicio(index, "series", e.target.value)} />
                                    <InputText label="Reps" name="repeticiones" value={ej.repeticiones} onChange={e => actualizarDetalleEjercicio(index, "repeticiones", e.target.value)} />
                                </>
                            ) : (
                                <>
                                    <InputNumber label="Minutos" name="duracion" value={ej.duracion_minutos} onChange={e => actualizarDetalleEjercicio(index, "duracion_minutos", e.target.value)} />
                                    <Select label="Intensidad" name="intensidad" options={[{value: "baja", label: "Baja"}, {value: "media", label: "Media"}, {value: "alta", label: "Alta"}]} value={ej.intensidad} onChange={e => actualizarDetalleEjercicio(index, "intensidad", e.target.value)} />
                                </>
                            )}
                        </div>
                        
                        <button type="button" onClick={() => setEjerciciosRutina(ejerciciosRutina.filter((_, i) => i !== index))} className="text-red-500 hover:text-red-700 text-sm font-bold ml-2">
                            Quitar
                        </button>
                    </div>
                ))}
            </div>

            <div className="flex justify-end mt-4">
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Guardando..." : "Guardar Rutina Completa"}
                </Button>
            </div>
        </form>
    );
}