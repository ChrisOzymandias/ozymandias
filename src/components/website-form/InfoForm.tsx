
import React from 'react';
import { FormData } from './constants';

interface InfoFormProps {
  formData: FormData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone *</label>
          <input
            type="tel"
            name="phone"
            required
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
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Avez-vous déjà un site web ?</label>
          <select
            name="hasExistingWebsite"
            value={formData.hasExistingWebsite}
            onChange={onInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Sélectionnez une option</option>
            <option value="oui">Oui</option>
            <option value="non">Non</option>
            <option value="oui-refonte">Oui, mais il a besoin d'une refonte</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Qu'attendez-vous de votre site web ?</label>
          <select
            name="websiteExpectation"
            value={formData.websiteExpectation}
            onChange={onInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Sélectionnez votre objectif principal</option>
            <option value="contacts">Plus de contacts/prospects</option>
            <option value="visibilite">Plus de visibilité</option>
            <option value="ventes">Plus de ventes directes</option>
            <option value="image">Améliorer mon image professionnelle</option>
            <option value="autre">Autre objectif</option>
          </select>
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Quand souhaitez-vous que votre site soit en ligne ?</label>
          <select
            name="launchTimeline"
            value={formData.launchTimeline}
            onChange={onInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Sélectionnez votre délai souhaité</option>
            <option value="urgent">Dès que possible (urgent)</option>
            <option value="1mois">Dans le mois qui vient</option>
            <option value="3mois">Dans les 3 prochains mois</option>
            <option value="6mois">Dans les 6 prochains mois</option>
            <option value="nodate">Pas de date précise</option>
          </select>
        </div>
      </div>
      
      <p className="text-sm text-gray-500">
        * Champs obligatoires
      </p>
    </div>
  );
};

export default InfoForm;
