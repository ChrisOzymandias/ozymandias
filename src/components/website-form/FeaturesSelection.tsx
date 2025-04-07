
import React from 'react';
import { Check } from 'lucide-react';
import { websiteFeatures } from './constants';

interface FeaturesSelectionProps {
  selectedFeatures: string[];
  onFeatureToggle: (featureId: string) => void;
  stepTitle: string;
  stepDescription: string;
}

const FeaturesSelection: React.FC<FeaturesSelectionProps> = ({
  selectedFeatures,
  onFeatureToggle,
  stepTitle,
  stepDescription,
}) => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold">{stepTitle}</h3>
      <p className="text-gray-600">{stepDescription}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {websiteFeatures.map((feature) => (
          <div
            key={feature.id}
            className={`p-4 border-2 rounded-xl flex items-center ${
              feature.included 
                ? 'border-green-200 bg-green-50 cursor-default'
                : selectedFeatures.includes(feature.id)
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-500 hover:bg-blue-50 cursor-pointer'
            }`}
            onClick={() => !feature.included && onFeatureToggle(feature.id)}
          >
            <span className="font-medium">{feature.name}</span>
            {feature.included && (
              <div className="ml-auto flex items-center text-green-600">
                <Check className="h-5 w-5" />
                <span className="ml-1 text-sm">Inclus</span>
              </div>
            )}
            {!feature.included && selectedFeatures.includes(feature.id) && (
              <Check className="ml-auto h-5 w-5 text-blue-500" />
            )}
          </div>
        ))}
      </div>
      
      <p className="text-sm text-gray-500 mt-4">
        Les fonctionnalités marquées comme "Inclus" font partie du package de base.
        Les autres fonctionnalités peuvent entraîner des frais supplémentaires selon la complexité.
      </p>
    </div>
  );
};

export default FeaturesSelection;
