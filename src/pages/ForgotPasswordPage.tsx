import ForgotPasswordForm from "../components/forms/ForgotPasswordForm";

export default function ForgotPasswordPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 animate-in fade-in duration-500">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-primary uppercase tracking-wider">
                    Recuperar Contraseña
                </h1>
                <p className="text-text-main mt-2 opacity-80 text-sm">
                    ¿Olvidaste tu contraseña? No te preocupes.
                </p>
            </div>
            <ForgotPasswordForm />
        </div>
    );
}
