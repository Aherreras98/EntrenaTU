import EditProfileForm from "../components/forms/EditProfileForm";

export default function Profile() {
    return (
        <div>
            <h1 className="text-3xl font-bold text-[#FFFCFC] uppercase tracking-wider text-center">
                Mi Perfil
            </h1>
            <h2>Modificar Datos</h2>
            <EditProfileForm />
        </div>
    );
}