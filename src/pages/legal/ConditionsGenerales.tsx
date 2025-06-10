
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const ConditionsGenerales = () => {
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
            Conditions Générales de Vente
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Objet</h2>
              <p className="text-gray-700 mb-4">
                Les présentes conditions générales ont pour objet de définir les modalités et conditions dans lesquelles Ozymandias fournit ses services de création de sites web et de maintenance.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Services proposés</h2>
              <p className="text-gray-700 mb-4">
                Ozymandias propose :
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li><strong>Création de site web GRATUITE</strong> : Conception et développement d'un site web professionnel sans frais de création</li>
                <li><strong>Abonnement maintenance à 49€/mois</strong> incluant :
                  <ul className="list-disc pl-6 mt-2">
                    <li>Hébergement premium</li>
                    <li>Nom de domaine</li>
                    <li>Adresse email professionnelle</li>
                    <li>Maintenance technique</li>
                    <li>Mises à jour de sécurité</li>
                    <li>Support client</li>
                    <li>Sauvegardes automatiques</li>
                  </ul>
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Tarifs et modalités de paiement</h2>
              <p className="text-gray-700 mb-4">
                <strong>Création du site :</strong> GRATUITE, aucun frais de création.
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Abonnement maintenance :</strong> 49€ HT/mois, payable mensuellement par prélèvement automatique.
              </p>
              <p className="text-gray-700 mb-4">
                L'abonnement maintenance démarre après validation du site par le client.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Délais de livraison</h2>
              <p className="text-gray-700 mb-4">
                Nous nous engageons à livrer votre site web en 7 jours maximum à compter de la réception de tous les éléments nécessaires à sa création.
              </p>
              <p className="text-gray-700 mb-4">
                En cas de dépassement de ce délai imputable à Ozymandias, le client sera intégralement remboursé des sommes éventuellement versées.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Obligations du client</h2>
              <p className="text-gray-700 mb-4">
                Le client s'engage à :
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Fournir tous les éléments nécessaires à la création du site (textes, images, logos, etc.)</li>
                <li>Respecter les droits de propriété intellectuelle</li>
                <li>Ne pas utiliser le site à des fins illégales</li>
                <li>Régler l'abonnement maintenance aux échéances convenues</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Résiliation</h2>
              <p className="text-gray-700 mb-4">
                L'abonnement maintenance peut être résilié par le client à tout moment après une période minimale de 3 mois, moyennant un préavis de 30 jours.
              </p>
              <p className="text-gray-700 mb-4">
                En cas de résiliation, le client conserve une sauvegarde complète de son site web.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Propriété intellectuelle</h2>
              <p className="text-gray-700 mb-4">
                Le client reste propriétaire de tous les contenus qu'il fournit. Ozymandias conserve la propriété du code source développé mais accorde au client un droit d'usage exclusif.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Limitation de responsabilité</h2>
              <p className="text-gray-700 mb-4">
                La responsabilité d'Ozymandias est limitée aux dommages directs et ne peut excéder le montant des sommes versées par le client au cours des 12 derniers mois.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Droit applicable et juridiction</h2>
              <p className="text-gray-700 mb-4">
                Les présentes conditions sont soumises au droit français. En cas de litige, les tribunaux d'Évreux seront seuls compétents.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConditionsGenerales;
