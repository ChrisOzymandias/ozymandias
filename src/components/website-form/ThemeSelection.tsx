
import React from 'react';
import { Check } from 'lucide-react';
import { websiteThemes } from './constants';

interface ThemeSelectionProps {
  currentTheme: string;
  onThemeSelect: (themeId: string) => void;
  stepTitle: string;
  stepDescription: string;
}

const ThemeSelection: React.FC<ThemeSelectionProps> = ({
  currentTheme,
  onThemeSelect,
  stepTitle,
  stepDescription,
}) => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold">{stepTitle}</h3>
      <p className="text-gray-600">{stepDescription}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {websiteThemes.map((theme) => (
          <button
            key={theme.id}
            type="button"
            className={`p-4 border-2 rounded-xl flex items-center hover:border-blue-500 hover:bg-blue-50 transition-all ${
              currentTheme === theme.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
            }`}
            onClick={() => onThemeSelect(theme.id)}
          >
            <span className="text-2xl mr-3">{theme.icon}</span>
            <span className="font-medium">{theme.name}</span>
            {currentTheme === theme.id && (
              <Check className="ml-auto h-5 w-5 text-blue-500" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemeSelection;
