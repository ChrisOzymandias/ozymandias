
import { WebsiteRequest } from '@/types/requests';
import { FilePlus, FileCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface QuoteTabProps {
  request: WebsiteRequest;
  onCreateQuote: (request: WebsiteRequest) => void;
  onEditRequest: (request: WebsiteRequest) => void;
}

const QuoteTab = ({ request, onCreateQuote, onEditRequest }: QuoteTabProps) => {
  if (request.quote_sent) {
    return (
      <div className="space-y-4">
        <div className={`bg-${request.quote_accepted ? 'emerald' : 'amber'}-50 border border-${request.quote_accepted ? 'emerald' : 'amber'}-200 p-4 rounded-lg`}>
          <div className="flex items-center text-amber-800">
            <FilePlus className={`h-5 w-5 mr-2 text-${request.quote_accepted ? 'emerald' : 'amber'}-800`} />
            <h3 className="font-medium">
              {request.quote_accepted ? 'Devis accepté' : 'Devis envoyé'}
            </h3>
          </div>
          <p className="mt-2 text-amber-700">
            {request.quote_accepted 
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
        
        {!request.quote_accepted && (
          <div className="flex justify-end">
            <Button variant="outline" size="sm" onClick={() => onEditRequest(request)}>
              <FileCheck className="h-4 w-4 mr-2" />
              Marquer comme accepté
            </Button>
          </div>
        )}
      </div>
    );
  }
  
  return (
    <div className="text-center py-8">
      <FilePlus className="h-12 w-12 mx-auto text-gray-400" />
      <h3 className="mt-2 text-base font-medium">Aucun devis créé</h3>
      <p className="mt-1 text-sm text-gray-500">
        Créez un devis à envoyer au client.
      </p>
      <div className="mt-4">
        <Button onClick={() => onCreateQuote(request)}>
          <FilePlus className="h-4 w-4 mr-2" />
          Créer un devis
        </Button>
      </div>
    </div>
  );
};

export default QuoteTab;
