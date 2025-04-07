
import { Card } from '@/components/ui/card';
import { FileText, User, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalRequests: 0,
    newRequests: 0,
    inProgressRequests: 0,
    completedRequests: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        // Récupérer toutes les demandes
        const { data: allRequests, error: allRequestsError } = await supabase
          .from('website_requests')
          .select('status');
        
        if (allRequestsError) throw allRequestsError;
        
        // Calculer les statistiques
        const totalRequests = allRequests?.length || 0;
        const newRequests = allRequests?.filter(req => req.status === 'new').length || 0;
        const inProgressRequests = allRequests?.filter(req => req.status === 'in_progress').length || 0;
        const completedRequests = allRequests?.filter(req => req.status === 'completed').length || 0;
        
        setStats({
          totalRequests,
          newRequests,
          inProgressRequests,
          completedRequests
        });
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
      title: 'Complétées',
      value: stats.completedRequests,
      icon: <FileText className="h-8 w-8 text-purple-500" />,
      color: 'bg-purple-100'
    }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading ? (
          Array(4).fill(0).map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 animate-pulse rounded-lg"></div>
          ))
        ) : (
          statCards.map((stat, index) => (
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
        {/* Graphiques et autres widgets à ajouter au besoin */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Demandes récentes</h3>
          {/* Contenu à ajouter */}
          <p className="text-gray-500">Vous pourriez afficher ici les demandes les plus récentes.</p>
        </Card>
        
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Activité récente</h3>
          {/* Contenu à ajouter */}
          <p className="text-gray-500">Vous pourriez afficher ici l'activité récente.</p>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
