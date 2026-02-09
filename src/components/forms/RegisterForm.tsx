import { useState, type ChangeEvent, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { InputText, InputNumber } from "../common/Input";
import Button from "../ui/Button";
import { validateField } from "../../utils/regex";

interface RegisterData {
    username: string;
    email: string;
    age: number | string;
    password: string;
}

export default function RegisterForm() {
    const [formData, setFormData] = useState<RegisterData>({
        username: "",
        email: "",
        age: "",
        password: "",
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

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
            username: validateField("name", formData.username),
            email: validateField("email", formData.email),
            age: validateField("age", formData.age.toString()),
            password: validateField("password", formData.password),
        };

        setErrors(newErrors);

        if (!Object.values(newErrors).some(Boolean)) {
            console.log("Registro válido:", formData);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full max-w-sm mx-auto p-4">
            <InputText
                label="Nombre de Usuario"
                name="username"
                value={formData.username}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.username}
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

            <InputNumber
                label="Edad"
                name="age"
                type="number"
                value={formData.age}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.age}
            />

            <InputText
                label="Contraseña"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.password}
            />

            <div className="flex flex-col gap-4 mt-4">
                <Button type="submit" variant="primary">
                    Crear Cuenta
                </Button>
                <span className="text-text-main text-center text-sm">
                    ¿Ya tienes cuenta?{" "}
                    <Link to="/login" className="text-primary font-bold hover:underline hover:text-primary-hover transition-colors">
                        Inicia Sesión
                    </Link>
                </span>
            </div>
        </form>
    );
}