
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { useState } from 'react';
import { toast } from '@/components/ui/use-toast';

const Settings = () => {
  const [loading, setLoading] = useState(false);
  
  const handleSaveSettings = () => {
    setLoading(true);
    
    // Simuler une sauvegarde
    setTimeout(() => {
      setLoading(false);
      toast({
        title: 'Paramètres sauvegardés',
        description: 'Vos paramètres ont été enregistrés avec succès.',
      });
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Paramètres</h1>
      
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Paramètres généraux</CardTitle>
            <CardDescription>
              Configurez les paramètres généraux de votre espace administrateur.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-1">
              <label className="text-sm font-medium">Nom de l'entreprise</label>
              <Input defaultValue="Ozymandias" />
            </div>
            
            <div className="space-y-1">
              <label className="text-sm font-medium">Email de contact</label>
              <Input defaultValue="contact@ozymandias.fr" />
            </div>
            
            <Separator className="my-4" />
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Notifications par email</h4>
                <p className="text-sm text-gray-500">Recevoir des notifications lors de nouvelles demandes</p>
              </div>
              <Switch defaultChecked={true} />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Mode maintenance</h4>
                <p className="text-sm text-gray-500">Activer le mode maintenance sur le site public</p>
              </div>
              <Switch defaultChecked={false} />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSaveSettings} disabled={loading}>
              {loading ? 'Sauvegarde...' : 'Enregistrer les modifications'}
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Options de formulaire</CardTitle>
            <CardDescription>
              Personnalisez les options disponibles dans le formulaire de demande.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium">Thèmes disponibles</h4>
                <p className="text-sm text-gray-500 mb-2">
                  Vous pouvez modifier ces options depuis votre panel d'administration.
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center border rounded p-2">
                    <div className="h-4 w-4 rounded-full bg-blue-500 mr-2"></div>
                    <span className="text-sm">Moderne</span>
                  </div>
                  <div className="flex items-center border rounded p-2">
                    <div className="h-4 w-4 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-sm">Écologique</span>
                  </div>
                  <div className="flex items-center border rounded p-2">
                    <div className="h-4 w-4 rounded-full bg-purple-500 mr-2"></div>
                    <span className="text-sm">Élégant</span>
                  </div>
                  <div className="flex items-center border rounded p-2">
                    <div className="h-4 w-4 rounded-full bg-amber-500 mr-2"></div>
                    <span className="text-sm">Artistique</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium">Fonctionnalités disponibles</h4>
                <p className="text-sm text-gray-500 mb-2">
                  Gérez les fonctionnalités que vous proposez à vos clients.
                </p>
                <div className="flex flex-wrap gap-2">
                  <div className="bg-gray-100 px-3 py-1 rounded-full text-sm">Blog</div>
                  <div className="bg-gray-100 px-3 py-1 rounded-full text-sm">E-commerce</div>
                  <div className="bg-gray-100 px-3 py-1 rounded-full text-sm">Portfolio</div>
                  <div className="bg-gray-100 px-3 py-1 rounded-full text-sm">Réservation</div>
                  <div className="bg-gray-100 px-3 py-1 rounded-full text-sm">Chat</div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline">Gérer les options</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
