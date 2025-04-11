import { Card } from '@/components/ui/card';
import { FileText, User, Clock, DollarSign, Users, BarChart2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import RevenueChart from '@/components/admin/RevenueChart';
import CustomerStats from '@/components/admin/CustomerStats';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalRequests: 0,
    newRequests: 0,
    inProgressRequests: 0,
    completedRequests: 0,
    totalClients: 0,
    estimatedRevenue: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        console.log("Tentative de récupération des statistiques...");
        
        // Récupérer toutes les demandes
        const { data: allRequests, error: allRequestsError } = await supabase
          .from('website_requests')
          .select('status');
        
        if (allRequestsError) {
          console.error("Erreur lors de la récupération des demandes:", allRequestsError);
          throw allRequestsError;
        }
        
        console.log("Demandes récupérées pour les stats:", allRequests);
        
        // Récupérer les clients uniques (par email)
        const { data: clients, error: clientsError } = await supabase
          .from('website_requests')
          .select('email');
        
        if (clientsError) {
          console.error("Erreur lors de la récupération des clients:", clientsError);
          throw clientsError;
        }
        
        // Calcul des clients uniques
        const uniqueEmails = clients?.map(c => c.email) || [];
        const uniqueClients = new Set(uniqueEmails).size;
        
        // Calculer les statistiques
        const totalRequests = allRequests?.length || 0;
        const newRequests = allRequests?.filter(req => req.status === 'new').length || 0;
        const inProgressRequests = allRequests?.filter(req => req.status === 'in_progress').length || 0;
        const completedRequests = allRequests?.filter(req => req.status === 'completed').length || 0;
        
        // Estimation des revenus basée sur les demandes complétées
        // Hypothèse: 99€ de création + 49€/mois de maintenance
        const initialRevenue = completedRequests * 99;
        const recurringRevenue = completedRequests * 49;
        
        setStats({
          totalRequests,
          newRequests,
          inProgressRequests,
          completedRequests,
          totalClients: uniqueClients,
          estimatedRevenue: initialRevenue + recurringRevenue
        });
        
        console.log("Statistiques calculées avec succès");
      } catch (error) {
        console.error('Erreur lors du chargement des statistiques:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchStats();
  }, []);

  const statCards = [
    {
      title: 'Demandes Totales',
      value: stats.totalRequests,
      icon: <FileText className="h-8 w-8 text-blue-500" />,
      color: 'bg-blue-100'
    },
    {
      title: 'Nouvelles Demandes',
      value: stats.newRequests,
      icon: <User className="h-8 w-8 text-green-500" />,
      color: 'bg-green-100'
    },
    {
      title: 'En Cours',
      value: stats.inProgressRequests,
      icon: <Clock className="h-8 w-8 text-amber-500" />,
      color: 'bg-amber-100'
    },
    {
      title: 'Clients',
      value: stats.totalClients,
      icon: <Users className="h-8 w-8 text-indigo-500" />,
      color: 'bg-indigo-100'
    },
    {
      title: 'Complétées',
      value: stats.completedRequests,
      icon: <FileText className="h-8 w-8 text-purple-500" />,
      color: 'bg-purple-100'
    },
    {
      title: 'Revenu Estimé',
      value: `${stats.estimatedRevenue}€`,
      icon: <DollarSign className="h-8 w-8 text-emerald-500" />,
      color: 'bg-emerald-100'
    }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          Array(6).fill(0).map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 animate-pulse rounded-lg"></div>
          ))
        ) : (
          [
            {
              title: 'Demandes Totales',
              value: stats.totalRequests,
              icon: <FileText className="h-8 w-8 text-blue-500" />,
              color: 'bg-blue-100'
            },
            {
              title: 'Nouvelles Demandes',
              value: stats.newRequests,
              icon: <User className="h-8 w-8 text-green-500" />,
              color: 'bg-green-100'
            },
            {
              title: 'En Cours',
              value: stats.inProgressRequests,
              icon: <Clock className="h-8 w-8 text-amber-500" />,
              color: 'bg-amber-100'
            },
            {
              title: 'Clients',
              value: stats.totalClients,
              icon: <Users className="h-8 w-8 text-indigo-500" />,
              color: 'bg-indigo-100'
            },
            {
              title: 'Complétées',
              value: stats.completedRequests,
              icon: <FileText className="h-8 w-8 text-purple-500" />,
              color: 'bg-purple-100'
            },
            {
              title: 'Revenu Estimé',
              value: `${stats.estimatedRevenue}€`,
              icon: <DollarSign className="h-8 w-8 text-emerald-500" />,
              color: 'bg-emerald-100'
            }
          ].map((stat, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-500 font-medium">{stat.title}</p>
                  <p className="text-3xl font-bold mt-2">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.color}`}>
                  {stat.icon}
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Revenus Mensuels</h3>
          <RevenueChart completedRequests={stats.completedRequests} />
        </Card>
        
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Conversion Clients</h3>
          <CustomerStats 
            totalRequests={stats.totalRequests}
            completedRequests={stats.completedRequests}
          />
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
