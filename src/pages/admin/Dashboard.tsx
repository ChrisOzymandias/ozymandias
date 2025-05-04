
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { WebsiteRequest } from '@/types/requests';
import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { useIncomingWebhook } from '@/hooks/use-webhook';

// URL du webhook - maintenant utilisation de la même URL pour tout
const WEBHOOK_URL = 'https://hook.eu2.make.com/siguy1hwro8e64oo0v8r4wv89vkv3npu';

const Dashboard = () => {
  const [requests, setRequests] = useState<WebsiteRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [webhookUrl, setWebhookUrl] = useState<string>(WEBHOOK_URL || '');
  
  // Utiliser notre hook personnalisé pour le webhook entrant
  const { receiveFromWebhook, isLoading: isLoadingFromWebhook } = useIncomingWebhook({
    onSuccess: (data) => {
      if (Array.isArray(data)) {
        setRequests(data);
      } else {
        console.error("Les données reçues du webhook ne sont pas un tableau:", data);
      }
    },
    onError: (error) => {
      setError(error.message);
    }
  });

  // Fetch all website requests
  const fetchRequests = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Si un webhook URL est défini, essayer de récupérer les données depuis le webhook
      if (webhookUrl) {
        const webhookData = await receiveFromWebhook(webhookUrl);
        if (webhookData) {
          setLoading(false);
          return; // Les données ont été définies dans le hook
        }
      }
      
      // Fallback: récupérer les données depuis Supabase si le webhook échoue
      console.log("Récupération des demandes depuis Supabase...");
      const { data, error: fetchError } = await supabase
        .from('website_requests')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (fetchError) throw fetchError;
      
      setRequests(data || []);
    } catch (err: any) {
      console.error('Erreur lors de la récupération des demandes:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Listen for real-time updates
  useEffect(() => {
    fetchRequests();

    // Subscribe to changes
    const channel = supabase
      .channel('website_requests_changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'website_requests' }, 
        (payload) => {
          console.log('Changement détecté:', payload);
          fetchRequests();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Update request status
  const updateRequestStatus = async (id: string, status: string) => {
    try {
      const { error: updateError } = await supabase
        .from('website_requests')
        .update({ status })
        .eq('id', id);
      
      if (updateError) throw updateError;
      
      // Update local state
      setRequests(requests.map(req => 
        req.id === id ? { ...req, status } : req
      ));
      
      toast({
        title: "Succès",
        description: "Statut mis à jour avec succès",
      });
    } catch (err: any) {
      console.error('Erreur lors de la mise à jour du statut:', err);
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le statut",
        variant: "destructive"
      });
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Demandes de site web</h1>
        <div className="flex space-x-2">
          <Input 
            placeholder="URL du webhook de données" 
            value={webhookUrl} 
            onChange={(e) => setWebhookUrl(e.target.value)} 
            className="w-80"
          />
          <Button 
            onClick={fetchRequests}
            disabled={loading || isLoadingFromWebhook}
          >
            {(loading || isLoadingFromWebhook) ? 'Chargement...' : 'Actualiser'}
          </Button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md">
          {error}
        </div>
      )}

      <Card>
        {loading || isLoadingFromWebhook ? (
          <div className="flex justify-center items-center p-12">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : requests.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            Aucune demande trouvée
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Nom</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Téléphone</TableHead>
                  <TableHead>Type de site</TableHead>
                  <TableHead>Profession</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Montant (€)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="whitespace-nowrap">
                      {formatDate(request.created_at)}
                    </TableCell>
                    <TableCell>{request.name}</TableCell>
                    <TableCell>{request.email}</TableCell>
                    <TableCell>{request.phone || '-'}</TableCell>
                    <TableCell>{request.theme}</TableCell>
                    <TableCell>{request.profession}</TableCell>
                    <TableCell>
                      <Select 
                        value={request.status} 
                        onValueChange={(value) => updateRequestStatus(request.id, value)}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="Statut" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">Nouveau</SelectItem>
                          <SelectItem value="contacted">Contacté</SelectItem>
                          <SelectItem value="quote_sent">Devis envoyé</SelectItem>
                          <SelectItem value="quote_accepted">Devis accepté</SelectItem>
                          <SelectItem value="in_progress">En cours</SelectItem>
                          <SelectItem value="completed">Terminé</SelectItem>
                          <SelectItem value="lost">Perdu</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        className="w-24"
                        placeholder="€"
                        value={request.quote_amount || ''}
                        onChange={async (e) => {
                          const amount = e.target.value ? parseInt(e.target.value) : null;
                          try {
                            await supabase
                              .from('website_requests')
                              .update({ quote_amount: amount })
                              .eq('id', request.id);
                            
                            // Update local state
                            setRequests(requests.map(req => 
                              req.id === request.id ? { ...req, quote_amount: amount } : req
                            ));
                          } catch (err) {
                            console.error('Erreur lors de la mise à jour du montant:', err);
                          }
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Dashboard;
