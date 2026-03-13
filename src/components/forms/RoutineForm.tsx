import { useState, useEffect, type FormEvent } from "react";
import { InputText, InputNumber } from "../common/Input";
import Select from "../common/Select";
import Button from "../ui/Button";
import { supabase } from "../../database/supabase/client";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";

interface EjercicioDB {
    id: string;
    nombre: string;
    tipo: string;
    grupo_muscular: string | null;
}

interface RoutineExercise {
    ejercicio_id: string;
    nombre: string;
    tipo: string;
    series: string;
    repeticiones: string;
    kilos: string;
    duracion_minutos: string;
    intensidad: string;
}

export default function RoutineForm() {
    const { t } = useTranslation();
    const [nombreRutina, setNombreRutina] = useState("");
    const [nivelDificultad, setNivelDificultad] = useState("intermedio");
    
    const [ejerciciosDisponibles, setEjerciciosDisponibles] = useState<EjercicioDB[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterTipo, setFilterTipo] = useState("all");
    
    const [ejerciciosRutina, setEjerciciosRutina] = useState<RoutineExercise[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const niveles = [
        { value: "principiante", label: t('routineForm.levelBeginner') },
        { value: "intermedio", label: t('routineForm.levelIntermediate') },
        { value: "avanzado", label: t('routineForm.levelAdvanced') },
    ];

    useEffect(() => {
        const fetchEjercicios = async () => {
            const { data, error } = await supabase
                .from('ejercicios')
                .select('id, nombre, tipo, grupo_muscular') 
                .order('nombre', { ascending: true });

            if (error) {
                console.error("Error cargando ejercicios:", error);
                return;
            }

            if (data) {
                setEjerciciosDisponibles(data);
            }
        };

        fetchEjercicios();
    }, []);

    const ejerciciosFiltrados = ejerciciosDisponibles.filter(ej => {
        const matchesName = ej.nombre.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = filterTipo === "all" || ej.tipo === filterTipo;
        return matchesName && matchesType;
    });

    const agregarEjercicioDirecto = (ejBase: EjercicioDB) => {
        setEjerciciosRutina([...ejerciciosRutina, {
            ejercicio_id: ejBase.id,
            nombre: ejBase.nombre,
            tipo: ejBase.tipo,
            series: "3",
            repeticiones: "10",
            kilos: "1",
            duracion_minutos: "30",
            intensidad: "media"
        }]);
        toast.success(`Añadido: ${ejBase.nombre}`);
    };

    const actualizarDetalleEjercicio = (index: number, campo: keyof RoutineExercise, valor: string) => {
        
        if (campo === "series" || campo === "repeticiones" || campo === "kilos" || campo === "duracion_minutos") {
            if (valor !== "" && (valor.includes("-") || Number(valor) < 1)) {
                return; 
            }
        }
        const nuevos = [...ejerciciosRutina];
        nuevos[index] = { ...nuevos[index], [campo]: valor };
        setEjerciciosRutina(nuevos);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        
        if (!nombreRutina.trim()) return toast.error(t('routineForm.errorNoName'));
        if (ejerciciosRutina.length === 0) return toast.error(t('routineForm.errorNoExercises'));

        for (let i = 0; i < ejerciciosRutina.length; i++) {
            const ej = ejerciciosRutina[i];
            
            if (ej.tipo === "gym") {
                if (ej.series === "" || Number(ej.series) < 1) return toast.error(`Completa las series del ejercicio ${i + 1} (Mínimo 1)`);
                
                if (ej.repeticiones === "" || Number(ej.repeticiones) < 1) return toast.error(`Completa las repeticiones del ejercicio ${i + 1} (Mínimo 1)`);
                if (ej.kilos === "" || Number(ej.kilos) < 1) return toast.error(`Completa los kilos del ejercicio ${i + 1} (Mínimo 1kg)`);
            } else {
                if (ej.duracion_minutos === "" || Number(ej.duracion_minutos) < 1) return toast.error(`Completa los minutos del ejercicio ${i + 1} (Mínimo 1 min)`);
            }
        }

        setIsLoading(true);

        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error(t('routineForm.errorAuth'));

            const { data: rutinaData, error: rutinaError } = await supabase
                .from('rutinas')
                .insert([{ nombre: nombreRutina, nivel_dificultad: nivelDificultad, user_id: user.id }])
                .select()
                .single();

            if (rutinaError) throw rutinaError;

            const ejerciciosAInsertar = ejerciciosRutina.map((ej, index) => ({
                rutina_id: rutinaData.id,
                ejercicio_id: ej.ejercicio_id,
                orden: index + 1,
                series: ej.tipo === "gym" ? parseInt(ej.series) : null,
                repeticiones: ej.tipo === "gym" ? ej.repeticiones : null, 
                kilos: ej.tipo === "gym" ? parseFloat(ej.kilos) : null, 
                duracion_minutos: ej.tipo === "sport" ? parseInt(ej.duracion_minutos) : null,
                intensidad: ej.tipo === "sport" ? ej.intensidad : null,
            }));

            const { error: relError } = await supabase
                .from('rutina_ejercicios')
                .insert(ejerciciosAInsertar);

            if (relError) throw relError;

            toast.success(t('routineForm.success'));
            setNombreRutina("");
            setEjerciciosRutina([]);

        } catch (error: any) {
            console.error("Error al guardar la rutina:", error);
            toast.error(error.message || t('routineForm.errorSave'));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-8 bg-surface rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800">
            <div className="border-b border-zinc-100 dark:border-zinc-800 pb-4 mb-2">
                <h2 className="text-xl font-bold text-text-main uppercase tracking-tight">{t('routineForm.title')}</h2>
                <p className="text-sm text-text-muted mt-1">{t('routineForm.subtitle')}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <InputText label={t('routineForm.nameLabel')} name="nombreRutina" placeholder={t('routineForm.namePlaceholder')} value={nombreRutina} onChange={e => setNombreRutina(e.target.value)} />
                <Select label={t('routineForm.levelLabel')} name="nivelDificultad" options={niveles} value={nivelDificultad} onChange={e => setNivelDificultad(e.target.value)} />
            </div>

            {/* BUSQUEDA */}
            <div className="flex flex-col gap-4 p-6 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg border border-zinc-200 dark:border-zinc-700">
                <div className="flex flex-col mb-1">
                    <h3 className="text-lg font-bold text-text-main uppercase tracking-tight">Catálogo de Ejercicios</h3>
                    <p className="text-sm text-text-muted mt-1">Busca y filtra los ejercicios para añadirlos a tu rutina.</p>
                </div>

                {/* FILTROS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputText 
                        label="Buscar por nombre" 
                        name="search" 
                        placeholder="Ej: Press banca, Correr..." 
                        value={searchTerm} 
                        onChange={e => setSearchTerm(e.target.value)} 
                    />
                    <Select 
                        label="Filtrar por tipo" 
                        name="filterTipo" 
                        options={[
                            { value: "all", label: "Todos los tipos" },
                            { value: "gym", label: "Fuerza (Musculación)" },
                            { value: "sport", label: "Cardio / Deporte" }
                        ]} 
                        value={filterTipo} 
                        onChange={e => setFilterTipo(e.target.value)} 
                    />
                </div>

                {/* RESULTADOS */}
                <div className="mt-2 border border-zinc-200 dark:border-zinc-700 rounded-lg overflow-hidden max-h-60 overflow-y-auto bg-white dark:bg-zinc-900 shadow-inner">
                    <table className="w-full text-left text-sm">
                        <thead className="sticky top-0 bg-zinc-100 dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700 z-10">
                            <tr>
                                <th className="px-4 py-3 font-semibold text-text-muted uppercase tracking-wider text-xs">Nombre</th>
                                <th className="px-4 py-3 font-semibold text-text-muted uppercase tracking-wider text-xs">Tipo</th>
                                <th className="px-4 py-3 font-semibold text-right text-text-muted uppercase tracking-wider text-xs">Acción</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                            {ejerciciosFiltrados.length === 0 ? (
                                <tr>
                                    <td colSpan={3} className="px-4 py-8 text-center text-text-muted">
                                        No se encontraron ejercicios con esos filtros.
                                    </td>
                                </tr>
                            ) : (
                                ejerciciosFiltrados.map((ej) => (
                                    <tr key={ej.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors">
                                        <td className="px-4 py-3 font-bold text-text-main">{ej.nombre}</td>
                                        <td className="px-4 py-3">
                                            <span className={`inline-block px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                                                ej.tipo === 'gym' 
                                                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' 
                                                : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                            }`}>
                                                {ej.tipo === 'gym' ? 'Fuerza' : 'Cardio'}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            <Button 
                                                type="button" 
                                                variant="secondary" 
                                                className="text-xs px-3 py-1.5 h-auto uppercase tracking-wider font-bold"
                                                onClick={() => agregarEjercicioDirecto(ej)}
                                            >
                                                Añadir
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="flex flex-col gap-4 mt-2">
                {ejerciciosRutina.map((ej, index) => (
                    <div key={index} className="p-4 border border-zinc-200 dark:border-zinc-700 rounded-lg animate-in fade-in flex items-center gap-4 bg-white dark:bg-zinc-900 shadow-sm relative overflow-hidden">
                        
                        <div className={`absolute left-0 top-0 bottom-0 w-1 ${ej.tipo === 'gym' ? 'bg-blue-500' : 'bg-green-500'}`}></div>
                        
                        <div className="w-1/3 font-bold text-primary pl-2">{index + 1}. {ej.nombre}</div>
                        
                        <div className="flex-1 flex gap-2">
                            {ej.tipo === "gym" ? (
                                <>
                                    <InputNumber label={t('routineForm.series')} name="series" value={ej.series} min="1" onChange={e => actualizarDetalleEjercicio(index, "series", e.target.value)} />
                                    {}
                                    <InputNumber label={t('routineForm.reps')} name="repeticiones" value={ej.repeticiones} min="1" onChange={e => actualizarDetalleEjercicio(index, "repeticiones", e.target.value)} />
                                    <InputNumber label="Kilos (kg)" name="kilos" value={ej.kilos} min="1" step="0.5" onChange={e => actualizarDetalleEjercicio(index, "kilos", e.target.value)} />
                                </>
                            ) : (
                                <>
                                    <InputNumber label={t('routineForm.minutes')} name="duracion" value={ej.duracion_minutos} min="1" onChange={e => actualizarDetalleEjercicio(index, "duracion_minutos", e.target.value)} />
                                    <Select label={t('routineForm.intensity')} name="intensidad" options={[{value: "baja", label: t('routineForm.intLow')}, {value: "media", label: t('routineForm.intMedium')}, {value: "alta", label: t('routineForm.intHigh')}]} value={ej.intensidad} onChange={e => actualizarDetalleEjercicio(index, "intensidad", e.target.value)} />
                                </>
                            )}
                        </div>
                        
                        <button type="button" onClick={() => setEjerciciosRutina(ejerciciosRutina.filter((_, i) => i !== index))} className="text-red-500 hover:text-red-700 text-sm font-bold ml-2">
                            {t('routineForm.remove')}
                        </button>
                    </div>
                ))}
            </div>

            <div className="flex justify-end mt-4">
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? t('routineForm.saving') : t('routineForm.saveButton')}
                </Button>
            </div>
        </form>
    );
}