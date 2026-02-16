import { useState, type ChangeEvent, type FormEvent } from "react";
import { InputText, InputNumber } from "../common/Input";
import Select from "../common/Select";
import Button from "../ui/Button";


type ActivityType = "gym" | "sport";

interface ActivityFormData {
    type: ActivityType;
    nombre: string;
    grupoMuscular: string;
    series: string;
    repeticiones: string;
    duracion: string;
    intensidad: string;
}

interface FormErrors {
    nombre?: string;
    duracion?: string;
    series?: string;
}

export default function ActivityForm() {
    const [formData, setFormData] = useState<ActivityFormData>({
        type: "gym",
        nombre: "",
        grupoMuscular: "pecho",
        series: "",
        repeticiones: "",
        duracion: "",
        intensidad: "media",
    });

    const [errors, setErrors] = useState<FormErrors>({});


    const typeOptions = [
        { value: "gym", label: "Entrenamiento de Fuerza / Gimnasio" },
        { value: "sport", label: "Deporte / Cardio" },
    ];

    const muscleGroups = [
        { value: "pecho", label: "Pecho" },
        { value: "espalda", label: "Espalda" },
        { value: "piernas", label: "Piernas" },
        { value: "hombros", label: "Hombros" },
        { value: "brazos", label: "Brazos" },
        { value: "core", label: "Abdominales / Core" },
    ];

    const intensityOptions = [
        { value: "baja", label: "Baja" },
        { value: "media", label: "Media" },
        { value: "alta", label: "Alta" },
    ];

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (errors[name as keyof FormErrors]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const newErrors: FormErrors = {};

        if (!formData.nombre.trim()) {
            newErrors.nombre = "El nombre es obligatorio";
        }

        if (formData.type === "sport" && !formData.duracion) {
            newErrors.duracion = "Indica la duración de la sesión";
        }

        if (formData.type === "gym" && (!formData.series || !formData.repeticiones)) {
            newErrors.series = "Completa series y repeticiones";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        console.log("Datos a guardar:", formData);
        // Aquí iría la llamada supabase
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-6 bg-surface rounded-2xl shadow-lg border border-slate-800/50">

            <div className="border-b border-slate-700 pb-4 mb-2">
                <h2 className="text-xl font-bold text-text-main">Registrar Actividad</h2>
                <p className="text-sm text-gray-400">Añade un nuevo ejercicio o sesión deportiva</p>
            </div>

            <Select
                label="¿Qué tipo de actividad fue?"
                name="type"
                options={typeOptions}
                value={formData.type}
                onChange={handleChange}
                className="mb-2"
            />

            <InputText
                label={formData.type === "gym" ? "Nombre del Ejercicio" : "Nombre del Deporte"}
                name="nombre"
                placeholder={formData.type === "gym" ? "Ej: Press Banca" : "Ej: Fútbol, Running..."}
                value={formData.nombre}
                onChange={handleChange}
                error={errors.nombre}
            />

            {formData.type === "gym" && (
                <div className="flex flex-col gap-4 animate-fadeIn">
                    <Select
                        label="Grupo Muscular"
                        name="grupoMuscular"
                        options={muscleGroups}
                        value={formData.grupoMuscular}
                        onChange={handleChange}
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <InputNumber
                            label="Series"
                            name="series"
                            placeholder="4"
                            value={formData.series}
                            onChange={handleChange}
                            error={errors.series}
                        />
                        <InputNumber
                            label="Repeticiones"
                            name="repeticiones"
                            placeholder="12"
                            value={formData.repeticiones}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            )}

            {formData.type === "sport" && (
                <div className="flex flex-col gap-4 animate-fadeIn">
                    <div className="grid grid-cols-2 gap-4">
                        <InputNumber
                            label="Duración (min)"
                            name="duracion"
                            placeholder="60"
                            value={formData.duracion}
                            onChange={handleChange}
                            error={errors.duracion}
                        />
                        <Select
                            label="Intensidad"
                            name="intensidad"
                            options={intensityOptions}
                            value={formData.intensidad}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            )}

            <Button type="submit" variant="primary" className="mt-4">
                {formData.type === "gym" ? "Guardar Ejercicio" : "Guardar Sesión"}
            </Button>
        </form>
    );
}