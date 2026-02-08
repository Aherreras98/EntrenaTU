import LoginForm from "../components/forms/LoginForm";

export default function LoginPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#121212]">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-[#FF8904] text-center uppercase tracking-wider">
                    Bienvenido
                </h1>
                <p className="text-[#FFFCFC] text-center mt-2 opacity-80">
                    Entrena a tu ritmo, supera tus límites
                </p>
            </div>
            <LoginForm />
        </div>
    );
}