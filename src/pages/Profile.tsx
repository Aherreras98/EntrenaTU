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
        <div className="space-y-6 animate-in fade-in duration-500">
            
            {/* ENCABEZADO */}
            <div className="flex justify-between items-end border-b border-white/10 pb-4">
                <div>
                    <h1 className="text-3xl font-bold text-primary uppercase tracking-wider">
                        Mi Perfil
                    </h1>
                    <p className="text-text-muted mt-1 font-open-sans">
                        Gestiona tu cuenta y personaliza tu experiencia.
                    </p>
                </div>
            </div>

            {/* CONTENIDO */}
            <section className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-8">
                
                {/* Info Card */}
                <div className="bg-surface p-10 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm transition-all duration-300">
                    
                    {/*  AVATAR Y SALUDO */}
                    <div className="flex flex-col items-center sm:flex-row sm:items-start gap-8 mb-10 pb-10 border-b border-zinc-100 dark:border-zinc-800">
                
                        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-zinc-100 dark:border-zinc-800 flex items-center justify-center bg-background shadow-inner shrink-0 transition-colors">
                            
                            <svg className="w-12 h-12 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            
                        </div>

                        {/* Mensaje de Bienvenida */}
                        <div className="flex-1 text-center sm:text-left space-y-1 mt-2">
                            <h2 className="text-3xl font-semibold text-text-main tracking-tight">
                                ¡Hola, <span className="text-primary font-bold">{profileData.username}</span> !
                            </h2>
                            <p className="text-base text-text-muted font-light leading-relaxed">
                                Miembro de la comunidad desde el <span className="font-normal text-text-main">{fechaRegistro}</span>
                            </p>
                        </div>
                    </div>

                    {/* Botones pequeños y alineados */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button 
                            onClick={() => setIsModalOpen(true)}
                            className="px-8 py-2.5 text-sm"
                        >
                            Editar Nombre
                        </Button>
                        <Button 
                            variant="secondary" 
                            onClick={handlePasswordReset}
                            className="px-8 py-2.5 text-sm"
                        >
                            Cambiar Contraseña
                        </Button>
                    </div>

                    {resetEmailSent && (
                        <p className="text-green-500 text-xs mt-4 font-medium italic">
                            ✓ Correo de recuperación enviado correctamente.
                        </p>
                    )}
                </div>
            </section>

            {/* MODAL */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-surface p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 w-full max-w-md relative shadow-2xl animate-in zoom-in-95 duration-200">
                        <button 
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-4 right-4 text-text-muted hover:text-text-main text-xl"
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