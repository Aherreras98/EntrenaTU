import { useEffect, useState } from "react";
import EditProfileForm from "../components/forms/EditProfileForm";
import { useAuthStore } from "../store/useAuthStore";
import { supabase } from "../database/supabase/client";

export default function Profile() {

    const { user } = useAuthStore();
    const [profileData, setProfileData] = useState({ username: "Usuario", email: "" });

    useEffect(() => {
        if (!user?.id) return;
        supabase
            .from('Profiles')
            .select('username, email')
            .eq('id', user.id)
            .single()
            .then(({ data }) => {
                if (data) {
                    setProfileData({
                        username: data.username || "Usuario",
                        email: data.email || "",
                    });
                }
            });
    }, [user?.id]);

    const fechaRegistro = user?.created_at
        ? new Date(user.created_at).toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        })
        : "--/--/----";

    const handleProfileUpdated = (newUsername: string) => {
        setProfileData(prev => ({ ...prev, username: newUsername }));
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
                <p className="text-text-muted mt-2">
                    Gestiona tu información personal y preferencias de la aplicación.
                </p>
            </div>

            <EditProfileForm onProfileUpdated={handleProfileUpdated} />
        </div>
    );
}