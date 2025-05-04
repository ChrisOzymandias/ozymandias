
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { WebsiteRequest } from '@/types/requests';
import { 
  RefreshCw, AlertTriangle, Users, TrendingUp,
  CreditCard, CheckCircle, Clock, XCircle, Circle
} from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CustomerStats from '@/components/admin/CustomerStats';
import RevenueChart from '@/components/admin/RevenueChart';

// URL du webhook Make - utilisé pour tout le site
const WEBHOOK_URL = 'https://hook.eu2.make.com/siguy1hwro8e64oo0v8r4wv89vkv3npu';

// Définition des couleurs et icônes par statut
const statusConfig: Record<string, { color: string, icon: React.ElementType, label: string }> = {
  new: { color: 'bg-blue-100 text-blue-800', icon: Circle, label: 'Nouveau' },
  contacted: { color: 'bg-yellow-100 text-yellow-800', icon: Clock, label: 'Contacté' },
  quote_sent: { color: 'bg-purple-100 text-purple-800', icon: CreditCard, label: 'Devis envoyé' },
  quote_accepted: { color: 'bg-green-100 text-green-800', icon: CheckCircle, label: 'Devis accepté' },
  in_progress: { color: 'bg-indigo-100 text-indigo-800', icon: TrendingUp, label: 'En cours' },
  completed: { color: 'bg-emerald-100 text-emerald-800', icon: CheckCircle, label: 'Terminé' },
  lost: { color: 'bg-gray-100 text-gray-800', icon: XCircle, label: 'Perdu' }
};

