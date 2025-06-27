
import React from 'react';
import { CheckCircle, Target, Rocket, TrendingUp } from 'lucide-react';

const MarketingProcessSection = () => {
  const steps = [
    {
      icon: Target,
      title: "1. Analyse & Stratégie",
      description: "Audit de votre présence actuelle et définition d'une stratégie marketing personnalisée",
      details: ["Analyse de votre secteur d'activité", "Étude de la concurrence locale", "Définition des objectifs marketing"]
    },
    {
      icon: Rocket,
      title: "2. Mise en Place",
      description: "Configuration et création de tous vos outils marketing selon votre stratégie",
      details: ["Configuration des campagnes", "Création du contenu optimisé", "Paramétrage des outils de suivi"]
    },
    {
      icon: TrendingUp,
      title: "3. Lancement & Optimisation",
      description = "Activation de vos campagnes avec suivi et optimisation en temps réel",
      details: ["Lancement des campagnes", "Suivi des performances", "Optimisation continue pendant 7 jours"]
    },
    {
      icon: CheckCircle,
      title: "4. Formation & Autonomie",
      description: "Formation complète pour que vous puissiez gérer vos campagnes en autonomie",
      details: ["Formation sur les outils", "Guide de bonnes pratiques", "Support technique inclus"]
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-ozy-light/10 to-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="section-title">
            Notre <span className="text-gradient">Processus Marketing</span>
          </h2>
          <p className="section-subtitle">
            Une méthode éprouvée en 4 étapes pour maximiser votre retour sur investissement
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div key={index} className="relative group">
                {/* Ligne de connexion pour desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-ozy/30 to-transparent z-0"></div>
                )}
                
                <div className="relative bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-ozy/20 z-10">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-ozy to-ozy-dark flex items-center justify-center group-hover:scale-110 transition-transform">
                    <IconComponent size={28} className="text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 text-gray-800">{step.title}</h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">{step.description}</p>
                  
                  <ul className="space-y-2">
                    {step.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start text-sm text-gray-500">
                        <div className="w-1.5 h-1.5 rounded-full bg-ozy mt-2 mr-2 flex-shrink-0"></div>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center bg-ozy-light/30 rounded-full px-6 py-3 text-ozy font-medium">
            <CheckCircle size={20} className="mr-2" />
            <span>Processus éprouvé sur +200 projets marketing</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketingProcessSection;
