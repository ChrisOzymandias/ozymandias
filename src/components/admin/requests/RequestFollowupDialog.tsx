
import { useState } from 'react';
import { WebsiteRequest } from '@/types/requests';
import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';

interface RequestFollowupDialogProps {
  selectedRequest: WebsiteRequest | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  followupDate: string;
  setFollowupDate: (date: string) => void;
  followupNotes: string;
  setFollowupNotes: (notes: string) => void;
}

const RequestFollowupDialog = ({
  selectedRequest,
  isOpen,
  onClose,
  onSave,
  followupDate,
  setFollowupDate,
  followupNotes,
  setFollowupNotes
}: RequestFollowupDialogProps) => {
  if (!selectedRequest) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Programmer un suivi</DialogTitle>
          <DialogDescription>
            Planifiez un suivi pour la demande de {selectedRequest?.name}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="followup-date">Date de suivi</Label>
            <Input 
              id="followup-date" 
              type="date" 
              value={followupDate}
              onChange={(e) => setFollowupDate(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="followup-notes">Notes (optionnel)</Label>
            <Textarea 
              id="followup-notes" 
              placeholder="Notez ici des informations importantes pour le suivi..."
              value={followupNotes}
              onChange={(e) => setFollowupNotes(e.target.value)}
            />
          </div>
          
          <Button className="w-full" onClick={onSave}>
            <Calendar className="h-4 w-4 mr-2" />
            Programmer le suivi
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RequestFollowupDialog;
