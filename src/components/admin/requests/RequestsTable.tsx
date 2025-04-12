
import { WebsiteRequest } from '@/types/requests';
import { Clock } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { getStatusBadge } from '@/components/admin/requests/requestUtils';
import TableActions from '@/components/admin/requests/TableActions';

interface RequestsTableProps {
  requests: WebsiteRequest[];
  loading: boolean;
  onViewDetails: (request: WebsiteRequest) => void;
  onEditRequest: (request: WebsiteRequest) => void;
  onFollowup: (request: WebsiteRequest) => void;
  onCreateQuote: (request: WebsiteRequest) => void;
}

const RequestsTable = ({
  requests,
  loading,
  onViewDetails,
  onEditRequest,
  onFollowup,
  onCreateQuote
}: RequestsTableProps) => {
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
                <TableCell className="font-medium">{request.name}</TableCell>
                <TableCell>{request.email}</TableCell>
                <TableCell>{request.theme}</TableCell>
                <TableCell>
                  <div className="flex flex-col space-y-1">
                    {getStatusBadge(request.status)}
                    {request.quote_sent && (
                      <span className="text-xs text-gray-500">
                        Devis envoyé
                      </span>
                    )}
                    {request.followup_date && (
                      <span className="text-xs text-gray-500">
                        Suivi: {new Date(request.followup_date).toLocaleDateString('fr-FR')}
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <TableActions
                    request={request}
                    onViewDetails={onViewDetails}
                    onEditRequest={onEditRequest}
                    onFollowup={onFollowup}
                    onCreateQuote={onCreateQuote}
                  />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default RequestsTable;
