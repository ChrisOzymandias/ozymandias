
import React from 'react';

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-ozy-light">
      <div className="container-custom">
        <h2 className="section-title text-center">Ce que disent <span className="text-gradient">nos clients</span></h2>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Testimonial 1 */}
          <div className="bg-white p-8 rounded-xl shadow-md">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full mr-4 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&q=80&w=50&h=50" 
                  alt="Sophie Martin" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-bold">Sophie Martin</h4>
                <p className="text-sm text-gray-600">Fleuriste</p>
              </div>
            </div>
            <p className="text-gray-600">"Rapide, efficace et professionnel ! Mon site est exactement comme je le voulais et a été livré en seulement 5 jours. Je recommande !"</p>
          </div>
          
          {/* Testimonial 2 */}
          <div className="bg-white p-8 rounded-xl shadow-md">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full mr-4 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&q=80&w=50&h=50" 
                  alt="Thomas Durand" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-bold">Thomas Durand</h4>
                <p className="text-sm text-gray-600">Consultant</p>
              </div>
            </div>
            <p className="text-gray-600">"J'ai été impressionné par la qualité du service. Le site est magnifique, rapide et parfaitement optimisé pour les mobiles. Un excellent investissement."</p>
          </div>
          
          {/* Testimonial 3 */}
          <div className="bg-white p-8 rounded-xl shadow-md">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full mr-4 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&q=80&w=50&h=50" 
                  alt="Émilie Legrand" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-bold">Émilie Legrand</h4>
                <p className="text-sm text-gray-600">Photographe</p>
              </div>
            </div>
            <p className="text-gray-600">"En tant que photographe, j'avais besoin d'un site qui mette en valeur mon travail. Le résultat est au-delà de mes attentes et à un prix très compétitif."</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
