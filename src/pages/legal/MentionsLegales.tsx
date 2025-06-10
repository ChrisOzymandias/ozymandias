
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const MentionsLegales = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container-custom max-w-4xl">
        <Link 
          to="/" 
          className="inline-flex items-center text-ozy hover:text-ozy-dark mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour à l'accueil
        </Link>
        
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            Mentions Légales
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Informations sur l'éditeur</h2>
              <p className="text-gray-700 mb-4">
                <strong>Raison sociale :</strong> Ozymandias<br />
                <strong>Adresse :</strong> 3 Place Karine Ruby, 27000 EVREUX<br />
                <strong>Email :</strong> contact@ozymandias.agency<br />
                <strong>Téléphone :</strong> [À compléter]<br />
                <strong>SIRET :</strong> [À compléter]<br />
                <strong>Code APE :</strong> [À compléter]
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Directeur de la publication</h2>
              <p className="text-gray-700 mb-4">
                Le directeur de la publication est [Nom du directeur].
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Hébergement</h2>
              <p className="text-gray-700 mb-4">
                Ce site est hébergé par :<br />
                <strong>Lovable</strong><br />
                [Adresse de l'hébergeur]<br />
                Site web : https://lovable.dev
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Propriété intellectuelle</h2>
              <p className="text-gray-700 mb-4">
                L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Limitation de responsabilité</h2>
              <p className="text-gray-700 mb-4">
                Les informations contenues sur ce site sont aussi précises que possible et le site remis à jour à différentes périodes de l'année, mais peut toutefois contenir des inexactitudes ou des omissions.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Droit applicable</h2>
              <p className="text-gray-700 mb-4">
                Tant le présent site que les modalités et conditions de son utilisation sont régis par le droit français, quel que soit le lieu d'utilisation. En cas de contestation éventuelle, et après l'échec de toute tentative de recherche d'une solution amiable, les tribunaux français seront seuls compétents pour connaître de ce litige.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentionsLegales;
