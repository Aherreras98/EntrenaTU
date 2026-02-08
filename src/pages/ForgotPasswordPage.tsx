import ForgotPasswordForm from "../components/forms/ForgotPasswordForm";

export default function ForgotPasswordPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#121212] px-4">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-[#FF8904] uppercase tracking-wider">
                    Recuperar Contraseña
                </h1>
                <p className="text-[#FFFCFC] mt-2 opacity-80 text-sm font-open-sans">
                    ¿Olvidaste tu contraseña? No te preocupes.
                </p>
            </div>
            <ForgotPasswordForm />
        </div>
    );
}