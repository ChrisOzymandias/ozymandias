
import { useState } from 'react';
import { WebsiteRequest } from '@/types/requests';
import { FilePlus } from 'lucide-react';
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

interface RequestQuoteDialogProps {
  selectedRequest: WebsiteRequest | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  quoteAmount: string;
  setQuoteAmount: (amount: string) => void;
  recurringAmount: string;
  setRecurringAmount: (amount: string) => void;
  quoteNotes: string;
  setQuoteNotes: (notes: string) => void;
}

const RequestQuoteDialog = ({
  selectedRequest,
  isOpen,
  onClose,
  onSave,
  quoteAmount,
  setQuoteAmount,
  recurringAmount,
  setRecurringAmount,
  quoteNotes,
  setQuoteNotes
}: RequestQuoteDialogProps) => {
  if (!selectedRequest) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Créer un devis</DialogTitle>
          <DialogDescription>
            Créez un devis pour la demande de {selectedRequest?.name}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="border rounded-lg p-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="creation-price">Prix de création (€)</Label>
              <Input 
                id="creation-price" 
                type="number" 
                value={quoteAmount}
                onChange={(e) => setQuoteAmount(e.target.value)}
              />
              <p className="text-xs text-gray-500">Prix unique de création du site</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="recurring-price">Prix de maintenance (€/mois)</Label>
              <Input 
                id="recurring-price" 
                type="number" 
                value={recurringAmount}
                onChange={(e) => setRecurringAmount(e.target.value)}
              />
              <p className="text-xs text-gray-500">Prix récurrent mensuel</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="quote-notes">Notes sur le devis (optionnel)</Label>
            <Textarea 
              id="quote-notes" 
              placeholder="Détails supplémentaires pour le devis..."
              value={quoteNotes}
              onChange={(e) => setQuoteNotes(e.target.value)}
            />
          </div>
          
          <Button className="w-full" onClick={onSave}>
            <FilePlus className="h-4 w-4 mr-2" />
            Envoyer le devis
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RequestQuoteDialog;
