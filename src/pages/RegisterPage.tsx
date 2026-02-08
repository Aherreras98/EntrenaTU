import RegisterForm from "../components/forms/RegisterForm";

export default function RegisterPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#121212]">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-[#FF8904] text-center uppercase tracking-wider">
                    Únete a EntrenaTU
                </h1>
                <p className="text-[#FFFCFC] text-center mt-2 opacity-80">
                    Comienza tu transformación hoy
                </p>
            </div>
            <RegisterForm />
        </div>
    );
}