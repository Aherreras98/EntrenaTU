import { useState, type ChangeEvent, type FocusEvent } from "react";
import { validateField } from "../../utils/regex";
import Button from "../ui/Button";
import Input, { InputText } from "../common/Input";

interface FormDataProps {
    username: string;
    email: string;
    name: string;
    age: number;
    password: string;
}

interface ErrorsProps {
    name: string;
    age: string;
    password: string;
}

export default function RegisterForm() {

    const [formData, setFormData] = useState<FormDataProps>({
        name: "",
        age: 0,
        password: "",
        email: "",
        username: "",
    });

    const [errors, setErrors] = useState<ErrorsProps>({
        name: "",
        age: "",
        password: "",
    });



    // Actualiza el valor del campo mientras el usuario escribe.
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    // Valida el campo cuando el usuario sale de él (pierde el foco).
    const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const error = validateField(name, value);
        setErrors((prev) => ({ ...prev, [name]: error }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors = {
            name: validateField("name", formData.name),
            age: validateField("age", formData.age.toString()),
            password: validateField("password", formData.password),
        };
        setErrors(newErrors);

        // Comprueba si hay algún valor en el array newErrors (true si hay alguno)
        const hasErrors = Object.values(newErrors).some(Boolean);
        if (!hasErrors) {
            alert("Formulario válido ✅");
            const newUser: RegisterData = {
                email: formData.email,
                password: formData.password,
                username: formData.username,
                role: "user",
                avatar_url: ""
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto space-y-4">


            <InputText
                label="Nombre"
                name="name"
                type="text"
                value={formData.name}
                autoComplete="off"
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.name}>
            </InputText>

            <InputField
                label="Usuario"
                name="username"
                type="username"
                value={formData.username}
                autoComplete="off"
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.name}>
            </InputField>

            <InputField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                autoComplete="off"
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.name}>
            </InputField>


            <InputField
                label="Edad"
                name="age"
                type="number"
                value={formData.age}
                autoComplete="off"
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.age}
            >
            </InputField>


            <InputField
                label="Contraseña"
                name="password"
                type="password"
                value={formData.password}
                autoComplete="off"
                onChange={handleChange}
                onBlur={handleBlur} error={errors.password}
            >

            </InputField>


            <Button type="submit">Enviar</Button>
        </form>
    );
}