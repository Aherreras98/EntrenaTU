import { useEffect, useState, useRef, ChangeEvent } from "react";
import EditProfileForm from "../components/forms/EditProfileForm";
import { useAuthStore } from "../store/useAuthStore";
import { supabase } from "../database/supabase/client";
import Button from "../components/ui/Button";
import { SupabaseUserRepository } from "../database/supabase/SupabaseUserRepository";

export default function Profile() {
    const sessionUser = useAuthStore((state) => state.sessionUser);
    const setSession = useAuthStore((state) => state.setSession);
    
    const user = sessionUser?.user;
    const profile = sessionUser?.profile;

    const [profileData, setProfileData] = useState({ 
        username: profile?.username || "Usuario" 
    });
    
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);
    
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [resetEmailSent, setResetEmailSent] = useState(false);

    useEffect(() => {
        if (profile?.username) {
            setProfileData({ username: profile.username });
        }
        if (profile?.avatar_url) {
            setAvatarUrl(profile.avatar_url);
        }
    }, [profile]);

    const fechaRegistro = user?.created_at
        ? new Date(user.created_at).toLocaleDateString('es-ES', {
            day: '2-digit', month: '2-digit', year: 'numeric'
        }) : "--/--/----";

    const handleProfileUpdated = (newUsername: string) => {
        setProfileData({ username: newUsername });
        setIsModalOpen(false);
    };

    const handlePasswordReset = async () => {
        if (!user?.email) return;
        const { error } = await supabase.auth.resetPasswordForEmail(user.email, {
            redirectTo: `${window.location.origin}/reset-password`,
        });

        if (!error) setResetEmailSent(true);
        else alert("Error al enviar el correo de recuperación.");
    };

    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files || files.length === 0 || !user?.id) return;

        const file = files[0];
        
        const MAX_SIZE_MB = 100;
        if (file.size > MAX_SIZE_MB * 1024 * 1024) {
            alert(`El archivo es demasiado grande. El límite es ${MAX_SIZE_MB}MB.`);
            event.target.value = ""; 
            return;
        }

        try {
            setUploading(true);
            const userRepository = new SupabaseUserRepository();
            
            const { data, error } = await userRepository.updateProfile(user.id, { 
                avatar_file: file 
            });

            if (error) throw error;

            if (data?.avatar_url) {
                setAvatarUrl(data.avatar_url);
                
                // Actualizamos el estado con setSession
                if (sessionUser && profile) {
                    setSession({
                        ...sessionUser,
                        profile: {
                            ...profile,
                            avatar_url: data.avatar_url
                        }
                    });
                }
            }
        } catch (error: any) {
            alert("Error al subir el avatar: " + (error.message || "Inténtalo de nuevo."));
        } finally {
            setUploading(false);
            if (event.target) event.target.value = ''; 
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
                <div className="bg-surface p-10 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm transition-all duration-300">
                    
                    <div className="flex flex-col items-center sm:flex-row sm:items-start gap-8 mb-10 pb-10 border-b border-zinc-100 dark:border-zinc-800">
                
                        <div className="flex flex-col items-center gap-3 shrink-0">
                            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-zinc-100 dark:border-zinc-800 flex items-center justify-center bg-background shadow-inner overflow-hidden relative">
                                {uploading ? (
                                    <span className="text-gray-400 text-xs font-medium">Subiendo...</span>
                                ) : avatarUrl ? (
                                    <img src={avatarUrl} alt="Avatar de usuario" className="w-full h-full object-cover" />
                                ) : (
                                    <svg className="w-12 h-12 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                )}
                            </div>

                            <input 
                                type="file" 
                                ref={fileInputRef} 
                                onChange={handleFileChange} 
                                accept="image/png, image/jpeg, image/jpg" 
                                className="hidden" 
                            />
                            
                           <Button 
                                type="button"  
                                onClick={() => fileInputRef.current?.click()}
                                disabled={uploading}
                                className="px-3 py-1 text-xs h-8 border-zinc-300 dark:border-zinc-700 hover:border-primary transition-colors"
                            >
                                {uploading ? "Subiendo..." : avatarUrl ? "Cambiar Avatar" : "Añadir Avatar"}
                            </Button>
                        </div>

                        <div className="flex-1 text-center sm:text-left space-y-1 mt-2">
                            <h2 className="text-3xl font-semibold text-text-main tracking-tight">
                                ¡Hola, <span className="text-primary font-bold">{profileData.username}</span> !
                            </h2>
                            <p className="text-base text-text-muted font-light leading-relaxed">
                                Miembro de la comunidad desde el <span className="font-normal text-text-main">{fechaRegistro}</span>
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button onClick={() => setIsModalOpen(true)} className="px-8 py-2.5 text-sm">
                            Editar Nombre
                        </Button>
                        <Button variant="secondary" onClick={handlePasswordReset} className="px-8 py-2.5 text-sm">
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

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-surface p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 w-full max-w-md relative shadow-2xl animate-in zoom-in-95 duration-200">
                        <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-text-muted hover:text-text-main text-xl">
                            ✕
                        </button>
                        <EditProfileForm onProfileUpdated={handleProfileUpdated} initialUsername={profileData.username} />
                    </div>
                </div>
            )}
        </div>
    );
}