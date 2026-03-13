import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ChartItem {
  name: string;
  value: number;
}

export default function BarChartElement({ title, items }: { title: string, items: ChartItem[] }) {
  return (
    <div className="p-6 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-white/10 shadow-xl w-full">
      <h2 className="text-xl font-semibold mb-6 text-zinc-700 dark:text-zinc-300">
        {title}
      </h2>
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={items} margin={{ top: 5, right: 20, bottom: 5, left: -20 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip 
                cursor={{ fill: 'rgba(255, 137, 4, 0.1)' }}
                contentStyle={{ borderRadius: '10px', backgroundColor: '#27272a', color: '#fff', border: 'none' }}
            />
            <Bar dataKey="value" fill="#FF8904" radius={[4, 4, 0, 0]} maxBarSize={50} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}