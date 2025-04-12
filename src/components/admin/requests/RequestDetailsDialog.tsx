
import { WebsiteRequest } from '@/types/requests';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ClientInfoTab from './details/ClientInfoTab';
import FollowupTab from './details/FollowupTab';
import QuoteTab from './details/QuoteTab';

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
              <ClientInfoTab request={selectedRequest} />
            </TabsContent>
            
            <TabsContent value="suivi" className="pt-4">
              <FollowupTab 
                request={selectedRequest} 
                onFollowup={onFollowup} 
                onEditRequest={onEditRequest} 
              />
            </TabsContent>
            
            <TabsContent value="devis" className="pt-4">
              <QuoteTab 
                request={selectedRequest} 
                onCreateQuote={onCreateQuote} 
                onEditRequest={onEditRequest} 
              />
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RequestDetailsDialog;
