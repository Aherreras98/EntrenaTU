import { useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { InputText, InputNumber } from "../common/Input";
import Button from "../ui/Button";
import { validateField, passwordsMatch } from "../../utils/regex";
import { SignUpData } from "../../interfaces/SignUpData";
import { userRepository } from "../../database/repositories";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { isEmailTaken } from "../../database/supabase/RCPs/isEmailTaken";

export default function SignUpForm() {
    const { t } = useTranslation();
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

    const handleBlur = async(e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name === "confirmPassword") {
            const error = passwordsMatch(formData.password, value);
            setErrors((prev) => ({ ...prev, [name]: error }));
        } else {
            const error = validateField(name, value);
            setErrors((prev) => ({ ...prev, [name]: error }));

            // Comprobación en Supabase si es el email y no hay errores de formato

            if (name === "email" && !error) {
                const emailTaken = await isEmailTaken(value);
                if (emailTaken) {
                    setErrors((prev) => ({ ...prev, email: t('auth.emailTaken') }));
                }
            }
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const newErrors = {
            username: validateField("username", formData.username),
            email: validateField("email", formData.email),
            age: validateField("age", formData.age.toString()),
            password: validateField("password", formData.password),
            confirmPassword: passwordsMatch(formData.password, formData.confirmPassword),
        };

        setErrors(newErrors);

        if (!Object.values(newErrors).some(Boolean)) {
            try {
                const dataToSubmit = {
                    ...formData,
                    age: Number(formData.age)
                };

                const result = await userRepository.createUser(dataToSubmit);

                if (result.error) {
                    const errorMessage = result.error.message || t('auth.unknownError');
                    toast.error(t('auth.registerError') + errorMessage);
                    return;
                }

                toast.success(t('auth.registerSuccess'));
                navigate("/login");

            } catch (err) {
                console.error("Error capturado:", err);
                toast.error(t('auth.serverError'));
            }
        }
    };

    const togglePasswordButton = (
        <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-gray-500 hover:text-primary focus:outline-none"
            tabIndex={-1}
        >
            {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>
            )}
        </button>
    );

    return (
        <form 
            onSubmit={handleSubmit} 
            className="flex flex-col gap-5 w-full max-w-md mx-auto p-10 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-white/10 shadow-xl transition-all duration-300"
        >
            <InputText
                label={t('auth.usernameLabel')}
                name="username"
                placeholder={t('auth.usernamePlaceholder')}
                value={formData.username}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.username}
            />

            <InputText
                label={t('auth.emailLabel')}
                name="email"
                type="email"
                placeholder={t('auth.emailPlaceholder')}
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.email}
            />

            <InputNumber
                label={t('auth.ageLabel')}
                name="age"
                type="number"
                placeholder="0"
                value={formData.age}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.age}
            />

            <InputText
                label={t('auth.passwordLabel')}
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="******"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.password}
                endIcon={togglePasswordButton}
            />

            <InputText
                label={t('auth.confirmPasswordLabel')}
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                placeholder="******"
                value={formData.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.confirmPassword}
                endIcon={togglePasswordButton}
            />

            <div className="flex flex-col gap-4 mt-4">
                <Button type="submit" variant="primary" className="py-3">
                    {t('auth.createAccountButton')}
                </Button>

                <span className="text-zinc-500 dark:text-zinc-400 text-center text-sm">
                    {t('auth.hasAccount')}{" "}
                    <Link to="/login" className="text-primary font-bold hover:underline hover:text-primary-hover transition-colors">
                        {t('auth.loginLink')}
                    </Link>
                </span>
            </div>
        </form>
    );
}