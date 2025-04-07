
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Eye, Edit2, Check, Clock, AlertCircle } from 'lucide-react';
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
  created_at: string;
};

const Requests = () => {
  const [requests, setRequests] = useState<WebsiteRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<WebsiteRequest | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [currentStatus, setCurrentStatus] = useState('');

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
      setRequests(data || []);
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
          ? { ...request, status: value } 
          : request
      ));
      
      toast({
        title: 'Statut mis à jour',
        description: `Le statut a été changé en "${STATUS_OPTIONS.find(opt => opt.value === value)?.label}"`,
      });
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut:', error);
      toast({
        title: 'Erreur',
        description: 'Une erreur est survenue lors de la mise à jour du statut.',
        variant: 'destructive',
      });
    }
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
                  <TableCell>{request.name}</TableCell>
                  <TableCell>{request.email}</TableCell>
                  <TableCell>{request.theme}</TableCell>
                  <TableCell>{getStatusBadge(request.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleViewDetails(request)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleEditRequest(request)}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                    </div>
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
                    <div className="bg-gray-50 p-4 rounded-md mt-2 flex items-center">
                      {getStatusBadge(selectedRequest.status)}
                      <span className="ml-2">
                        Créée le {formatDate(selectedRequest.created_at)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
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
    </div>
  );
};

export default Requests;
