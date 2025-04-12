
import { WebsiteRequest } from '@/types/requests';

interface ClientInfoTabProps {
  request: WebsiteRequest;
}

const ClientInfoTab = ({ request }: ClientInfoTabProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-gray-500">Informations du client</h3>
          <div className="bg-gray-50 p-4 rounded-md space-y-2 mt-2">
            <div>
              <span className="text-gray-500">Nom:</span>
              <p className="font-medium">{request.name}</p>
            </div>
            <div>
              <span className="text-gray-500">Email:</span>
              <p className="font-medium">{request.email}</p>
            </div>
            <div>
              <span className="text-gray-500">Téléphone:</span>
              <p className="font-medium">{request.phone || 'Non spécifié'}</p>
            </div>
            <div>
              <span className="text-gray-500">Société:</span>
              <p className="font-medium">{request.company_name || 'Non spécifié'}</p>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-semibold text-gray-500">Détails du projet</h3>
          <div className="bg-gray-50 p-4 rounded-md mt-2">
            <p>{request.project_details}</p>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-gray-500">Paramètres du site</h3>
          <div className="bg-gray-50 p-4 rounded-md space-y-2 mt-2">
            <div>
              <span className="text-gray-500">Thème:</span>
              <p className="font-medium">{request.theme}</p>
            </div>
            <div>
              <span className="text-gray-500">Profession:</span>
              <p className="font-medium">{request.profession}</p>
            </div>
            <div>
              <span className="text-gray-500">Fonctionnalités:</span>
              {request.features && request.features.length > 0 ? (
                <ul className="list-disc list-inside pl-2 mt-1">
                  {request.features.map((feature, index) => (
                    <li key={index} className="font-medium">{feature}</li>
                  ))}
                </ul>
              ) : (
                <p className="font-medium">Aucune fonctionnalité spécifiée</p>
              )}
            </div>
          </div>
        </div>
        
        <RequestStatusInfo request={request} />
      </div>
    </div>
  );
};

interface RequestStatusInfoProps {
  request: WebsiteRequest;
}

const RequestStatusInfo = ({ request }: RequestStatusInfoProps) => {
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
    <div>
      <h3 className="text-sm font-semibold text-gray-500">État de la demande</h3>
      <div className="bg-gray-50 p-4 rounded-md mt-2 flex flex-col space-y-2">
        <div className="flex items-center">
          {getStatusBadge(request.status)}
          <span className="ml-2">
            Créée le {formatDate(request.created_at)}
          </span>
        </div>
        
        {request.quote_sent && (
          <div className="text-sm flex items-center text-gray-600">
            <FilePlus className="h-4 w-4 mr-1 text-emerald-600" />
            <span>Devis envoyé</span>
            {request.quote_accepted && (
              <span className="ml-1 text-emerald-600 font-medium flex items-center">
                <FileCheck className="h-3 w-3 mr-1" /> Accepté
              </span>
            )}
          </div>
        )}
        
        {request.followup_date && (
          <div className="text-sm flex items-center text-gray-600">
            <Calendar className="h-4 w-4 mr-1 text-amber-600" />
            <span>Suivi prévu le {new Date(request.followup_date).toLocaleDateString('fr-FR')}</span>
          </div>
        )}
      </div>
    </div>
  );
};

import { getStatusBadge } from '@/components/admin/requests/requestUtils';
import { Calendar, FilePlus, FileCheck } from 'lucide-react';

export default ClientInfoTab;
