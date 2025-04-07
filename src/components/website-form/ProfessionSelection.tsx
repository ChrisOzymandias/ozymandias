
import React from 'react';
import { Check } from 'lucide-react';
import { professionOptions } from './constants';

interface ProfessionSelectionProps {
  currentProfession: string;
  onProfessionSelect: (professionId: string) => void;
  stepTitle: string;
  stepDescription: string;
}

const ProfessionSelection: React.FC<ProfessionSelectionProps> = ({
  currentProfession,
  onProfessionSelect,
  stepTitle,
  stepDescription,
}) => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold">{stepTitle}</h3>
      <p className="text-gray-600">{stepDescription}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {professionOptions.map((option) => (
          <button
            key={option.id}
            type="button"
            className={`p-4 border-2 rounded-xl flex flex-col items-start hover:border-blue-500 hover:bg-blue-50 transition-all ${
              currentProfession === option.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
            }`}
            onClick={() => onProfessionSelect(option.id)}
          >
            <div className="flex items-center w-full">
              <span className="text-2xl mr-3">{option.icon}</span>
              <span className="font-medium">{option.name}</span>
              {currentProfession === option.id && (
                <Check className="ml-auto h-5 w-5 text-blue-500" />
              )}
            </div>
            <span className="text-xs text-gray-500 mt-2">{option.examples}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProfessionSelection;
