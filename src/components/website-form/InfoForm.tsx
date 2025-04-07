
import React from 'react';
import { FormData } from './constants';

interface InfoFormProps {
  formData: FormData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  stepTitle: string;
  stepDescription: string;
}

const InfoForm: React.FC<InfoFormProps> = ({
  formData,
  onInputChange,
  stepTitle,
  stepDescription,
}) => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold">{stepTitle}</h3>
      <p className="text-gray-600">{stepDescription}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet *</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={onInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Votre nom et prénom"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={onInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="votreemail@exemple.com"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={onInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Votre numéro de téléphone"
          />
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Nom de l'entreprise</label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={onInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Nom de votre entreprise (si applicable)"
          />
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Détails du projet *</label>
          <textarea
            name="projectDetails"
            required
            value={formData.projectDetails}
            onChange={onInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg h-32 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Décrivez brièvement votre projet et vos attentes..."
          ></textarea>
        </div>
      </div>
      
      <p className="text-sm text-gray-500">
        * Champs obligatoires
      </p>
    </div>
  );
};

export default InfoForm;
