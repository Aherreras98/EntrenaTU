import LoginForm from "../components/forms/LoginForm";

export default function LoginPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-primary text-center uppercase tracking-wider">
                    Bienvenido
                </h1>
                <p className="text-text-main text-center mt-2 opacity-80">
                    Entrena a tu ritmo, supera tus límites
                </p>
            </div>
            <LoginForm />
        </div>
    );
}