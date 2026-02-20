import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../database/supabase/client";
import { InputText } from "../common/Input";
import Button from "../ui/Button";

export default function ResetPasswordForm() {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        
        if (password.length < 6) {
            setError("La contraseña debe tener al menos 6 caracteres");
            return;
        }

        setIsLoading(true);
        try {
            // Esta función de Supabase detecta automáticamente el token del email
            const { error: supabaseError } = await supabase.auth.updateUser({
                password: password
            });

            if (supabaseError) {
                setError(supabaseError.message);
            } else {
                alert("¡Contraseña actualizada con éxito!");
                navigate("/login");
            }
        } catch (err) {
            setError("Error al conectar con el servidor.");
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