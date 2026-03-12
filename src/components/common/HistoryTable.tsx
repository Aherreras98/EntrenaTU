import { useState, useEffect } from "react";
import Button from "../ui/Button";
import { supabase } from "../../database/supabase/client";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";

interface HistoryEntry {
    id: string;
    nombre_rutina_historico: string;
    fecha_realizacion: string;
    estado: string;
}

export default function HistoryTable() {
    const { t } = useTranslation();
    const [historyData, setHistoryData] = useState<HistoryEntry[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            setIsLoading(true);
            const { data, error } = await supabase
                .from("historial_rutinas")
                .select("*")
                .order("fecha_realizacion", { ascending: false });

            if (error) {
                console.error("Error al cargar el historial:", error);
            } else if (data) {
                setHistoryData(data);
            }
            setIsLoading(false);
        };

        fetchHistory();
    }, []);

    const formatDate = (isoString: string) => {
        const date = new Date(isoString);
        return date.toLocaleDateString("es-ES", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    };

    if (isLoading) {
        return <div className="p-8 text-center text-text-muted">{t('historyTable.loading')}</div>;
    }

    if (historyData.length === 0) {
        return (
            <div className="p-8 text-center bg-surface border border-zinc-200 dark:border-zinc-800 rounded-2xl">
                <p className="text-text-muted">{t('historyTable.empty')}</p>
                <p className="text-sm mt-2">{t('historyTable.emptyHint')}</p>
            </div>
        );
    }

    return (
        <div className="w-full overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-surface shadow-sm transition-all duration-300">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-separate border-spacing-0">
                    <thead>
                        <tr className="bg-zinc-50 dark:bg-zinc-800/40 text-text-muted">
                            <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest border-b border-zinc-200 dark:border-zinc-800">{t('historyTable.colRoutine')}</th>
                            <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest border-b border-zinc-200 dark:border-zinc-800">{t('historyTable.colDate')}</th>
                            <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest border-b border-zinc-200 dark:border-zinc-800 text-right">{t('historyTable.colAction')}</th>
                        </tr>
                    </thead>
                    
                    <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                        {historyData.map((row) => (
                            <tr key={row.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-all duration-200 group">
                                <td className="px-8 py-6">
                                    <span className="font-bold text-text-main group-hover:text-primary transition-colors duration-300 text-lg">
                                        {row.nombre_rutina_historico}
                                    </span>
                                </td>
                                <td className="px-8 py-6">
                                    <div className="flex flex-col">
                                        <span className="text-text-main font-medium capitalize">
                                            {formatDate(row.fecha_realizacion)}
                                        </span>
                                        <span className="text-[10px] text-green-600 dark:text-green-500 uppercase font-bold tracking-tighter mt-1">
                                            {row.estado}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-8 py-6 text-right">
                                    <Button 
                                        variant="secondary" 
                                        className="text-[10px] py-2 px-4 uppercase font-bold hover:bg-primary hover:text-white transition-all border border-zinc-200 dark:border-transparent"
                                        onClick={() => toast(t('historyTable.comingSoon'))}
                                    >
                                        {t('historyTable.viewDetails')}
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}