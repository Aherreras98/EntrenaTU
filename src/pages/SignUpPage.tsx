import { Link } from "react-router-dom";
import SignUpForm from "../components/forms/SignUpForm";
import { ArrowLeftIcon } from "lucide-react";

export default function SignUpPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 py-12 animate-in fade-in duration-500">
            
            {/* BOTÓN VOLVER */}
            <div className="mb-8">
                <Link
                    to="/" 
                    className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-primary transition-colors group"
                >
                    <ArrowLeftIcon className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
                    Volver a la página principal
                </Link>
            </div>

            <div className="mb-10 text-center">
                <h1 className="text-3xl font-bold tracking-tighter text-primary uppercase">
                    Únete a <span className="text-text-main">EntrenaTU</span>
                </h1>
               
                <p className="text-base text-zinc-500 dark:text-zinc-400 mt-2 font-light italic">
                    Comienza tu transformación hoy
                </p>
            </div>

            <SignUpForm />
        </div>
    );
}