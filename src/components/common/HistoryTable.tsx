import Button from "../ui/Button";

interface RoutineEntry {
  id: number;
  name: string;
  date: string;
}

const historyData: RoutineEntry[] = [
  { id: 1, name: "Push Day - Pecho y Tríceps", date: "12 Feb 2024" },
  { id: 2, name: "Leg Day - Cuádriceps", date: "10 Feb 2024" },
  { id: 3, name: "Pull Day - Espalda", date: "08 Feb 2024" },
  { id: 4, name: "Full Body Express", date: "05 Feb 2024" },
];

export default function HistoryTable() {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm shadow-xl">
      <table className="w-full text-left border-separate border-spacing-0">
        <thead>
          <tr className="bg-zinc-800/40 text-zinc-400">
            <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest border-b border-zinc-800">Nombre de la Rutina</th>
            <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest border-b border-zinc-800">Fecha de realización</th>
            <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest border-b border-zinc-800 text-right">Acción</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-800">
          {historyData.map((row) => (
            <tr key={row.id} className="hover:bg-zinc-800/30 transition-all duration-200 group">
              <td className="px-8 py-6">
                <span className="font-bold text-zinc-100 group-hover:text-primary transition-colors duration-300 text-lg">
                  {row.name}
                </span>
              </td>
              <td className="px-8 py-6">
                <div className="flex flex-col">
                  <span className="text-zinc-300 font-medium">{row.date}</span>
                  <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-tighter">Finalizado con éxito</span>
                </div>
              </td>
              <td className="px-8 py-6 text-right">
                <Button variant="secondary" className="text-[10px] py-2 px-4 uppercase font-bold hover:bg-primary hover:text-white transition-all">
                  Ver detalles
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}