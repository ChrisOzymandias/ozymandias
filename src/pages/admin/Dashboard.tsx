
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { WebsiteRequest } from '@/types/requests';
import { RefreshCw, Users, TrendingUp, CreditCard, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CustomerStats from '@/components/admin/CustomerStats';
import RevenueChart from '@/components/admin/RevenueChart';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import ClientForm from '@/components/admin/ClientForm';

const Dashboard = () => {
  const [requests, setRequests] = useState<WebsiteRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [clientFormOpen, setClientFormOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<WebsiteRequest | undefined>(undefined);
  
  // Fetch data from Supabase directly
  const fetchRequests = async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log("Récupération des demandes depuis Supabase...");
      
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
      setRequests(data || []);
    } catch (err: any) {
      console.error('Erreur lors du chargement des demandes:', err);
      setError(`Erreur: ${err.message || 'Une erreur est survenue'}`);
      
      // Si pas de données, utiliser des données de démonstration
      if (requests.length === 0) {
        const demoData = generateDemoData();
        setRequests(demoData);
        toast({
          title: "Mode démonstration",
          description: "Impossible de récupérer les données. Affichage des données de démonstration.",
          variant: "default",
        });
      }
    } finally {
      setLoading(false);
    }
  };
  
  // Generate demo data for testing when no data is available
  const generateDemoData = (): WebsiteRequest[] => {
    return [
      {
        id: "1",
        name: "Jean Dupont (démo)",
        email: "jean@example.com",
        phone: "0601020304",
        company_name: "Restaurant Le Gourmet",
        project_details: "Site pour mon restaurant avec réservation en ligne",
        theme: "e-commerce",
        profession: "restaurateur",
        status: "new",
        created_at: new Date().toISOString(),
        features: ["contact-form", "gallery"]
      },
      {
        id: "2",
        name: "Marie Martin (démo)",
        email: "marie@example.com",
        phone: "0612345678",
        company_name: "Studio Photo Marie",
        project_details: "Portfolio pour présenter mes travaux photographiques",
        theme: "portfolio",
        profession: "photographe",
        status: "quote_sent",
        quote_amount: 450,
        created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
        features: ["gallery", "contact-form"]
      },
      {
        id: "3",
        name: "Paul Durand (démo)",
        email: "paul@example.com",
        phone: "0687654321",
        company_name: "Durand Consulting",
        project_details: "Site vitrine pour mon activité de consulting",
        theme: "business",
        profession: "consultant",
        status: "completed",
        quote_amount: 990,
        created_at: new Date(Date.now() - 86400000 * 10).toISOString(),
        features: ["blog", "contact-form", "newsletter"]
      },
      {
        id: "4",
        name: "Sophie Leroy (démo)",
        email: "sophie@example.com",
        phone: "0633445566",
        company_name: "Boutique Fleurie",
        project_details: "Site e-commerce pour ma boutique de fleurs",
        theme: "e-commerce",
        profession: "fleuriste",
        status: "in_progress",
        quote_amount: 750,
        created_at: new Date(Date.now() - 86400000 * 15).toISOString(),
        features: ["shop", "contact-form", "gallery"]
      }
    ];
  };

  // Handler for client form success
  const handleClientFormSuccess = () => {
    setClientFormOpen(false);
    setEditingClient(undefined);
    fetchRequests();
  };

  // Open edit dialog for a client
  const handleEditClient = (client: WebsiteRequest) => {
    setEditingClient(client);
    setClientFormOpen(true);
  };

  // Remove a client
  const handleRemoveClient = async (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce client ?")) {
      try {
        const { error } = await supabase
          .from('website_requests')
          .delete()
          .eq('id', id);
          
        if (error) throw error;
        
        toast({
          title: "Client supprimé",
          description: "Le client a été supprimé avec succès",
        });
        
        fetchRequests();
      } catch (err: any) {
        console.error("Erreur lors de la suppression :", err);
        toast({
          title: "Erreur",
          description: `Échec de la suppression : ${err.message}`,
          variant: "destructive",
        });
      }
    }
  };

  // Load data when component mounts
  useEffect(() => {
    fetchRequests();
  }, []);
  
  // Calculate statistics
  const totalRequests = requests.length;
  const newRequests = requests.filter(req => req.status === 'new').length;
  const inProgressRequests = requests.filter(req => req.status === 'in_progress').length;
  const completedRequests = requests.filter(req => req.status === 'completed').length;
  const quoteAcceptedRequests = requests.filter(req => req.status === 'quote_accepted').length;
  const quoteSentRequests = requests.filter(req => req.status === 'quote_sent').length;

  // Calculate total revenue
  const totalRevenue = requests.reduce((sum, req) => sum + (req.quote_amount || 0), 0);
  
  // Calculate conversion rate
  const conversionRate = quoteSentRequests > 0 
    ? Math.round((quoteAcceptedRequests / quoteSentRequests) * 100) 
    : 0;
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Tableau de bord</h1>
        <div className="flex space-x-2">
          <Button 
            onClick={() => {
              setEditingClient(undefined);
              setClientFormOpen(true);
            }}
            variant="default"
          >
            Ajouter un client
          </Button>
          <Button 
            onClick={fetchRequests}
            variant="outline"
            disabled={loading}
          >
            {loading ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Chargement...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                Actualiser
              </>
            )}
          </Button>
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Problème de connexion à la base de données</AlertTitle>
          <AlertDescription>
            Impossible de récupérer les données. Vérifiez votre connexion à Supabase.
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="clients">Gestion des clients</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          {/* Tuiles de statistiques */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total demandes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">{totalRequests}</div>
                  <Users className="h-8 w-8 text-blue-500" />
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {newRequests} nouvelles demandes
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-green-50 to-green-100 hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Taux conversion</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">{conversionRate}%</div>
                  <TrendingUp className="h-8 w-8 text-green-500" />
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {quoteAcceptedRequests}/{quoteSentRequests} devis acceptés
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Projets en cours</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">{inProgressRequests}</div>
                  <Users className="h-8 w-8 text-purple-500" />
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {completedRequests} projets terminés
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-amber-50 to-amber-100 hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Revenu total</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">{totalRevenue}€</div>
                  <CreditCard className="h-8 w-8 text-amber-500" />
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  ~{Math.round(totalRevenue / (completedRequests || 1))}€ par projet
                </p>
              </CardContent>
            </Card>
          </div>
          
          {/* Graphiques et statistiques */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Conversion clients</CardTitle>
              </CardHeader>
              <CardContent>
                <CustomerStats 
                  totalRequests={totalRequests} 
                  completedRequests={completedRequests} 
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Évolution des revenus</CardTitle>
              </CardHeader>
              <CardContent>
                <RevenueChart completedRequests={completedRequests} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="clients">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Gestion des clients</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center items-center p-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              ) : requests.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-muted-foreground mb-4">Aucun client trouvé</p>
                  <Button onClick={() => setClientFormOpen(true)}>
                    Ajouter votre premier client
                  </Button>
                </div>
              ) : (
                <div className="rounded-md border">
                  <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                      <thead className="[&_tr]:border-b">
                        <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Nom</th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Email</th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Téléphone</th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Profession</th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Statut</th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Devis</th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="[&_tr:last-child]:border-0">
                        {requests.map((client) => (
                          <tr key={client.id} className="border-b transition-colors hover:bg-muted/50">
                            <td className="p-4 align-middle font-medium">{client.name}</td>
                            <td className="p-4 align-middle">{client.email}</td>
                            <td className="p-4 align-middle">{client.phone || '-'}</td>
                            <td className="p-4 align-middle">{client.profession}</td>
                            <td className="p-4 align-middle">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                client.status === 'completed' ? 'bg-green-100 text-green-800' : 
                                client.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                                client.status === 'quote_sent' ? 'bg-purple-100 text-purple-800' :
                                client.status === 'quote_accepted' ? 'bg-indigo-100 text-indigo-800' :
                                client.status === 'new' ? 'bg-gray-100 text-gray-800' :
                                'bg-amber-100 text-amber-800'
                              }`}>
                                {client.status === 'completed' ? 'Terminé' :
                                 client.status === 'in_progress' ? 'En cours' :
                                 client.status === 'quote_sent' ? 'Devis envoyé' :
                                 client.status === 'quote_accepted' ? 'Devis accepté' :
                                 client.status === 'new' ? 'Nouveau' : 
                                 'Contacté'}
                              </span>
                            </td>
                            <td className="p-4 align-middle">{client.quote_amount ? `${client.quote_amount}€` : '-'}</td>
                            <td className="p-4 align-middle">
                              <div className="flex space-x-2">
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  onClick={() => handleEditClient(client)}
                                >
                                  Modifier
                                </Button>
                                <Button 
                                  variant="destructive" 
                                  size="sm" 
                                  onClick={() => handleRemoveClient(client.id)}
                                >
                                  Supprimer
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Client Form Dialog */}
      <Dialog open={clientFormOpen} onOpenChange={setClientFormOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              {editingClient ? "Modifier le client" : "Ajouter un nouveau client"}
            </DialogTitle>
          </DialogHeader>
          
          <ClientForm 
            initialData={editingClient} 
            onSuccess={handleClientFormSuccess} 
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
