
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { Phone, Mail, Building, Calendar, CreditCard, FileText, Users } from 'lucide-react';

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

interface ClientDetailsModalProps {
  client: Client | null;
  isOpen: boolean;
  onClose: () => void;
}

const ClientDetailsModal = ({ client, isOpen, onClose }: ClientDetailsModalProps) => {
  const [notes, setNotes] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  
  if (!client) return null;
  
  const handleSaveNotes = () => {
    setIsSaving(true);
    
    // Simuler une sauvegarde
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: "Notes enregistrées",
        description: "Les notes du client ont été mises à jour avec succès."
      });
    }, 500);
  };
  
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };
  
  const currentDate = new Date();
  const nextMonthDate = new Date();
  nextMonthDate.setMonth(currentDate.getMonth() + 1);
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Détails du client</DialogTitle>
        </DialogHeader>
        
        <div className="mt-4">
          <div className="flex items-center mb-6">
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium text-lg">
              {client.name.charAt(0).toUpperCase()}
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-semibold">{client.name}</h2>
              <div className="flex items-center text-gray-500">
                <Mail className="h-4 w-4 mr-1" />
                {client.email}
              </div>
            </div>
            
            {client.subscription && (
              <div className="ml-auto">
                <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm flex items-center">
                  <CreditCard className="h-4 w-4 mr-1.5" />
                  Client abonné
                </span>
              </div>
            )}
          </div>
          
          <Tabs defaultValue="informations">
            <TabsList className="w-full">
              <TabsTrigger className="flex-1" value="informations">Informations</TabsTrigger>
              <TabsTrigger className="flex-1" value="facturation">Facturation</TabsTrigger>
              <TabsTrigger className="flex-1" value="notes">Notes</TabsTrigger>
            </TabsList>
            
            <TabsContent value="informations" className="pt-4">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Nom</Label>
                    <div className="p-2 bg-gray-50 rounded">{client.name}</div>
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <div className="p-2 bg-gray-50 rounded">{client.email}</div>
                  </div>
                  <div className="space-y-2">
                    <Label>Téléphone</Label>
                    <div className="p-2 bg-gray-50 rounded">{client.phone || "Non spécifié"}</div>
                  </div>
                  <div className="space-y-2">
                    <Label>Entreprise</Label>
                    <div className="p-2 bg-gray-50 rounded">{client.company_name || "Non spécifié"}</div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-medium mb-2">Demandes</h3>
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-blue-600 mr-2" />
                        <span>{client.count} {client.count > 1 ? "demandes" : "demande"}</span>
                      </div>
                      <Button variant="outline" size="sm">Voir détails</Button>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Statut</h3>
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center">
                      <div className={`h-3 w-3 rounded-full ${client.subscription ? "bg-green-400" : "bg-amber-400"} mr-2`}></div>
                      <span>{client.subscription ? "Client actif" : "Prospect"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="facturation" className="pt-4">
              {client.subscription ? (
                <>
                  <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-lg mb-4">
                    <h3 className="text-emerald-800 font-medium mb-1">Client abonné</h3>
                    <p className="text-sm text-emerald-700">Ce client est actuellement abonné à nos services.</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-3">
                        <div className="font-medium">Création du site</div>
                        <div className="text-right">
                          <div className="font-bold">99€</div>
                          <div className="text-xs text-gray-500">Paiement unique</div>
                        </div>
                      </div>
                      <div className="text-sm text-gray-600">Forfait de création du site web</div>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-3">
                        <div className="font-medium">Maintenance</div>
                        <div className="text-right">
                          <div className="font-bold">49€ / mois</div>
                          <div className="text-xs text-gray-500">Récurrent</div>
                        </div>
                      </div>
                      <div className="text-sm text-gray-600">Service de maintenance mensuel</div>
                      <Separator className="my-3" />
                      <div className="flex justify-between text-sm">
                        <div>Prochain paiement</div>
                        <div className="font-medium">{formatDate(nextMonthDate)}</div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div className="font-medium">Valeur totale du client</div>
                        <div className="text-xl font-bold">{client.revenue}€</div>
                      </div>
                      <div className="text-sm text-gray-600 mt-1">Initial 99€ + 49€/mois</div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <CreditCard className="h-12 w-12 mx-auto text-gray-400" />
                  <h3 className="mt-2 text-base font-medium">Aucune information de facturation</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Ce client n'a pas encore souscrit à un de nos forfaits.
                  </p>
                  <div className="mt-4">
                    <Button variant="outline">Créer un devis</Button>
                  </div>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="notes" className="pt-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="notes">Notes sur le client</Label>
                  <Textarea
                    id="notes"
                    className="min-h-32 mt-2"
                    placeholder="Ajoutez des notes concernant ce client..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>
                <Button onClick={handleSaveNotes} disabled={isSaving}>
                  {isSaving ? 'Enregistrement...' : 'Enregistrer les notes'}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ClientDetailsModal;
