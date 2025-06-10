
import React from 'react';
import { SectorData } from '@/data/sectorsData';

interface SectorTestimonialProps {
  sectorData: SectorData;
}

const SectorTestimonial: React.FC<SectorTestimonialProps> = ({ sectorData }) => {
  const { testimonial } = sectorData;
  
  return (
    <section className="py-20 bg-ozy-light">
      <div className="container-custom">
        <h2 className="section-title text-center">
          Témoignage d'un <span className="text-gradient">{sectorData.displayName}</span>
        </h2>
        
        <div className="max-w-4xl mx-auto mt-12">
          <div className="bg-white p-8 md:p-12 rounded-xl shadow-lg">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/3 mb-6 md:mb-0 text-center">
                <img 
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h4 className="font-bold text-lg">{testimonial.name}</h4>
                <p className="text-ozy font-medium">{testimonial.profession}</p>
                <div className="text-yellow-400 text-lg mt-2">★★★★★</div>
              </div>
              
              <div className="md:w-2/3 md:pl-8">
                <blockquote className="text-xl text-gray-700 italic leading-relaxed">
                  "{testimonial.content}"
                </blockquote>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-8">
          <a href="#form" className="btn-blue">
            Créer mon site {sectorData.displayName} maintenant
          </a>
        </div>
      </div>
    </section>
  );
};

export default SectorTestimonial;
