import ActivityForm from "../components/forms/ActivityForm";

export default function Routines() {

   return (
        <div className="space-y-6 animate-in fade-in duration-500">
            
            <div className="flex justify-between items-end border-b border-white/10 pb-4">
                <div>
                    <h1 className="text-3xl font-bold text-primary uppercase tracking-wider">
                        Rutinas
                    </h1>
                    <p className="text-text-muted mt-1 font-open-sans">
                        Crea tus ejercicios personalizados y organiza tus planes de entrenamiento.
                    </p>
                </div>
            </div>

            {/* Formulario */}
            <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                <ActivityForm />
            </section>
        </div>
    );
}