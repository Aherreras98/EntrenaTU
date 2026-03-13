import { useState, useEffect } from "react";
import BarChartElement from "../components/charts/BarChartElement";
import { UsersIcon, ClipboardDocumentCheckIcon, ChartBarIcon } from "@heroicons/react/24/solid";
import { supabase } from "../database/supabase/client";

export default function AdminDashboard() {
    const [isLoading, setIsLoading] = useState(true);
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalRoutines: 0,
        chartData: [] as { name: string, value: number }[]
    });

    useEffect(() => {
        const fetchEasyData = async () => {
            try {
                // Traemos las fechas de registro
                const { data: users, count: usersCount } = await supabase
                    .from('Profiles') 
                    .select('created_at', { count: 'exact' });

                // Traemos el total de rutinas
                const { count: routinesCount } = await supabase
                    .from('rutinas') 
                    .select('*', { count: 'exact', head: true });

                // Calculamos los últimos 7 días exactos
                const last7Days = Array.from({length: 7}, (_, i) => {
                    const d = new Date();
                    d.setDate(d.getDate() - (6 - i)); // Restamos días hacia atrás
                    return d;
                });

                // Contamos los usuarios para esos 7 días
                const formattedChartData = last7Days.map(date => {
                    const day = date.getDate().toString().padStart(2, '0');
                    const month = (date.getMonth() + 1).toString().padStart(2, '0');
                    const name = `${day}/${month}`;
                    
                    // Fecha en formato base de datos (YYYY-MM-DD) para buscar coincidencias
                    const dateString = date.toISOString().split('T')[0];
                    
                    // Contamos cuántos usuarios tienen un created_at que empiece por esa fecha
                    const count = users ? users.filter(u => u.created_at.startsWith(dateString)).length : 0;

                    return { name, value: count };
                });

                setStats({
                    totalUsers: usersCount || 0,
                    totalRoutines: routinesCount || 0,
                    chartData: formattedChartData
                });

            } catch (error) {
                console.error("Error al cargar:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchEasyData();
    }, []);

    if (isLoading) return <div className="p-10 text-center text-primary">Cargando...</div>;

    return (
        <div className="w-full max-w-6xl mx-auto p-6 animate-in fade-in duration-500">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-zinc-900 dark:text-white flex items-center gap-3">
                    <ChartBarIcon className="text-primary w-8 h-8" />
                    Panel de Administración
                </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-white/10 shadow-xl flex items-center gap-6">
                    <div className="bg-primary/10 p-4 rounded-xl">
                        <UsersIcon className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                        <p className="text-sm text-zinc-500 font-medium">Total de Usuarios</p>
                        <p className="text-4xl font-black">{stats.totalUsers}</p>
                    </div>
                </div>
                
                <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-white/10 shadow-xl flex items-center gap-6">
                    <div className="bg-primary/10 p-4 rounded-xl">
                        <ClipboardDocumentCheckIcon className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                        <p className="text-sm text-zinc-500 font-medium">Rutinas Realizadas</p>
                        <p className="text-4xl font-black">{stats.totalRoutines}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
                <BarChartElement 
                    title="Nuevos usuarios (Últimos 7 días)" 
                    items={stats.chartData} 
                />
            </div>
        </div>
    );
}