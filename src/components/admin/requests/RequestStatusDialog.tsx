
import { useState } from 'react';
import { WebsiteRequest } from '@/types/requests';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { AlertCircle, Clock, Check } from 'lucide-react';
import { STATUS_OPTIONS } from '@/components/admin/requests/requestUtils';

interface RequestStatusDialogProps {
  selectedRequest: WebsiteRequest | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusChange: (value: string) => void;
  currentStatus: string;
}

const RequestStatusDialog = ({
  selectedRequest,
  isOpen,
  onClose,
  onStatusChange,
  currentStatus
}: RequestStatusDialogProps) => {
  if (!selectedRequest) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Modifier le statut</DialogTitle>
          <DialogDescription>
            Modifier le statut de la demande de {selectedRequest?.name}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Statut</label>
            <Select value={currentStatus} onValueChange={onStatusChange}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un statut" />
              </SelectTrigger>
              <SelectContent>
                {STATUS_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex items-center">
                      {option.icon}
                      <span className="ml-2">{option.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RequestStatusDialog;
