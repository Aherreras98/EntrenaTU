import { useState } from "react";
import ActivityForm from "../components/forms/ActivityForm";
import RoutineForm from "../components/forms/RoutineForm";

export default function Routines() {
    const [activeTab, setActiveTab] = useState<"rutina" | "ejercicio">("rutina");

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex justify-between items-end border-b border-white/10 pb-4">
                <div>
                    <h1 className="text-3xl font-bold text-primary uppercase tracking-wider">
                        Planificación
                    </h1>
                    <p className="text-text-muted mt-1 font-open-sans">
                        Crea ejercicios base y únelos para formar tus rutinas.
                    </p>
                </div>
            </div>

            {/* Selector de Pestañas */}
            <div className="flex gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-2">
                <button 
                    onClick={() => setActiveTab("rutina")}
                    className={`pb-2 px-1 text-sm font-bold uppercase tracking-wider transition-colors border-b-2 ${
                        activeTab === "rutina" 
                            ? "border-primary text-primary" 
                            : "border-transparent text-text-muted hover:text-text-main"
                    }`}
                >
                    Crear Rutina
                </button>
                <button 
                    onClick={() => setActiveTab("ejercicio")}
                    className={`pb-2 px-1 text-sm font-bold uppercase tracking-wider transition-colors border-b-2 ${
                        activeTab === "ejercicio" 
                            ? "border-primary text-primary" 
                            : "border-transparent text-text-muted hover:text-text-main"
                    }`}
                >
                    Añadir Ejercicio al Catálogo
                </button>
            </div>

            <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                {activeTab === "rutina" ? <RoutineForm /> : <ActivityForm />}
            </section>
        </div>
    );
}