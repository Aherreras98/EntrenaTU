import HistoryTable from "../components/common/HistoryTable";
export default function History() {

    return (
        <div>
            <h1>History</h1>

            <p className="text-zinc-400 mt-2 font-open-sans">
            Consulta tus entrenamientos pasados y analiza tu rendimiento.
          </p>

         <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <HistoryTable />
        </section>
        </div>
    );
}