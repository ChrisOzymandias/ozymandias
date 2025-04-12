
import { WebsiteRequest } from '@/types/requests';
import { Calendar, Edit2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FollowupTabProps {
  request: WebsiteRequest;
  onFollowup: (request: WebsiteRequest) => void;
  onEditRequest: (request: WebsiteRequest) => void;
}

const FollowupTab = ({ request, onFollowup, onEditRequest }: FollowupTabProps) => {
  if (request.followup_date) {
    return (
      <div className="space-y-4">
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
          <div className="flex items-center text-amber-800">
            <Calendar className="h-5 w-5 mr-2" />
            <h3 className="font-medium">Suivi planifié</h3>
          </div>
          <p className="mt-2 text-amber-700">
            Un suivi est prévu pour le {new Date(request.followup_date).toLocaleDateString('fr-FR')}
          </p>
        </div>
        
        <div className="space-y-2">
          <h3 className="font-medium">Actions</h3>
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="outline" onClick={() => onFollowup(request)}>
              <Calendar className="h-4 w-4 mr-2" />
              Reprogrammer
            </Button>
            <Button size="sm" variant="outline" onClick={() => onEditRequest(request)}>
              <Edit2 className="h-4 w-4 mr-2" />
              Changer statut
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="text-center py-8">
      <Calendar className="h-12 w-12 mx-auto text-gray-400" />
      <h3 className="mt-2 text-base font-medium">Aucun suivi planifié</h3>
      <p className="mt-1 text-sm text-gray-500">
        Programmez un suivi pour cette demande.
      </p>
      <div className="mt-4">
        <Button onClick={() => onFollowup(request)}>
          <Calendar className="h-4 w-4 mr-2" />
          Programmer un suivi
        </Button>
      </div>
    </div>
  );
};

export default FollowupTab;