const Dashboard = () => {
  const [requests, setRequests] = useState<WebsiteRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [webhookUrl, setWebhookUrl] = useState<string>(WEBHOOK_URL || '');
  const [webhookStatus, setWebhookStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [activeTab, setActiveTab] = useState('overview');
  
  // Utiliser notre hook personnalisé pour le webhook entrant avec feedback amélioré
  const { receiveFromWebhook, isLoading: isLoadingFromWebhook } = useIncomingWebhook({
    onSuccess: (data) => {
      if (Array.isArray(data)) {
        setRequests(data);
        setWebhookStatus('success');
        console.log("Données reçues du webhook Make:", data);
      } else {
        console.error("Les données reçues du webhook ne sont pas un tableau:", data);
        setWebhookStatus('error');
      }
    },
    onError: (error) => {
      setError(error.message);
      setWebhookStatus('error');
    }
  });

  // Fetch all website requests from webhook
  const fetchRequests = async () => {
    setLoading(true);
    setError(null);
    setWebhookStatus('idle');
    
    try {
      console.log("Tentative de récupération des données depuis le webhook Make...");
      // Force une requête avec un timestamp pour éviter la mise en cache
      const webhookUrlWithTimestamp = `${webhookUrl}${webhookUrl.includes('?') ? '&' : '?'}timestamp=${Date.now()}`;
      const webhookData = await receiveFromWebhook(webhookUrlWithTimestamp);
      
      if (webhookData) {
        console.log("Données récupérées depuis le webhook Make:", webhookData);
        setLoading(false);
      } else {
        throw new Error("Aucune donnée reçue du webhook Make");
      }
    } catch (err: any) {
      console.error('Erreur lors de la récupération des demandes:', err);
      setError(`Erreur: ${err.message || "Une erreur inconnue s'est produite"}`);
      toast({
        title: "Erreur",
        description: "Impossible de récupérer les données depuis Make. Mode démonstration activé.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Load data when component mounts
  useEffect(() => {
    fetchRequests();
  }, []);

  // Update request status via webhook
  const updateRequestStatus = async (id: string, status: string) => {
    try {
      // Préparer les données pour l'envoi au webhook Make
      const requestData = {
        action: 'update_status',
        id: id,
        status: status
      };
      
      console.log("Envoi de la mise à jour de statut au webhook Make:", requestData);
      
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'no-cors', // Pour éviter les problèmes CORS
        body: JSON.stringify(requestData),
      });
      
      // Update local state optimistically
      setRequests(requests.map(req => 
        req.id === id ? { ...req, status } : req
      ));
      
      toast({
        title: "Succès",
        description: "Demande de mise à jour du statut envoyée",
      });
      
      // Actualiser les données après un court délai pour obtenir la mise à jour
      setTimeout(() => {
        fetchRequests();
      }, 2000);
      
    } catch (err: any) {
      console.error('Erreur lors de la mise à jour du statut:', err);
      toast({
        title: "Erreur",
        description: "Impossible d'envoyer la mise à jour au webhook Make",
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
  
  // Calculer les statistiques
  const totalRequests = requests.length;
  const newRequests = requests.filter(req => req.status === 'new').length;
  const contactedRequests = requests.filter(req => req.status === 'contacted').length;
  const quoteSentRequests = requests.filter(req => req.status === 'quote_sent').length;
  const quoteAcceptedRequests = requests.filter(req => req.status === 'quote_accepted').length;
  const inProgressRequests = requests.filter(req => req.status === 'in_progress').length;
  const completedRequests = requests.filter(req => req.status === 'completed').length;
  const lostRequests = requests.filter(req => req.status === 'lost').length;

  // Calculer le revenu total
  const totalRevenue = requests.reduce((sum, req) => sum + (req.quote_amount || 0), 0);
  
  // Calculer le taux de conversion (devis acceptés / devis envoyés)
  const conversionRate = quoteSentRequests > 0 
    ? Math.round((quoteAcceptedRequests / quoteSentRequests) * 100) 
    : 0;
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Tableau de bord</h1>
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
            variant={webhookStatus === 'error' ? 'destructive' : 'default'}
          >
            {(loading || isLoadingFromWebhook) ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Chargement...
              </>
            ) : (
              <>Actualiser</>
            )}
          </Button>
        </div>
      </div>

      {webhookStatus === 'error' && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Problème de connexion au webhook</AlertTitle>
          <AlertDescription>
            Impossible de récupérer les données depuis Make. Les données affichées sont en mode démonstration.
            <p className="text-xs mt-1">
              Vérifiez que votre scénario Make est correctement configuré pour répondre aux requêtes GET avec le paramètre "action=get_requests".
            </p>
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="details">Détails des demandes</TabsTrigger>
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
                  <Clock className="h-8 w-8 text-purple-500" />
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
          
          {/* Répartition des statuts */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Répartition des demandes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {Object.entries(statusConfig).map(([status, config]) => {
                  const count = requests.filter(req => req.status === status).length;
                  const Icon = config.icon;
                  return (
                    <Badge key={status} variant="outline" className={`${config.color} flex items-center gap-1 px-3 py-1`}>
                      <Icon size={14} />
                      <span>{config.label}: {count}</span>
                    </Badge>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="details">
          <Card>
            {loading || isLoadingFromWebhook ? (
              <div className="flex justify-center items-center p-12">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : requests.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                Aucune demande trouvée. Vérifiez l'URL du webhook ou assurez-vous que des données sont disponibles dans Make.
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
                                // Envoyer la mise à jour du montant au webhook Make
                                await fetch(webhookUrl, {
                                  method: 'POST',
                                  headers: {
                                    'Content-Type': 'application/json',
                                  },
                                  mode: 'no-cors',
                                  body: JSON.stringify({
                                    action: 'update_amount',
                                    id: request.id,
                                    quote_amount: amount
                                  }),
                                });
                                
                                // Update local state optimistically
                                setRequests(requests.map(req => 
                                  req.id === request.id ? { ...req, quote_amount: amount } : req
                                ));
                                
                                // Actualiser après un court délai
                                setTimeout(() => {
                                  fetchRequests();
                                }, 2000);
                                
                              } catch (err) {
                                console.error('Erreur lors de la mise à jour du montant:', err);
                                toast({
                                  title: "Erreur",
                                  description: "Impossible de mettre à jour le montant via le webhook",
                                  variant: "destructive"
                                });
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
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
