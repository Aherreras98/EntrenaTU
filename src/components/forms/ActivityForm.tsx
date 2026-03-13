import { useState, useRef, type ChangeEvent, type FormEvent } from "react";
import { InputText } from "../common/Input";
import Select from "../common/Select";
import Button from "../ui/Button";
import { supabase } from "../../database/supabase/client";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { SupabaseStorageRepository } from "../../database/supabase/SupabaseStorageRepository";

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

    
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

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

    // previsualizar la img
    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const MAX_SIZE_MB = 5; 
        if (file.size > MAX_SIZE_MB * 1024 * 1024) {
            toast.error(`La imagen supera los ${MAX_SIZE_MB}MB permitidos.`);
            e.target.value = "";
            return;
        }

        setImageFile(file);
        setPreviewUrl(URL.createObjectURL(file));
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

            let image_url = null;

            // Subir la imagen a Storage si el usuario eligió una
            if (imageFile) {
                const storageRepo = new SupabaseStorageRepository();
                const fileExt = imageFile.name.split('.').pop();
                const fileName = `${user.id}/${Date.now()}.${fileExt}`; 
                
                const { data: uploadData, error: uploadError } = await storageRepo.uploadFile('exercises', fileName, imageFile);
                
                if (uploadError) throw new Error("Error al subir la imagen del ejercicio.");
                image_url = uploadData?.publicUrl || null;
            }

            // Mandar todo a la base de datos, incluyendo la img
            const { error } = await supabase
                .from('ejercicios')
                .insert([
                    {
                        nombre: formData.nombre,
                        descripcion: formData.descripcion,
                        tipo: formData.type,
                        grupo_muscular: formData.type === "gym" ? formData.grupoMuscular : null,
                        image_url: image_url, 
                        user_id: user.id 
                    }
                ]);

            if (error) throw error;

            toast.success(t('activityForm.success'));
            
            // Limpiar formulario y foto
            setFormData({ type: "gym", nombre: "", descripcion: "", grupoMuscular: "pecho" });
            setImageFile(null);
            setPreviewUrl(null);
            if (fileInputRef.current) fileInputRef.current.value = '';

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

            {/* SUBIDA DE IMG */}
            <div className="flex flex-col gap-2 mb-2">
                <label className="text-sm font-semibold text-text-main">
                    Imagen del Ejercicio (Opcional)
                </label>
                <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-xl border-2 border-dashed border-zinc-300 dark:border-zinc-700 flex items-center justify-center bg-zinc-50 dark:bg-zinc-800/50 overflow-hidden shrink-0">
                        {previewUrl ? (
                            <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                        ) : (
                            <svg className="w-8 h-8 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        )}
                    </div>
                    <div className="flex flex-col gap-1 items-start">
                        <input 
                            type="file" 
                            ref={fileInputRef} 
                            onChange={handleImageChange} 
                            accept="image/png, image/jpeg, image/jpg" 
                            className="hidden" 
                        />
                        <button 
                            type="button" 
                            onClick={() => fileInputRef.current?.click()}
                            disabled={isLoading}
                            className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-zinc-300 dark:border-zinc-700 hover:border-primary text-text-main hover:text-primary transition-colors disabled:opacity-50"
                        >
                            {previewUrl ? "Cambiar Imagen" : "Subir Imagen"}
                        </button>
                        <span className="text-xs text-text-muted mt-1">Máx. 5MB (JPG, PNG)</span>
                    </div>
                </div>
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