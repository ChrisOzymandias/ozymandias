
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const PolitiqueConfidentialite = () => {
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
            Politique de Confidentialité
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Collecte des informations</h2>
              <p className="text-gray-700 mb-4">
                Nous collectons des informations lorsque vous vous inscrivez sur notre site, passez une commande, vous abonnez à notre newsletter, répondez à une enquête ou remplissez un formulaire.
              </p>
              <p className="text-gray-700 mb-4">
                Les informations collectées incluent votre nom, votre adresse e-mail, numéro de téléphone, et/ou informations sur votre entreprise.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Utilisation des informations</h2>
              <p className="text-gray-700 mb-4">
                Toutes les informations que nous recueillons auprès de vous peuvent être utilisées pour :
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Personnaliser votre expérience et répondre à vos besoins individuels</li>
                <li>Fournir un contenu publicitaire personnalisé</li>
                <li>Améliorer notre site web</li>
                <li>Améliorer le service client et vos besoins de prise en charge</li>
                <li>Vous contacter par e-mail</li>
                <li>Administrer un concours, une promotion, ou une enquête</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Protection des informations</h2>
              <p className="text-gray-700 mb-4">
                Nous mettons en œuvre une variété de mesures de sécurité pour préserver la sécurité de vos informations personnelles. Nous utilisons un cryptage à la pointe de la technologie pour protéger les informations sensibles transmises en ligne.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Divulgation à des tiers</h2>
              <p className="text-gray-700 mb-4">
                Nous ne vendons, n'échangeons et ne transférons pas vos informations personnelles identifiables à des tiers. Cela ne comprend pas les tierce parties de confiance qui nous aident à exploiter notre site web ou à mener nos affaires, tant que ces parties conviennent de garder ces informations confidentielles.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Cookies</h2>
              <p className="text-gray-700 mb-4">
                Nous utilisons des cookies pour améliorer votre expérience. En utilisant notre site, vous acceptez notre utilisation des cookies conformément à notre politique de cookies.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Vos droits</h2>
              <p className="text-gray-700 mb-4">
                Conformément au RGPD, vous disposez des droits suivants :
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Droit d'accès à vos données</li>
                <li>Droit de rectification</li>
                <li>Droit à l'effacement</li>
                <li>Droit à la limitation du traitement</li>
                <li>Droit à la portabilité</li>
                <li>Droit d'opposition</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Contact</h2>
              <p className="text-gray-700 mb-4">
                Pour toute question concernant cette politique de confidentialité, vous pouvez nous contacter à :
                <br />
                <strong>Email :</strong> contact@ozymandias.agency
                <br />
                <strong>Adresse :</strong> 3 Place Karine Ruby, 27000 EVREUX
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolitiqueConfidentialite;
