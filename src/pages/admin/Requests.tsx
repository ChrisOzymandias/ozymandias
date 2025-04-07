
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Eye, Edit2, Check, Clock, AlertCircle, Phone, Calendar, FilePlus, FileCheck } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

type WebsiteRequest = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company_name: string | null;
  project_details: string;
  theme: string;
  profession: string;
  features: string[] | null;
  status: string;
  quote_sent?: boolean;
  quote_accepted?: boolean;
  followup_date?: string;
  created_at: string;
};

const Requests = () => {
  const [requests, setRequests] = useState<WebsiteRequest[]>([]);
  const [loading, setLoading] = useState(true);
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

  // Définir les constantes pour les statuts possibles et leurs représentations visuelles
  const STATUS_OPTIONS = [
    { value: 'new', label: 'Nouveau', icon: <AlertCircle className="h-4 w-4 text-blue-500" /> },
    { value: 'in_progress', label: 'En cours', icon: <Clock className="h-4 w-4 text-amber-500" /> },
    { value: 'completed', label: 'Complété', icon: <Check className="h-4 w-4 text-green-500" /> }
  ];

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('website_requests')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      // Ajouter des propriétés simulées pour le suivi et les devis
      const enhancedData = data?.map(request => ({
        ...request,
        quote_sent: ['in_progress', 'completed'].includes(request.status),
        quote_accepted: request.status === 'completed',
        followup_date: request.status === 'in_progress' ? 
          new Date(new Date().setDate(new Date().getDate() + 2)).toISOString() : undefined
      }));
      
      setRequests(enhancedData || []);
    } catch (error) {
      console.error('Erreur lors du chargement des demandes:', error);
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
        description: `Le statut a été changé en "${STATUS_OPTIONS.find(opt => opt.value === value)?.label}"`,
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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return (
          <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <AlertCircle className="h-3 w-3 mr-1" />
            Nouveau
          </div>
        );
      case 'in_progress':
        return (
          <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
            <Clock className="h-3 w-3 mr-1" />
            En cours
          </div>
        );
      case 'completed':
        return (
          <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <Check className="h-3 w-3 mr-1" />
            Complété
          </div>
        );
      default:
        return status;
    }
  };

  const renderRequestActions = (request: WebsiteRequest) => {
    return (
      <div className="flex justify-end space-x-1">
        <Button
          size="sm"
          variant="ghost"
          onClick={() => handleViewDetails(request)}
          title="Voir détails"
        >
          <Eye className="h-4 w-4" />
        </Button>
        
        {!request.quote_sent && (
          <Button
            size="sm"
            variant="ghost"
            className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
            onClick={() => handleCreateQuote(request)}
            title="Créer un devis"
          >
            <FilePlus className="h-4 w-4" />
          </Button>
        )}
        
        {request.quote_sent && !request.quote_accepted && (
          <Button
            size="sm"
            variant="ghost"
            className="text-amber-600 hover:text-amber-700 hover:bg-amber-50"
            onClick={() => handleFollowup(request)}
            title="Programmer un suivi"
          >
            <Phone className="h-4 w-4" />
          </Button>
        )}
        
        <Button
          size="sm"
          variant="ghost"
          onClick={() => handleEditRequest(request)}
          title="Modifier le statut"
        >
          <Edit2 className="h-4 w-4" />
        </Button>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Demandes de sites web</h1>
        <Button onClick={fetchRequests} disabled={loading}>
          {loading ? 'Chargement...' : 'Actualiser'}
        </Button>
      </div>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Nom</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Thème</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10">
                  <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-ozy"></div>
                  </div>
                </TableCell>
              </TableRow>
            ) : requests.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10 text-gray-500">
                  Aucune demande trouvée
                </TableCell>
              </TableRow>
            ) : (
              requests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell className="whitespace-nowrap">
                    {formatDate(request.created_at)}
                  </TableCell>
                  <TableCell className="font-medium">{request.name}</TableCell>
                  <TableCell>{request.email}</TableCell>
                  <TableCell>{request.theme}</TableCell>
                  <TableCell>
                    <div className="flex flex-col space-y-1">
                      {getStatusBadge(request.status)}
                      {request.quote_sent && (
                        <span className="text-xs text-gray-500 flex items-center">
                          <FilePlus className="h-3 w-3 mr-1" /> 
                          Devis envoyé
                        </span>
                      )}
                      {request.followup_date && (
                        <span className="text-xs text-gray-500 flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          Suivi: {new Date(request.followup_date).toLocaleDateString('fr-FR')}
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    {renderRequestActions(request)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* Dialogue de détails */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Détails de la demande</DialogTitle>
            <DialogDescription>Demande de {selectedRequest?.name}</DialogDescription>
          </DialogHeader>
          
          {selectedRequest && (
            <div className="space-y-6 mt-4">
              <Tabs defaultValue="details">
                <TabsList className="w-full">
                  <TabsTrigger className="flex-1" value="details">Détails</TabsTrigger>
                  <TabsTrigger className="flex-1" value="suivi">Suivi</TabsTrigger>
                  <TabsTrigger className="flex-1" value="devis">Devis</TabsTrigger>
                </TabsList>
                
                <TabsContent value="details" className="pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-semibold text-gray-500">Informations du client</h3>
                        <div className="bg-gray-50 p-4 rounded-md space-y-2 mt-2">
                          <div>
                            <span className="text-gray-500">Nom:</span>
                            <p className="font-medium">{selectedRequest.name}</p>
                          </div>
                          <div>
                            <span className="text-gray-500">Email:</span>
                            <p className="font-medium">{selectedRequest.email}</p>
                          </div>
                          <div>
                            <span className="text-gray-500">Téléphone:</span>
                            <p className="font-medium">{selectedRequest.phone || 'Non spécifié'}</p>
                          </div>
                          <div>
                            <span className="text-gray-500">Société:</span>
                            <p className="font-medium">{selectedRequest.company_name || 'Non spécifié'}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-semibold text-gray-500">Détails du projet</h3>
                        <div className="bg-gray-50 p-4 rounded-md mt-2">
                          <p>{selectedRequest.project_details}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-semibold text-gray-500">Paramètres du site</h3>
                        <div className="bg-gray-50 p-4 rounded-md space-y-2 mt-2">
                          <div>
                            <span className="text-gray-500">Thème:</span>
                            <p className="font-medium">{selectedRequest.theme}</p>
                          </div>
                          <div>
                            <span className="text-gray-500">Profession:</span>
                            <p className="font-medium">{selectedRequest.profession}</p>
                          </div>
                          <div>
                            <span className="text-gray-500">Fonctionnalités:</span>
                            {selectedRequest.features && selectedRequest.features.length > 0 ? (
                              <ul className="list-disc list-inside pl-2 mt-1">
                                {selectedRequest.features.map((feature, index) => (
                                  <li key={index} className="font-medium">{feature}</li>
                                ))}
                              </ul>
                            ) : (
                              <p className="font-medium">Aucune fonctionnalité spécifiée</p>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-semibold text-gray-500">État de la demande</h3>
                        <div className="bg-gray-50 p-4 rounded-md mt-2 flex flex-col space-y-2">
                          <div className="flex items-center">
                            {getStatusBadge(selectedRequest.status)}
                            <span className="ml-2">
                              Créée le {formatDate(selectedRequest.created_at)}
                            </span>
                          </div>
                          
                          {selectedRequest.quote_sent && (
                            <div className="text-sm flex items-center text-gray-600">
                              <FilePlus className="h-4 w-4 mr-1 text-emerald-600" />
                              <span>Devis envoyé</span>
                              {selectedRequest.quote_accepted && (
                                <span className="ml-1 text-emerald-600 font-medium flex items-center">
                                  <FileCheck className="h-3 w-3 mr-1" /> Accepté
                                </span>
                              )}
                            </div>
                          )}
                          
                          {selectedRequest.followup_date && (
                            <div className="text-sm flex items-center text-gray-600">
                              <Calendar className="h-4 w-4 mr-1 text-amber-600" />
                              <span>Suivi prévu le {new Date(selectedRequest.followup_date).toLocaleDateString('fr-FR')}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="suivi" className="pt-4">
                  {selectedRequest.followup_date ? (
                    <div className="space-y-4">
                      <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
                        <div className="flex items-center text-amber-800">
                          <Calendar className="h-5 w-5 mr-2" />
                          <h3 className="font-medium">Suivi planifié</h3>
                        </div>
                        <p className="mt-2 text-amber-700">
                          Un suivi est prévu pour le {new Date(selectedRequest.followup_date).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="font-medium">Actions</h3>
                        <div className="flex flex-wrap gap-2">
                          <Button size="sm" variant="outline" onClick={() => handleFollowup(selectedRequest)}>
                            <Calendar className="h-4 w-4 mr-2" />
                            Reprogrammer
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleEditRequest(selectedRequest)}>
                            <Edit2 className="h-4 w-4 mr-2" />
                            Changer statut
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Calendar className="h-12 w-12 mx-auto text-gray-400" />
                      <h3 className="mt-2 text-base font-medium">Aucun suivi planifié</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Programmez un suivi pour cette demande.
                      </p>
                      <div className="mt-4">
                        <Button onClick={() => handleFollowup(selectedRequest)}>
                          <Calendar className="h-4 w-4 mr-2" />
                          Programmer un suivi
                        </Button>
                      </div>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="devis" className="pt-4">
                  {selectedRequest.quote_sent ? (
                    <div className="space-y-4">
                      <div className={`bg-${selectedRequest.quote_accepted ? 'emerald' : 'amber'}-50 border border-${selectedRequest.quote_accepted ? 'emerald' : 'amber'}-200 p-4 rounded-lg`}>
                        <div className="flex items-center text-amber-800">
                          <FilePlus className={`h-5 w-5 mr-2 text-${selectedRequest.quote_accepted ? 'emerald' : 'amber'}-800`} />
                          <h3 className="font-medium">
                            {selectedRequest.quote_accepted ? 'Devis accepté' : 'Devis envoyé'}
                          </h3>
                        </div>
                        <p className="mt-2 text-amber-700">
                          {selectedRequest.quote_accepted 
                            ? 'Le client a accepté votre offre et est maintenant abonné.'
                            : 'Un devis a été envoyé au client, en attente de réponse.'}
                        </p>
                      </div>
                      
                      <div className="border rounded-lg p-4">
                        <h3 className="font-medium mb-4">Détails du devis</h3>
                        
                        <div className="space-y-4">
                          <div className="flex justify-between border-b pb-4">
                            <div>
                              <span className="text-gray-600">Création de site web</span>
                              <p className="font-medium">Forfait standard</p>
                            </div>
                            <span className="font-medium">99€</span>
                          </div>
                          
                          <div className="flex justify-between">
                            <div>
                              <span className="text-gray-600">Maintenance mensuelle</span>
                              <p className="font-medium">Service récurrent</p>
                            </div>
                            <span className="font-medium">49€/mois</span>
                          </div>
                        </div>
                      </div>
                      
                      {!selectedRequest.quote_accepted && (
                        <div className="flex justify-end">
                          <Button variant="outline" size="sm" onClick={() => handleStatusChange('completed')}>
                            <FileCheck className="h-4 w-4 mr-2" />
                            Marquer comme accepté
                          </Button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <FilePlus className="h-12 w-12 mx-auto text-gray-400" />
                      <h3 className="mt-2 text-base font-medium">Aucun devis créé</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Créez un devis à envoyer au client.
                      </p>
                      <div className="mt-4">
                        <Button onClick={() => handleCreateQuote(selectedRequest)}>
                          <FilePlus className="h-4 w-4 mr-2" />
                          Créer un devis
                        </Button>
                      </div>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Dialogue de modification du statut */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Modifier le statut</DialogTitle>
            <DialogDescription>
              Modifier le statut de la demande de {selectedRequest?.name}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Statut</label>
              <Select value={currentStatus} onValueChange={handleStatusChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un statut" />
                </SelectTrigger>
                <SelectContent>
                  {STATUS_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex items-center">
                        {option.icon}
                        <span className="ml-2">{option.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Dialogue de programmation de suivi */}
      <Dialog open={isFollowupOpen} onOpenChange={setIsFollowupOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Programmer un suivi</DialogTitle>
            <DialogDescription>
              Planifiez un suivi pour la demande de {selectedRequest?.name}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="followup-date">Date de suivi</Label>
              <Input 
                id="followup-date" 
                type="date" 
                value={followupDate}
                onChange={(e) => setFollowupDate(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="followup-notes">Notes (optionnel)</Label>
              <Textarea 
                id="followup-notes" 
                placeholder="Notez ici des informations importantes pour le suivi..."
                value={followupNotes}
                onChange={(e) => setFollowupNotes(e.target.value)}
              />
            </div>
            
            <Button className="w-full" onClick={handleSaveFollowup}>
              <Calendar className="h-4 w-4 mr-2" />
              Programmer le suivi
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Dialogue de création de devis */}
      <Dialog open={isQuoteOpen} onOpenChange={setIsQuoteOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Créer un devis</DialogTitle>
            <DialogDescription>
              Créez un devis pour la demande de {selectedRequest?.name}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="border rounded-lg p-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="creation-price">Prix de création (€)</Label>
                <Input 
                  id="creation-price" 
                  type="number" 
                  value={quoteAmount}
                  onChange={(e) => setQuoteAmount(e.target.value)}
                />
                <p className="text-xs text-gray-500">Prix unique de création du site</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="recurring-price">Prix de maintenance (€/mois)</Label>
                <Input 
                  id="recurring-price" 
                  type="number" 
                  value={recurringAmount}
                  onChange={(e) => setRecurringAmount(e.target.value)}
                />
                <p className="text-xs text-gray-500">Prix récurrent mensuel</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="quote-notes">Notes sur le devis (optionnel)</Label>
              <Textarea 
                id="quote-notes" 
                placeholder="Détails supplémentaires pour le devis..."
                value={quoteNotes}
                onChange={(e) => setQuoteNotes(e.target.value)}
              />
            </div>
            
            <Button className="w-full" onClick={handleSendQuote}>
              <FilePlus className="h-4 w-4 mr-2" />
              Envoyer le devis
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Requests;
