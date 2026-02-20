import { useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { InputText, InputNumber } from "../common/Input";
import Button from "../ui/Button";
import { validateField, passwordsMatch } from "../../utils/regex";
import { SignUpData } from "../../interfaces/SignUpData";
import { userRepository } from "../../database/repositories"; 

export default function SignUpForm() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState<SignUpData>({
        username: "",
        email: "",
        age: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === "confirmPassword") {
            const error = passwordsMatch(formData.password, value);
            setErrors((prev) => ({ ...prev, [name]: error }));
        } else {
            setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const newErrors = {
            username: validateField("username", formData.username),
            email: validateField("email", formData.email),
            age: validateField("age", formData.age.toString()),
            password: validateField("password", formData.password),
            confirmPassword: passwordsMatch(formData.password, formData.confirmPassword || ""),
        };

        setErrors(newErrors);

        if (!Object.values(newErrors).some(Boolean)) {
            try {
                const result = await userRepository.register(formData);
                if (result) {
                    alert("¡Usuario creado con éxito!");
                    navigate("/login");
                }
            } catch (err: any) {
                alert("Error de Supabase: " + err.message);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full max-w-sm mx-auto p-4">
            <InputText label="Usuario" name="username" value={formData.username} onChange={handleChange} onBlur={handleBlur} error={errors.username} />
            <InputText label="Email" name="email" type="email" value={formData.email} onChange={handleChange} onBlur={handleBlur} error={errors.email} />
            <InputNumber label="Edad" name="age" value={formData.age} onChange={handleChange} onBlur={handleBlur} error={errors.age} />
            <InputText label="Password" name="password" type={showPassword ? "text" : "password"} value={formData.password} onChange={handleChange} onBlur={handleBlur} error={errors.password} />
            <InputText label="Confirmar" name="confirmPassword" type={showPassword ? "text" : "password"} value={formData.confirmPassword || ""} onChange={handleChange} onBlur={handleBlur} error={errors.confirmPassword} />
            
            <Button type="submit" variant="primary">Crear Cuenta</Button>
            <p className="text-center text-sm">¿Ya tienes cuenta? <Link to="/login" className="text-primary font-bold">Loguéate</Link></p>
        </form>
    );
}