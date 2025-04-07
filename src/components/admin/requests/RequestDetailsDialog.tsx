
import { useState } from 'react';
import { WebsiteRequest } from '@/types/requests';
import { Calendar, FilePlus, FileCheck, Edit2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getStatusBadge } from '@/components/admin/requests/requestUtils';

interface RequestDetailsDialogProps {
  selectedRequest: WebsiteRequest | null;
  isOpen: boolean;
  onClose: () => void;
  onEditRequest: (request: WebsiteRequest) => void;
  onFollowup: (request: WebsiteRequest) => void;
  onCreateQuote: (request: WebsiteRequest) => void;
}

const RequestDetailsDialog = ({
  selectedRequest,
  isOpen,
  onClose,
  onEditRequest,
  onFollowup,
  onCreateQuote
}: RequestDetailsDialogProps) => {
  if (!selectedRequest) return null;

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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Détails de la demande</DialogTitle>
          <DialogDescription>Demande de {selectedRequest?.name}</DialogDescription>
        </DialogHeader>
        
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
                      <Button size="sm" variant="outline" onClick={() => onFollowup(selectedRequest)}>
                        <Calendar className="h-4 w-4 mr-2" />
                        Reprogrammer
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => onEditRequest(selectedRequest)}>
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
                    <Button onClick={() => onFollowup(selectedRequest)}>
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
                      <Button variant="outline" size="sm" onClick={() => onEditRequest(selectedRequest)}>
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
                    <Button onClick={() => onCreateQuote(selectedRequest)}>
                      <FilePlus className="h-4 w-4 mr-2" />
                      Créer un devis
                    </Button>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RequestDetailsDialog;
