import { FormEvent, useState, type ChangeEvent, } from "react";
import { Link, useNavigate } from "react-router-dom";
import { InputText } from "../common/Input";
import Button from "../ui/Button";
import { validateField } from "../../utils/regex";
import { useAuthStore } from "../../store/useAuthStore";
import { supabase } from "../../database/supabase/client";

interface LoginData {
    email: "";
    password: "";
}

interface LoginErrors {
    email: string;
    password: string;
}

export default function LoginForm() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState<LoginData>({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState<LoginErrors>({
        email: "",
        password: "",
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const error = validateField(name, value);
        setErrors((prev) => ({ ...prev, [name]: error }));
    };

    // const handleSubmit = (e: FormEvent) => {
    //     e.preventDefault();

    //     const newErrors = {
    //         email: validateField("email", formData.email),
    //         password: validateField("password", formData.password),
    //     };
    //     setErrors(newErrors);

    //     const hasErrors = Object.values(newErrors).some(Boolean);
    //     if (!hasErrors) {
    //         console.log("Login correcto:", formData);
    //         // Aquí llamaríamos al repositorio
    //     }
    // };

    // 1. Añade 'async' a la función
const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const newErrors = {
        email: validateField("email", formData.email),
        password: validateField("password", formData.password),
    };
    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some(Boolean);
    
    if (!hasErrors) {
        // Intentamos el inicio de sesión
        const { data, error } = await supabase.auth.signInWithPassword({
            email: formData.email,
            password: formData.password,
        });

        if (error) {
            // Estado de error
            alert("Error al iniciar sesión: " + error.message);
            return;
        }

        // VERIFICACIÓN
        // Comprobamos si el usuario ha confirmado su email
        if (data.user && !data.user.email_confirmed_at) {
            alert("Por favor, verifica tu correo electrónico antes de entrar.");
            await supabase.auth.signOut(); // Cerramos la sesión por seguridad
            return;
        }

        // ZUSTAND
        // Si todo está bien, guardamos la sesión en el store
        if (data.session) {
            useAuthStore.getState().setAuth(data.session);
            // Aquí ya podrías navegar al home: navigate("/home");
        }
        
        console.log("Login correcto y verificado");
    }
};

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full max-w-sm mx-auto p-4">
            <InputText
                label="Correo Electrónico"
                name="email"
                type="email"
                placeholder="ejemplo@correo.com"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.email}
            />

            <InputText
                label="Contraseña"
                name="password"
                type="password"
                placeholder="******"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.password}
            />
            
            <div className="flex justify-end mb-2">
                <Link
                    to="/forgot-password"
                    className="text-xs text-[#FF8904] hover:text-[#FFB86A] transition-colors font-semibold"
                >
                    ¿Olvidaste tu contraseña?
                </Link>
            </div>

            <div className="flex flex-col gap-4 mt-2">
                <Button type="submit" variant="primary">
                    Iniciar Sesión
                </Button>

                <span className="text-[#FFFCFC] text-center text-sm">
                    ¿No tienes cuenta?{" "}
                    <Link 
                        to="/signup" 
                        className="text-[#FF8904] font-bold hover:underline hover:text-[#FFB86A] transition-colors"
                    >
                        Regístrate
                    </Link>
                </span>

                {/* Botón de invitado en gris discreto y sin puntos */}
           <button type="button" 
                onClick={() => navigate("/home")} 
                className="text-gray-400 text-sm hover:text-gray-200 transition-colors mt-2"
            >
                Continuar sin registrarse
            </button>

            </div>
        </form>
    );
}