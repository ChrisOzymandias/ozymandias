
import { AlertCircle, Clock, Check } from 'lucide-react';
import React from 'react';

// Define types for our status options
interface StatusOption {
  value: string;
  label: string;
  icon: React.ReactNode;
}

export const STATUS_OPTIONS: StatusOption[] = [
  { value: 'new', label: 'Nouveau', icon: <AlertCircle className="h-4 w-4 text-blue-500" /> },
  { value: 'in_progress', label: 'En cours', icon: <Clock className="h-4 w-4 text-amber-500" /> },
  { value: 'completed', label: 'Complété', icon: <Check className="h-4 w-4 text-green-500" /> }
];

export const getStatusBadge = (status: string) => {
  switch (status) {
    case 'new':
      return (
        <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          <AlertCircle className="h-3 w-3 mr-1" />
          Nouveau
        </div>
      );
    case 'in_progress':
      return (
        <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
          <Clock className="h-3 w-3 mr-1" />
          En cours
        </div>
      );
    case 'completed':
      return (
        <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <Check className="h-3 w-3 mr-1" />
          Complété
        </div>
      );
    default:
      return status;
  }
};
