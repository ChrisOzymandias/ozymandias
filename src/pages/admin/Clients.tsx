
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User, Phone, Mail, Building, Calendar, CreditCard } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';
import { Separator } from '@/components/ui/separator';
import ClientDetailsModal from '@/components/admin/ClientDetailsModal';

interface Client {
  name: string;
  email: string;
  phone: string | null;
  company_name: string | null;
  count: number;
  status?: string;
  revenue?: number;
  subscription?: boolean;
  notes?: string;
}

const Clients = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);

  useEffect(() => {
    const fetchClients = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('website_requests')
          .select('name, email, phone, company_name, status')
          .order('name');
        
        if (error) throw error;
        
        // Agréger les données par email pour éviter les doublons
        const uniqueClients = data?.reduce((acc: Client[], current) => {
          const existingClientIndex = acc.findIndex(client => client.email === current.email);
          
          if (existingClientIndex === -1) {
            acc.push({
              name: current.name,
              email: current.email,
              phone: current.phone,
              company_name: current.company_name,
              count: 1,
              status: current.status,
              revenue: current.status === 'completed' ? 99 + 49 : 0,
              subscription: current.status === 'completed',
              notes: ''
            });
          } else {
            acc[existingClientIndex].count += 1;
            // Si au moins une demande est complétée, considérer le client comme abonné
            if (current.status === 'completed') {
              acc[existingClientIndex].subscription = true;
              acc[existingClientIndex].revenue = (acc[existingClientIndex].revenue || 0) + 99 + 49;
            }
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

  const handleClientClick = (client: Client) => {
    setSelectedClient(client);
    setIsClientModalOpen(true);
  };

  const getStatusBadge = (status: string | undefined) => {
    if (!status) return null;
    
    switch (status) {
      case 'new':
        return <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">Nouveau</span>;
      case 'in_progress':
        return <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-xs">En cours</span>;
      case 'completed':
        return <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Client</span>;
      default:
        return null;
    }
  };

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
                <Card 
                  key={index} 
                  className="p-6 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handleClientClick(client)}
                >
                  <div className="flex items-start">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                      {client.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium">{client.name}</h3>
                        {getStatusBadge(client.status)}
                      </div>
                      <p className="text-gray-500 text-sm">{client.email}</p>
                      
                      {client.company_name && (
                        <p className="text-gray-700 mt-1 flex items-center">
                          <Building className="h-3.5 w-3.5 mr-1" />
                          {client.company_name}
                        </p>
                      )}
                      
                      {client.phone && (
                        <p className="text-gray-700 mt-1 flex items-center">
                          <Phone className="h-3.5 w-3.5 mr-1" />
                          {client.phone}
                        </p>
                      )}
                      
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {client.count} {client.count > 1 ? 'demandes' : 'demande'}
                          </span>
                        </div>
                        
                        {client.subscription && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                            <CreditCard className="h-3 w-3 mr-1" />
                            Abonné
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </>
      )}
      
      {/* Modal de détails client */}
      <ClientDetailsModal 
        client={selectedClient}
        isOpen={isClientModalOpen}
        onClose={() => setIsClientModalOpen(false)}
      />
    </div>
  );
};

export default Clients;
