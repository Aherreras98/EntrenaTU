import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../database/supabase/client";
import { InputText } from "../common/Input";
import Button from "../ui/Button";
import { SupabaseUserRepository } from "../../database/supabase/SupabaseUserRepository";

export default function ResetPasswordForm() {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
    setIsLoading(true);

    try {
        const repo = new SupabaseUserRepository();
        const { error } = await repo.updatePassword(password);

        if (error) {
            alert("Error al actualizar: " + error.message);
        } else {
            alert("¡Contraseña actualizada con éxito!");
            navigate("/login");
        }
    } catch (err) {
        console.error(err);
    } finally {
        setIsLoading(false);
    }
};

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full max-w-sm mx-auto p-4">
            <div className="text-center">
                <h2 className="text-[#FF8904] font-bold text-2xl uppercase">Nueva Contraseña</h2>
                <p className="text-[#FFFCFC] text-sm opacity-70 mt-2">
                    Escribe tu nueva clave para recuperar el acceso.
                </p>
            </div>

            <InputText
                label="Nueva Contraseña"
                name="password"
                type="password"
                placeholder="Mínimo 6 caracteres"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={error}
            />

            <Button type="submit" variant="primary" disabled={isLoading}>
                {isLoading ? "Guardando..." : "Cambiar Contraseña"}
            </Button>
        </form>
    );
}