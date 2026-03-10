// src/components/forms/ActivityForm.tsx
import { useState, type ChangeEvent, type FormEvent } from "react";
import { InputText } from "../common/Input";
import Select from "../common/Select";
import Button from "../ui/Button";
import { supabase } from "../../database/supabase/client";

type ActivityType = "gym" | "sport";

interface ActivityFormData {
    type: ActivityType;
    nombre: string;
    descripcion: string;
    grupoMuscular: string;
}

interface FormErrors {
    nombre?: string;
}

export default function ActivityForm() {
    const [formData, setFormData] = useState<ActivityFormData>({
        type: "gym",
        nombre: "",
        descripcion: "",
        grupoMuscular: "pecho",
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [isLoading, setIsLoading] = useState(false);

    const typeOptions = [
        { value: "gym", label: "Gimnasio / Fuerza" },
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

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name as keyof FormErrors]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        
        if (!formData.nombre.trim()) {
            setErrors({ nombre: "El nombre es obligatorio" });
            return;
        }

        setIsLoading(true);

        try {
            // 1. Obtenemos el usuario autenticado
            const { data: { user } } = await supabase.auth.getUser();
            
            if (!user) {
                throw new Error("Debes iniciar sesión para crear un ejercicio.");
            }

            // 2. Insertamos el ejercicio añadiendo el user_id
            const { error } = await supabase
                .from('ejercicios')
                .insert([
                    {
                        nombre: formData.nombre,
                        descripcion: formData.descripcion,
                        tipo: formData.type,
                        grupo_muscular: formData.type === "gym" ? formData.grupoMuscular : null,
                        user_id: user.id // <-- VINCULAMOS EL EJERCICIO AL USUARIO
                    }
                ]);

            if (error) throw error;

            alert("¡Ejercicio guardado en tu catálogo privado con éxito!");
            setFormData({ type: "gym", nombre: "", descripcion: "", grupoMuscular: "pecho" });

        } catch (error: any) {
            console.error("Error guardando el ejercicio:", error);
            alert(error.message || "Hubo un error al guardar el ejercicio.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-8 bg-surface rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 transition-all duration-300">
            <div className="border-b border-zinc-100 dark:border-zinc-800 pb-4 mb-2">
                <h2 className="text-xl font-bold text-text-main uppercase tracking-tight">Nuevo Ejercicio Base</h2>
                <p className="text-sm text-text-muted mt-1">Añade un ejercicio a tu catálogo personal</p>
            </div>

            <Select label="Tipo de actividad" name="type" options={typeOptions} value={formData.type} onChange={handleChange} className="mb-2" />
            
            <InputText label="Nombre del Ejercicio" name="nombre" placeholder="Ej: Press Banca" value={formData.nombre} onChange={handleChange} error={errors.nombre} />
            
            <InputText label="Descripción (Opcional)" name="descripcion" placeholder="Ej: Con barra olímpica" value={formData.descripcion} onChange={handleChange} />

            {formData.type === "gym" && (
                <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                    <Select label="Grupo Muscular" name="grupoMuscular" options={muscleGroups} value={formData.grupoMuscular} onChange={handleChange} />
                </div>
            )}

            <div className="flex justify-end mt-4">
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Guardando..." : "Guardar Ejercicio Personal"}
                </Button>
            </div>
        </form>
    );
}