
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const PolitiqueCookies = () => {
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
            Politique des Cookies
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Qu'est-ce qu'un cookie ?</h2>
              <p className="text-gray-700 mb-4">
                Un cookie est un petit fichier texte stocké sur votre ordinateur ou appareil mobile lorsque vous visitez un site web. Il permet au site de se souvenir de vos actions et préférences pendant une période donnée.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Comment utilisons-nous les cookies ?</h2>
              <p className="text-gray-700 mb-4">
                Nous utilisons les cookies pour :
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Améliorer la fonctionnalité de notre site web</li>
                <li>Analyser la façon dont notre site est utilisé</li>
                <li>Personnaliser votre expérience</li>
                <li>Mémoriser vos préférences</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Types de cookies utilisés</h2>
              
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Cookies strictement nécessaires</h3>
                <p className="text-gray-700 mb-4">
                  Ces cookies sont essentiels pour vous permettre de naviguer sur le site et d'utiliser ses fonctionnalités. Sans ces cookies, les services que vous avez demandés ne peuvent pas être fournis.
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Cookies de performance</h3>
                <p className="text-gray-700 mb-4">
                  Ces cookies collectent des informations sur la façon dont les visiteurs utilisent un site web. Ils nous aident à améliorer le fonctionnement de notre site.
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Cookies de fonctionnalité</h3>
                <p className="text-gray-700 mb-4">
                  Ces cookies permettent au site web de se souvenir des choix que vous faites et de fournir des fonctionnalités améliorées et plus personnelles.
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Cookies de ciblage/publicitaires</h3>
                <p className="text-gray-700 mb-4">
                  Ces cookies sont utilisés pour diffuser des publicités plus pertinentes pour vous et vos intérêts. Ils sont également utilisés pour limiter le nombre de fois que vous voyez une publicité.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Cookies tiers</h2>
              <p className="text-gray-700 mb-4">
                Nous utilisons également des services tiers qui peuvent placer des cookies sur votre appareil :
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li><strong>Google Analytics :</strong> Pour analyser l'utilisation du site</li>
                <li><strong>Facebook Pixel :</strong> Pour mesurer l'efficacité de nos publicités</li>
                <li><strong>Services de chat :</strong> Pour le support client</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Gestion des cookies</h2>
              <p className="text-gray-700 mb-4">
                Vous pouvez contrôler et/ou supprimer les cookies comme vous le souhaitez. Vous pouvez supprimer tous les cookies qui sont déjà sur votre ordinateur et vous pouvez configurer la plupart des navigateurs pour empêcher leur placement.
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Note :</strong> Si vous choisissez de désactiver les cookies, certaines fonctionnalités de notre site web peuvent ne pas fonctionner correctement.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Durée de conservation</h2>
              <p className="text-gray-700 mb-4">
                Les cookies de session sont supprimés lorsque vous fermez votre navigateur. Les cookies persistants restent sur votre appareil jusqu'à leur expiration ou jusqu'à ce que vous les supprimiez.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Contact</h2>
              <p className="text-gray-700 mb-4">
                Si vous avez des questions concernant notre utilisation des cookies, vous pouvez nous contacter à :
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

export default PolitiqueCookies;
