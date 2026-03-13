import HistoryTable from "../components/common/HistoryTable";
import { useTranslation } from "react-i18next";

export default function History() {
    const { t } = useTranslation();

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex justify-between items-end border-b border-white/10 pb-4">
                <div>
                    <h1 className="text-3xl font-bold text-primary uppercase tracking-wider">
                        {t('history.title')}
                    </h1>
                    <p className="text-text-muted mt-1 font-open-sans">
                        {t('history.subtitle')}
                    </p>
                </div>
            </div>

            <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                <HistoryTable />
            </section>
        </div>
    );
}