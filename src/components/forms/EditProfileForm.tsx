import { useState, type ChangeEvent, type FormEvent, useEffect } from "react";
import { InputText, InputNumber } from "../common/Input";
import Select from "../common/Select";
import Button from "../ui/Button";
import { validateField } from "../../utils/regex";
import { SupabaseUserRepository } from "../../database/supabase/SupabaseUserRepository";
import { useAuthStore } from "../../store/useAuthStore";
import { supabase } from "../../database/supabase/client"; // ← faltaba este import

const UNIT_OPTIONS = [
    { value: "metric", label: "Métrico (kg / cm)" },
    { value: "imperial", label: "Imperial (lb / inch)" }
];

const userRepo = new SupabaseUserRepository();

interface ProfileData {
    username: string;
    email: string;
    weight: string;
    height: string;
    unitSystem: "metric" | "imperial";
}

interface EditProfileFormProps {
    onProfileUpdated?: (username: string) => void;
}


export default function EditProfileForm({ onProfileUpdated }: EditProfileFormProps) {

    const { user } = useAuthStore();

    const [formData, setFormData] = useState<ProfileData>({
        username: "",
        email: "",
        weight: "",
        height: "",
        unitSystem: "metric",
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [success, setSuccess] = useState("");
    const [error, setError] = useState(""); // ← faltaba este estado
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Cargar datos actuales del perfil al montar
    useEffect(() => {
        console.log("user?.id:", user?.id);
        if (!user?.id) return;
        supabase
            .from('Profiles')
            .select('username, email, height, weight, unit_system')
            .eq('id', user.id)
            .single()
            .then(({ data }) => {
                console.log("data:", data);
                console.log("error:", error);
                if (data) {
                    setFormData({
                        username: data.username || "",
                        email: data.email || "",
                        height: data.height?.toString() || "",
                        weight: data.weight?.toString() || "",
                        unitSystem: data.unit_system || "metric",
                    });
                }
            });
    }, [user?.id]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: "" }));
        }
    };

    const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name === "username" || name === "email") { 
            const error = validateField(name, value);
            setErrors(prev => ({ ...prev, [name]: error }));
        }
    };


    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!user?.id) return;

        if (!formData.username.trim()) {
            setError("El nombre de usuario no puede estar vacío.");
            return;
        }

        setIsSubmitting(true);
        setSuccess("");
        setError("");

        const { error: updateError } = await userRepo.updateProfile(user.id, {
            username: formData.username,
            email: formData.email,
            height: formData.height ? parseFloat(formData.height) : null,
            weight: formData.weight ? parseFloat(formData.weight) : null,
            unit_system: formData.unitSystem,
        });

        if (updateError) {
            setError("Error al guardar los cambios. Inténtalo de nuevo.");
        } else {
            setSuccess("Perfil actualizado correctamente.");
            onProfileUpdated?.(formData.username);
        }

        setIsSubmitting(false);
    };

    const weightLabel = formData.unitSystem === "metric" ? "Peso (kg)" : "Peso (lb)";
    const heightLabel = formData.unitSystem === "metric" ? "Altura (cm)" : "Altura (in)";

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full max-w-lg mx-auto bg-[#1E1E1E]/50 p-6 rounded-2xl border border-gray-800">
            <div className="space-y-4">
                <h3 className="text-[#FF8904] font-bold text-sm uppercase tracking-wider border-b border-gray-700 pb-2">
                    Datos Personales
                </h3>

                <InputText
                    label="Nombre Completo"
                    name="username" 
                    value={formData.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.username}
                />

                <InputText
                    label="Correo Electrónico"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.email}
                />

                {/* <InputText
                    label="Fecha de Nacimiento"
                    name="birthDate"
                    type="date"
                    value={formData.birthDate}
                    onChange={handleChange}
                    className="scheme-dark"
                /> */}
            </div>

            <div className="space-y-4">
                <h3 className="text-[#FF8904] font-bold text-sm uppercase tracking-wider border-b border-gray-700 pb-2">
                    Físico y Preferencias
                </h3>

                <div className="grid grid-cols-2 gap-4">
                    <InputNumber
                        label={heightLabel}
                        name="height"
                        value={formData.height}
                        onChange={handleChange}
                    />
                    <InputNumber
                        label={weightLabel}
                        name="weight"
                        value={formData.weight}
                        onChange={handleChange}
                    />
                </div>

                <Select
                    label="Sistema de Unidades"
                    name="unitSystem"
                    options={UNIT_OPTIONS}
                    value={formData.unitSystem}
                    onChange={handleChange}
                />
            </div>

            {success && <p className="text-green-400 text-sm">{success}</p>}
            {error && <p className="text-red-400 text-sm">{error}</p>}

            <div className="pt-4">
                <Button type="submit" disabled={isSubmitting} className="w-full">
                    {isSubmitting ? "Guardando..." : "Guardar Cambios"}
                </Button>
            </div>
        </form>
    );
}