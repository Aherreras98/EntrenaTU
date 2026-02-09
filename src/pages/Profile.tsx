import EditProfileForm from "../components/forms/EditProfileForm";

export default function Profile() {
    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
            <div className="text-center md:text-left border-b border-white/10 pb-6">
                <h1 className="text-3xl font-bold text-primary uppercase tracking-wider">
                    Mi Perfil
                </h1>
                <p className="text-text-muted mt-2">
                    Gestiona tu información personal y preferencias de la aplicación.
                </p>
            </div>

            <EditProfileForm />
        </div>
    );
}