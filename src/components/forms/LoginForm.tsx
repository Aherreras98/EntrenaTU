import { FormEvent, useState, type ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { InputText } from "../common/Input";
import Button from "../ui/Button";
import { validateField } from "../../utils/regex";
import { useAuthStore } from "../../store/useAuthStore";
import { userRepository } from "../../database/repositories"; 

interface LoginData {
    email: string;
    password: string;
}

interface LoginErrors {
    email: string;
    password: string;
}

export default function LoginForm() {

    const [isLoading, setIsLoading] = useState(false);
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

    const handleSubmit = async (e: FormEvent) => {

        e.preventDefault();
        if (isLoading) return;

        setIsLoading(true);

        const newErrors = {
            email: validateField("email", formData.email),
            password: validateField("password", formData.password),
        };
        setErrors(newErrors);

        if (Object.values(newErrors).some(Boolean)) {
            setIsLoading(false);
            return;
        }

        try {
            const { data, error } = await userRepository.login(formData.email, formData.password);

            if (error) {
                alert("Error: " + error.message);
                setIsLoading(false);
                return;
            }

            if (data) {
                useAuthStore.getState().setSession(data);
                navigate("/home");
            }
        } catch (err) {
            console.error("Error inesperado:", err);
        } finally {
            setIsLoading(false);
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
                <Button type="submit" variant="primary" disabled={isLoading}>
                    {isLoading ? "Cargando..." : "Iniciar Sesión"}
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
            </div>
        </form>
    );
}