import { useState } from "react";
import { SupabaseUserRepository } from "../database/supabase/SupabaseUserRepository";
import { supabase } from "../database/supabase/client";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

export const LoginView = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate();

    // 1. Usamos el store real y el repositorio
    const userRepository = new SupabaseUserRepository();
    const setAuth = useAuthStore((state) => state.setAuth);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // 2. Verificación mediante el repositorio
        const { data, error } = await userRepository.login(email, password);

        if (error) {
            alert("Error de acceso: " + (error.message || "Credenciales incorrectas"));
            setLoading(false);
            return;
        }

        // 3. Sincronización con Zustand
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
        <div className="login-container flex flex-col items-center justify-center p-4">
            <h2 className="text-2xl font-bold mb-4">EntrenaTU - Login</h2>
            <form onSubmit={handleLogin} className="flex flex-col gap-4 w-full max-w-sm">
                <input 
                    type="email" 
                    className="border p-2 rounded"
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Email"
                    required 
                />
                <input 
                    type="password" 
                    className="border p-2 rounded"
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Contraseña"
                    required 
                />
                <button 
                    type="submit" 
                    className="bg-orange-600 text-white p-2 rounded font-bold"
                    disabled={loading}
                >
                    {loading ? 'Verificando...' : 'Iniciar Sesión'}
                </button>
            </form>
            
            <button 
                onClick={handleRecoverPassword} 
                className="text-sm text-blue-600 underline mt-4"
            >
                ¿Olvidaste tu contraseña?
            </button>
        </div>
    );
};