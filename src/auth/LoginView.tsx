import { useState } from "react";
import { SupabaseUserRepository } from "../database/supabase/SupabaseUserRepository";
import { supabase } from "../database/supabase/client";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { InputText } from "../components/common/Input";
import Button from "../components/ui/Button";

export const LoginView = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate();
    const userRepository = new SupabaseUserRepository();
    const setAuth = useAuthStore((state) => state.setAuth);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Verificación mediante el repositorio
        const { data, error } = await userRepository.login(email, password);

        if (error) {
            alert("Error de acceso: " + (error.message || "Credenciales incorrectas"));
            setLoading(false);
            return;
        }

        // Sincronización con Zustand
        if (data) {
            const { data: { session } } = await supabase.auth.getSession();
            
            if (session) {
                // Esto actualiza el estado global de la sesión
                setAuth(session);
                alert("¡Bienvenido, " + data.profile.username + "!");
                
                // Redirigir al usuario al Home o Dashboard
                navigate("/home"); 
            }
        }
        setLoading(false);
    };

    const handleRecoverPassword = async () => {
        if (!email) return alert("Introduce tu email para recuperar la contraseña");
        const { error } = await userRepository.recoverPassword(email);
        if (error) alert(error.message);
        else alert("Correo de recuperación enviado. Revisa tu bandeja de entrada.");
    };

    return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-zinc-100 dark:bg-zinc-950 animate-in fade-in duration-500">
        
        {/* TARJETA */}
        <div className="w-full max-w-md bg-white dark:bg-zinc-900 p-10 rounded-2xl 
             border border-zinc-300 dark:border-white/10 
             shadow-2xl transition-all duration-300">
            
            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold italic tracking-tighter text-orange-500 uppercase">
                    BIENVENIDO/A
                </h1>
                <p className="text-base text-zinc-500 dark:text-zinc-400 mt-2 font-light">
                    Accede a tu cuenta para entrenar
                </p>
            </div>

            <form onSubmit={handleLogin} className="flex flex-col gap-6">
                <InputText 
                    label="Correo Electrónico"
                    type="email" 
                    placeholder="tu@email.com"
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />

                <InputText
                    label="Contraseña"
                    type="password" 
                    placeholder="••••••"
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />

                <Button type="submit" disabled={loading} className="w-full py-4 text-lg bg-orange-500 hover:bg-orange-600">
                    {loading ? 'Verificando...' : 'Iniciar Sesión'}
                </Button>
            </form>
            
            <div className="text-center mt-8 pt-6 border-t border-zinc-200 dark:border-white/5">
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    ¿No tienes cuenta?{' '}
                    <button 
                        onClick={() => navigate("/register")} 
                        className="text-orange-500 font-bold hover:underline"
                    >
                        Regístrate gratis
                    </button>
                </p>
            </div>
        </div>
    </div>
    );
};