
import React, { useEffect } from 'react';
import { CheckCircle, ArrowLeft, Home } from 'lucide-react';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
import { trackCompleteRegistration } from '../utils/pixelEvents';

const ThankYouPage = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Déclenche l'événement CompleteRegistration lorsque la page est montée
    trackCompleteRegistration();
    console.log('CompleteRegistration event tracked');
  }, []);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-ozy-light py-20">
      <div className="max-w-2xl w-full mx-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold mb-4">Merci pour votre demande !</h1>
          
          <p className="text-gray-600 text-lg mb-8">
            Nous avons bien reçu votre projet et reviendrons vers vous rapidement avec une 
            <span className="font-bold text-blue-600"> maquette gratuite de votre futur site internet</span>.
          </p>
          
          <p className="text-sm text-gray-500 mb-8">
            Un de nos experts vous contactera sous 24-48h ouvrées pour discuter des détails de votre projet.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="outline" 
              onClick={() => navigate('/')}
              className="flex items-center"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour à l'accueil
            </Button>
            
            <Button 
              onClick={() => window.open('/#pricing', '_self')}
              className="flex items-center"
            >
              <Home className="mr-2 h-4 w-4" />
              Voir nos tarifs
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;
