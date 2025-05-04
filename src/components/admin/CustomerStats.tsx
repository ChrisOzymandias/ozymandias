
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface CustomerStatsProps {
  totalRequests: number;
  completedRequests: number;
}

const CustomerStats = ({ totalRequests, completedRequests }: CustomerStatsProps) => {
  const inProgressRequests = totalRequests - completedRequests;
  
  // Calcul du taux de conversion
  const conversionRate = totalRequests > 0 
    ? Math.round((completedRequests / totalRequests) * 100) 
    : 0;
  
  // Données pour le graphique
  const data = [
    { name: 'Convertis', value: Math.max(1, completedRequests) },
    { name: 'Non convertis', value: Math.max(1, inProgressRequests) }
  ];
  
  const COLORS = ['#4ade80', '#93c5fd'];

  // Projections de revenus
  const projectionMonthly = Math.max(1, completedRequests) * 49;
  const projectionYearly = projectionMonthly * 12;

  return (
    <div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value) => [`${value} demandes`, '']}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-500">Taux de conversion</p>
          <p className="text-2xl font-bold">{conversionRate}%</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-500">Rev. mensuel récurrent</p>
          <p className="text-2xl font-bold">{projectionMonthly}€</p>
        </div>
      </div>
    </div>
  );
};

export default CustomerStats;
