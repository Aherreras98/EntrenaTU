import { useState, type ChangeEvent, type FormEvent } from "react";
import { InputText } from "../common/Input";
import Select from "../common/Select";
import Button from "../ui/Button";
import { supabase } from "../../database/supabase/client";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";

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
    const { t } = useTranslation();
    const [formData, setFormData] = useState<ActivityFormData>({
        type: "gym",
        nombre: "",
        descripcion: "",
        grupoMuscular: "pecho",
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [isLoading, setIsLoading] = useState(false);

    const typeOptions = [
        { value: "gym", label: t('activityForm.typeGym') },
        { value: "sport", label: t('activityForm.typeSport') },
    ];

    const muscleGroups = [
        { value: "pecho", label: t('activityForm.mgChest') },
        { value: "espalda", label: t('activityForm.mgBack') },
        { value: "piernas", label: t('activityForm.mgLegs') },
        { value: "hombros", label: t('activityForm.mgShoulders') },
        { value: "brazos", label: t('activityForm.mgArms') },
        { value: "core", label: t('activityForm.mgCore') },
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
            setErrors({ nombre: t('activityForm.errorNameRequired') });
            return;
        }

        setIsLoading(true);

        try {
            const { data: { user } } = await supabase.auth.getUser();
            
            if (!user) {
                throw new Error(t('activityForm.errorAuth'));
            }

            const { error } = await supabase
                .from('ejercicios')
                .insert([
                    {
                        nombre: formData.nombre,
                        descripcion: formData.descripcion,
                        tipo: formData.type,
                        grupo_muscular: formData.type === "gym" ? formData.grupoMuscular : null,
                        user_id: user.id 
                    }
                ]);

            if (error) throw error;

            toast.success(t('activityForm.success'));
            setFormData({ type: "gym", nombre: "", descripcion: "", grupoMuscular: "pecho" });

        } catch (error: any) {
            console.error("Error guardando el ejercicio:", error);
            toast.error(error.message || t('activityForm.errorSave'));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-8 bg-surface rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 transition-all duration-300">
            <div className="border-b border-zinc-100 dark:border-zinc-800 pb-4 mb-2">
                <h2 className="text-xl font-bold text-text-main uppercase tracking-tight">{t('activityForm.title')}</h2>
                <p className="text-sm text-text-muted mt-1">{t('activityForm.subtitle')}</p>
            </div>

            <Select label={t('activityForm.typeLabel')} name="type" options={typeOptions} value={formData.type} onChange={handleChange} className="mb-2" />
            
            <InputText label={t('activityForm.nameLabel')} name="nombre" placeholder={t('activityForm.namePlaceholder')} value={formData.nombre} onChange={handleChange} error={errors.nombre} />
            
            <InputText label={t('activityForm.descLabel')} name="descripcion" placeholder={t('activityForm.descPlaceholder')} value={formData.descripcion} onChange={handleChange} />

            {formData.type === "gym" && (
                <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                    <Select label={t('activityForm.muscleGroupLabel')} name="grupoMuscular" options={muscleGroups} value={formData.grupoMuscular} onChange={handleChange} />
                </div>
            )}

            <div className="flex justify-end mt-4">
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? t('activityForm.saving') : t('activityForm.saveButton')}
                </Button>
            </div>
        </form>
    );
}