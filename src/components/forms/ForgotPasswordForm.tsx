import { useState, type ChangeEvent, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { InputText } from "../common/Input";
import Button from "../ui/Button";
import { validateField } from "../../utils/regex";

export default function ForgotPasswordForm() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        if (error) setError("");
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const emailError = validateField("email", email);
        setError(emailError);

        if (!emailError) {
            // aquí iría la llamada a supabase
            console.log("Enviando instrucciones a:", email);

            // Simulación de éxito
            setIsSubmitted(true);
        }
    };

    if (isSubmitted) {
        return (
            <div className="flex flex-col items-center gap-6 w-full max-w-sm mx-auto p-4 animate-in fade-in duration-500">
                <div className="bg-[#1E1E1E] p-6 rounded-xl border border-[#FF8904] text-center w-full">
                    <h3 className="text-[#FF8904] font-bold text-xl mb-2">¡Correo Enviado!</h3>
                    <p className="text-[#FFFCFC] text-sm opacity-90 mb-4">
                        Hemos enviado las instrucciones para restablecer tu contraseña a <strong>{email}</strong>.
                    </p>
                    <p className="text-gray-400 text-xs">
                        Si no lo recibes en unos minutos, revisa tu carpeta de spam.
                    </p>
                </div>
                <Link to="/login">
                    <Button variant="secondary" className="w-full">
                        Volver a Iniciar Sesión
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full max-w-sm mx-auto p-4">
            <div className="text-center mb-2">
                <p className="text-[#FFFCFC] text-sm opacity-80">
                    Introduce tu correo electrónico y te enviaremos un enlace para recuperar tu cuenta.
                </p>
            </div>

            <InputText
                label="Correo Electrónico"
                name="email"
                type="email"
                placeholder="ejemplo@correo.com"
                value={email}
                onChange={handleChange}
                error={error}
            />

            <div className="flex flex-col gap-4 mt-2">
                <Button type="submit" variant="primary">
                    Enviar Instrucciones
                </Button>

                <Link to="/login" className="text-center">
                    <span className="text-gray-400 text-sm hover:text-[#FFFCFC] transition-colors">
                        Volver atrás
                    </span>
                </Link>
            </div>
        </form>
    );
}