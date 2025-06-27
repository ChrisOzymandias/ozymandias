
import React from 'react';

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-ozy-light">
      <div className="container-custom">
        <h2 className="section-title text-center">Ce que disent <span className="text-gradient">nos clients</span></h2>
        <p className="section-subtitle text-center">
          Découvrez l'expérience des professionnels qui nous ont fait confiance pour leur présence en ligne
        </p>
        
        {/* Facebook-style social proof headline */}
        <div className="bg-white p-4 rounded-lg shadow-md max-w-xl mx-auto mb-12 flex items-center">
          <img src="/lovable-uploads/a24f34e6-5866-4fb8-bda3-f4e10c503450.png" alt="Ozymandias Logo" className="h-10 mr-4" />
          <div>
            <p className="font-medium text-gray-700">Note moyenne: <span className="text-blue-600">4.9/5</span></p>
            <div className="flex text-yellow-400 text-lg">★★★★★ <span className="text-gray-600 text-sm ml-1">(125 avis)</span></div>
          </div>
        </div>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Testimonial 1 - DestrucBusigny */}
          <div className="bg-white p-8 rounded-xl shadow-md transform transition-transform hover:scale-105 hover:shadow-lg">
            <div className="flex items-center mb-4">
              <div className="w-16 h-16 bg-gray-200 rounded-full mr-4 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=50&h=50" 
                  alt="Marc Destruc" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-bold">Marc Destruc</h4>
                <p className="text-sm text-gray-600">Expert Désinsectisation</p>
                <div className="text-yellow-400 text-sm">★★★★★</div>
              </div>
            </div>
            <p className="text-gray-600">"Site moderne et professionnel qui reflète parfaitement mon expertise. Les clients me trouvent facilement grâce au référencement local optimisé !"</p>
            <div className="mt-4 text-sm text-gray-500">Client depuis janvier 2024</div>
            <div className="mt-3 flex gap-2">
              <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Site professionnel</span>
              <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">SEO local</span>
            </div>
          </div>
          
          {/* Testimonial 2 */}
          <div className="bg-white p-8 rounded-xl shadow-md transform transition-transform hover:scale-105 hover:shadow-lg">
            <div className="flex items-center mb-4">
              <div className="w-16 h-16 bg-gray-200 rounded-full mr-4 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&q=80&w=50&h=50" 
                  alt="Thomas Durand" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-bold">Thomas Durand</h4>
                <p className="text-sm text-gray-600">Consultant</p>
                <div className="text-yellow-400 text-sm">★★★★★</div>
              </div>
            </div>
            <p className="text-gray-600">"J'ai été impressionné par la qualité du service. Le site est magnifique, rapide et parfaitement optimisé pour les mobiles. Un excellent investissement."</p>
            <div className="mt-4 text-sm text-gray-500">Client depuis février 2023</div>
            <div className="mt-3 flex gap-2">
              <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Site professionnel</span>
              <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">SEO local</span>
            </div>
          </div>
          
          {/* Testimonial 3 */}
          <div className="bg-white p-8 rounded-xl shadow-md transform transition-transform hover:scale-105 hover:shadow-lg">
            <div className="flex items-center mb-4">
              <div className="w-16 h-16 bg-gray-200 rounded-full mr-4 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&q=80&w=50&h=50" 
                  alt="Émilie Legrand" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-bold">Émilie Legrand</h4>
                <p className="text-sm text-gray-600">Photographe</p>
                <div className="text-yellow-400 text-sm">★★★★★</div>
              </div>
            </div>
            <p className="text-gray-600">"En tant que photographe, j'avais besoin d'un site qui mette en valeur mon travail. Le résultat est au-delà de mes attentes et à un prix très compétitif."</p>
            <div className="mt-4 text-sm text-gray-500">Client depuis octobre 2023</div>
            <div className="mt-3 flex gap-2">
              <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Portfolio</span>
              <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Responsive</span>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <a href="#form" className="btn-blue inline-flex items-center">
            Obtenir Ma Maquette Gratuite
          </a>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
