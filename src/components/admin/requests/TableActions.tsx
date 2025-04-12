
import { WebsiteRequest } from '@/types/requests';
import { Eye, FilePlus, Phone, Edit2, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TableActionsProps {
  request: WebsiteRequest;
  onViewDetails: (request: WebsiteRequest) => void;
  onEditRequest: (request: WebsiteRequest) => void;
  onFollowup: (request: WebsiteRequest) => void;
  onCreateQuote: (request: WebsiteRequest) => void;
}

const TableActions = ({
  request,
  onViewDetails,
  onEditRequest,
  onFollowup,
  onCreateQuote
}: TableActionsProps) => {
  return (
    <div className="flex justify-end space-x-1">
      <Button
        size="sm"
        variant="ghost"
        onClick={() => onViewDetails(request)}
        title="Voir détails"
      >
        <Eye className="h-4 w-4" />
      </Button>
      
      {!request.quote_sent && (
        <Button
          size="sm"
          variant="ghost"
          className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
          onClick={() => onCreateQuote(request)}
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
          onClick={() => onFollowup(request)}
          title="Programmer un suivi"
        >
          <Phone className="h-4 w-4" />
        </Button>
      )}
      
      <Button
        size="sm"
        variant="ghost"
        onClick={() => onEditRequest(request)}
        title="Modifier le statut"
      >
        <Edit2 className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default TableActions;
