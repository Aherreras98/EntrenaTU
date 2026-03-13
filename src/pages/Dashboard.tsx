import { useState, useEffect } from "react";
import BarChartElement from "../components/charts/BarChartElement";
import { UsersIcon, ClipboardDocumentCheckIcon, ChartBarIcon } from "@heroicons/react/24/solid";
import { TrashIcon, PencilSquareIcon, UserIcon } from "@heroicons/react/24/outline";
import { supabase } from "../database/supabase/client";
import { toast } from "react-hot-toast";

export default function AdminDashboard() {
    const [isLoading, setIsLoading] = useState(true);
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalRoutines: 0,
        chartData: [] as { name: string, value: number }[]
    });

    // Estado para el RUD (Read, Update, Delete) de usuarios
    const [usersList, setUsersList] = useState<any[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<any>(null);
    const [formData, setFormData] = useState({ username: '', email: '', age: '' });

    const fetchDashboardData = async () => {
        try {
            // Traemos los usuarios para la tabla y gráficas
            const { data: users, count: usersCount, error: usersError } = await supabase
                .from('Profiles')
                .select('*', { count: 'exact' });

            if (usersError) throw usersError;

            // Traemos el total de rutinas
            const { count: routinesCount } = await supabase
                .from('rutinas')
                .select('*', { count: 'exact', head: true });

            // Calculamos los últimos 7 días exactos para la gráfica
            const last7Days = Array.from({ length: 7 }, (_, i) => {
                const d = new Date();
                d.setDate(d.getDate() - (6 - i));
                return d;
            });

            const formattedChartData = last7Days.map(date => {
                const day = date.getDate().toString().padStart(2, '0');
                const month = (date.getMonth() + 1).toString().padStart(2, '0');
                const name = `${day}/${month}`;
                const dateString = date.toISOString().split('T')[0];
                const count = users ? users.filter(u => u.created_at?.startsWith(dateString)).length : 0;
                return { name, value: count };
            });

            setStats({
                totalUsers: usersCount || 0,
                totalRoutines: routinesCount || 0,
                chartData: formattedChartData
            });

            setUsersList(users || []);
        } catch (error) {
            console.error("Error al cargar datos:", error);
            toast.error("Error al cargar el panel");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    // --- FUNCIONES UPDATE Y DELETE ---

    const handleDeleteUser = async (id: string) => {
        if (!window.confirm("¿Estás seguro de que deseas eliminar este usuario?")) return;
        
        try {
            const { error } = await supabase.from('Profiles').delete().eq('id', id);
            if (error) throw error;
            
            setUsersList(usersList.filter(user => user.id !== id));
            setStats(prev => ({ ...prev, totalUsers: prev.totalUsers - 1 }));
            toast.success("Usuario eliminado correctamente");
        } catch (error) {
            console.error(error);
            toast.error("Error al eliminar el usuario");
        }
    };

    const handleOpenEditModal = (user: any) => {
        setEditingUser(user);
        setFormData({ username: user.username || '', email: user.email || '', age: user.age || '' });
        setIsModalOpen(true);
    };

    const handleUpdateUser = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Si por alguna razón no hay usuario en edición, cancelamos
        if (!editingUser) return; 

        try {
            // ACTUALIZAR USUARIO EXISTENTE
            const { error } = await supabase
                .from('Profiles')
                .update({ 
                    username: formData.username, 
                    email: formData.email, 
                    age: formData.age 
                })
                .eq('id', editingUser.id);
            
            if (error) throw error;
            
            toast.success("Usuario actualizado correctamente");
            setIsModalOpen(false);
            fetchDashboardData(); // Recargamos para actualizar la tabla
        } catch (error) {
            console.error(error);
            toast.error("Error al actualizar el usuario");
        }
    };

    if (isLoading) return <div className="p-10 text-center text-primary">Cargando...</div>;

    return (
        <div className="w-full max-w-6xl mx-auto p-6 animate-in fade-in duration-500">
            {/* Cabecera del Dashboard */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-zinc-900 dark:text-white flex items-center gap-3">
                    <ChartBarIcon className="text-primary w-8 h-8" />
                    Panel de Administración
                </h1>
            </div>

            {/* Tarjetas de Estadísticas */}
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

            {/* Gráfica */}
            <div className="grid grid-cols-1 gap-6 mb-8">
                <BarChartElement 
                    title="Nuevos usuarios (Últimos 7 días)" 
                    items={stats.chartData} 
                />
            </div>

            {/* Tabla RUD de Usuarios (Read, Update, Delete) */}
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-white/10 shadow-xl">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Gestión de Usuarios</h2>
                    {/* El botón de crear ha sido eliminado de aquí */}
                </div>
                
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-zinc-500 dark:text-zinc-400">
                        <thead className="text-xs text-zinc-700 uppercase bg-zinc-50 dark:bg-zinc-800 dark:text-zinc-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">Usuario</th>
                                <th scope="col" className="px-6 py-3">Email</th>
                                <th scope="col" className="px-6 py-3">Edad</th>
                                <th scope="col" className="px-6 py-3 text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usersList.map((user) => (
                                <tr key={user.id} className="bg-white border-b dark:bg-zinc-900 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                                    <td className="px-6 py-4 font-medium text-zinc-900 dark:text-white flex items-center gap-3">
                                        {user.avatar_url ? (
                                            <img src={user.avatar_url} alt="Avatar" className="w-8 h-8 rounded-full object-cover" />
                                        ) : (
                                            <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center">
                                                <UserIcon className="w-4 h-4" />
                                            </div>
                                        )}
                                        {user.username || 'Sin nombre'}
                                    </td>
                                    <td className="px-6 py-4">{user.email}</td>
                                    <td className="px-6 py-4">{user.age || '-'}</td>
                                    <td className="px-6 py-4 text-right flex justify-end gap-2">
                                        <button 
                                            onClick={() => handleOpenEditModal(user)}
                                            className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                                            title="Editar"
                                        >
                                            <PencilSquareIcon className="w-5 h-5" />
                                        </button>
                                        <button 
                                            onClick={() => handleDeleteUser(user.id)}
                                            className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                            title="Eliminar"
                                        >
                                            <TrashIcon className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal de Editar Usuario */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
                    <div className="bg-white dark:bg-zinc-900 w-full max-w-md p-6 rounded-2xl shadow-2xl">
                        <h3 className="text-xl font-bold mb-4 text-zinc-900 dark:text-white">
                            Editar Usuario
                        </h3>
                        <form onSubmit={handleUpdateUser} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Nombre de Usuario</label>
                                <input 
                                    type="text" 
                                    value={formData.username}
                                    onChange={(e) => setFormData({...formData, username: e.target.value})}
                                    className="w-full px-4 py-2 border rounded-lg bg-transparent dark:border-zinc-700 dark:text-white"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Email</label>
                                <input 
                                    type="email" 
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    className="w-full px-4 py-2 border rounded-lg bg-transparent dark:border-zinc-700 dark:text-white"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Edad</label>
                                <input 
                                    type="number" 
                                    value={formData.age}
                                    onChange={(e) => setFormData({...formData, age: e.target.value})}
                                    className="w-full px-4 py-2 border rounded-lg bg-transparent dark:border-zinc-700 dark:text-white"
                                />
                            </div>
                            <div className="flex gap-3 justify-end mt-6">
                                <button 
                                    type="button" 
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button 
                                    type="submit" 
                                    className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors"
                                >
                                    Guardar Cambios
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}