import { useState, type ChangeEvent, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { InputText } from "../common/Input";
import Button from "../ui/Button";
import { validateField } from "../../utils/regex";

interface LoginData {
    email: string;
    password: string;
}

interface LoginErrors {
    email: string;
    password: string;
}

export default function LoginForm() {
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

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const newErrors = {
            email: validateField("email", formData.email),
            password: validateField("password", formData.password),
        };
        setErrors(newErrors);

        const hasErrors = Object.values(newErrors).some(Boolean);
        if (!hasErrors) {
            console.log("Login correcto:", formData);
            // Aquí iría la llamada a supabase
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
                    className="text-xs text-primary hover:text-primary-hover transition-colors font-semibold"
                >
                    ¿Olvidaste tu contraseña?
                </Link>
            </div>

            <div className="flex flex-col gap-4 mt-2">
                <Button type="submit" variant="primary">
                    Iniciar Sesión
                </Button>
                <span className="text-text-main text-center text-sm">
                    ¿No tienes cuenta?{" "}
                    <Link to="/register" className="text-primary font-bold hover:underline hover:text-primary-hover transition-colors">
                        Regístrate
                    </Link>
                </span>
            </div>
        </form>
    );
}