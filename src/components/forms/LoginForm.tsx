import { FormEvent, useState, type ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { InputText } from "../common/Input";
import Button from "../ui/Button";
import { validateField } from "../../utils/regex";
import { useAuthStore } from "../../store/useAuthStore";
import { userRepository } from "../../database/repositories"; 
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";

interface LoginData {
    email: string;
    password: string;
}

interface LoginErrors {
    email: string;
    password: string;
}

export default function LoginForm() {
    const { t } = useTranslation();
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
                toast.error(t('auth.loginError') + error.message);
                setIsLoading(false);
                return;
            }

            if (data) {
                useAuthStore.getState().setSession(data);
                toast.success(t('auth.loginSuccess'));
                navigate("/home");
            }
        } catch (err) {
            console.error("Error inesperado:", err);
            toast.error(t('auth.unknownError'));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form 
            onSubmit={handleSubmit} 
            className="flex flex-col gap-6 w-full max-w-md mx-auto p-10 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-white/10 shadow-xl transition-all duration-300"
        >
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

            <InputText
                label={t('auth.passwordLabel')}
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
                    {t('auth.forgotPassword')}
                </Link>
            </div>

            <div className="flex flex-col gap-4 mt-2">
                <Button type="submit" variant="primary" disabled={isLoading}>
                    {isLoading ? t('auth.loading') : t('auth.loginButton')}
                </Button>

                <span className="text-zinc-500 dark:text-zinc-400 text-center text-sm">
                    {t('auth.noAccount')}{" "}
                    <Link
                        to="/signup"
                        className="text-[#FF8904] font-bold hover:underline hover:text-[#FFB86A] transition-colors"
                    >
                        {t('auth.registerLink')}
                    </Link>
                </span>
            </div>
        </form>
    );
}