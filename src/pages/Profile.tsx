import { useEffect, useState } from "react";
import EditProfileForm from "../components/forms/EditProfileForm";
import { useAuthStore } from "../store/useAuthStore";
import { supabase } from "../database/supabase/client";
import Button from "../components/ui/Button";

export default function Profile() {
    const sessionUser = useAuthStore((state) => state.sessionUser);
    const user = sessionUser?.user;
    const profile = sessionUser?.profile;

    const [profileData, setProfileData] = useState({ 
        username: profile?.username || "Usuario" 
    });
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [resetEmailSent, setResetEmailSent] = useState(false);

    useEffect(() => {
        if (profile?.username) {
            setProfileData({ username: profile.username });
        }
    }, [profile]);

    const fechaRegistro = user?.created_at
        ? new Date(user.created_at).toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        })
        : "--/--/----";

    const handleProfileUpdated = (newUsername: string) => {
        setProfileData({ username: newUsername });
        setIsModalOpen(false);
    };

    const handlePasswordReset = async () => {
        if (!user?.email) return;
        
        const { error } = await supabase.auth.resetPasswordForEmail(user.email, {
            redirectTo: `${window.location.origin}/reset-password`,
        });

        if (!error) {
            setResetEmailSent(true);
        } else {
            alert("Error al enviar el correo de recuperación.");
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
            <div className="text-center md:text-left border-b border-white/10 pb-6">
                <h1 className="text-3xl font-bold text-primary uppercase tracking-wider">
                    Mi Perfil
                </h1>
                <p className="text-xl mt-4 text-white">
                    <span className="text-primary font-semibold">
                        {profileData.username}
                    </span> es miembro desde el {fechaRegistro}
                </p>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
                <Button onClick={() => setIsModalOpen(true)}>
                    Editar Nombre
                </Button>
                <Button onClick={handlePasswordReset}>
                    Cambiar Contraseña
                </Button>
            </div>
            
            {resetEmailSent && (
                <p className="text-green-400 mt-2 text-sm">
                    Se ha enviado un correo a tu email para restablecer tu contraseña.
                </p>
            )}

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                    <div className="bg-[#1E1E1E] p-6 rounded-2xl border border-gray-800 w-full max-w-md relative animate-in zoom-in-95 duration-200">
                        <button 
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors text-xl"
                            aria-label="Cerrar modal"
                        >
                            ✕
                        </button>
                        <EditProfileForm 
                            onProfileUpdated={handleProfileUpdated} 
                            initialUsername={profileData.username} 
                        />
                    </div>
                </div>
            )}
        </div>
    );
}