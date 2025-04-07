
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface RevenueChartProps {
  completedRequests: number;
}

const RevenueChart = ({ completedRequests }: RevenueChartProps) => {
  // Simuler les revenus sur 6 mois
  const currentMonth = new Date().getMonth();
  const months = ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc"];
  
  // Générer des données avec une distribution normale autour du nombre actuel
  const generateMonthlyData = () => {
    const data = [];
    const baseRevenue = completedRequests * 49; // Maintenance mensuelle
    
    for (let i = 5; i >= 0; i--) {
      const monthIndex = (currentMonth - i + 12) % 12;
      // Simuler une croissance progressive
      const factor = Math.max(0.5, (5 - i) / 5);
      const monthlyRevenue = Math.round(baseRevenue * factor);
      
      data.push({
        name: months[monthIndex],
        revenue: monthlyRevenue,
        creation: i === 0 ? completedRequests * 99 : Math.round(completedRequests * 99 * (factor - 0.1))
      });
    }
    
    return data;
  };

  const data = generateMonthlyData();

  return (
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip formatter={(value) => [`${value} €`, '']} />
          <Bar name="Création de site" dataKey="creation" fill="#8884d8" />
          <Bar name="Maintenance" dataKey="revenue" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
      <div className="flex justify-center mt-4 text-sm text-gray-500">
        <div className="flex items-center mr-4">
          <div className="w-3 h-3 bg-[#8884d8] rounded-full mr-1"></div>
          <span>Création de site (99€)</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-[#82ca9d] rounded-full mr-1"></div>
          <span>Maintenance (49€/mois)</span>
        </div>
      </div>
    </div>
  );
};

export default RevenueChart;
