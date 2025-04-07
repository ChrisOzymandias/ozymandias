
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User } from 'lucide-react';
import { Card } from '@/components/ui/card';

const Clients = () => {
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClients = async () => {
      setLoading(true);
      try {
        // Pour l'instant, on récupère simplement les demandes comme source des clients
        // Dans une vraie application, vous auriez probablement une table clients séparée
        const { data, error } = await supabase
          .from('website_requests')
          .select('name, email, company_name')
          // Grouper par email pour éviter les doublons
          .order('name');
        
        if (error) throw error;
        
        // Agréger les données par email pour éviter les doublons
        const uniqueClients = data?.reduce((acc: any[], current) => {
          const existingClientIndex = acc.findIndex(client => client.email === current.email);
          
          if (existingClientIndex === -1) {
            acc.push({
              name: current.name,
              email: current.email,
              company_name: current.company_name,
              count: 1
            });
          } else {
            acc[existingClientIndex].count += 1;
          }
          
          return acc;
        }, []) || [];
        
        setClients(uniqueClients);
      } catch (error) {
        console.error('Erreur lors du chargement des clients:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchClients();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Liste des clients</h1>
      
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(6).fill(0).map((_, i) => (
            <div key={i} className="h-40 bg-gray-200 animate-pulse rounded-lg"></div>
          ))}
        </div>
      ) : (
        <>
          {clients.length === 0 ? (
            <div className="text-center py-10">
              <User className="h-12 w-12 mx-auto text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">Aucun client</h3>
              <p className="mt-1 text-sm text-gray-500">
                Vous n'avez pas encore de clients enregistrés.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {clients.map((client, index) => (
                <Card key={index} className="p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                      {client.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium">{client.name}</h3>
                      <p className="text-gray-500 text-sm">{client.email}</p>
                      {client.company_name && (
                        <p className="text-gray-700 mt-1">{client.company_name}</p>
                      )}
                      <div className="mt-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {client.count} {client.count > 1 ? 'demandes' : 'demande'}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Clients;
