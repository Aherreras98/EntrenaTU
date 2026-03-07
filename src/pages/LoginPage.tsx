import LoginForm from "../components/forms/LoginForm";

export default function LoginPage() {
    return (
        
        <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 py-12 animate-in fade-in duration-500">
            
            <div className="mb-10 text-center">
                
                <h1 className="text-3xl font-bold tracking-tighter text-primary uppercase">
                    Bienvenido/a <span className="text-text-main">EntrenaTU</span>
                </h1>
           
                <p className="text-base text-zinc-500 dark:text-zinc-400 mt-2 font-light italic">
                    Entrena a tu ritmo, supera tus límites
                </p>
            </div>

            <LoginForm /> 
        </div>
    );
}