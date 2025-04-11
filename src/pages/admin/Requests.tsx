
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { WebsiteRequest } from '@/types/requests';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import RequestsTable from '@/components/admin/requests/RequestsTable';
import RequestDetailsDialog from '@/components/admin/requests/RequestDetailsDialog';
import RequestStatusDialog from '@/components/admin/requests/RequestStatusDialog';
import RequestFollowupDialog from '@/components/admin/requests/RequestFollowupDialog';
import RequestQuoteDialog from '@/components/admin/requests/RequestQuoteDialog';

const Requests = () => {
  const [requests, setRequests] = useState<WebsiteRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRequest, setSelectedRequest] = useState<WebsiteRequest | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isFollowupOpen, setIsFollowupOpen] = useState(false);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [currentStatus, setCurrentStatus] = useState('');
  const [followupDate, setFollowupDate] = useState('');
  const [followupNotes, setFollowupNotes] = useState('');
  const [quoteAmount, setQuoteAmount] = useState('99');
  const [recurringAmount, setRecurringAmount] = useState('49');
  const [quoteNotes, setQuoteNotes] = useState('');

  useEffect(() => {
    fetchRequests();
  }, []);

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
        console.error('Erreur détaillée:', error);
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

  const handleStatusChange = async (value: string) => {
    if (!selectedRequest) return;
    
    setCurrentStatus(value);
    
    try {
      const { error } = await supabase
        .from('website_requests')
        .update({ status: value })
        .eq('id', selectedRequest.id);
      
      if (error) throw error;
      
      // Mettre à jour la liste des demandes
      setRequests(requests.map(request => 
        request.id === selectedRequest.id 
          ? { 
              ...request, 
              status: value,
              quote_sent: ['in_progress', 'completed'].includes(value),
              quote_accepted: value === 'completed'
            } 
          : request
      ));
      
      toast({
        title: 'Statut mis à jour',
        description: `Le statut a été changé en "${value === 'new' ? 'Nouveau' : value === 'in_progress' ? 'En cours' : 'Complété'}"`,
      });
      
      setIsEditOpen(false);
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut:', error);
      toast({
        title: 'Erreur',
        description: 'Une erreur est survenue lors de la mise à jour du statut.',
        variant: 'destructive',
      });
    }
  };

  const handleSaveFollowup = () => {
    if (!selectedRequest) return;
    
    // Simuler la sauvegarde du suivi
    setRequests(requests.map(request => 
      request.id === selectedRequest.id 
        ? { ...request, followup_date: new Date(followupDate).toISOString() } 
        : request
    ));
    
    toast({
      title: 'Suivi programmé',
      description: `Un rappel a été programmé pour le ${new Date(followupDate).toLocaleDateString('fr-FR')}`
    });
    
    setIsFollowupOpen(false);
  };

  const handleSendQuote = () => {
    if (!selectedRequest) return;
    
    // Simuler l'envoi du devis et mettre à jour le statut
    setRequests(requests.map(request => 
      request.id === selectedRequest.id 
        ? { 
            ...request, 
            status: 'in_progress', 
            quote_sent: true,
            followup_date: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString()
          } 
        : request
    ));
    
    toast({
      title: 'Devis envoyé',
      description: `Le devis a été envoyé à ${selectedRequest.email}`
    });
    
    setIsQuoteOpen(false);
  };

  const handleViewDetails = (request: WebsiteRequest) => {
    setSelectedRequest(request);
    setIsDetailsOpen(true);
  };

  const handleEditRequest = (request: WebsiteRequest) => {
    setSelectedRequest(request);
    setCurrentStatus(request.status);
    setIsEditOpen(true);
  };

  const handleFollowup = (request: WebsiteRequest) => {
    setSelectedRequest(request);
    // Définir une date par défaut (dans 2 jours)
    const defaultDate = new Date();
    defaultDate.setDate(defaultDate.getDate() + 2);
    setFollowupDate(defaultDate.toISOString().split('T')[0]);
    setFollowupNotes('');
    setIsFollowupOpen(true);
  };

  const handleCreateQuote = (request: WebsiteRequest) => {
    setSelectedRequest(request);
    setQuoteAmount('99');
    setRecurringAmount('49');
    setQuoteNotes('');
    setIsQuoteOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Demandes de sites web</h1>
        <Button onClick={fetchRequests} disabled={loading}>
          {loading ? 'Chargement...' : 'Actualiser'}
        </Button>
      </div>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          {error}
        </div>
      )}
      
      <RequestsTable 
        requests={requests}
        loading={loading}
        onViewDetails={handleViewDetails}
        onEditRequest={handleEditRequest}
        onFollowup={handleFollowup}
        onCreateQuote={handleCreateQuote}
      />
      
      {/* Dialogues */}
      <RequestDetailsDialog
        selectedRequest={selectedRequest}
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        onEditRequest={handleEditRequest}
        onFollowup={handleFollowup}
        onCreateQuote={handleCreateQuote}
      />
      
      <RequestStatusDialog
        selectedRequest={selectedRequest}
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onStatusChange={handleStatusChange}
        currentStatus={currentStatus}
      />
      
      <RequestFollowupDialog
        selectedRequest={selectedRequest}
        isOpen={isFollowupOpen}
        onClose={() => setIsFollowupOpen(false)}
        onSave={handleSaveFollowup}
        followupDate={followupDate}
        setFollowupDate={setFollowupDate}
        followupNotes={followupNotes}
        setFollowupNotes={setFollowupNotes}
      />
      
      <RequestQuoteDialog
        selectedRequest={selectedRequest}
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        onSave={handleSendQuote}
        quoteAmount={quoteAmount}
        setQuoteAmount={setQuoteAmount}
        recurringAmount={recurringAmount}
        setRecurringAmount={setRecurringAmount}
        quoteNotes={quoteNotes}
        setQuoteNotes={setQuoteNotes}
      />
    </div>
  );
};

export default Requests;
