
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { WebsiteRequest } from '@/types/requests';
import { toast } from '@/components/ui/use-toast';

export const useRequestsData = () => {
  const [requests, setRequests] = useState<WebsiteRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const fetchRequests = async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log("Tentative de récupération des demandes...");
      
      const { data, error } = await supabase
        .from('website_requests')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Erreur détaillée lors de la récupération des demandes:', error);
        setError(`Erreur: ${error.message}`);
        throw error;
      }
      
      console.log("Demandes récupérées:", data);
      
      // Ajouter des propriétés simulées pour le suivi et les devis
      const enhancedData = data?.map(request => ({
        ...request,
        quote_sent: ['in_progress', 'completed'].includes(request.status),
        quote_accepted: request.status === 'completed',
        followup_date: request.status === 'in_progress' ? 
          new Date(new Date().setDate(new Date().getDate() + 2)).toISOString() : undefined
      }));
      
      setRequests(enhancedData || []);
    } catch (error: any) {
      console.error('Erreur lors du chargement des demandes:', error);
      setError(`Erreur: ${error.message || 'Une erreur est survenue'}`);
      toast({
        title: 'Erreur',
        description: 'Une erreur est survenue lors du chargement des demandes.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };
  
  const updateRequestStatus = async (requestId: string, status: string): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('website_requests')
        .update({ status })
        .eq('id', requestId);
      
      if (error) {
        console.error('Erreur lors de la mise à jour du statut:', error);
        toast({
          title: 'Erreur',
          description: `Échec de la mise à jour: ${error.message}`,
          variant: 'destructive',
        });
        return false;
      }
      
      // Mettre à jour la liste des demandes
      setRequests(requests.map(request => 
        request.id === requestId 
          ? { 
              ...request, 
              status,
              quote_sent: ['in_progress', 'completed'].includes(status),
              quote_accepted: status === 'completed'
            } 
          : request
      ));
      
      return true;
    } catch (error) {
      console.error('Exception lors de la mise à jour du statut:', error);
      return false;
    }
  };

  const deleteRequest = async (requestId: string): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('website_requests')
        .delete()
        .eq('id', requestId);
      
      if (error) {
        console.error('Erreur lors de la suppression de la demande:', error);
        toast({
          title: 'Erreur',
          description: `Échec de la suppression: ${error.message}`,
          variant: 'destructive',
        });
        return false;
      }
      
      // Mettre à jour la liste des demandes
      setRequests(requests.filter(request => request.id !== requestId));
      
      return true;
    } catch (error) {
      console.error('Exception lors de la suppression de la demande:', error);
      return false;
    }
  };
  
  useEffect(() => {
    fetchRequests();
  }, []);
  
  return {
    requests,
    loading,
    error,
    fetchRequests,
    updateRequestStatus,
    deleteRequest
  };
};
