import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputText } from "../common/Input";
import Button from "../ui/Button";
import { SupabaseUserRepository } from "../../database/supabase/SupabaseUserRepository";
import { validateField, passwordsMatch } from "../../utils/regex";
import toast from "react-hot-toast";

export default function ResetPasswordForm() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    
    const [error, setError] = useState("");
    const [confirmError, setConfirmError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        setError("");
        setConfirmError("");

        const passError = validateField("password", password);
        const matchError = passwordsMatch(password, confirmPassword);

        if (passError) setError(passError);
        if (matchError) setConfirmError(matchError);

        if (passError || matchError) {
            return;
        }

        setIsLoading(true);

        try {
            const repo = new SupabaseUserRepository();
            const { error: updateError } = await repo.updatePassword(password);

            if (updateError) {
                toast.error("Error al actualizar: " + updateError.message);
            } else {
                toast.success("¡Contraseña actualizada con éxito!");
                navigate("/login");
            }
        } catch (err) {
            console.error(err);
            toast.error("Ocurrió un error inesperado al actualizar la contraseña.");
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
                onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError("");
                }}
                error={error}
            />

            <InputText
                label="Confirmar Contraseña"
                name="confirmPassword"
                type="password"
                placeholder="Repite tu nueva contraseña"
                value={confirmPassword}
                onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (confirmError) setConfirmError("");
                }}
                error={confirmError}
            />

            <Button type="submit" variant="primary" disabled={isLoading}>
                {isLoading ? "Guardando..." : "Cambiar Contraseña"}
            </Button>
        </form>
    );
}