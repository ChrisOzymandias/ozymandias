
import { useState } from 'react';
import PricingToggle from './pricing/PricingToggle';
import PricingCard from './pricing/PricingCard';
import FeatureList from './pricing/FeatureList';
import PricingFooter from './pricing/PricingFooter';

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);
  
  const monthlyPrice = 49;
  const yearlyPrice = monthlyPrice * 10; // 2 mois gratuits

  return (
    <section id="pricing" className="py-20 bg-gradient-to-br from-white to-ozy-light/30">
      <div className="container-custom">
        <h2 className="section-title text-center">Une offre <span className="text-gradient">révolutionnaire</span></h2>
        <p className="section-subtitle text-center">
          Création gratuite + maintenance tout inclus pour un prix imbattable
        </p>

        <PricingToggle isYearly={isYearly} onToggle={setIsYearly} />

        <div className="max-w-5xl mx-auto">
          <PricingCard 
            isYearly={isYearly} 
            monthlyPrice={monthlyPrice} 
            yearlyPrice={yearlyPrice} 
          />
          
          <div className="bg-white p-8 -mt-2 rounded-b-2xl shadow-xl">
            <FeatureList monthlyPrice={monthlyPrice} />
            <PricingFooter monthlyPrice={monthlyPrice} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
