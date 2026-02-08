import { useState, type ChangeEvent, type FormEvent, useEffect } from "react";
import { InputText, InputNumber } from "../common/Input";
import Select from "../common/Select";
import Button from "../ui/Button";
import { validateField } from "../../utils/regex";

const UNIT_OPTIONS = [
    { value: "metric", label: "Métrico (kg / cm)" },
    { value: "imperial", label: "Imperial (lb / inch)" }
];

interface ProfileData {
    name: string;
    email: string;
    birthDate: string;
    weight: string;
    height: string;
    unitSystem: "metric" | "imperial";
}

export default function EditProfileForm() {
    const [formData, setFormData] = useState<ProfileData>({
        name: "Usuario Ejemplo",
        email: "usuario@ejemplo.com",
        birthDate: "",
        weight: "",
        height: "",
        unitSystem: "metric",
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: "" }));
        }
    };

    const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name === "name" || name === "email") {
            const error = validateField(name, value);
            setErrors(prev => ({ ...prev, [name]: error }));
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const newErrors = {
            name: validateField("name", formData.name),
            email: validateField("email", formData.email),
        };

        const hasErrors = Object.values(newErrors).some(Boolean);

        setErrors(prev => ({ ...prev, ...newErrors }));

        if (!hasErrors) {
            console.log("Guardando cambios...", formData);

            alert("Perfil actualizado correctamente");
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
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.name}
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

                <InputText
                    label="Fecha de Nacimiento"
                    name="birthDate"
                    type="date"
                    value={formData.birthDate}
                    onChange={handleChange}
                    className="[color-scheme:dark]"
                />
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

            <div className="pt-4">
                <Button type="submit" disabled={isSubmitting} className="w-full">
                    {isSubmitting ? "Guardando..." : "Guardar Cambios"}
                </Button>
            </div>
        </form>
    );
}